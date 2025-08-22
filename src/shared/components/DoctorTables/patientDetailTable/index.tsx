import * as React from "react";
import { useState, useEffect } from "react";
import style from "./patientDetailTable.module.css";
import Pstyle from "./prescription.module.css";
import classNames from "classnames";
import CustomModal from "shared/components/Modal";
import { IoClose } from "react-icons/io5";
import { doctorGetPrescription } from "shared/services/DoctorService";
import DoctorReferModel from "shared/components/DoctorEmpty/DoctorReferModel";
import logo from "assets/images/smallLogo.png";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";
interface Props {
  patientDetail: any;
  medicine?: any;
  doctor?: any;
}
function PatientDetailTable(props: Partial<Props>) {
  const { t }: any = useTranslation();
  const { patientDetail, medicine, doctor } = props;
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [appointmentId, setAppointmentId] = useState();
  console.log(patientDetail, ".....patientDetail");
  return (
    <div className={style.payment}>
      <div
        className={classNames(
          doctor == "physiotherists"
            ? style.Physiotherists
            : doctor == "Nutrists"
            ? style.Nutrists
            : doctor == "ParaMedic"
            ? style.ParaMedic
            : doctor == "Psychologists"
            ? style.Psychologists
            : style.headerOuter
        )}
      >
        <p className={style.headerclass}>{t("date")}</p>
        <p className={style.headerclass}>{t("time")}</p>
        <p className={style.headerclass}>Dr {"_name"}</p>
        <p className={style.headerclass}>{t("status")}</p>
        <p className={style.headerclass}>{t("serviceName")}</p>
        <p className={style.headerclass}>{t("prescription")}</p>
      </div>
      <div className={style.tableData}>
        <table
          style={{
            margin: "0px",
          }}
        >
          <tbody className={style.wapper}>
            {patientDetail?.map((val: any, key: any) => {
              console.log(val, ".....valued per person ");

              return (
                <tr className={style.tableRow} key={key}>
                  <td className={style.w20}>
                    {val?.appointmentDateAndTime
                      ? new Date(
                          val.appointmentDateAndTime
                        ).toLocaleDateString()
                      : ""}
                  </td>
                  <td className={style.w20}>
                    {val?.appointmentDateAndTime
                      ? new Date(val.appointmentDateAndTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : ""}
                  </td>

                  <td className={style.w20}>{val?.doctorId?.name}</td>
                  <td className={style.w20}>{val?.status}</td>
                  <td className={style.w20}>{val?.appointmentType}</td>
                  <td
                    className={classNames(style.w20, style.Cursor, style.blue)}
                    onClick={() => {
                      setShowAddProperty(true);
                      setAppointmentId(val?.ePrescription?._id);
                    }}
                  >
                    {t("viewDetails")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <CustomModal
          showModal={showAddProperty}
          children={
            <ViewDetail
              t={t}
              patientDetail={patientDetail}
              setShowAddProperty={setShowAddProperty}
              appointmentId={appointmentId}
            />
          }
        />
      </div>
    </div>
  );
}

export default PatientDetailTable;

interface Props {
  t?: any;
  setShowAddProperty: any;
  appointmentId: any;
}

export const ViewDetail = (props: Partial<Props>) => {
  interface Medicine {
    medicineName: string;
    medicineBrand: string;
    medicineStrength: string;
    dosage: string;
  }

  interface Tests {
    testName: string;
  }

  const [loading, setLoading] = useState(false);
  const { t, setShowAddProperty, appointmentId, patientDetail } = props;
  const [patientdata, setPatientData] = useState<any>([]);
  const [doctordata, setDoctorData] = useState<any>([]);
  const [medicine, setMedicine] = useState<Medicine[]>([]);
  const [data, setData] = useState<any>([]);
  const [Symptopms, setSymptopms] = useState<any>([]);
  const [test, setTest] = useState<Tests[]>([]);

  const handleclose = () => {
    setShowAddProperty(false);
  };

  useEffect(() => {
    if (!appointmentId) {
      notifyError("appointmentId is not provided.");
      return;
    }
    setLoading(true);
    doctorGetPrescription(appointmentId)
      .then((res: any) => {
        console.log(res?.data);
        setMedicine(res?.data?.medicines);
        setPatientData(res?.data?.patientId);
        setDoctorData(res?.data?.doctorId);
        setData(res?.data);
        setSymptopms(res?.data?.appointmentId?.history?.symptoms);
        setTest(res.data.test);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [appointmentId]);
  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return "Date of birth not provided";
    const [day, month, year] = dateOfBirthString.split("/")?.map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }
  const createPDF = () => {
    const doc = new jsPDF();

    // Register font
    doc.addFileToVFS("phophins-normal.ttf", ""); // 'phophins' comes from the imported font file
    doc.addFont("phophins-normal.ttf", "phophins", "normal");
    doc.setFont("phophins"); // Now using your preferred font

    doc.setFontSize(18);
    doc.setTextColor("#000000");
    doc.text(t("prescription"), 10, 10);

    doc.setFontSize(16);
    doc.text(`${data?.doctorId?.name || ""}`, 10, 20);

    doc.setFontSize(10);
    doc.text(`${t("address")}:`, 10, 28);
    const addressText = `${data?.doctorId?.location?.address || ""}`;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxTextWidth = pageWidth * 0.65;
    const wrappedText = doc.splitTextToSize(addressText, maxTextWidth);
    doc.text(wrappedText, 28, 28);

    doc.text(`${t("phone")}:`, 10, 38);
    doc.text(`${data?.doctorId?.phoneNumber || ""}`, 28, 38);

    doc.text(`${t("email")}:`, 10, 44);
    doc.text(`${data?.doctorId?.email || ""}`, 28, 44);

    doc.save(`${t("prescription")}.pdf`);
  };

  return (
    <div>
      {loading ? (
        <DoctorReferModel showModal={loading} />
      ) : (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IoClose onClick={handleclose} className={style.close} />
          </div>
          <div className={Pstyle.container}>
            <div
              className={classNames(
                Pstyle.row,
                Pstyle.borderBottom,
                Pstyle.padding16
              )}
            >
              <div style={{ width: "70%" }}>
                <p
                  className={classNames(
                    Pstyle.bold,
                    Pstyle.noMargin,
                    Pstyle.largeText
                  )}
                >
                  {doctordata?.name}
                </p>
                <p className={classNames(Pstyle.noMargin)}>
                  {doctordata?.qualifications}
                </p>
                <p className={classNames(Pstyle.noMargin)}>
                  PM&DC Reg: {doctordata?.pmdcNumber}
                </p>
              </div>
              <img src={logo} className={Pstyle.logo} alt="Logo" />
            </div>

            <div style={{ padding: "16px 0" }}>
              {" "}
              <div className={Pstyle.row}>
                <p className={classNames(Pstyle.heading)}>
                  {t("patientName")}:{" "}
                  <span className={classNames(Pstyle.value)}>
                    {patientdata?.name}
                  </span>
                </p>
                <p className={classNames(Pstyle.heading)}>
                  M.R No:{" "}
                  <span className={classNames(Pstyle.value)}>
                    {patientdata?.mrNo}
                  </span>
                </p>
              </div>
              <div className={classNames(Pstyle.row, Pstyle.alignItemsCenter)}>
                <p className={classNames(Pstyle.heading)}>
                  {t("date")}:{" "}
                  <span className={classNames(Pstyle.value)}>
                    {dayjs(
                      data?.patientAppointments?.appointmentDateAndTime
                    ).format("DD-MM-YYYY")}
                  </span>
                </p>
                <p className={classNames(Pstyle.heading)}>
                  {t("age")}:{" "}
                  <span className={classNames(Pstyle.value)}>
                    {calculateAge(patientdata?.dateOfBirth)} years old
                  </span>
                </p>
              </div>
              <div className={classNames(Pstyle.row, Pstyle.alignItemsCenter)}>
                <p className={classNames(Pstyle.heading)}>
                  {t("weight")} (Kg):{" "}
                  <span className={classNames(Pstyle.value)}>
                    {data?.appointmentId?.history?.weight}
                  </span>
                </p>

                <p className={classNames(Pstyle.heading)}>
                  {t("BP")}:{" "}
                  <span className={classNames(Pstyle.value)}>
                    {`${data?.appointmentId?.history?.bloodPressure?.systolicPressure}/ ${data?.appointmentId?.history?.bloodPressure?.diastolicPressure}`}
                  </span>
                </p>
              </div>
              <div className={classNames(Pstyle.row, Pstyle.alignItemsCenter)}>
                <p className={classNames(Pstyle.heading)}>
                  {t("temperature")}:{" "}
                  <span className={classNames(Pstyle.value)}>
                    {`${data?.appointmentId?.history?.temperature}`}
                  </span>
                </p>
                <p className={classNames(Pstyle.heading)}>
                  {t("sugar")}:{" "}
                  <span className={classNames(Pstyle.value)}>
                    {`${data?.appointmentId?.history?.sugar}`}
                  </span>
                </p>
              </div>
              <p className={classNames(Pstyle.heading)}>
                {t("heartRate")}:{" "}
                <span className={classNames(Pstyle.value)}>
                  {`${data?.appointmentId?.history?.heartRate}`}
                </span>
              </p>
              <p className={classNames(Pstyle.heading)}>
                {t("diseases")}:{" "}
                {data?.appointmentId?.history?.diseases?.map((i: any) => (
                  <span className={classNames(Pstyle.value)}>{i}</span>
                ))}
              </p>
            </div>

            <div
              className={classNames(
                Pstyle.row,
                Pstyle.borderTop,
                Pstyle.borderBottom
              )}
            >
              <p className={classNames(Pstyle.mainHeading)}>{t("symptoms")}</p>
              <p className={classNames(Pstyle.mainHeading)}>
                {t("clinicalFindings")}
              </p>
            </div>

            <div
              className={Pstyle.row}
              style={{ padding: "16px 0", margin: "0px" }}
            >
              <p className={classNames(Pstyle.mainValue, Pstyle.textLeft)}>
                {data?.appointmentId?.history?.description}
              </p>
            </div>
            <div
              className={classNames(
                Pstyle.row,
                Pstyle.borderTop,
                Pstyle.borderBottom,
                Pstyle.marginTop16
              )}
            >
              <p className={classNames(Pstyle.mainHeading)}>
                {t("laboratoryTest")}
              </p>
            </div>

            {test?.map((test, index) => (
              <div style={{ padding: "16px 0" }} key={index}>
                <p className={classNames(Pstyle.mainValue)}>{test.testName}</p>
                {/* <Downloader link={test?.res} /> */}
              </div>
            ))}

            <div>
              {/* Header Row */}
              <div
                className={classNames(
                  Pstyle.row,
                  Pstyle.borderBottom,
                  Pstyle.borderTop,
                  Pstyle.borderBottom,
                  Pstyle.alignItemsCenter
                )}
              >
                <p className={classNames(Pstyle.mainHeading)}>
                  {t("medicineName")}
                </p>
                <p className={classNames(Pstyle.mainHeading)}>{t("dosage")}</p>
                <p className={classNames(Pstyle.mainHeading)}>
                  {t("duration")}
                </p>
              </div>

              {medicine?.map((med: any, index) => (
                <div
                  key={index}
                  className={classNames(
                    Pstyle.row,
                    Pstyle.borderBottom,
                    Pstyle.alignItemsCenter
                  )}
                  style={{ padding: "16px 0" }}
                >
                  <p
                    style={{ width: "33%" }}
                    className={classNames(Pstyle.mainValue)}
                  >
                    {med.medicineName}, {med.medicineBrand},{" "}
                    {med.medicineStrength}
                  </p>
                  <p className={classNames(Pstyle.mainValue)}>{med.dosage}</p>
                  <p className={classNames(Pstyle.mainValue)}>
                    {med.days} {t("days")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div
        style={{
          // border: "2px solid black",
          marginBottom: "-10px",
          display: "flex",
          flexDirection: "row-reverse",
          position: "sticky",
        }}
      >
        <button className={classNames(Pstyle.button)} onClick={createPDF}>
          {t("downloadPrescription_")}
        </button>
      </div>
    </div>
  );
};
