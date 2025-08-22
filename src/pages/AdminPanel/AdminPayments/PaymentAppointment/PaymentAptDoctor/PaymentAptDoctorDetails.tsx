import React, { useState } from "react";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./paymentAptDoctor.module.css";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

export default function PaymentAptDoctorDetails() {
  const { state } = useLocation();
  let date = dayjs(state?.userId?.appointmentDateAndTime).format("MM-DD-YYYY");
  let time = dayjs(state?.userId?.appointmentDateAndTime).format("h:mm a");
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payment Appointment " />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <p
          className={classNames(
            commonStyles.fs22,
            Styles.primarycolor,
            commonStyles.semiBold
          )}
        >
          Patient Payment History
        </p>
        <div className={classNames(commonStyles.flxBetween, Styles.mt24)}>
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
                  {state?.doctorId?.venderId}
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
                  Clinic Name
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.doctorId?.clinicName}
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
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
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
              </div>
            </div>
          </div>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                PATIENT
              </p>
            </div>
            <div className={Styles.headerBody}>
              {/* <div className={classNames(commonStyles.flxBetween)}>
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
              </div> */}
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  MR No. :
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
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                APPOINTMENT
              </p>
            </div>
            <div className={Styles.headerBody}>
              <p
                className={classNames(commonStyles.fs14, commonStyles.semiBold)}
              >
                {state?.appointmentType}
              </p>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Date:
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
                  Time:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {time}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Payment:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.amount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(Styles.MessageCard)}>
          <div className={Styles.headerCard}>
            <p className={classNames(commonStyles.fs18, commonStyles.semiBold)}>
              PRESCRIPTION
            </p>
          </div>
          <div className={Styles.messageBody}>
            <div className={commonStyles.col5}>
              <p className={classNames(commonStyles.fs14, commonStyles.medium)}>
                Symptoms:
              </p>
              {state?.history?.symptoms?.map((m: any, index: number) => (
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    Styles.mt4,
                    commonStyles.flx
                  )}
                  key={index}
                >
                  {m}
                </p>
              ))}
              <div className={classNames(commonStyles.col8, Styles.mt8)}>
                <p
                  className={classNames(commonStyles.fs14, commonStyles.medium)}
                >
                  Description about patient:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    Styles.mt8
                  )}
                >
                  {state?.history?.description}
                </p>
              </div>
            </div>
            <div className={commonStyles.col5}>
              <p className={classNames(commonStyles.fs14, commonStyles.medium)}>
                Medicine:
              </p>
              <div className={classNames(commonStyles.col8, Styles.mt8)}>
                {state?.ePrescription?.medicines?.map(
                  (m: any, index: number) => (
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray,
                        Styles.mt4
                      )}
                      key={index}
                    >
                      {m.medicineName}, {m.medicineBrand},{m.medicineStrength}
                    </p>
                  )
                )}
              </div>
            </div>
            <div className={commonStyles.col2}>
              <p className={classNames(commonStyles.fs14, commonStyles.medium)}>
                Test:
              </p>
              <div className={classNames(commonStyles.col12, Styles.mt8)}>
                {state?.ePrescription?.test?.map((t: any, index: number) => (
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      Styles.colorGray,
                      Styles.mt4
                    )}
                    key={index}
                  >
                    {t.testName}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
