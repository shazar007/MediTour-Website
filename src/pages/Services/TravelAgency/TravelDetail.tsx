import React, { useState } from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "./Detail.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Checkout from "shared/services/stripe/checkout";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentParams } from "shared/redux";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import ImageSwiperTravel from "shared/components/A_New_Components/TravelDetailsSLider";
import img1 from "assets/images/Icon From (1).png";
import img3 from "assets/images/raphael_people.png";
import img5 from "assets/images/material-symbols-light_departure-board (1).png";
import img6 from "assets/images/material-symbols-light_departure-board.png";
import img7 from "assets/images/labcardsupport.png";
import img8 from "assets/images/labcardsecurity.png";
import img9 from "assets/images/labcardkey.png";
import { AboutSection } from "../HotelServices/HotelDetail/HotelDetailitems";
import { useDirection } from "shared/utils/DirectionContext";
const TravelDetail = () => {
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [open, setOpen] = useState<any>(false);
  const { isLoggedIn } = useSelector((state: any) => state?.root?.common);
  let item = state.item;
  let type = state.type;
  const withBooking = item?.tourId;

  const dispatch = useDispatch();
  const handleBooking = () => {
    if (isLoggedIn) {
      if (type == "TourBooking" && item?.isPaidFull == false) {
        if (item?.gatewayName == "blinq") {
        } else {
          setTimeout(() => {
            dispatch(
              setPaymentParams({
                bookingID: item?._id,
                paidByUserAmount: total,
                processingFee: item?.processingFee,
              })
            );
            setOpen(true);
          }, 2000);
        }
      } else if (item?.remainingSeats === 0) {
        alert("We're Sorry. No seats available");
      } else {
        navigate("/services/travel/TravelBooking", { state: { item: item } });
      }
    } else {
      navigate("/user/login", {
        state: {
          state: state,
          loginFrom: "travel",
        },
        replace: true,
      });
    }
  };
  let images = type == "TourBooking" ? withBooking?.images : item?.images;

  const [showNumber, setShowNumber] = useState(false);

  // ...........................................

  let localGateway = item?.gatewayName === "blinq" ? true : false;
  let minusPartial_PrcessFee = item?.paidByUserAmount?.toFixed(2);
  let processingFee = item?.processingFee?.toFixed(2);

  let minus_ProcessingFee_InRemainingfAmount =
    minusPartial_PrcessFee - processingFee;
  let remainingAmount = Number(
    item?.dollarAmount - minus_ProcessingFee_InRemainingfAmount
  );

  let totalAmount_withFee: number = Number(
    item.processingFee + remainingAmount
  );

  let total = localGateway
    ? `PKR ${remainingAmount}`
    : totalAmount_withFee?.toFixed(2);
  // ......................................
  const paymentDetails = [
    {
      label: t("totalAmount"),
      amount:
        item?.gatewayName == "blinq"
          ? `PKR ${item?.totalAmount}`
          : `$ ${item?.dollarAmount?.toFixed(2)}`,
      color: "rgba(0, 104, 56, 1)",
    },
    {
      label: t("partialAmount"),
      amount: `${
        localGateway ? "PKR" : "$"
      } ${minus_ProcessingFee_InRemainingfAmount?.toFixed(2)}`,
      color: "rgba(0, 104, 56, 1)",
    },

    {
      label: t("remainingAmount"),
      amount: localGateway
        ? `PKR ${remainingAmount}`
        : `$ ${remainingAmount?.toFixed(2)}`,
      color: "rgba(234, 2, 52, 1)",
    },
    {
      ...(item?.gatewayName === "stripe" && {
        label: t("processingFee"),
        amount: `$ ${item?.processingFee?.toFixed(2)}`,
        color: "rgba(234, 2, 52, 1)",
        dottedLine: true,
      }),
    },
    {
      ...(item?.gatewayName === "stripe" && {
        label: t("totalAmount"),
        amount: total,
        color: "rgba(234, 2, 52, 1)",
      }),
    },
    {
      label: t("dueDate"),
      amount: dayjs(item?.tourId?.departDate)?.format("MM/DD/YYYY"),
      color: "rgba(234, 2, 52, 1)",
    },
  ];
  function isValidDate(date: any) {
    return !isNaN(new Date(date).getTime());
  }
  function isValidTimeFormat(time: any) {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  }

  const { isRtl } = useDirection();
  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5" }}>
        {open ? (
          <Checkout
            serviceName={"TourRemaing"}
            convertedAmount={totalAmount_withFee}
            remainingAmount={remainingAmount?.toFixed(2)}
          />
        ) : (
          <div>
            <div style={{ backgroundColor: "#F5F5F5" }}>
              <div className={style.mainOuter}>
                <div className={style.detailOuter}>
                  <div className={style.w66}>
                    <div className={style.flx}>
                      <div className={style.w50}>
                        <ImageSwiperTravel imageData={images} />
                      </div>
                      <div
                        className={classNames(style.w50, style.colunBetween)}
                      >
                        <div>
                          <p className={style.Title}> {item.packageName}</p>
                          <p className={style.location}> {item.region}</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: isRtl ? "7px" : "5px",
                            flexDirection: "column",
                          }}
                        >
                          <div className={style.infoRow}>
                            <img
                              src={img1}
                              className={style.Iconns}
                              alt="travelDETAILS"
                            />
                            <p className={style.subheading}>
                              {item.from} {t("to")} {item.to}
                            </p>
                          </div>{" "}
                          <>
                            <div className={style.infoRow}>
                              <img
                                src={img5}
                                alt="travelimage5"
                                className={style.Iconns}
                              />
                              <p className={style.subheading}>
                                {t("departure")}:
                                {isValidDate(item.departDate)
                                  ? new Date(item.departDate)
                                      .toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })
                                      .replace(/ /g, "/") +
                                    " - " +
                                    (item.departTime &&
                                    isValidTimeFormat(item.departTime)
                                      ? new Date(
                                          `1970-01-01T${item.departTime}`
                                        ).toLocaleTimeString("en-US", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })
                                      : "Invalid time")
                                  : "Invalid date"}
                              </p>
                            </div>
                          </>
                          <>
                            <div className={style.infoRow}>
                              <img
                                src={img6}
                                alt="travelimage6"
                                className={style.Iconns}
                              />
                              <p className={style.subheading}>
                                {t("return")}:
                                {isValidDate(item.returnDate)
                                  ? new Date(item.returnDate)
                                      .toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })
                                      .replace(/ /g, "/") +
                                    " - " +
                                    (item.returnTime &&
                                    isValidTimeFormat(item.returnTime)
                                      ? new Date(
                                          `1970-01-01T${item.returnTime}`
                                        ).toLocaleTimeString("en-US", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })
                                      : "Invalid time")
                                  : "Invalid date"}
                              </p>
                            </div>
                          </>
                          <div className={style.infoRow}>
                            <img
                              src={img3}
                              alt="travelimage3"
                              className={style.Iconns}
                            />
                            <p className={style.subheading}>
                              {t("maxPeople")} {item.limitedSeats}
                            </p>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                    <div className={style.feature}>
                      <p className={style.featureHeading}>{t("featuring")}</p>

                      <div className={style.list}>
                        <button
                          className={
                            item.breakfast === true
                              ? style.featureBtn
                              : style.featureBtninactive
                          }
                        >
                          {t("breakfast")}
                        </button>
                        <button
                          className={
                            item.lunch === true
                              ? style.featureBtn
                              : style.featureBtninactive
                          }
                        >
                          {t("lunch")}
                        </button>
                        <button
                          className={
                            item.dinner === true
                              ? style.featureBtn
                              : style.featureBtninactive
                          }
                        >
                          {t("dinner")}
                        </button>
                      </div>
                    </div>
                    <div className={style.mt24}>
                      <p className={style.featureHeading}>
                        {t("tourItinerary")}
                      </p>
                      <p className={style.DaybyDay}>
                        {item?.dayByDayPlans && (
                          <AboutSection
                            sections={item.dayByDayPlans.map((line: string) => {
                              const colonIndex = line.indexOf(":");
                              if (colonIndex === -1) {
                                return {
                                  aboutText: line.trim(),
                                  detailText: [""],
                                };
                              }

                              const dayPart = line
                                .substring(0, colonIndex)
                                .trim();
                              let content = line
                                .substring(colonIndex + 1)
                                .trim();

                              // Special handling for Day X: day1 day2 day3 pattern
                              if (
                                content
                                  .split(/\s+/)
                                  .every((word) =>
                                    word.toLowerCase().startsWith("day")
                                  )
                              ) {
                                content = content.split(/\s+/).join("\n");
                              }

                              return {
                                aboutText: dayPart + ":",
                                detailText: content.includes("\n")
                                  ? content.split("\n")
                                  : [content],
                              };
                            })}
                          />
                        )}

                        <div className={style.mt24}>
                          <p className={style.featureHeading}>
                            {t("services&Condition")}
                          </p>
                        </div>

                        <AboutSection
                          sections={[
                            {
                              aboutText: t("accommodations"),
                              detailText: item?.accommodations
                                ? item.accommodations
                                    .split("\n")
                                    .map((point: string) =>
                                      point.replace(/^(\u2022|\.)\s*/, "")
                                    )
                                : [],
                            },
                            {
                              aboutText: t("transportation"),
                              detailText: item?.transportation
                                ? item.transportation
                                    .split("\n")
                                    .map((point: string) =>
                                      point.replace(/^(\u2022|\.)\s*/, "")
                                    )
                                : [],
                            },
                            {
                              aboutText: t("ourTeam"),
                              detailText: item?.ourTeam
                                ? item.ourTeam
                                    .split("\n")
                                    .map((point: string) =>
                                      point.replace(/^(\u2022|\.)\s*/, "")
                                    )
                                : [],
                            },
                            {
                              aboutText: t("cancellationPolicy"),
                              detailText: item?.cancellationPolicy
                                ? item.cancellationPolicy
                                    .split("\n")
                                    .map((point: string) =>
                                      point.replace(/^(\u2022|\.)\s*/, "")
                                    )
                                : [],
                            },
                          ]}
                        />
                      </p>
                    </div>
                  </div>
                  <div className={style.w33}>
                    <div className={style.requestCard}>
                      <p
                        className={style.featureHeading}
                        style={{ lineHeight: isRtl ? "30px" : "" }}
                      >
                        {t("sendInquiry")}
                      </p>
                      <p
                        className={style.reqText}
                        style={{ lineHeight: isRtl ? "30px" : "" }}
                      >
                        {t("sendTourRequest_")}
                      </p>

                      {!showNumber && (
                        <button
                          className={style.callBtn}
                          onClick={() => setShowNumber(true)}
                        >
                          {t("callHelpline")}
                        </button>
                      )}

                      {showNumber && (
                        <p dir={isRtl ? "rtl" : "ltr"}>
                          <span
                            style={{
                              direction: "ltr",
                              unicodeBidi: "embed",
                              whiteSpace: "nowrap",
                              fontSize: "15px",
                              color: "#0E54A3",
                            }}
                          >
                            +92-42-37885101-4
                          </span>
                        </p>
                      )}
                      <div>
                        <p
                          className={style.featureHeading}
                          style={{ lineHeight: isRtl ? "30px" : "" }}
                        >
                          {t("requestAReservation")}
                        </p>
                        <p
                          className={style.reqText}
                          style={{ lineHeight: isRtl ? "30px" : "" }}
                        >
                          {t("bookYourPreferredDate_")}
                        </p>

                        <button
                          className={style.BookBtn}
                          onClick={handleBooking}
                        >
                          {t("bookNow")}
                        </button>
                      </div>
                    </div>
                    <div className={style.requestCard}>
                      <p
                        style={{
                          marginBottom: "30px",
                          lineHeight: isRtl ? "30px" : "",
                        }}
                        className={style.featureHeading}
                      >
                        {t("whyUs")}
                      </p>
                      <div
                        style={{ marginTop: "18px" }}
                        className={style.infoRow}
                      >
                        <img
                          src={img7}
                          alt="travelimage5"
                          className={style.Iconns}
                        />
                        <p
                          className={style.whytext}
                          style={{ lineHeight: isRtl ? "30px" : "" }}
                        >
                          {t("priorityCustomerSupport")}
                        </p>
                      </div>{" "}
                      <div
                        style={{ marginTop: "8px" }}
                        className={style.infoRow}
                      >
                        <img
                          src={img8}
                          className={style.Iconns}
                          alt="travelimage8"
                        />
                        <p className={style.whytext}>{t("privateAndSecure")}</p>
                      </div>{" "}
                      <div
                        style={{ marginTop: "8px" }}
                        className={style.infoRow}
                      >
                        <img
                          src={img9}
                          className={style.Iconns}
                          alt="travelimage9"
                        />
                        <p className={style.whytext}>
                          {t("endToEndEncryption")}
                        </p>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {type == "TourBooking" && item?.isPaidFull == false && (
          <RemainPaymentSection
            t={t}
            paymentDetails={paymentDetails}
            paymentStyles={style}
          />
        )}
      </div>
      <Footerr />
    </>
  );
};
const RemainPaymentSection = ({
  t,
  paymentDetails,
  paymentStyles,
}: {
  t?: any;
  paymentDetails?: any;
  paymentStyles?: any;
}) => {
  return (
    <div className={classNames(commonstyle.col5, commonstyle.colsm12)}>
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
    </div>
  );
};
export default TravelDetail;
