import React, { useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adminorder.module.css";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useNavigate } from "react-router-dom";
import { BiFilterAlt } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import OrderLabTables from "./AdminLabOrder/OrderLabTables";
import OrderPharmacyTables from "./AdminPharmacyOrder/OrderPharmacyTable";
import SearchFilter from "../Components/SearchFilter";
import { getAllOrder } from "shared/services";
import { RingLoader } from "shared/components";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function AdminOrder() {
  const { systemType } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Laboratory");
  const [loading, setLoading] = useState(false);
  const [Order, setorder] = useState([]);
  const [OrderForTable, setOrderForTable] = useState([]);

  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setCurrentPage(1);
    handleFetchOrder(selectedOption, 1, search);
  };
  const handleTableData = (data: any) => {
    let tempData: any = [];

    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        let date = dayjs(v?.createdAt).format("MM-DD-YYYY h:mm a");
        // if (systemType === "laboratory") {
        tempData.push([
          date,
          v?.orderId,
          v?.MR_NO,
          v?.userId?.name,
          v.vendorId?.vendorId,
          v?.vendorId?.name,
          v?.totalAmount,
          v?.status,
        ]);
      });

      setOrderForTable(tempData);
    } else {
      setOrderForTable([]);
    }
  };
  const handleFetchOrder = (option: any, page: number, search: string) => {
    setLoading(true);
    getAllOrder(page, option, search)
      .then((res: any) => {
        setorder(res?.data.orders);
        handleTableData(res?.data.orders);
        setLength(res?.data?.ordersLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchOrder(selectedOption, 1, "");
  }, []);

  const handleRefresh = () => {
    setSearch("");
    setPageno(1);
    setCurrentPage(1);
    handleFetchOrder(selectedOption, 1, "");
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      handleFetchOrder(selectedOption, currentPage + 1, search);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      handleFetchOrder(selectedOption, currentPage - 1, search);
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch("");
    setPageno(1);
    setCurrentPage(1);
    setSelectedOption(e.target.value);
    handleFetchOrder(e.target.value, 1, "");
  };
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Orders" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <div>
              <select
                className={Styles.customSelect}
                name="orderType"
                id="orderType"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option className={Styles.customOption} value="Laboratory">
                  Laboratory
                </option>
                <option className={Styles.customOption} value="Pharmacy">
                  Pharmacy
                </option>
              </select>
            </div>
            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <SearchFilter
              vender={false}
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          </div>
          <div className={classNames(commonStyles.flx)}>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, length)}
              totalItems={totalItems}
            />
          </div>
        </div>
        {selectedOption === "Laboratory" ? (
          <OrderLabTables Data={OrderForTable} />
        ) : (
          <OrderPharmacyTables Data={OrderForTable} />
        )}
      </div>
    </div>
  );
}
