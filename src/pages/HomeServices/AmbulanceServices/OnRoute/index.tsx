import { useState, useEffect } from "react";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { TbRefresh } from "react-icons/tb";
import dayjs from "dayjs";
import commonstyles from "shared/utils/common.module.css";
import style from "./ambulanceRoutes.module.css";
import { RingLoader } from "shared/components";
import {
  AmbulanceOnRouteStatusChange,
  getAllAmbulanceOnRoute,
} from "shared/services/Ambulance";
import NewPagination from "shared/components/NewPagination/NewPagination";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import TableNew from "shared/components/A_New_Components/Table_new";
import CustomSelectOrder from "pages/Laboratory/Orders/CustomSelectOrder";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { useDirection } from "shared/utils/DirectionContext";

export default function AmbulancefetchRoutes() {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const AmbluanceRoutes = [
    t("date/Time"),
    t("ambulanceName"),
    t("ambulanceNo"),
    t("price"),
    t("status"),
  ];

  const statusOptions = [
    { label: t("onRoute"), value: "in-progress", color: "#FEE6DA" },
    { label: t("completed"), value: "completed", color: "#F0F8E8" },
  ];

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["AmbulanceOnRoute", currentPage],
    queryFn: () => getAllAmbulanceOnRoute(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await AmbulanceOnRouteStatusChange(id, newStatus);
      notifySuccess(t("statusUpdatedSuccessfully"));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  let tableData: any[] = [];
  let onRoute = data?.data?.bookings;

  if (onRoute && onRoute.length > 0) {
    tableData = onRoute.map((v: any) => [
      isRtl
        ? dayjs(v?.createdAt).locale("ur").format("DD MMM - hh:mm A")
        : dayjs(v?.createdAt).format("DD MMM - hh:mm A"),
      v?.bidRequestId?.ambulanceName || "-",
      v?.bidRequestId?.ambulanceNo || "-",
      v?.bidRequestId?.price || "-",
      <div onClick={(e) => e.stopPropagation()}>
        <CustomSelectOrder
          statusOptions={statusOptions}
          orderId={v?._id}
          initialStatus={v?.status}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>,
    ]);
  }

  const handleNextPage = () => {
    if (data?.data?.nextPage) {
      setCurrentPage(data.data.nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (data?.data?.previousPage) {
      setCurrentPage(data.data.previousPage);
    }
  };

  useEffect(() => {
    if (data?.data?.totalBookings) {
      setTotalItems(data.data.totalBookings);
    }
  }, [data]);
  const handleGoToDetail = (i: any) => {
    navigate(`/ambulance/onroutes/Details`, { state: onRoute[i] });
  };

  return (
    <div className={classNames(commonstyles.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        <div className={classNames(commonstyles.flx)} style={{ gap: "16px" }}>
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {t("onRouteAmbulance")}
          </p>
          {isFetching ? (
            <div className={style.outerRefresh}>
              <RingLoader color="#0e54a3" size={24} />
            </div>
          ) : (
            <div className={style.outerRefresh} onClick={() => refetch()}>
              <TbRefresh color="#7d7d7d" size={24} />
            </div>
          )}
        </div>

        <div className={style.outerContainer}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>

          {totalItems > 0 ? (
            <TableNew
              titles={AmbluanceRoutes}
              data={tableData}
              headerWidth="20%"
              itemWidth="20%"
              height="48.6vh"
              handleGoToDetail={(i: any) => {
                handleGoToDetail(i);
              }}
            />
          ) : (
            <PhysiotheristsEmpty />
          )}
        </div>
      </div>
    </div>
  );
}
