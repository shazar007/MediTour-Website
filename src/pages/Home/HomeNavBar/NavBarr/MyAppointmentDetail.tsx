import React, { useState } from "react";
import styles from "./Appointment.module.css";
import Footerr from "../Footer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "shared/services/stripe/checkout";
import { setPaymentParams } from "shared/redux";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";

const MyAppointmentDetail = React.memo((props) => {
  const { t }: any = useTranslation();
  const [stripeOpen, setStripeOpen] = useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { user } = useSelector((state: any) => state?.root?.common);

  let localGateway = state?.data?.gatewayName === "blinq" ? true : false;
  let minusPartial_PrcessFee = state?.data?.paidByUserAmount?.toFixed(2);
  let processingFee = state?.data?.processingFee?.toFixed(2);

  let minus_ProcessingFee_InRemainingfAmount =
    minusPartial_PrcessFee - processingFee;
  let remainingAmount = Number(
    state?.data?.totalAmount - minus_ProcessingFee_InRemainingfAmount
  );

  let totalAmount_withFee: number = Number(
    state?.data?.processingFee + remainingAmount
  );

  let total = localGateway
    ? `PKR ${remainingAmount}`
    : totalAmount_withFee?.toFixed(2);

  const handlePayment = async () => {
    if (state?.data?.gatewayName == "stripe") {
      await dispatch(
        setPaymentParams({
          appointmentId: state?.data?._id,
          paidByUserAmount: totalAmount_withFee,
          processingFee: state?.data?.processingFee?.toFixed(2),
          pendingPayment: remainingAmount?.toFixed(2),
        })
      );
      setStripeOpen(true);
    } else {
      toast.error("Payment with Pakistan is coming Soon");
    }
  };

  return (
    <>
      <div className={styles.maincontainer}>
        <ServiceHeader
          headingBlue={t("my")}
          headingOrange={t("appointments")}
          desc_width="70%"
        />

        {stripeOpen ? (
          <Checkout
            serviceName={"remainingDoctor"}
            convertedAmount={totalAmount_withFee}
            remainingAmount={remainingAmount?.toFixed(2)}
          />
        ) : (
          <div>
            <p className={styles.headingMainDetail}>
              {t("yourAppointmentDetails")}
            </p>
            <div className={styles.containerDetail}>
              <div className={styles.appointmentSectionDetail}>
                <div className={styles.rowDetail}>
                  <div className={styles.w40}>
                    <p className={styles.titleSub}>{t("appointmentId")}:</p>
                  </div>
                  <div className={styles.w60}>
                    <p className={styles.Value}>{user?.mrNo}</p>
                  </div>
                </div>
                <div className={styles.rowDetail}>
                  <div className={styles.w40}>
                    <p className={styles.titleSub}>{t("date")}: </p>
                  </div>
                  <div className={styles.w60}>
                    <p className={styles.Value}>
                      {dayjs(state?.data?.appointmentDateAndTime).format(
                        "DD/MM/YYYY, hh:mm A"
                      )}
                    </p>
                  </div>
                </div>
                <div className={styles.rowDetail}>
                  <div className={styles.w40}>
                    <p className={styles.titleSub}>{t("patient")}: </p>
                  </div>
                  <div className={styles.w60}>
                    <p className={styles.Value}>{user?.name}</p>
                  </div>
                </div>
                <div className={styles.rowDetail}>
                  <div className={styles.w40}>
                    <p className={styles.titleSub}>{t("doctor")}:</p>
                  </div>
                  <div className={styles.w60}>
                    <p className={styles.Value}>
                      {state?.data?.doctorId?.name}
                    </p>
                  </div>
                </div>
                <div className={styles.rowDetail}>
                  <div className={styles.w40}>
                    <p className={styles.titleSub}> {t("clinic")}: </p>
                  </div>
                  <div className={styles.w60}>
                    <p className={styles.Value}>
                      {" "}
                      {state?.data?.doctorId?.clinicName}
                    </p>
                  </div>
                </div>
                <div className={styles.rowDetail}>
                  <div className={styles.w40}>
                    <p className={styles.titleSub}>{t("address")}: </p>
                  </div>{" "}
                  <div className={styles.w60}>
                    <p className={styles.Value}>
                      {state?.data?.doctorId?.location?.address}
                    </p>
                  </div>
                </div>
                <div className={styles.rowDetail}>
                  <div className={styles.w40}>
                    <p className={styles.titleSub}>{t("payment")}: </p>
                  </div>
                  <div className={styles.w60}>
                    <p
                      className={styles.Value}
                      style={{
                        color:
                          state?.data?.isPaidFull == false
                            ? "#B3261E"
                            : "#13A89E",
                      }}
                    >
                      {state?.data?.isPaidFull == false
                        ? "Outstanding"
                        : "Completed"}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.dashedLineDetailPayment}></div>
              <div className={styles.paymentSectionDetail}>
                {state?.data?.isPaidFull == false && (
                  <>
                    <p className={styles.paymentHeading}>
                      {t("paymentDetails")}
                    </p>
                    <div className={styles.paymentInfoDetail}>
                      <div className={styles.rowDetail}>
                        <div className={styles.w40}>
                          <p className={styles.titleSub}>{t("dueDate")}:</p>
                        </div>
                        <div className={styles.w60}>
                          <p className={styles.Value}>
                            {dayjs(state?.data?.appointmentDateAndTime).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </div>
                      </div>

                      <div className={styles.rowDetail}>
                        <div className={styles.w40}>
                          <p className={styles.titleSub}>{t("totalAmount")}:</p>
                        </div>
                        <div className={styles.w60}>
                          <p className={styles.Value}>
                            {`${
                              localGateway ? "PKR" : "$"
                            } ${state?.data?.totalAmount?.toFixed(2)}`}
                          </p>
                        </div>
                      </div>

                      <div className={styles.rowDetail}>
                        <div className={styles.w40}>
                          <p className={styles.titleSub}>
                            {t("partialAmount")}:
                          </p>
                        </div>
                        <div className={styles.w60}>
                          <p className={styles.Value}>
                            {`${
                              localGateway ? "PKR" : "$"
                            } ${minus_ProcessingFee_InRemainingfAmount?.toFixed(
                              2
                            )}`}
                          </p>
                        </div>
                      </div>
                      <div className={styles.rowDetail}>
                        <div className={styles.w40}>
                          <p className={styles.titleSub}>
                            {t("remainingAmount")}:
                          </p>
                        </div>
                        <div className={styles.w60}>
                          <p className={styles.Value}>
                            {localGateway
                              ? `PKR ${remainingAmount}`
                              : `$ ${remainingAmount?.toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                      {!localGateway && (
                        <>
                          <div className={styles.rowDetail}>
                            <div className={styles.w40}>
                              <p className={styles.titleSub}>
                                {" "}
                                {t("processingFee")}:
                              </p>
                            </div>
                            <div className={styles.w60}>
                              <p
                                className={styles.Value}
                              >{`$ ${state?.data?.processingFee?.toFixed(
                                2
                              )}`}</p>
                            </div>
                          </div>
                          <div className={styles.rowDetail}>
                            <div className={styles.w40}>
                              <p className={styles.titleSub}>
                                {" "}
                                {t("payableAmount")}:
                              </p>
                            </div>
                            <div className={styles.w60}>
                              <p className={styles.Value}>
                                {`${"$" + " " + total}`}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button
                    className={styles.paymentButtonDetail}
                    style={{
                      backgroundColor:
                        state?.data?.isPaidFull == false ? "#0E54A3" : "green",
                    }}
                    disabled={state?.data?.isPaidFull == false ? false : true}
                    onClick={handlePayment}
                  >
                    {state?.data?.isPaidFull == false
                      ? t("payment")
                      : t("completed")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ marginTop: "40px" }}></div>
      </div>
      <Footerr />
    </>
  );
});

export default MyAppointmentDetail;
