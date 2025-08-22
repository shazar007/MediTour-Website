import { useState, useEffect } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./appointment.module.css";
import Avatar from "@mui/material/Avatar";
import PatientDetailTable from "shared/components/DoctorTables/patientDetailTable";
import { useLocation } from "react-router-dom";
import { DocPatientHistory } from "shared/services/DoctorService";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";
interface DocPatientHistoryTable {
  name: string;
  userName: string;
  email: string;
  mrNo: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  _id: string;
  userImage: string;
}

function Hospital_AppointmentDetails() {
  const { i18n }: any = useTranslation();
  const [patientDetail, setPatientDetail] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const { state } = useLocation();
  let id = state.id;
  const [loading, setLoading] = useState(false);
  const [patienthistory, setPatientHistory] =
    useState<DocPatientHistoryTable | null>(null);

  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return "Date of birth not provided";
    const [day, month, year] = dateOfBirthString.split("/").map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }

  const DocPatDetails = () => {
    setLoading(true);
    if (id === undefined) {
      console.error("ID is undefined");
      setLoading(false);
      return;
    }
    if (id) {
      DocPatientHistory(id)
        .then((res: any) => {
          setPatientHistory(res?.data.patient);
          setPatientDetail(res?.data.Appointments);
          const medicines = res?.data.Appointments.map(
            (appointment: any) => appointment.ePrescription?.medicines
          );
          setMedicine(medicines);
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error("id is undefined");
    }
  };

  useEffect(() => {
    DocPatDetails();
  }, []);
  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <div className={style.outerContainer}>
            <div
              style={{ width: "100%" }}
              className={classNames(commonstyles.flx, commonstyles.mt24)}
            >
              <div className={classNames(commonstyles.col8)}>
                <div className={classNames(style.box, commonstyles.flx)}>
                  <div className={style.user}>
                    <Avatar
                      src={patienthistory?.userImage}
                      sx={{ width: 82, height: 82 }}
                      style={{ margin: "0 auto" }}
                    />
                    <div style={{ marginTop: "16px" }}>
                      <p
                        className={classNames(
                          commonstyles.fs24,
                          commonstyles.semiBold,
                          style.textcenter
                        )}
                      >
                        {patienthistory?.name}
                      </p>
                      <p
                        className={classNames(
                          commonstyles.fs1,
                          style.textcenter,
                          commonstyles.mt8
                        )}
                      >
                        {patienthistory?.email}
                      </p>
                    </div>
                  </div>
                  <div className={style.user2}>
                    <p
                      className={classNames(
                        commonstyles.fs14,
                        commonstyles.semiBold
                      )}
                    >
                      Appointment
                    </p>
                    <div
                      className={classNames(
                        commonstyles.flx,
                        commonstyles.mt16
                      )}
                    >
                      <div style={{ width: "33%" }}>
                        <p
                          className={classNames(
                            commonstyles.fs14,
                            commonstyles.semiBold
                          )}
                        >
                          MR No.
                        </p>
                        <p className={classNames(commonstyles.fs12)}>
                          {patienthistory?.mrNo}
                        </p>
                      </div>
                    </div>

                    <div
                      className={classNames(
                        commonstyles.flx,
                        commonstyles.mt24
                      )}
                    >
                      <div style={{ width: "33%" }}>
                        <p
                          className={classNames(
                            commonstyles.fs14,
                            commonstyles.semiBold
                          )}
                        >
                          Gender
                        </p>
                        <p className={classNames(commonstyles.fs12)}>
                          {patienthistory?.gender}
                        </p>
                      </div>
                      <div style={{ width: "33%" }}>
                        <p
                          className={classNames(
                            commonstyles.fs14,
                            commonstyles.semiBold
                          )}
                        >
                          Age
                        </p>
                        <p className={classNames(commonstyles.fs12)}>
                          {calculateAge(patienthistory?.dateOfBirth ?? "")}
                        </p>
                      </div>{" "}
                      <div style={{ width: "33%" }}>
                        <p
                          className={classNames(
                            commonstyles.fs14,
                            commonstyles.semiBold
                          )}
                        >
                          Cell No.
                        </p>
                        <p className={classNames(commonstyles.fs12)}>
                          {patienthistory?.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p
              className={classNames(
                commonstyles.mt24,
                commonstyles.fs24,
                commonstyles.semiBold,
                commonstyles.colorBlue
              )}
            >
              All Appointments
            </p>
            <div className={commonstyles.mt16}>
              <PatientDetailTable
                patientDetail={patientDetail}
                medicine={medicine}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Hospital_AppointmentDetails;
