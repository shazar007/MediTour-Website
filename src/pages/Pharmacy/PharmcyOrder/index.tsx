import { useEffect, useState } from "react";
import styles from "../PharmcyOrder/order.module.css";
import classNames from "classnames";
import commomstyles from "shared/utils/common.module.css";
import IconDetail from "assets/images/Icon Detail.png.png";
import commonstyle from "../../../shared/utils/common.module.css";
import { getAllPharmOrders, PharmacyChangeStatus } from "shared/services";
import { RingLoader } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import NewPagination from "shared/components/NewPagination/NewPagination";
import {
  setPharmacyOrder,
  setPharmacyOrderLength,
  setrenderpharmacyOrderFlag,
} from "shared/redux";
import { TbRefresh } from "react-icons/tb";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import TableNew from "shared/components/A_New_Components/Table_new";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CustomSelectOrder from "pages/Laboratory/Orders/CustomSelectOrder";
import { useTranslation } from "react-i18next";

function PharmcyOrder() {
  const { t, i18n }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const { orders, renderpharmacyOrderFlag, orderLength } = useSelector(
    (state: any) => state.root.pharmacy
  );

  const statusOptions = [
    { label: t("pending"), value: "pending", color: "#F0D5D1" },
    { label: t("onRoute"), value: "onRoute", color: "#FEE6DA" },
    { label: t("completed"), value: "completed", color: "#F0F8E8" },
  ];
  const PhrOrder = [
    t("requestId"),
    t("date"),
    t("status"),
    t("totalAmount"),
    t("action"),
  ];

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    if (!id) {
      console.error(t("orderIdIsMissing"));
      return;
    }

    try {
      const response = await PharmacyChangeStatus(id, { status: newStatus });
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const totalItems = orderLength;
  const fetchPharOrders = (pageno: number) => {
    setLoading(true);
    getAllPharmOrders(pageno)
      .then((res: any) => {
        dispatch(setPharmacyOrder(res?.data?.orders));
        dispatch(setPharmacyOrderLength(res?.data?.totalPharms));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (orderLength > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      dispatch(setrenderpharmacyOrderFlag(true));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      dispatch(setrenderpharmacyOrderFlag(true));
    }
  };
  useEffect(() => {
    fetchPharOrders(1);
  }, []);
  const handleRefresh = () => {
    setLoading(true);
    setCurrentPage(1);
    fetchPharOrders(1);
  };
  useEffect(() => {
    if (renderpharmacyOrderFlag) {
      setLoading(true);
      fetchPharOrders(currentPage);
      dispatch(setrenderpharmacyOrderFlag(false));
    }
  }, [renderpharmacyOrderFlag, currentPage]);

  const navigate = useNavigate();
  const handleGoToOrderDeatil = (item: any) => {
    navigate(`/pharmacy/orderDetails`, { state: item });
  };

  let tableData: any = [];
  orders?.map((v: any, ind: any) => {
    tableData.push([
      v?.requestId,
      dayjs(v?.createdAt).format("DD-MM-YYYY"),
      <CustomSelectOrder
        statusOptions={statusOptions}
        orderId={v?._id}
        initialStatus={v?.status}
        onStatusUpdate={handleStatusUpdate}
      />,
      v?.paidByUserAmount?.toFixed(2),
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => handleGoToOrderDeatil(v)}
      >
        <img src={IconDetail} alt="IconDetails" className={styles.IconDetail} />
        <p className={styles.Details}>{t("details")}</p>
      </div>,
    ]);
  });

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commomstyles.pl36
          : commomstyles.pr36
      }
    >
      <div className={classNames(commomstyles.flx)} style={{ gap: "16px" }}>
        <p className={classNames(commonstyle.fs24, commonstyle.semiBold)}>
          {t("allMedicinesOrder")}
        </p>
        {loading ? (
          <div className={styles.outerRefresh}>
            <RingLoader color={"#0E54A3"} size={24} />
          </div>
        ) : (
          <div className={styles.outerRefresh}>
            {" "}
            <TbRefresh color="#7d7d7d" size={24} onClick={handleRefresh} />
          </div>
        )}
      </div>

      <div className={styles.outerContainer}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <NewPagination
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, totalItems)}
            totalItems={totalItems}
          />
        </div>
        {orders && orders.length > 0 ? (
          <>
            <TableNew
              titles={PhrOrder}
              data={tableData}
              headerWidth="20%"
              itemWidth="20%"
              show="default"
              height="49.6vh"
            />
          </>
        ) : (
          <div>
            <PhysiotheristsEmpty />
          </div>
        )}
      </div>
    </div>
  );
}

export default PharmcyOrder;
