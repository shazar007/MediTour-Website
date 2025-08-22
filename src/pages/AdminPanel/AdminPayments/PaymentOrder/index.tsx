import React, { useEffect, useState } from "react";
import AdminNavBar from "../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./PaymentsOrder.module.css";
import { useNavigate } from "react-router-dom";
import PharmacyPayments from "./PharmacyPayments";
import LaboratoryPayments from "./LaboratoryPayments";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import {
  CustomModal,
  PrimaryButton,
  RingLoader,
  VendorSelectionModal,
} from "shared/components";
import { getAllPaymentOrder, getUsers } from "shared/services";
import { BiFilterAlt } from "react-icons/bi";

export default function PaymentsOrders() {
  const [selectedOption, setSelectedOption] = useState("Laboratory");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [OrderPayment, setPaymentorder] = useState([]);
  const [vendorList, setVendorList] = useState<any>([]);
  const [length, setLength] = useState(0);
  const [pageno, setPageno] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [searchVendor, setSearchVendor] = useState("");
  const [vendorCurrentPage, setVendorCurrentPage] = useState(1);
  const [vendorLength, setvendorLength] = useState(0);
  const [vendorIndex, setVendorIndex] = useState(0);

  const goToPayment = () => {
    if (selectedItems.length > 0) {
      navigate("/admin/Payments/ProceedPayment", {
        state: {
          vendor: vendorList[vendorIndex],
          selectedItems: selectedItems,
          VendorModalType: selectedOption,
          itemModelType: "Order",
        },
      });
    } else {
      alert("Please select an order first.");
    }
  };
  useEffect(() => {
    handleFetchVendors(1, selectedOption, "");
  }, []);

  const handleSearch = (text: string) => {
    setSearchVendor(text);
    handleFetchVendors(1, selectedOption, text);
  };
  const handleVendorNextPage = () => {
    let itemTorender = vendorCurrentPage * 10;
    if (vendorLength > itemTorender) {
      setVendorCurrentPage(vendorCurrentPage + 1);
      setLoading(true);
      handleFetchVendors(vendorCurrentPage + 1, selectedOption, searchVendor);
    }
  };

  const handleVendorPreviousPage = () => {
    if (vendorCurrentPage > 1) {
      setVendorCurrentPage(vendorCurrentPage - 1);
      setLoading(true);
      handleFetchVendors(vendorCurrentPage - 1, selectedOption, searchVendor);
    }
  };

  const handleFetchVendors = (
    page: number,
    vendorType: any,
    search: string
  ) => {
    getUsers(page, vendorType, search)
      .then((res: any) => {
        setVendorList(res?.data?.vendors);
        setvendorLength(res?.data?.totalCount);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const handleFetchOrder = (option: any, pageno: number, index: any) => {
    // if (vendorList.length > 0) {
    setLoading(true);
    let completedOrders = true;
    getAllPaymentOrder(
      option,
      false,
      pageno,
      completedOrders,
      vendorList[index]?._id
    )
      .then((res: any) => {
        setPaymentorder(res?.data.orders);
        setLength(res?.data?.ordersLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
    // }
  };
  useEffect(() => {
    setLoading(true);
    //
    handleFetchOrder(selectedOption, 1, vendorIndex);
  }, [selectedOption, vendorIndex, vendorList]);

  const handleRefresh = () => {
    handleFetchOrder(selectedOption, 1, vendorIndex);
    setCurrentPage(1);
    setPageno(1);
    setLoading(true);
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      setLoading(true);
      handleFetchOrder(selectedOption, currentPage + 1, vendorIndex);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      setLoading(true);
      handleFetchOrder(selectedOption, currentPage - 1, vendorIndex);
    }
  };

  const handleSelect = (item: any) => {
    let newArray = JSON.parse(JSON.stringify(selectedItems));

    const index = newArray.findIndex((i: any) => i._id === item._id);

    if (index !== -1) {
      newArray = newArray.filter((_: any, i: any) => i !== index);
    } else {
      newArray = [...newArray, item];
    }

    setSelectedItems(newArray);
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Pending Payments" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div
          className={classNames(Styles.flxBetween)}
          style={{
            padding: "0 0.83%",
          }}
        >
          <div className={classNames(commonStyles.flx)}>
            <select
              className={Styles.customSelect}
              name="PaymentType"
              id="PaymentType"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setSelectedItems([]);
                handleFetchVendors(1, e.target.value, searchVendor);
              }}
            >
              <option className={Styles.customOption} value="Laboratory">
                Laboratory
              </option>
              <option className={Styles.customOption} value="Pharmacy">
                Pharmacy
              </option>
            </select>
            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <p style={{ marginLeft: "20px" }}>
              {vendorList[vendorIndex]?.name}
            </p>
            <BiFilterAlt
              className={Styles.refresh}
              onClick={() => setShowVendorModal(true)}
            />

            {/* <SearchFilter vender={true} checkbox={true} /> */}
          </div>
          <div className={classNames(commonStyles.flx)}>
            <div style={{ marginRight: "32px", width: "160px" }}>
              <PrimaryButton
                children={"Pay To Vendor"}
                colorType={"blue"}
                onClick={goToPayment}
              />
            </div>
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
          {selectedOption === "Laboratory" ? (
            <LaboratoryPayments
              Data={OrderPayment}
              handleSelect={handleSelect}
              selectedItems={selectedItems}
            />
          ) : (
            <PharmacyPayments
              Data={OrderPayment}
              handleSelect={handleSelect}
              selectedItems={selectedItems}
            />
          )}
        </div>
      </div>

      <CustomModal
        showModal={showVendorModal}
        children={
          <VendorSelectionModal
            data={vendorList}
            setShowAddModal={setShowVendorModal}
            search={searchVendor}
            goNext={handleVendorNextPage}
            goPrev={handleVendorPreviousPage}
            currentPage={vendorCurrentPage}
            itemsPerPage={itemsPerPage}
            length={vendorLength}
            handleSearch={handleSearch}
            setVendorIndex={setVendorIndex}
            vendorIndex={vendorIndex}
          />
        }
      />
    </div>
  );
}
