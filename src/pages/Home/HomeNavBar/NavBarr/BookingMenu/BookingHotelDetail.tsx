import React, { useEffect, useState } from "react";
import Footerr from "../../Footer";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BookigHotelDetail.module.css";

import Checkout from "shared/services/stripe/checkout";
import { useDispatch } from "react-redux";
import { setPaymentParams } from "shared/redux";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { BOOKING_HOTEL_DETAIL } from "shared/utils/mainHeaderQuery";
import dayjs from "dayjs";
import { IoLocationOutline } from "react-icons/io5";
const MyBookingHotelDetail = React.memo((props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<any>(false);
  const data = state?.data;

  let localGateway = data?.gatewayName === "blinq" ? true : false;
  let minusPartial_PrcessFee = data?.paidByUserAmount?.toFixed(2);
  let processingFee = data?.processingFee?.toFixed(2);

  let minus_ProcessingFee_InRemainingfAmount =
    minusPartial_PrcessFee - processingFee;
  let remainingAmount = Number(
    data?.dollarAmount - minus_ProcessingFee_InRemainingfAmount
  );

  let totalAmount_withFee: number = Number(
    data?.processingFee + remainingAmount
  );

  let total = localGateway
    ? `PKR ${remainingAmount}`
    : totalAmount_withFee?.toFixed(2);
  const paymentDetails = [
    {
      label: "Total Amount",
      amount:
        data?.gatewayName == "blinq"
          ? `PKR ${data?.totalAmount}`
          : `$ ${data?.dollarAmount?.toFixed(2)}`,
      color: "rgba(0, 104, 56, 1)",
    },
    {
      label: "Partial Amount",
      amount: `${
        localGateway ? "PKR" : "$"
      } ${minus_ProcessingFee_InRemainingfAmount?.toFixed(2)}`,
      color: "rgba(0, 104, 56, 1)",
    },

    {
      label: "Remaining Amount ",
      amount: localGateway
        ? `PKR ${remainingAmount}`
        : `$ ${remainingAmount?.toFixed(2)}`,
      color: "rgba(234, 2, 52, 1)",
    },
    {
      ...(data?.gatewayName === "stripe" && {
        label: "Processing Fee",
        amount: `$ ${data?.processingFee?.toFixed(2)}`,
        color: "rgba(234, 2, 52, 1)",
        dottedLine: true,
      }),
    },
    {
      ...(data?.gatewayName === "stripe" && {
        label: "Total Amount",
        amount: total,
        color: "rgba(234, 2, 52, 1)",
      }),
    },
    {
      label: "Due Date",
      amount: dayjs(data?.tourId?.departDate)?.format("MM/DD/YYYY"),
      color: "rgba(234, 2, 52, 1)",
    },
  ];

  const handleBookNow = () => {
    if (data?.gatewayName == "blinq") {
      // dispatchEvent(setAmount(pendingPayment));
      // navigate('BlinqPayment', {
      //   type: type,
      //   bookingID: data?._id,
      // });
    } else {
      setTimeout(() => {
        dispatch(
          setPaymentParams({
            bookingID: data?._id,
            paidByUserAmount: data?.remainingAmount,
            processingFee: data?.processingFee,
          })
        );
        setOpen(true);
      }, 2000);
    }
  };
  return (
    <div>
      <NavBreadCrumbs {...BOOKING_HOTEL_DETAIL} />
      {open ? (
        <Checkout
          serviceName={"hotelRemaining"}
          convertedAmount={remainingAmount?.toFixed(2)}
        />
      ) : (
        <div className={styles.bookingHotelDetailContainer}>
          <div className={styles.hotelDetail}>
            <div className={styles.hotelImageWrapper}>
              <img
                src={data?.serviceId?.propertyphoto?.[0]}
                className={styles.hotelImage}
                alt="servicePhoto"
              />
              <p className={styles.planOverlay}>
                Breakfast Included:{data?.rooms?.[0]?.breakfast}
              </p>
            </div>
            <div className={styles.hotelInfo}>
              <h2 className={styles.hotelDetailName}>
                {data?.customName || data?.serviceId?.propertyName}
              </h2>
              <p className={styles.ratingAndDistance}>
                {Array.from(
                  { length: data?.starRating ? data?.starRating : 0 },
                  () => "⭐"
                )?.join(" ")}
              </p>
              <div className={styles.distanceContainer}>
                <IoLocationOutline
                  color="#0e54a3"
                  className={styles.distanceIcon}
                />
                <p className={styles.distanceText}>
                  {data?.location?.address &&
                    `${data?.location?.address} ${","} ${data?.location?.city}`}
                  {data?.serviceId?.location?.address &&
                    `${data?.serviceId?.location?.address} ${","} ${
                      data?.serviceId?.location?.city
                    }`}
                </p>
              </div>
              {data?.isPaidFull == false && (
                <RemainPaymentSection
                  paymentDetails={paymentDetails}
                  paymentStyles={styles}
                  title={
                    data?.isPaidFull == true ? "payment completed" : "PAYMENT"
                  }
                  onClick={handleBookNow}
                  disabled={data?.isPaidFull == true ? true : false}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footerr />
    </div>
  );
});
const RemainPaymentSection = ({
  paymentDetails,
  paymentStyles,
  title,
  onClick,
  disabled,
}: {
  paymentDetails?: any;
  paymentStyles?: any;
  title?: any;
  onClick?: any;
  disabled?: any;
}) => {
  return (
    <div>
      <div className={paymentStyles["dashed-line"]} />
      <p className={paymentStyles["payment-title"]}>Payment</p>
      {paymentDetails?.map((item?: any, index?: any) => (
        <React.Fragment key={index}>
          <div
            className={paymentStyles["row-payment-styles"]}
            style={{ marginTop: index === 0 ? "8px" : item?.marginTop }}
          >
            <p
              style={{ color: item?.color }}
              className={paymentStyles["payment-label"]}
            >
              {item?.label}
            </p>
            <p
              style={{ color: item?.color }}
              className={paymentStyles["payment-amount"]}
            >
              {item?.amount}
            </p>
          </div>
          {item?.dottedLine && <div className={paymentStyles["dotted-line"]} />}
        </React.Fragment>
      ))}
      <button
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};
export default MyBookingHotelDetail;
