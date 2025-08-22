import React, { useState } from "react";
import classNames from "classnames";
import bstyle from "./Booking.module.css";
import pstyle from "../../../shared/components/DonationServices/pay.module.css";
import commonstyles from "shared/utils/common.module.css";
import { IoMdArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setObj, setPaymentParams } from "shared/redux";
import Checkout from "shared/services/stripe/checkout";
import Footerr from "pages/Home/HomeNavBar/Footer";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useDirection } from "shared/utils/DirectionContext";

const RentaCarBooking = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const { user } = useSelector((state: any) => state.root.common);
  const [cnicError, setCnicError] = useState("");
  const [cnic, setCnic] = useState("");
  const { state } = useLocation();
  const {
    newData,
    calculate_amountPerDay,
    items,
    type,
    pickupLocation,
    dropoffLocation,
    pickDate,
    dropDate,
  } = state || {};

  const [open, setOpen] = useState<any>(false);
  const navigate = useNavigate();

  const [cnc, setCNC] = useState<any>("");
  const dispatch = useDispatch();

  const convertTo24Hour = (timeStr: any) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const pickTime24 =
    type === "BookingCar" ? null : convertTo24Hour(newData?.picKupTime);
  const dropTime24 =
    type === "BookingCar" ? null : convertTo24Hour(newData?.DropOffTime);
  const pickUpLocal = new Date(`${newData?.pickDate}T${pickTime24}:00`);
  const dropOffLocal = new Date(`${newData?.dropDate}T${dropTime24}:00`);
  const pickUpUTC = pickUpLocal.toISOString();
  const dropOffUTC = dropOffLocal.toISOString();

  const handlepay = async () => {
    if (items?.isPaidFull == false) {
      if (items?.gatewayName == "blinq") {
      } else {
        setTimeout(() => {
          dispatch(
            setPaymentParams({
              bookingID: items?._id,
              paidByUserAmount: items?.remainingAmount,
              processingFee: items?.processingFee,
            })
          );
          setOpen(true);
        }, 2000);
      }
    } else {
      if (!cnic) {
        setCnicError(t("cnicIsRequired"));
      } else {
        setCnicError("");

        let requestData: any = {
          vehicleName: items?.vehicleName,
          vehicleId: items?._id,
          doctorImage: items?.vehicleImages[0],
          rentACarId: items?.rentACarId,
          vehicleModel: items?.vehicleModel,
          totalAmount: calculate_amountPerDay,
          pickupLocation:
            type === "BookingCar"
              ? pickupLocation
              : newData?.pickupLocation?.address,
          dropoffLocation:
            type === "BookingCar"
              ? dropoffLocation
              : newData?.dropoffLocation?.address,
          pickupDateTime: type === "BookingCar" ? pickDate : pickUpUTC,

          dropoffDateTime: type === "BookingCar" ? dropDate : dropOffUTC,
          cnic: cnic,
          phone: newData?.phoneNo,
          customerName: newData?.name,
          age: newData?.age,
          withDriver: newData?.withDriver,
        };

        await dispatch(setObj(requestData));

        navigate("/services/paymentDetail", {
          state: {
            serviceName: "rentacar",
            actualAmount: calculate_amountPerDay,
          },
        });
      }
    }
  };
  let localGateway = items?.gatewayName === "blinq" ? true : false;
  let minusPartial_PrcessFee = items?.paidByUserAmount?.toFixed(2);
  let processingFee = items?.processingFee?.toFixed(2);

  let minus_ProcessingFee_InRemainingfAmount =
    minusPartial_PrcessFee - processingFee;
  let remainingAmount = Number(
    items?.dollarAmount - minus_ProcessingFee_InRemainingfAmount
  );

  let totalAmount_withFee: number = Number(
    items?.processingFee + remainingAmount
  );

  let total = localGateway
    ? `PKR ${remainingAmount}`
    : totalAmount_withFee?.toFixed(2);
  const paymentDetails = [
    {
      label: "totalAmount",
      amount:
        items?.gatewayName == "blinq"
          ? `PKR ${items?.totalAmount}`
          : `$ ${items?.dollarAmount?.toFixed(2)}`,
      color: "rgba(0, 104, 56, 1)",
    },
    {
      label: "partialAmount",
      amount: `${localGateway ? "PKR" : "$"
        } ${minus_ProcessingFee_InRemainingfAmount?.toFixed(2)}`,
      color: "rgba(0, 104, 56, 1)",
    },

    {
      label: "remainingAmount ",
      amount: localGateway
        ? `PKR ${remainingAmount}`
        : `$ ${remainingAmount?.toFixed(2)}`,
      color: "rgba(234, 2, 52, 1)",
    },
    {
      ...(items?.gatewayName === "stripe" && {
        label: "processingFee",
        amount: `$ ${items?.processingFee?.toFixed(2)}`,
        color: "rgba(234, 2, 52, 1)",
        dottedLine: true,
      }),
    },
    {
      ...(items?.gatewayName === "stripe" && {
        label: "totalAmount",
        amount: total,
        color: "rgba(234, 2, 52, 1)",
      }),
    },
    {
      label: "dueDate",
      amount: dayjs(items?.tourId?.departDate)?.format("MM/DD/YYYY"),
      color: "rgba(234, 2, 52, 1)",
    },
  ];

  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5 && value.length <= 12) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    } else if (value.length > 12) {
      value = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12)}`;
    }
    setCnic(value);
  };
  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return "Date of birth not provided";
    const [day, month, year] = dateOfBirthString.split("/").map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }
  const inputData = [
    { label: "_name", type: "text", placeholder: user?.name, readOnly: true },
    {
      label: "age",
      type: "text",
      placeholder: calculateAge(user?.dateOfBirth),
      readOnly: true,
    },
    {
      label: "phoneNumber",
      type: "text",
      placeholder: user?.phone,
      readOnly: true,
    },
  ];

  const rentalData = [
    {
      label: "pickupLocation",
      type: "text",
      placeholder:
        type === "BookingCar"
          ? pickupLocation
          : newData?.pickupLocation?.address,
      readOnly: true,
    },
    {
      label: "pickupDate&Time",
      type: "text",
      placeholder:
        type === "BookingCar"
          ? pickDate
          : `${newData?.pickDate}-${newData?.picKupTime}`,
      readOnly: true,
    },
    {
      label: "dropOffLocation",
      type: "text",
      placeholder:
        type === "BookingCar"
          ? dropoffLocation
          : newData?.dropoffLocation?.address,
      readOnly: true,
    },
    {
      label: "dropOffDate&Time",
      type: "text",
      placeholder:
        type === "BookingCar"
          ? dropDate
          : `${newData?.dropDate}-${newData?.DropOffTime}`,
      readOnly: true,
    },
  ];

  return (
    <>
      <div className={bstyle.maincontainer}>
        <ServiceHeader
          headingBlue={t("bookNowWith")}
          headingOrange="MediTour"
          desc_width="70%"
        />

        {open ? (
          <Checkout serviceName={"Remaining_RentCar"} convertedAmount={total} />
        ) : (
          <div className={classNames(commonstyles.mb32)}>
            <div
              className={classNames(
                commonstyles.flx,
                commonstyles.flxBetween,
                commonstyles.flxWrap
              )}
            >
              <div
                className={classNames(
                  commonstyles.col5,
                  commonstyles.colsm12,
                  commonstyles.colmd12
                )}
              >
                <div>
                  <p
                    className={classNames(
                      commonstyles.colorBlue,
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    {t("customerDetails")}
                  </p>
                  {inputData.map((input: any, index: any) => (
                    <div key={index}>
                      {t("input.label") && (
                        <label className={bstyle.label}>{t(input.label)}</label>
                      )}
                      <input
                        className={bstyle.input}
                        type={input.type}
                        placeholder={input.placeholder}
                        style={
                          input.label === "Identity Number"
                            ? { backgroundColor: "#fff" }
                            : { backgroundColor: "#f9f9f9" }
                        }
                        value={
                          input.label === "Identity Number" ? cnc : input?.value
                        }
                        onChange={(text: any) =>
                          input.label === "Identity Number"
                            ? setCNC(text.target.value)
                            : null
                        }
                        readOnly={input.label !== "Identity Number"}
                      />
                    </div>
                  ))}

                  {type !== "BookingCar" && (
                    <div>
                      <label className={bstyle.label}>CNIC</label>
                      <input
                        className={bstyle.input}
                        type="text"
                        value={cnic}
                        placeholder="33303-1234567-1"
                        onChange={handleCnicChange}
                        maxLength={15}
                      />
                      {cnicError && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "12px",
                            marginTop: "4px",
                          }}
                        >
                          {cnicError}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={classNames(
                  commonstyles.col5,
                  commonstyles.colsm12,
                  commonstyles.md12
                )}
              >
                <div>
                  <p
                    className={classNames(
                      commonstyles.colorBlue,
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    {t("rentalDetails")}
                  </p>
                  {rentalData.map((rental, index) => (
                    <div key={index}>
                      {t(rental.label) && (
                        <label className={bstyle.label}>
                          {t(rental.label)}
                        </label>
                      )}
                      <input
                        className={bstyle.input}
                        type={rental.type}
                        placeholder={rental.placeholder}
                        readOnly={rental.readOnly}
                        style={{
                          backgroundColor: "#f9f9f9",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={classNames(
                commonstyles.mt32,
                commonstyles.col5,
                commonstyles.colsm12,
                commonstyles.md12
              )}
              style={
                type === "BookingCar"
                  ? {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    width: "100%",
                  }
                  : undefined
              }
            >
              {type == "BookingCar" ? (
                items?.isPaidFull == false && (
                  <>
                    <RemainPaymentSection
                      t={t}
                      paymentDetails={paymentDetails}
                      paymentStyles={bstyle}
                    />
                  </>
                )
              ) : (
                <></>
              )}
            </div>

            {type === "BookingCar" ? null : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  className={classNames(
                    commonstyles.flx,
                    commonstyles.flxBetween,
                    commonstyles.mt32
                  )}
                >
                  <p
                    className={classNames(
                      commonstyles.colorBlue,
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                    style={{
                      margin: "0 20px",
                    }}
                  >
                    {t("totalPrice")}
                  </p>
                  <p
                    className={classNames(
                      commonstyles.colorBlue,
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    {calculate_amountPerDay}
                  </p>
                </div>
              </div>
            )}

            <div className={pstyle.showMoreContainer}>
              <button
                className={pstyle.showMoreButton}
                onClick={handlepay}
                disabled={items?.isPaidFull == true ? true : false}
              >
                {items?.isPaidFull == false
                  ? t("payment").toUpperCase()
                  : items?.isPaidFull == true
                    ? t("paymentCompleted")
                    : t("confirm")}
                {items.isPaidFull !== true && (
                  <span
                    className={pstyle.icon}
                    style={{
                      transform: isRtl ? "rotate(180deg)" : undefined,
                    }}
                  >
                    <IoMdArrowForward />
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <Footerr />
    </>
  );
};
const RemainPaymentSection = ({
  paymentDetails,
  paymentStyles,
  t,
}: {
  paymentDetails?: any;
  paymentStyles?: any;
  t?: any;
}) => {
  return (
    <div>
      <div className={paymentStyles["dashed-line"]} />
      <p className={paymentStyles["payment-title"]}>{t("payment")}</p>
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
              {t(item?.label)}
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
    </div>
  );
};
export default RentaCarBooking;
