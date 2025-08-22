import React, { useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adminDonation.module.css";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { TbRefresh } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../Components/SearchFilter";
import { getDonation } from "shared/services";
import { RingLoader } from "shared/components";
import dayjs from "dayjs";

export default function AdminDonation() {
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState([]);
  const [donationsForTable, setDonationsForTable] = useState([]);
  const [length, setLength] = useState(0);
  const [pageno, setPageno] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleTableData = (data: any) => {
    let tempData: any = [];

    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        let date = dayjs(v?.createdAt).format("MM-DD-YYYY h:mm a");

        tempData.push([
          date,
          v?.donationId,
          v?.donorName,
          v?.companyId?.vendorId,
          v?.companyId?.name,
          v?.packageId?.donationTitle,
          v?.donationAmount,
        ]);
      });

      setDonationsForTable(tempData);
    }
  };
  const handleFetchDonations = (pageno: number, searchText: string) => {
    setLoading(true);

    getDonation(pageno, searchText)
      .then((res: any) => {
        handleTableData(res?.data?.donations);
        setDonations(res?.data?.donations);
        setLength(res?.data?.donorsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    handleFetchDonations(currentPage, "");
  }, []);

  const handleRefresh = () => {
    setCurrentPage(1);
    setPageno(1);
    handleFetchDonations(1, "");
  };

  const handleSearch = () => {
    setCurrentPage(1);
    handleFetchDonations(1, search);
  };

  const handleoToDetail = (index: any) => {
    navigate("/admin/donation/Detail", { state: donations[index] });
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      setLoading(true);
      handleFetchDonations(currentPage + 1, search);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      setLoading(true);
      handleFetchDonations(currentPage - 1, search);
    }
  };
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Donations" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flxBetween)}>
          <div className={classNames(commonStyles.flx, commonStyles.colsm12)}>
            <p
              className={classNames(
                commonStyles.fs22,
                commonStyles.colorBlack,
                commonStyles.semiBold
              )}
            >
              Donors
            </p>
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
        <div
          style={{
            padding: "0 0.83%",
          }}
        >
          <div className={Styles.payment}>
            <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
              <p className={Styles.headerclass}>SUBMITTED AT</p>
              <p className={Styles.headerclass}>DONATION ID</p>
              <p className={Styles.headerclass}>DONOR NAME</p>
              <p className={Styles.headerclass}>VENDOR ID </p>
              <p className={Styles.headerclass}>VENDOR NAME</p>
              <p className={Styles.headerclass}>PACKAGE NAME</p>
              <p className={Styles.headerclass}>DONATION AMOUNT</p>
            </div>
            <div className={Styles.tableData}>
              <table
                style={{
                  margin: "0px",
                  borderCollapse: "separate",
                  borderSpacing: "0 4px",
                }}
              >
                <tbody className={Styles.wapper}>
                  {donationsForTable.map((rowData: any, rowIndex: any) => (
                    <tr
                      className={Styles.tableRow}
                      key={rowIndex}
                      onClick={() => handleoToDetail(rowIndex)}
                    >
                      {rowData.map((cellData: any, cellIndex: any) => (
                        <td key={cellIndex} className={Styles.w20}>
                          {cellData}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
