import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "../Request/PharmacyRequest.module.css";
import { CustomModal, RingLoader } from "shared/components";
import { PharmacyGetRequest } from "shared/services";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { TbRefresh } from "react-icons/tb";
import IconDetail from "assets/images/Icon Detail.png.png";
import TableNew from "shared/components/A_New_Components/Table_new";
import dayjs from "dayjs";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";
const PhrRequest: React.FC = () => {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(0);
  const itemsPerPage = 10;
  const totalItems = length;

  const PhrRequesttitle = [
    t("requestId"),
    t("date"),
    t("time"),
    t("status"),
    t("action"),
  ];

  const handleGoToDetail = (medicine: any) => {
    navigate(`/pharmacy/requestDetail`, { state: medicine });
  };

  const handleFetchRequest = (page: number) => {
    setLoading(true);
    PharmacyGetRequest(page)
      .then((res: any) => {
        const fetchedRequests = res?.data?.medicineRequests || [];
        setRequests(fetchedRequests);
        setLength(res?.data?.requestsLength);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  let tableData: any = [];
  requests?.map((v: any, ind: any) => {
    tableData.push([
      v?.requestId,
      dayjs(v?.createdAt).format("DD-MM-YYYY"),
      dayjs(v?.createdAt).format("hh:mm A"),
      <p
        className={classNames(commonstyle.fs14, {
          [style.pending]: v?.status === "pending",
          [style.success]: v?.requestSent,
        })}
        style={{ margin: 0, marginRight: "10px" }}
      >
        {v?.requestSent ? t("bidSent") : t("pending")}
      </p>,
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => handleGoToDetail(v)}
      >
        <img
          src={IconDetail}
          alt="pharmacy Request icon"
          className={style.IconDetail}
        />
        <p className={style.Details}>{t("details")}</p>
      </div>,
    ]);
  });
  useEffect(() => {
    handleFetchRequest(1);
  }, []);

  const handleNextPage = () => {
    let itemToRender = currentPage * itemsPerPage;

    if (length > itemToRender) {
      setCurrentPage(currentPage + 1);
      handleFetchRequest(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handleFetchRequest(currentPage - 1);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setCurrentPage(1);
    handleFetchRequest(1);
  };

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyle.pl36
          : commonstyle.pr36
      }
    >
      <div className={classNames(commonstyle.flx)} style={{ gap: "16px" }}>
        <p className={classNames(commonstyle.fs22, commonstyle.semiBold)}>
          {t("allRequests")}
        </p>
        {loading ? (
          <div className={style.outerRefresh}>
            <RingLoader color={"#0E54A3"} size={24} />
          </div>
        ) : (
          <div className={style.outerRefresh}>
            <TbRefresh size={24} color={"#7d7d7d"} onClick={handleRefresh} />
          </div>
        )}
      </div>

      <div className={style.outerContainer}>
        <div
          className={classNames(commonstyle.flx)}
          style={{ justifyContent: "end" }}
        >
          <NewPagination
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, length)}
            totalItems={totalItems}
          />
        </div>
        {totalItems > 0 ? (
          <TableNew
            titles={PhrRequesttitle}
            data={tableData}
            headerWidth="20%"
            itemWidth="20%"
            show="default"
            height="49.6vh"
          />
        ) : (
          <PhysiotheristsEmpty />
        )}
      </div>

      <CustomModal
        showModal={acceptModal}
        close={() => setAcceptModal(false)}
        children={<p>{t("YourBidSubmitted")}</p>}
      />
    </div>
  );
};
export default PhrRequest;
