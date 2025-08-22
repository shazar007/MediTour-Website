import classNames from "classnames";
import { useState, useEffect, ChangeEvent } from "react";
import Sure from "assets/images/mdi_tick-circle.png";
import commonstyles from "shared/utils/common.module.css";
import styles from "./ParamedicDashboard.module.css";
import commomstyles from "../../../../../shared/utils/common.module.css";
import { TbRefresh } from "react-icons/tb";
import { getallParamedicRequest, paramedicStatus } from "shared/services";
import { RingLoader } from "shared/components";
import { useTranslation } from "react-i18next";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import TableNew from "shared/components/A_New_Components/Table_new";
import NewPagination from "shared/components/NewPagination/NewPagination";

function ParamedicDashboard() {
  const { t, i18n }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const title = [
    t("_name"),
    t("email"),
    t("contact"),
    t("preferred"),
    t("preferredDate"),
    t("preferredTime"),
    t("schedule"),
    t("status"),
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState<any>(null);

  const requestData = { status: "accepted" };
  const { data, refetch } = useQuery({
    queryKey: ["paramedicRequestsdash", requestData],
    queryFn: () => getallParamedicRequest(requestData),
    staleTime: 5 * 60 * 1000,
  });
  let paramedicRequestsdash = data?.data?.paramedicRequests;
  let tableData: any = [];
  paramedicRequestsdash?.map((v: any, ind: any) => {
    tableData.push([
      v?.name,
      v?.email,
      v?.contact,
      v?.gender,
      dayjs(v.preferredDate).format("DD/MM/YYYY"),
      v?.preferredTime,
      v?.schedule,
      <CustomSelectOrder
        setSelectedValue={() => uploadStatus(v._id)}
        initialValue={"Pending"}
      />,
    ]);
  });

  const uploadStatus = (id: any) => {
    setLoading(true);
    paramedicStatus(id)
      .then((res: any) => {
        refetch();
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
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
    if (data?.data?.requestsLength) {
      setTotalItems(data.data.requestsLength);
    }
  }, [data, totalItems]);
  return (
    <>
      <div className={classNames(commonstyles.col12)}>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonstyles.pl36
              : commonstyles.pr36
          }
        >
          <div className={classNames(commomstyles.flx)} style={{ gap: "16px" }}>
            <p className={classNames(commomstyles.fs24, commomstyles.semiBold)}>
              {t("allRequests")}
            </p>
            {loading ? (
              <div className={styles.outerRefresh}>
                <RingLoader color={"#0e54a3"} size={24} />
              </div>
            ) : (
              <div className={styles.outerRefresh}>
                <TbRefresh color="#7d7d7d" size={24} />
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

            <div style={{ marginTop: "8px" }}>
              {totalItems > 0 ? (
                <TableNew
                  titles={title}
                  headerWidth="12.5%"
                  data={tableData}
                  itemWidth="12.5%"
                  height="50vh"
                  show="default"
                />
              ) : (
                <>
                  <PhysiotheristsEmpty />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface Props {
  setSelectedValue: (value: string) => void;
  initialValue: string;
}

function CustomSelectOrder({ setSelectedValue, initialValue }: Props) {
  const { t }: any = useTranslation();
  const [selectedOption, setSelectedOption] = useState(
    initialValue || "Pending"
  );
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setSelectedOption(initialValue || "Pending");
  }, [initialValue]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (newValue === "completed") {
      setShowConfirm(true);
    } else {
      setSelectedOption(newValue);
    }
  };

  const handleConfirm = () => {
    setSelectedOption("completed");
    setSelectedValue("completed");
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };
  const isPending = selectedOption === "Pending";
  const selectStyle = {
    backgroundColor: isPending ? "#F0D5D1" : "#F0F8E8",
    color: isPending ? "#D96F79" : "#5BD32A",
    BorderColor: isPending ? "#F0D5D1" : "#F0F8E8",
    fontWeight: 500,
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: isPending ? "#F0D5D1" : "#F0F8E8",
  };

  useEffect(() => {
    setSelectedOption(initialValue || "Pending");
  }, [initialValue]);

  return (
    <div className={styles.CustomSelectOrder}>
      <select
        className={styles.select}
        value={selectedOption}
        onChange={handleSelectChange}
        style={selectStyle}
      >
        {selectedOption === "Pending" ? (
          <option value="Pending" disabled>
            {t("pending")}
          </option>
        ) : null}
        <option value="completed">{t("completed")}</option>
      </select>

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <img src={Sure} alt="Sure" className={styles.sureImg} />
            <p className={styles.sureHeading}>{t("sure")} !</p>
            <p className={styles.suretext}>{t("sureCompleteThisRequestId")}</p>
            <div className={styles.modalButtons}>
              <button onClick={handleCancel}>{t("cancel")}</button>
              <button onClick={handleConfirm}>{t("sure")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParamedicDashboard;
