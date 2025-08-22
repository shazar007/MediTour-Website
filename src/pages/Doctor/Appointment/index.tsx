import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import styles from "./Physioappointment.module.css";
import { DeleteModal, RingLoader } from "shared/components";
import { useNavigate } from "react-router-dom";
import { TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import NewPagination from "shared/components/NewPagination/NewPagination";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { getAllAppointment } from "shared/services/DoctorService";
import dayjs from "dayjs";
import ONlineAble from "assets/images/appointAble.png";
import ONlineDisable from "assets/images/appointablewhite.png";
import Clinic from "assets/images/clinicIcon.png";
import Online from "assets/images/appointIcon.png";
import Hospital from "assets/images/Icon Hospital.png";
import { setPateintData } from "shared/redux";
import { useQuery } from "@tanstack/react-query";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useTranslation } from "react-i18next";
import House from "assets/images/Icon In house.png";

function DoctorAppointments() {
  const { t, i18n }: any = useTranslation();
  const { isLoading, refetch } = useQuery({
    queryKey: ["doctorsAppointments", 1],
    queryFn: () => getAllAppointment(1),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className={classNames(commonstyles.col12)}>
      <>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonstyles.pl36
              : commonstyles.pr36
          }
        >
          <div
            className={classNames(commonstyles.flx, commonstyles.mb24)}
            style={{ gap: "16px" }}
          >
            <p className={classNames(styles.heading)}>{t("appointments")}</p>

            {isLoading ? (
              <div className={styles.outerRefresh}>
                <RingLoader color={"#0D47A1"} size={24} />
              </div>
            ) : (
              <div className={styles.outerRefresh}>
                <TbRefresh
                  color={"#7d7d7d"}
                  size={24}
                  onClick={() => {
                    refetch();
                  }}
                />
              </div>
            )}
          </div>
          <Doc_Appointment TableHeight="56.5vh" t={t} />
        </div>
      </>
    </div>
  );
}

export default DoctorAppointments;

type DocAppointmentProps = {
  t?: any;
  title?: string;
  TableHeight?: string;
};
export const Doc_Appointment = ({
  t,
  title,
  TableHeight,
}: DocAppointmentProps) => {
  const { systemType } = useSelector((state: any) => state.root.common);

  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<any>(null);
  const [videomodel, setVideomodel] = useState(false);

  const Testss = [
    t("patientId"),
    t("patientName"),
    t("time"),
    t("date"),
    t("type"),
    t("action"),
  ];

  const onCancel = () => {
    setVideomodel(false);
    dispatch(setPateintData({}));
  };
  const { data } = useQuery({
    queryKey: ["Appointments", currentPage],
    queryFn: () => getAllAppointment(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  let Appointment = data?.data?.Appointments;

  let tableData: any = [];
  Appointment?.map((v: any, ind: any) => {
    tableData.push([
      v?.patientId?.mrNo,
      v?.patientId?.name,
      dayjs(v?.appointmentDateAndTime).format("DD-MM-YYYY"),
      dayjs(v?.appointmentDateAndTime).format("HH:MM A"),
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={
            v?.appointmentType === "hospital"
              ? Hospital
              : v?.appointmentType === "video"
              ? Online
              : v?.appointmentType === "clinic"
              ? Clinic
              : v?.appointmentType === "in-house"
              ? House
              : ""
          }
          alt="appointment type"
          className={styles.TypeIcon}
        />
        <span>{v?.appointmentType}</span>
      </div>,
      <div style={{ cursor: "pointer" }} onClick={(e) => e.stopPropagation()}>
        <img
          src={v?.appointmentType === "video" ? ONlineAble : ONlineDisable}
          alt="appointment type"
          className={styles.TypeIcon2}
        />
      </div>,
    ]);
  });
  const navigate = useNavigate();

  const handleGoAppDetails = (index: any) => {
    let id = data?.data?.Appointments?.[index]?._id;
    navigate(`/${systemType}/appointmentDetails`, { state: { id } });
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
    if (data?.data?.Appointments?.length) {
      setTotalItems(data?.data?.Appointments?.length);
    }
  }, [data, totalItems]);
  return (
    <div className={styles.outerContainer}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className={styles.tableHeading}>{title}</p>
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
            titles={Testss}
            data={tableData}
            headerWidth="16%"
            handleGoToDetail={(data: any) => {
              handleGoAppDetails(data);
            }}
            itemWidth="16%"
            height={TableHeight}
          />
        ) : (
          <div>
            <PhysiotheristsEmpty />
          </div>
        )}
      </div>
      <DeleteModal
        handleCancel={onCancel}
        content={`${t("wantToLink_")} `}
        modalVisible={videomodel}
        confirmText={t("yesSend")}
      />
    </div>
  );
};
