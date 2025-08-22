import React, { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "../Footer";
import { setIsLoggedIn } from "shared/redux";
import styles from "./PaymentNavbar.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TestCard } from "shared/components";
import Checkout from "shared/services/stripe/checkout";
import { setPaymentParams } from "shared/redux";
import { createBlinq } from "shared/services";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { PAYMENT_NAVBAR } from "shared/utils/mainHeaderQuery";
import CustomLoader from "shared/components/New_Loader/Loader";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
const PaymentNavbar = React.memo((props) => {
  const { t }: any = useTranslation();

  const { state, location }: any = useLocation();
  const { systemType, exchangeRate } = useSelector(
    (state: any) => state.root.common
  );
  const dispatch = useDispatch();
  const { obj, hotelDetail, user } = useSelector(
    (state: any) => state?.root?.common
  );
  let arryObj =
    state?.serviceName === "pharmacy"
      ? obj
      : state?.serviceName === "labTestPharmacy"
      ? [obj?.medicines]
      : [obj];
  const [paymentType, setPaymentType] = useState("Full Payment");
  const [selection, setSelection] = useState(
    state?.paidType ? "International" : "Pakistan"
  );

  const [convertedRemainingAmount, setConvertedRemainingAmount] =
    useState<any>(0);

  const [stripeOpen, setStripeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculateAmount, setCalculateAmount] = useState<any>();

  let processingFee: number =
    selection == "Pakistan" ? 0 : 55.58 * exchangeRate;
  let amountwithFee = Number(state?.actualAmount) + processingFee;
  let thirtyPercent: number = Number(state?.actualAmount) * 0.3;
  let thirtyPercent_WithFee: number = thirtyPercent + processingFee;
  let convertedAmount = calculateAmount * exchangeRate;
  let amount = convertedAmount + processingFee;
  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}\/${month}\/${day}`;
  };

  const newDate = new Date();
  const formattedDate = formatDate(newDate);

  useEffect(() => {
    mapSelectedItems();
  }, []);

  const mapSelectedItems = () => {
    if (state?.serviceName == "Lab") {
      return obj?.map((item: any) => ({
        itemId: item?._id,
        quantity: 1,
      }));
    }
  };

  const formattedData = mapSelectedItems();

  useEffect(() => {
    handleAmount();
  }, [paymentType, selection]);

  useEffect(() => {
    const query = new URLSearchParams(location?.search);
    const paymentStatus = query.get("status");
    if (paymentStatus === "success") {
    } else {
    }
  }, [location]);

  const arivalDate = `${hotelDetail?.fromDate}  ${hotelDetail?.fromDate}`;

  const onPressBtn = () => {
    if (selection == "Pakistan") {
      const transactionReferenceNumber = Math.floor(
        Math.random() * 100000
      ).toString();
      const invoiceNo = `MED-${transactionReferenceNumber}`;
      console.log("Generated invoiceNo:", invoiceNo); // Log invoice number

      if (systemType !== "user") {
        dispatch(
          setPaymentParams({
            paymentId: invoiceNo,
            gatewayName: "blinq",
            numberOfDocs: state?.numberOfDocs,
          })
        );
        console.log("Dispatched payment params for non-user systemType");
      }
      postRequest_Blink(invoiceNo);
    } else {
      dispatch(
        setPaymentParams({
          actualAmount: state?.actualAmount,
          paymentType: paymentType,
          processingFee: processingFee,
          appointmentType: state?.appointmentType || "",
          docId: state?.doctorId || "",
          item: formattedData || "",
          labId: state?.labId || "",
          ambulanceId: state?.ambulanceId || "",
          speciality: state?.speciality || "",
          selectedPreference: state?.selectedPreference || "",
        })
      );
      setStripeOpen(true);
    }
  };

  const postRequest_Blink = async (invoiceNo: any) => {
    setLoading(true);
    let body = {
      InvoiceNumber: invoiceNo,
      InvoiceAmount: calculateAmount,
      IssueDate: formattedDate,
      CustomerName: user?.name,
    };

    createBlinq(body)
      .then((res: any) => {
        const mapUrl: any = res?.data?.data?.ResponseDetail[0]?.ClickToPayUrl;
        if (mapUrl) {
          window.location.href = mapUrl;
          dispatch(setIsLoggedIn(false));
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleAmount = () => {
    const baseAmount =
      paymentType === "Full Payment" ? amountwithFee : thirtyPercent_WithFee;
    setCalculateAmount(baseAmount);

    if (paymentType === "Partial Payment") {
      const remaining = amountwithFee - thirtyPercent_WithFee;
      setConvertedRemainingAmount(
        selection === "International" && exchangeRate
          ? remaining * exchangeRate
          : remaining
      );
    }
  };

  return (
    <>
      <div className={classNames(commonstyles.col12)}>
        {systemType === "user" ? (
          <NavBreadCrumbs {...PAYMENT_NAVBAR(t)} />
        ) : (
          systemType !== "greentourism" &&
          systemType !== "hospital" &&
          systemType !== "hotel" &&
          null
        )}

        {stripeOpen ? (
          <Checkout
            serviceName={state?.serviceName}
            convertedAmount={amount?.toFixed(2)}
            paidAmount={amount}
            remainingAmount={convertedRemainingAmount}
          />
        ) : (
          <>
            {systemType === "user" &&
              arryObj?.map((profile: any, index: any) => {
                state?.serviceName == "labTestPharmacy" ? (
                  <TestCard item={profile} serviceName={state?.serviceName} />
                ) : (
                  <div key={index} className={styles.profileCard}>
                    {(profile?.doctorImage ||
                      profile?.item?.images?.[0] ||
                      profile?.images?.[0] ||
                      profile?.item?.packageLogo ||
                      profile?.ambulanceId?.logo ||
                      profile?.item?.propertyphoto?.[0] ||
                      profile?.item?.agencyId?.logo) && (
                      <img
                        src={
                          profile?.doctorImage ||
                          profile?.item?.images?.[0] ||
                          profile?.images?.[0] ||
                          profile?.item?.packageLogo ||
                          profile?.ambulanceId?.logo ||
                          profile?.item?.propertyphoto?.[0] ||
                          profile?.item?.agencyId?.logo
                        }
                        alt={profile?.name}
                        className={styles.profileImage}
                      />
                    )}

                    <div className={styles.profileInfo}>
                      <h3>
                        {profile?.name ||
                          profile?.item?.packageName ||
                          profile?.testNameId?.name ||
                          profile?.ambulanceName ||
                          profile?.productName ||
                          profile?.donationTitle ||
                          profile?.vehicleName ||
                          profile?.item?.agencyId?.name ||
                          profile?.item?.propertyName}
                      </h3>
                      <p>
                        {profile?.qualifications
                          ? profile.qualifications
                          : profile?.item?.from && profile?.item?.to
                          ? `${profile.item.from} - ${profile.item.to}`
                          : profile?.brand
                          ? profile.brand
                          : profile?.description
                          ? profile?.description
                          : profile?.travelers
                          ? `${profile?.travelers?.length} Traveler`
                          : state?.serviceName == "Hotel" && arivalDate}
                      </p>
                      <p>
                        {profile?.speciality
                          ? profile.speciality.join(", ")
                          : profile?.item?.departDate
                          ? `${t("departDate")}: ${dayjs(
                              profile.item?.departDate
                            ).format("MM/DD/YYYY")}`
                          : profile?.quantity
                          ? `${t("quantity")}: ${profile.quantity}`
                          : profile?.totalDays &&
                            `${t("days")}: ${profile?.totalDays}`}
                      </p>
                      <p>
                        {profile?.clinicExperience ||
                          (profile?.item?.returnDate &&
                            `${t("returnDate")}: ${dayjs(
                              profile?.item?.returnDate
                            ).format("MM/DD/YYYY")}`)}
                      </p>
                    </div>
                  </div>
                );
              })}

            <div className={styles.paymentContainer}>
              <h2 className={styles.paymentHadingNavbar}>{t("payment")}</h2>
              <div className={styles.optionGroup}>
                {(systemType === "user" || state?.paidType === false) && (
                  <label style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="radio"
                      name="selection"
                      value="Pakistan"
                      checked={selection === "Pakistan"}
                      onChange={() => setSelection("Pakistan")}
                    />

                    {t("pakistan")}
                  </label>
                )}

                {(systemType === "user" || state?.paidType) && (
                  <label style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="radio"
                      name="selection"
                      value="International"
                      checked={selection === "International"}
                      onChange={() => setSelection("International")}
                    />
                    {t("international")}
                  </label>
                )}
              </div>

              <h2 className={styles.paymentHadingNavbar}>{t("paymentType")}</h2>
              <div className={styles.optionGroup}>
                <label style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="radio"
                    name="paymentType"
                    value="Full Payment"
                    checked={paymentType === "Full Payment"}
                    onChange={() => setPaymentType("Full Payment")}
                  />
                  {t("fullPayment")}
                </label>
                {state?.serviceName == "Lab" ||
                state?.serviceName == "prescription" ||
                state?.serviceName == "Ambulance" ||
                state?.serviceName == "insurance" ||
                state?.serviceName == "donation" ||
                state?.serviceName == "pharmacy" ||
                state?.serviceName == "flights" ||
                state?.serviceName == "labTestPharmacy" ||
                systemType !== "user" ? null : (
                  <label style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="radio"
                      name="paymentType"
                      value="Partial Payment"
                      checked={paymentType === "Partial Payment"}
                      onChange={() => setPaymentType("Partial Payment")}
                    />
                    {t("partialPayment")}
                  </label>
                )}
              </div>

              <div className={styles.amountDetails}>
                <div>
                  <span className={styles.processPaymentAmountMargin}>
                    {t("totalAmount")}
                  </span>
                  <span>
                    {systemType === "user"
                      ? selection == "International"
                        ? `${"$" + " " + convertedAmount?.toFixed(2)}`
                        : `${"PKR" + " " + calculateAmount}`
                      : `${"$" + " " + convertedAmount?.toFixed(2)}`}
                  </span>
                </div>
                {selection === "International" && (
                  <div>
                    <span className={styles.processPaymentAmountMargin}>
                      {t("processAmount")}
                    </span>
                    <span>
                      {selection == "International" ? "$" : "PKR"}{" "}
                      {processingFee?.toFixed(2)}
                    </span>
                  </div>
                )}
                {selection == "International" && (
                  <div>
                    <span className={styles.processPaymentAmountMargin}>
                      {t("payableAmount")}
                    </span>
                    <span>
                      {selection == "International" &&
                        `${"$" + " " + amount?.toFixed(2)}`}
                    </span>
                  </div>
                )}
              </div>

              <button onClick={onPressBtn} className={styles.paymentButton}>
                {t("payment").toUpperCase()}
              </button>
            </div>
          </>
        )}
        {loading && <CustomLoader />}

        {systemType === "user" && <Footerr />}
      </div>
    </>
  );
});

export default PaymentNavbar;
