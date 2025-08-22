import React, { useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adminRequest.module.css";
import { CustomModal, PrimaryButton, RingLoader } from "shared/components";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import Datepicker from "shared/components/DatePicker";
import { FaCheckCircle } from "react-icons/fa";
import { acceptAppointmentRequest } from "shared/services";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
export default function RequestDetail() {
  const [showSendModel, setShowSendModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aptDate, setAptDate] = useState<any>("");
  const [aptTime, setAptTime] = useState("");
  const [showMessageCard, setShowMessageCard] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { state } = useLocation();
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");

  const handleAptDate = (date: any) => {
    if (dayjs.isDayjs(date)) {
      const formattedDate = date.format("YYYY-MM-DD");
      setAptDate(formattedDate);
    } else {
      console.error("Invalid date object");
    }
  };

  const handleAptTime = (time: string) => {
    if (aptDate && time) {
      const localDateTime = dayjs(`${aptDate} ${time}`, "YYYY-MM-DD HH:mm");

      if (localDateTime.isValid()) {
        setAptDate(localDateTime.format("YYYY-MM-DD"));
        setAptTime(time);
      } else {
        console.error("Invalid date-time combination");
      }
    }
  };

  const handleOpenModel = () => {
    setShowSendModel(true);

    setTimeout(() => {
      setShowSendModel(false);
      navigate("/admin/Resquests");
    }, 1500);
  };

  const handleShowMessage = () => {
    setShowMessageCard(true);
  };

  const handleCreateAppointment = () => {
    if (!aptDate || !aptTime) {
      setError("Fill all fields!");
      return;
    }

    // Combine date and time in local time
    const combined = dayjs(`${aptDate} ${aptTime}`, "YYYY-MM-DD HH:mm");

    if (!combined.isValid()) {
      setError("Invalid date-time combination!");
      return;
    }

    // Send the combined local time as a string to the backend
    const localDateTime = combined.format("YYYY-MM-DD HH:mm:ss");

    const params = {
      appointmentDateAndTime: localDateTime, // Send as local time
      paymentId: state?.paymentId,
    };

    setLoading(true);
    acceptAppointmentRequest(params, state?._id)
      .then((res: any) => {
        handleOpenModel();
      })
      .catch((err: any) => {
        console.error(
          "Error creating appointment: ",
          err?.response?.data?.message
        );
        alert(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Appointment Request" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={Styles.flxBetween}>
          <p
            className={classNames(
              commonStyles.fs22,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            Patient Request Details
          </p>{" "}
          <p
            className={classNames(
              commonStyles.fs18,
              Styles.primarycolor,
              commonStyles.medium
            )}
          >
            ID: REQ1234
          </p>
        </div>
        <div className={classNames(Styles.flx, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                DOCTOR
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Dr ID:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.doctorId?.vendorId}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Name:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.doctorId?.name}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.doctorId?.email}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Number:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.doctorId?.phoneNumber}
                </p>
              </div>
              {/* <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Specialties:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.doctorId?.speciality}
                </p>
              </div> */}
            </div>
          </div>
          <div className={classNames(Styles.DetailCard, Styles.mt24sm)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                PATIENT
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Submitted at:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {date}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  MR No.:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.patientId?.mrNo}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Name:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.patientId?.name}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Contact:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.patientId?.phone}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.patientId?.email}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.DetailCard, Styles.mt24sm)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                APPOINTMENT
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  {state?.appointmentType}
                </p>
              </div>
            </div>
          </div>
        </div>
        {!showMessageCard && (
          <div className={classNames(Styles.mt40, Styles.Btnwidth)}>
            <PrimaryButton
              children={"Create Appointment"}
              colorType={"admin"}
              onClick={handleShowMessage}
            />
          </div>
        )}

        {showMessageCard && (
          <div className={classNames(Styles.MessageCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                Create Appointment
              </p>
            </div>
            <div className={Styles.messageBody} style={{ gap: "70px" }}>
              <div
                className={classNames(commonStyles.col6, commonStyles.colsm12)}
              >
                <div className={commonStyles.col12}>
                  <div className={classNames(commonStyles.flxBetween)}>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Patient Name:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {state?.patientId?.name}
                    </p>
                  </div>
                  <div
                    className={classNames(commonStyles.flxBetween, Styles.mt8)}
                  >
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Appointment Type:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {state?.appointmentType}
                    </p>
                  </div>
                  <div
                    className={classNames(commonStyles.flxBetween, Styles.mt8)}
                  >
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Doctor Name:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {state?.doctorId?.name}
                    </p>
                  </div>
                  {/* <div
                    className={classNames(commonStyles.flxBetween, Styles.mt8)}
                  >
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Specialties:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {state?.doctorId?.speciality}
                    </p>
                  </div> */}
                </div>
              </div>
              <div
                className={classNames(
                  commonStyles.col6,
                  commonStyles.colsm12,
                  Styles.mt24sm
                )}
              >
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Availability:
                </p>
                <div className={classNames(commonStyles.col12, Styles.mt8)}>
                  <div className={commonStyles.col8}>
                    <Datepicker placeholder="Date" setData={handleAptDate} />
                  </div>
                  <div className={classNames(commonStyles.col12, Styles.mt8)}>
                    <div className={commonStyles.col8}>
                      <CustomTimePicker
                        placeholder="Time"
                        setData={handleAptTime}
                      />
                    </div>
                  </div>
                </div>
                {error ? (
                  <div
                    style={{ marginBottom: "8px" }}
                    className={classNames(commonStyles.error)}
                  >
                    *{error}
                  </div>
                ) : null}
                <div className={Styles.sendOuter}>
                  <div style={{ width: "100px" }}>
                    <PrimaryButton
                      disabled={loading}
                      children={
                        loading ? (
                          <RingLoader size={35} color={"#fff"} />
                        ) : (
                          "Submit"
                        )
                      }
                      colorType={"admin"}
                      onClick={handleCreateAppointment}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <CustomModal showModal={showSendModel}>
          <div style={{ width: "420px" }}>
            <FaCheckCircle className={Styles.done} />
            <p
              className={classNames(
                commonStyles.fs16,
                commonStyles.semiBold,
                commonStyles.colorBlue
              )}
              style={{ textAlign: "center" }}
            >
              Your Message has been Successfully Sent
            </p>
          </div>
        </CustomModal>
      </div>
    </div>
  );
}
