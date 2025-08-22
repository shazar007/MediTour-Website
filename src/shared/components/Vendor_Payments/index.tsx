import React, { useEffect, useState } from "react";
import classNames from "classnames";
import style from "./payment.module.css";
import commonstyles from "shared/utils/common.module.css";
import { getPaymentComplete } from "shared/services";
import { useSelector } from "react-redux";
import RingLoader from "../RingLoader";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "../NewPagination/NewPagination";
import { useNavigate } from "react-router-dom";
import PhysiotheristsEmpty from "../PhsiotheristEmpty";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { useTranslation } from "react-i18next";
import TableNew from "../A_New_Components/Table_new";
import dayjs from "dayjs";

interface Props {
  type: string;
  id?: string;
}

const Vendor_Payments = (props: Props) => {
  const { t, i18n }: any = useTranslation();
  const { id } = props;
  const { systemType } = useSelector((state: any) => state.root.common);
  console.log("🚀 ~ constVendor_Payments= ~ systemType:", systemType);
  const titlesPay = [
    t("paymentId"),
    t("paymentDate"),
    t("quantity"),
    t("receivedAmount"),
  ];
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(0);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const totalItems = length;
  useEffect(() => {
    fetchPayments(1, "");
  }, []);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchPayments(1, debouncedSearch);
  }, [debouncedSearch]);

  const fetchPayments = (pageno: number, keyword: any) => {
    setLoading(true);
    const type =
      systemType === "laboratory"
        ? "Laboratory"
        : systemType === "hotel"
        ? "Hotel"
        : systemType === "ambulance"
        ? "Ambulance Company"
        : systemType === "pharmacy"
        ? "Pharmacy"
        : systemType === "insurance"
        ? "Insurance"
        : systemType === "donation"
        ? "Donation Company"
        : systemType === "rentacar"
        ? "Rent A Car"
        : systemType === "travelagency"
        ? "Travel Agency"
        : "Doctor";

    console.log("🚀 ~ fetchPayments ~ type:", type);
    getPaymentComplete(type, "", id, pageno, keyword)
      .then((res: any) => {
        console.log("🚀 ~ .then ~ res:", res?.data);
        setPayments(res?.data?.payments);
        setLength(res?.data?.paymentsLength);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  let tableData: any = [];
  payments?.map((v: any, ind: any) => {
    tableData.push([
      v?.paymentId,
      dayjs(v?.createdAt).format("MM-DD-YYYY"),
      v?.noOfitems,
      v?.payableAmount,
    ]);
  });
  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
    fetchPayments(1, "");
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      fetchPayments(currentPage + 1, search);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchPayments(currentPage - 1, search);
    }
  };

  const onPressItem = (ind: any) => {
    const selectedObject: any = payments[ind];
    navigate(`/${systemType}/paymentDetails`, {
      state: selectedObject,
    });
  };
  const handleSearch = () => {
    setCurrentPage(1);
    fetchPayments(1, search);
  };
  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
          {t("receivedPayments")}
        </p>
        {loading ? (
          <div className={style.outerRefresh}>
            <RingLoader color={"#0E54A3"} size={24} />
          </div>
        ) : (
          <div className={style.outerRefresh}>
            <TbRefresh color={"#7d7d7d"} size={24} onClick={handleRefresh} />
          </div>
        )}
      </div>{" "}
      <div className={style.outerContainer}>
        <div
          className={classNames(commonstyles.flxBetween)}
          style={{ marginBottom: "16px" }}
        >
          <SearchFilter
            vender={false}
            search={search}
            title={t("search")}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
          <NewPagination
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, length)}
            totalItems={totalItems}
          />
        </div>
        {payments && payments.length > 0 ? (
          <>
            <TableNew
              titles={titlesPay}
              data={tableData}
              headerWidth="25%"
              itemWidth="25%"
              height="48.6vh"
              handleGoToDetail={onPressItem}
            />
          </>
        ) : (
          <PhysiotheristsEmpty />
        )}
      </div>
    </div>
  );
};

export default Vendor_Payments;
