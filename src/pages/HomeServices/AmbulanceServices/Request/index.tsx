import { useState, useEffect } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import styles from "./ambulanceRequest.module.css";
import { RingLoader } from "shared/components";
import { getAllBookingRequest } from "shared/services/Ambulance";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useNavigate } from "react-router-dom";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

export default function AmbulanceRequest() {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();

  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const AmbluanceRequest = [
    t("_name"),
    t("date/Time"),
    t("pickUpLocation"),
    t("dropOffLocation"),
    t("status"),
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["AmbulanceRequest", currentPage],
    queryFn: () => getAllBookingRequest(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  let AmbulanceRequest = data?.data?.userRequests;
  let tableData: any = [];

  AmbulanceRequest?.map((v: any, ind: any) => {
    const formattedDate = dayjs(v?.createdAt)
      .locale(isRtl ? "ur" : "en")
      .format(isRtl ? "DD MMMM YYYY, hh:mm A" : "MMMM DD, YYYY, hh:mm A");

    tableData.push([
      v?.userId?.name,
      <span dir={isRtl ? "rtl" : "ltr"}>{formattedDate}</span>,
      v?.pickUp?.address,
      v?.dropOff?.address,
      <span style={{ color: v?.bidSent ? "green" : "" }}>
        {v?.bidSent ? "Bid Sent" : "Pending"}
      </span>,
    ]);
  });

  const handleGoToDetail = (i: any) => {
    navigate(`/ambulance/request/Detail`, { state: AmbulanceRequest[i] });
  };
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
    if (data?.data?.totalRequests) {
      setTotalItems(data.data.totalRequests);
    }
  }, [data]);
  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <div className={commonstyles.flx} style={{ gap: "16PX" }}>
        <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
          {t("allRequests")}
        </p>
        {isLoading ? (
          <div className={styles.outerRefresh}>
            <RingLoader color={"#0E54A3"} size={24} />
          </div>
        ) : (
          <div className={styles.outerRefresh}>
            <TbRefresh color={"#7d7d7d"} size={24} onClick={() => refetch()} />
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
        {totalItems > 0 ? (
          <TableNew
            titles={AmbluanceRequest}
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
  );
}
