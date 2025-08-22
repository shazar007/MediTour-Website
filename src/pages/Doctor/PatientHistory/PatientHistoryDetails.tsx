import { useState, useEffect } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Style from "./PatientHistory.module.css";
import Avatar from "@mui/material/Avatar";
import { ViewDetail } from "shared/components/DoctorTables/patientDetailTable";
import { useLocation } from "react-router-dom";
import { DocPatientHistory } from "shared/services/DoctorService";
import Gender from "assets/images/bi_gender-female (2).png";
import Blood from "assets/images/healthicons_blood-ab-p-outline.png";
import Age from "assets/images/stock-vector-age-icon-design-vector-illustration-arrow-symbol-age-limit-concept-2148368669 1.png";
import Phone from "assets/images/mingcute_birthday-2-line.png";
import Time from "assets/images/maki_doctoririir.png";
import dayjs from "dayjs";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import TableNew from "shared/components/A_New_Components/Table_new";
import { CustomModal } from "shared/components";
import { useQuery } from "@tanstack/react-query";
import Clinic from "assets/images/clinicIcon.png";
import Online from "assets/images/appointIcon.png";
import { useTranslation } from "react-i18next";
import Hospital from "assets/images/Icon Hospital.png";
import House from "assets/images/Icon In house.png";

function DoctorPatientHistoryDetails() {
  const { t, i18n }: any = useTranslation();
  const [DetailModel, setDetailModel] = useState(false);
  const [appointmentId, setAppointmentId] = useState();
  const [totalItems, setTotalItems] = useState<any>(null);

  const { state } = useLocation();

  const AllAppointments = [
    t("appointmentId"),
    t("patientName"),
    t("time"),
    t("date"),
    t("type"),
    t("prescription"),
  ];

  let id = state?.id?._id;

  const { data } = useQuery({
    queryKey: ["Tests", id],
    queryFn: () => DocPatientHistory(id),
    staleTime: 5 * 60 * 1000,
  });
  const calculateAge = (dob: string | Date): number => {
    return dayjs().diff(dayjs(dob), "year");
  };

  let lenght = data?.data?.patient?.appointments?.length;
  let detail = data?.data?.patient?.appointments;
  let gender =
    Array.isArray(detail) && detail.length > 0
      ? detail[0]?.patientId?.gender
      : "";

  let name =
    Array.isArray(detail) && detail.length > 0
      ? detail[0]?.patientId?.name
      : "";

  let MrNo =
    Array.isArray(detail) && detail.length > 0
      ? detail[0]?.patientId?.mrNo
      : "";

  let age = calculateAge(
    Array.isArray(detail) && detail.length > 0
      ? detail[0]?.patientId?.dateOfBirth
      : ""
  );
  let phone =
    Array.isArray(detail) && detail.length > 0
      ? detail[0]?.patientId?.phone
      : "";
  let blood =
    Array.isArray(detail) && detail.length > 0
      ? detail[0]?.patientId?.bloodGroup
      : "";

  let doctor =
    Array.isArray(detail) && detail.length > 0 ? detail[0]?.doctorId?.name : "";

  let tableData: any = [];
  detail?.map((v: any, ind: any) => {
    console.log("🚀 ~ detail?.map ~ detail:", detail);
    tableData.push([
      v?.appointmentId,
      v?.patientId?.name,
      dayjs(v?.appointmentDateAndTime).format("DD-MM-YYYY"),
      dayjs(v?.appointmentDateAndTime).format("hh:MM A"),
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
          className={Style.TypeIcon}
        />
        <span>{v?.appointmentType}</span>
      </div>,
      <p
        className={Style.Details}
        onClick={() => {
          setDetailModel(true);
          setAppointmentId(v?.ePrescription?._id);
        }}
      >
        {t("viewDetails")}
      </p>,
    ]);
  });

  useEffect(() => {
    if (data?.data?.patient?.appointments?.length) {
      setTotalItems(lenght);
    }
  }, [data?.data?.patient?.appointments?.length, totalItems]);

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <div>
        <div
          className={classNames(
            commonstyles.flxBetween,
            commonstyles.flxWrap,
            commonstyles.mb24
          )}
        >
          <div className={classNames(commonstyles.flx)}>
            <p className={Style.heading}>{t("historyDetails")}</p>
          </div>
        </div>

        <div className={Style.TableOuter}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className={classNames(commonstyles.flx)}
              style={{ gap: "12px" }}
            >
              <Avatar
                // src={data?.userId?.userImage}
                sx={{ width: 56, height: 56 }}
              />
              <div>
                <p className={Style.name}>{name}</p>
                <p className={Style.ID}>MR No: {MrNo}</p>
              </div>
            </div>
          </div>
          <div className={Style.InfoCard}>
            <div className={classNames(commonstyles.flxBetween)}>
              <p className={Style.Subheading}>{t("basicInformation")}</p>
            </div>
            <div className={Style.infoWrapper}>
              {[
                {
                  img: Gender,
                  label: "gender",
                  value: gender,
                },
                {
                  img: Blood,
                  label: "blood",
                  value: blood || "---",
                },
                {
                  img: Age,
                  label: "age",
                  value: age,
                },

                {
                  img: Phone,
                  label: "phone",
                  value: phone,
                },
                {
                  img: Time,
                  label: "doctor",
                  value: doctor,
                },
              ].map((item, index) => (
                <div className={Style.w15} key={index}>
                  <div
                    className={commonstyles.flx}
                    style={{ gap: "8px", alignItems: "start" }}
                  >
                    <img src={item.img} className={Style.Icon} />
                    <div>
                      <p className={Style.tag}>{t(item.label)}</p>
                      <p className={Style.value}>{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className={Style.AllTests}>{t("allAppointments")}</p>
          </div>
          <div>
            {totalItems > 0 ? (
              <TableNew
                titles={AllAppointments}
                data={tableData}
                headerWidth="16.6%"
                itemWidth="16.6%"
                height="29vh"
              />
            ) : (
              <PhysiotheristsEmpty />
            )}
          </div>

          <CustomModal
            showModal={DetailModel}
            children={
              <ViewDetail
                t={t}
                setShowAddProperty={setDetailModel}
                appointmentId={appointmentId}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DoctorPatientHistoryDetails;
