import * as React from "react";
import { useState, useEffect } from "react";
import style from "./patientDetailTable.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { PiDownloadSimpleBold } from "react-icons/pi";
import ImgPicker from "shared/components/Img-picker";
import CustomModal from "shared/components/Modal";
import { IoClose } from "react-icons/io5";
import { Checkbox } from "@mui/material";
import DoctorReferModel from "shared/components/DoctorEmpty/DoctorReferModel";
import { PeraGetPrescription } from "shared/services/Paramedic";

interface Props {
  patientDetail: any;
  medicine?: any;
  doctor?: any;
}
function PatientDetailTable(props: Partial<Props>) {
  const { patientDetail, medicine, doctor } = props;

  const [showAddProperty, setShowAddProperty] = useState(false);
  const [appointmentId, setAppointmentId] = useState();

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
        <p className={style.headerclass}>Date</p>
        <p className={style.headerclass}>Time</p>
        <p className={style.headerclass}>Dr Name</p>
        <p className={style.headerclass}>status</p>
        <p className={style.headerclass}>Service Name</p>
        <p className={style.headerclass}>Prescription</p>
      </div>
      <div className={style.tableData}>
        <table
          style={{
            margin: "0px",
          }}
        >
          <tbody className={style.wapper}>
            {patientDetail.map((val: any, key: any) => {
              return (
                <tr className={style.tableRow} key={key}>
                  <td className={style.w20}>
                    {val?.appointmentDateAndTime
                      ? new Date(
                          val.appointmentDateAndTime
                        ).toLocaleDateString()
                      : "__"}
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
                      : "__"}
                  </td>

                  <td className={style.w20}>{val?.doctorId.name}</td>
                  <td className={style.w20}>{val?.status}</td>
                  <td className={style.w20}>{val?.appointmentType}</td>
                  <td
                    className={classNames(style.w20, style.Cursor, style.blue)}
                    onClick={() => {
                      setShowAddProperty(true);
                      setAppointmentId(val?.ePrescription?._id);
                    }}
                  >
                    View Details
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
              setShowAddProperty={setShowAddProperty}
              appointmentId={appointmentId}
            />
          }
        />

        {/* <CustomModal showModal={showAddProperty}>
          <div style={{ width: "500px", color: "#00276d" }}>
            <div className={classNames(commonstyles.flxBetween)}>
              <p
                className={classNames(commonstyles.fs20, commonstyles.semiBold)}
              >
                Prescription
              </p>
              <IoClose onClick={handleclose} className={style.close} />
            </div>
            <div>
              <p
                className={classNames(
                  commonstyles.fs18,
                  commonstyles.semiBold,
                  commonstyles.colorOrange,
                  style.mt24
                )}
              >
                History
              </p>
              <p
                className={classNames(
                  commonstyles.fs18,
                  commonstyles.semiBold,
                  style.mt8
                )}
              >
                Symptoms
              </p>
              <div className={commonstyles.flx}>
                <p
                  className={classNames(commonstyles.fs14, style.mt8)}
                  style={{ marginRight: "16px" }}
                >
                  Headach
                </p>
                <p className={classNames(commonstyles.fs14, style.mt8)}>
                  Headach
                </p>
              </div>
              <p
                className={classNames(
                  commonstyles.fs18,
                  commonstyles.semiBold,
                  style.mt16
                )}
              >
                Description about patient
              </p>
              <p className={classNames(commonstyles.fs14, style.mt8)}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </div>
            <p
              className={classNames(
                commonstyles.fs18,
                commonstyles.semiBold,
                commonstyles.colorOrange,
                style.mt24
              )}
            >
              Medicine
            </p>
            <p className={classNames(commonstyles.fs14, style.mt16)}>
              Acetaminophen, brand name, 250mg
            </p>
            <p
              className={classNames(
                commonstyles.fs18,
                commonstyles.semiBold,
                commonstyles.colorOrange,
                style.mt24
              )}
            >
              Test
            </p>
            <p className={classNames(commonstyles.fs14, style.mt8)}>
              Test Name
            </p>
          </div>
        </CustomModal> */}
      </div>
    </div>
  );
}

export default PatientDetailTable;

interface Props {
  setShowAddProperty: any;
  appointmentId: any;
}

const ViewDetail = (props: Partial<Props>) => {
  const [loading, setLoading] = useState(false);
  const { setShowAddProperty, appointmentId } = props;
  interface Medicine {
    medicineName: string;
    medicineBrand: string;
    medicineStrength: string;
    dosage: string;
  }
  const [medicine, setMedicine] = useState<Medicine[]>([]);
  interface Tests {
    testName: string;
  }
  const [test, setTest] = useState<Tests[]>([]);
  const handleclose = () => {
    setShowAddProperty(false);
  };

  useEffect(() => {
    setLoading(true);
    PeraGetPrescription(appointmentId)
      .then((res: any) => {
        setMedicine(res.data.medicines);
        setTest(res.data.test);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [appointmentId]);

  return (
    <div className={style.ViewModal}>
      {loading ? (
        <DoctorReferModel showModal={loading} />
      ) : (
        <>
          <div className={classNames(commonstyles.flxBetween)}>
            <p className={classNames(commonstyles.fs20, commonstyles.semiBold)}>
              Prescription
            </p>
            <IoClose onClick={handleclose} className={style.close} />
          </div>
          <div className={style.prescriptionmodel}>
            <div>
              <p
                className={classNames(
                  commonstyles.fs18,
                  commonstyles.semiBold,
                  commonstyles.colorOrange,
                  style.mt24,
                  style.Viewdetails
                )}
              >
                Medicine
              </p>
              {medicine.map((med, index) => (
                <div key={index}>
                  <p className={classNames(commonstyles.fs14, style.mt16)}>
                    {med.medicineName}, {med.medicineBrand},{" "}
                    {med.medicineStrength}, {med.dosage}
                  </p>
                </div>
              ))}
              <p
                className={classNames(
                  commonstyles.fs18,
                  commonstyles.semiBold,
                  commonstyles.colorOrange,
                  style.mt24
                )}
              >
                Test
              </p>
              {test.map((test, index) => (
                <div key={index}>
                  <p className={classNames(commonstyles.fs14, style.mt16)}>
                    {test.testName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
