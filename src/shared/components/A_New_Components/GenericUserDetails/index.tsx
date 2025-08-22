import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { HeaderCard } from "pages/Home/HomeNavBar/NavBarr/BookingMenu/BookingHotel";
import Checkout from "shared/services/stripe/checkout";
import { setPaymentParams } from "shared/redux";
import DoubleButton from "shared/components/Buttons/DoubleButton";
import classNames from "classnames";
import LabDownload from "assets/images/download.png";
import commonstyle from "shared/utils/common.module.css";
import { TiTick } from "react-icons/ti";
import { TakeOff } from "assets/svg";
import { PiClockCountdownBold } from "react-icons/pi";
// import { url } from "inspector";

const UserDetails = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const { state } = useLocation();
  const { selected } = useParams();
  const { user } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  const [list, setList] = useState<any>([]);
  const [shift, setShift] = useState(() => {
    return localStorage.getItem("shiftTab") || "FLIGHTS";
  });
  const storedSelectedTab = localStorage.getItem("selectedTab");
  const storedShiftTab = localStorage.getItem("shiftTab");
  const [ticketName, setTicketName] = useState<any>(null);

  const activeTab =
    storedSelectedTab || state?.details?.title || selected || "";
  const activeShift = storedShiftTab || state?.details?.shift || "";
  const details = state?.details || {};
  const type = details?.type || "";

  console.log("🚀 ~ UserDetails ~ ...............>>>>:", details);
  const items =
    type === "Flight"
      ? details
      : type === "TourBooking"
      ? details?.item || {}
      : details?.items || details?.item || details?.data || {};
  console.log("🚀 ~ items ~ type:.........", items);
  // const logo = state?.data?.bookings?.agencyId?.logo;
  const logo = state?.details?.data?.agencyId?.logo;
  const name = state?.details?.data?.agencyId?.name;
  const ambulnceAddressFrom = details?.data?.requestId?.pickUp?.address;
  const ambulnceAddressTo = details?.data?.requestId?.dropOff?.address;

  let url = state?.data?.eTicket ? state?.data?.eTicket : "";

  const urlParts = state?.type === "booking" ? url?.()?.split("/") ?? [] : [];

  const fileName: any =
    state?.type === "booking"
      ? urlParts[urlParts?.length - 1]?.split("?")[0]
      : null;
  const downloadAndSaveImage = (fileUrl: string, label: string = "file") => {
    if (!fileUrl) return;

    const fileName: string = (fileUrl
      ?.split("/")
      ?.pop()
      ?.split("?")[0]
      ?.replace(/%/g, "") || "") as string;

    setTicketName(fileName);

    const downloadLink: HTMLAnchorElement = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = `${label}_${fileName}`;
    document.body.appendChild(downloadLink);
    downloadLink.click(); // ✅ Perform the download
    document.body.removeChild(downloadLink);
  };

  const dollarAmount = Number(items?.dollarAmount || 0);
  const processingFee = Number(items?.processingFee || 0);
  const totalAmount = Number(items?.totalAmount || 0);
  const paidByUserAmount = Number(items?.paidByUserAmount || 0);
  const remainingAmount = Number(
    items?.remainingAmount || dollarAmount - paidByUserAmount
  );
  // console.log("🚀 ~ UserDetails ~ remainingAmount:", remainingAmount)

  console.log("..............", user?.dateOfBirth);
  const totalAmountWithFee = processingFee + remainingAmount;
  const policyDocumentUrl = items?.insuranceId?.policyDocument;
  const claimProcess = items?.insuranceId?.claimProcess;
  const insuranceFile = items?.insuranceFile;

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    const savedShift = localStorage.getItem("shiftTab");

    if (savedTab) localStorage.setItem("selectedTab", savedTab);
    if (savedShift) localStorage.setItem("shiftTab", savedShift);

    return () => {
      // Keep tabs stored for back navigation
      // Uncomment to force clear on leave
      localStorage.removeItem("selectedTab");
      localStorage.removeItem("shiftTab");
    };
  }, []);

  console.log("Policy Document URL.............:", policyDocumentUrl);
  const age = user?.dateOfBirth
    ? (() => {
        const dob = new Date(user.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age;
      })()
    : "-";
  const customerDetails = [
    {
      item: t("bookingId"),
      value:
        details?.item?.orderId ||
        details?.item?.bookingId ||
        details?.items?.orderId ||
        details?.items?.id ||
        details?.data?.orderId ||
        items?.insuranceCompanyId?.vendorId ||
        "--",
    },
    { item: t("name"), value: user?.name || "-" },
    { item: t("age"), value: age || "-" },

    {
      item: t("phoneNumber"),
      value: user?.phone ? <span dir="ltr">{user.phone}</span> : "-",
    },
    { item: t("insuranceDetail"), value: items?.insuranceModelType || "-" },

    { item: t("from"), value: ambulnceAddressFrom || "-" },

    { item: t("to"), value: ambulnceAddressTo || "-" },
  ];

  const rentalDetails = [
    {
      item: t("pickupLocation"),
      value:
        details?.pickupLocation ||
        details?.item?.pickupLocation?.address ||
        details?.items?.requestId?.dropOff?.address ||
        details?.items?.pickupLocation?.address ||
        details?.data?.pickupLocation?.address ||
        "-",
    },
    {
      item: t("pickupDate&Time"),
      value: `${details?.pickDate || "-"}`,
    },
    {
      item: t("dropOffLocation"),
      value:
        details?.dropoffLocation ||
        details?.item?.dropoffLocation?.address ||
        details?.items?.dropoffLocation?.address ||
        details?.data?.dropoffLocation?.address ||
        "-",
    },
    {
      item: t("dropOffDate&Time"),
      value: `${details?.dropDate || "-"}`,
    },
  ];

  const localGateway = details?.gatewayName === "blinq";

  const paymentDetails = [
    {
      item: "totalAmount",
      value: localGateway ? `PKR ${totalAmount}` : `$ ${dollarAmount}`,
    },
    {
      item: "partialAmount",
      value: `${localGateway ? "PKR" : "$"} ${paidByUserAmount.toFixed(2)}`,
    },
    {
      item: "remainingAmount",
      value: localGateway
        ? `PKR ${remainingAmount.toFixed(2)}`
        : `$ ${remainingAmount.toFixed(2)}`,
    },
    ...(items?.gatewayName === "stripe"
      ? [
          {
            item: "processingFee",
            value: `$ ${processingFee.toFixed(2)}`,
          },
          {
            item: "payableAmount",
            value: `$ ${totalAmountWithFee.toFixed(2)}`,
          },
        ]
      : []),
    {
      item: "dueDate",
      value: dayjs(items?.tourId?.departDate).format("MM/DD/YYYY"),
    },
  ];
  const [open, setOpen] = React.useState(false);
  const dispatch: any = useDispatch();
  const handleTabChange = (tab: any) => {
    setList([]);
    setShift(tab);
  };
  const handlePayment = () => {
    dispatch(
      setPaymentParams({
        bookingID: items?._id,
        paidByUserAmount: items?.remainingAmount,
        processingFee: items?.processingFee,
      })
    );
    setOpen(true);
  };
  const biqReqId = state?.details?.data?.bidRequestId;
  const travellers = state?.details?.data?.travellers;

  const firstFlight = biqReqId?.flightDetails?.[0];

  // Remaining_RentCar
  // hotelRemaining
  // TourRemaing

  return (
    <>
      <div className={style.mainContainer}>
        <ServiceHeader
          desc_width="65%"
          headingBlue={t("booking")}
          headingOrange={t("details")}
        />

        {open ? (
          <Checkout
            serviceName={
              state?.details?.title === "Tour"
                ? "TourRemaing"
                : state?.details?.title === "Rent a car"
                ? "Remaining_RentCar"
                : "hotelRemaining"
            }
            convertedAmount={totalAmountWithFee}
          />
        ) : (
          <>
            <HeaderCard
              Styles={style}
              selected={activeTab}
              setSelected={(tab: string) => {
                localStorage.setItem("selectedTab", tab);
                navigate("/services/booking", {
                  state: {
                    details: {
                      ...details,
                      title: tab,
                      shift: activeShift,
                    },
                  },
                });
              }}
            />

            {storedSelectedTab === "Travel" && (
              <div
                style={{
                  marginTop: "36px",
                }}
              >
                <DoubleButton
                  tab1Label="FLIGHTS"
                  tab2Label="TOURS"
                  shift={shift}
                  onTabChange={handleTabChange}
                />
              </div>
            )}
            {(storedSelectedTab === "Travel" && shift === "FLIGHTS" && (
              <>
                <div style={{ marginTop: "36px", marginBottom: "24px" }}>
                  <p className={style.pageTitle}>{t("yourBookingsDetails")}</p>
                </div>

                <div className={style.mainCard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <div className={classNames(style.imgconatiner)}>
                        <img
                          src={logo}
                          alt={items?.[0]?.companyName}
                          className={style.flyimg}
                        />
                      </div>
                      <p className={classNames(style.heading)}>
                        {name}
                        {/* {state?.data?.companyName} */}
                      </p>
                    </div>

                    <div>
                      <p className={style.priceValue}>
                        <span style={{ fontSize: "14px" }}>
                          {state?.type === "booking" &&
                          state?.data?.bidRequestId?.gatewayName === "stripe"
                            ? "$"
                            : "Rs"}
                        </span>

                        {state?.type === "booking" &&
                        state?.data?.bidRequestId?.gatewayName === "stripe"
                          ? state?.data?.bidRequestId?.dollarAmount ||
                            state?.details?.data?.dollarAmount
                          : state?.data?.bidRequestId?.ticketPrice ||
                            biqReqId?.totalAmount}
                        {state?.details?.data?.dollarAmount}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      width: "100%",
                    }}
                  >
                    <p className={style.heading}>{t("flightDetails")}</p>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <p className={style.heading}>{t("flightType")}:</p>
                      <p className={style.detail}>{biqReqId?.requestType}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      width: "100%",
                    }}
                  >
                    <div style={{ display: "flex", gap: "10px" }}>
                      <p className={style.heading}>{t("travelerDetails")}:</p>

                      <p className={style.detail}>
                        {state?.details?.totalTravelers}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      width: "100%",
                    }}
                  >
                    <div style={{ display: "flex", gap: "10px" }}>
                      <p className={style.heading}>{t("cabinClass")}:</p>

                      <p className={style.detail}>{t("economy")}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: "16px", width: "100%" }}>
                    <>
                      <div
                        className={classNames(
                          commonstyle.flx,
                          commonstyle.flxWrap,
                          commonstyle.flxBetween
                        )}
                        style={{ gap: "100px" }}
                      >
                        <div
                          className={classNames(
                            commonstyle.col6,
                            commonstyle.colmd12,
                            commonstyle.colsm12
                          )}
                        >
                          {biqReqId?.flightDetails?.map(
                            (flight: any, index: number) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "100%",
                                  position: "relative",
                                }}
                              >
                                {/* FROM Section */}
                                <div
                                  style={{
                                    width: "25%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                  className={style.detail}
                                >
                                  <p className={style.heading}>{t("from")}</p>
                                  <p className={style.detail}>{flight?.from}</p>
                                  <p className={style.detail}>
                                    {dayjs(flight?.departureTime).format(
                                      "h:mm a"
                                    )}
                                  </p>
                                  <p className={style.detail}>
                                    {dayjs(flight?.departureDate).format(
                                      "DD-MM-YY"
                                    )}
                                  </p>
                                </div>

                                {/* Center Plane and Duration */}
                                <div
                                  style={{
                                    position: "relative",
                                    width: "50%",
                                    height: "1px",
                                    borderTop: "2px dotted #7D7D7D",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      position: "absolute",
                                      top: "-33px",
                                    }}
                                  >
                                    <TakeOff
                                    // fontSize={24}
                                    // color="#7D7D7D"
                                    />
                                    <p className={style.detail}>
                                      {flight?.companyName}
                                    </p>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      position: "absolute",
                                      top: "10px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <PiClockCountdownBold
                                      color="#7d7d7d"
                                      style={{ width: "16px", height: "16px" }}
                                    />
                                    <div className={style.heading}>
                                      {flight?.flightTime}
                                    </div>
                                  </div>
                                </div>

                                {/* TO Section */}
                                <div
                                  style={{
                                    marginLeft: "40px",
                                    width: "25%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                  className={style.detail}
                                >
                                  <p className={style.heading}>{t("to")}</p>
                                  <p className={style.detail}>{flight?.to}</p>
                                  <p className={style.detail}>
                                    {dayjs(flight?.arrivalTime).format(
                                      "h:mm a"
                                    )}
                                  </p>
                                  <p className={style.detail}>
                                    {dayjs(flight?.arrivalDate).format(
                                      "DD-MM-YY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div
                          className={classNames(
                            commonstyle.col6,
                            commonstyle.colmd12,
                            commonstyle.colsm12
                          )}
                        >
                          <div>
                            <div
                              className={classNames(
                                commonstyle.flx,
                                commonstyle.flxBetween,
                                commonstyle.flxWrap
                              )}
                            >
                              <div className={commonstyle.col6}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  <p className={classNames(style.heading)}>
                                    {t("amenities")}
                                  </p>

                                  {state?.details?.data?.bidRequestId?.flightDetails?.[0]?.amenities?.map(
                                    (amenity: any, i: number) => {
                                      return (
                                        <div
                                          key={i}
                                          style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center",
                                          }}
                                        >
                                          <TiTick size={20} color="green" />
                                          <p className={style.detail}>
                                            {amenity}
                                          </p>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>

                              <div className={commonstyle.col6}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  <p className={classNames(style.heading)}>
                                    {t("baggage")}
                                  </p>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <TiTick size={20} color="green" />
                                    <p className={style.detail}>
                                      {t("noOfHandBags")}:{" "}
                                      <span className={classNames(style.value)}>
                                        {firstFlight?.noOfHandbag}
                                      </span>
                                    </p>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      alignItems: "center",
                                    }}
                                    className={style.detail}
                                  >
                                    <TiTick size={20} color="green" />
                                    <p className={style.detail}>
                                      {t("baggageWeight")}:{" "}
                                      <span className={classNames(style.value)}>
                                        {firstFlight?.baggageWeight}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                  <div
                    className={classNames(commonstyle.mt24)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      width: "100%",
                    }}
                  >
                    {/* {state?.type === "booking" && ( */}
                    <>
                      <p className={style.heading}>{t("policies")}</p>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <p className={classNames(style.heading)}>
                          {t("cancallationDeduction")}
                        </p>
                        <p className={classNames(style.detail)}>
                          {biqReqId?.flightPolicies?.cancelationDeduction}
                          {
                            state?.data?.bidRequestId?.flightPolicies
                              ?.cancelationDeduction
                          }
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <p className={classNames(style.heading)}>
                          {t("cancellationDuration")}
                        </p>
                        <p className={classNames(style.detail)}>
                          {biqReqId?.flightPolicies?.cancelationDuration}
                          {
                            state?.data?.bidRequestId?.flightPolicies
                              ?.cancelationDuration
                          }
                        </p>
                      </div>
                    </>
                    {/* )} */}

                    <>
                      <div
                        className={classNames(
                          commonstyle.col4,
                          commonstyle.colsm12
                        )}
                      >
                        <div>
                          <span
                            className={style.heading}
                            style={{
                              display: "flex",
                              justifyItems: "center",
                              alignItems: "center",

                              margin: "16px 0",
                            }}
                          >
                            {t("eTicketFile")}
                          </span>
                          {state?.details?.data?.eTicket ? (
                            <div
                              style={{
                                width: "80%",
                                padding: "5px 16px",
                                borderWidth: "1px",
                                borderStyle: "dashed",
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "rgba(227, 235, 237, 1)",
                                borderRadius: "8px",
                                // marginTop: "8px",
                                justifyContent: "space-between",
                              }}
                            >
                              <span
                                style={{
                                  width: "60%",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                className={style.detail}
                              >
                                {fileName}
                              </span>

                              <button
                                onClick={() =>
                                  downloadAndSaveImage(
                                    state?.details?.data?.eTicket
                                  )
                                }
                                style={{
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <img
                                  src={LabDownload}
                                  // src={state?.data?.bidRequestId?.eTicket}
                                  alt="Download"
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    objectFit: "fill",
                                    // filter: `brightness(0) saturate(100%) invert(28%) sepia(89%) saturate(361%) hue-rotate(119deg) brightness(93%) contrast(86%)`,
                                  }}
                                />
                              </button>
                            </div>
                          ) : (
                            //
                            <span className={style.detail}>
                              {t("noEticketFound")}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                    {/* ) : ( */}
                    <></>
                  </div>
                </div>

                <div style={{ marginTop: "36px", marginBottom: "18px" }}>
                  <p className={style.pageTitle}>
                    <span>{t("travel")}</span> <span>{t("details")}</span>
                  </p>
                </div>

                <div className={style.cardGrid}>
                  {state?.details?.data?.travellers?.map(
                    (traveller: any, index: any) => (
                      <div key={traveller._id} className={style.card}>
                        <p className={style.heading}>
                          {t("passenger")} {index + 1} :{t("details")}
                        </p>

                        <div className={style.row}>
                          <div className={style.item}>
                            <p className={style.detail}>{t("name")}</p>
                            <p className={style.value}>{traveller?.name}</p>
                          </div>

                          <div className={style.item}>
                            <p className={style.detail}>{t("passportNo")}</p>
                            <p className={style.value}>
                              {traveller?.passportNo}
                            </p>
                          </div>
                        </div>

                        <div className={style.passportSection}>
                          <p className={style.heading}>
                            {t("passport")} {t("information")}
                          </p>
                          <div className={style.row}>
                            <div className={style.item}>
                              <p className={style.detail}>{t("Visa File")}</p>
                              {traveller?.visaFile && (
                                <img
                                  src={LabDownload}
                                  alt="Download Visa"
                                  onClick={() =>
                                    downloadAndSaveImage(
                                      traveller?.visaFile,
                                      "visa"
                                    )
                                  }
                                  className={style.downloadIcon}
                                />
                              )}
                            </div>

                            <div className={style.item}>
                              <p className={style.detail}>
                                {t("passportFile")}
                              </p>
                              {traveller?.passportFile && (
                                <img
                                  src={LabDownload}
                                  alt="Download Passport"
                                  onClick={() =>
                                    downloadAndSaveImage(
                                      traveller?.passportFile,
                                      "passport"
                                    )
                                  }
                                  className={style.downloadIcon}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )) || (
              <div className={style.detailsContainer}>
                <div className={style.firstCol}>
                  <div style={{ marginBottom: "5px" }}>
                    <p className={style.title}>{t("customerDetails")}</p>
                  </div>

                  {customerDetails
                    .filter((item) => item.value && item.value !== "-")
                    .map((item, index) => (
                      <div className={style.itembar} key={index}>
                        <div className={style.itemheading}>
                          <p className={style.item}>{item.item}</p>
                        </div>
                        <div className={style.itemvalue}>
                          <p className={style.value}>{item.value}</p>
                        </div>
                      </div>
                    ))}

                  {rentalDetails.filter(
                    (item) => item.value && item.value !== "-"
                  ).length > 0 && (
                    <>
                      <div style={{ marginBottom: "5px" }}>
                        <p className={style.title}>{t("")}</p>
                      </div>
                      {rentalDetails
                        .filter((item) => item.value && item.value !== "-")
                        .map((item, index) => (
                          <div className={style.itembar} key={index}>
                            <p className={style.item}>{item.item}</p>
                            <p className={style.value}>{item.value}</p>
                          </div>
                        ))}
                    </>
                  )}
                </div>

                <div className={style.secCol}>
                  <div className={style.sperator}></div>
                  <div className={style.secColInner}>
                    {items && storedSelectedTab ? (
                      storedSelectedTab === "Insurance" ? (
                        <>
                          {console.log("Insurance tab selected")}
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div style={{ marginBottom: "5px" }}>
                              <p
                                className={style.title}
                                style={{
                                  lineHeight: isRtl ? "30px" : "normal",
                                }}
                              >
                                {t("insuranceFile")}
                              </p>
                            </div>

                            <div style={{ flex: "1" }}>
                              <div style={{ display: "flex" }}>
                                <div>
                                  {insuranceFile && (
                                    <button
                                      onClick={() =>
                                        downloadAndSaveImage(
                                          insuranceFile,
                                          "insuranceFile"
                                        )
                                      }
                                      style={{
                                        border: "none",
                                        cursor: "pointer",
                                        width: "211px",
                                        height: "40px",
                                        fontSize: "14px",
                                        color: "#FFFFFF",
                                        backgroundColor: "#0E54A3",
                                        boxShadow: "4px 4px 12px 0px #00000040",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "24px",
                                        gap: "8px",
                                      }}
                                    >
                                      <img
                                        src={LabDownload}
                                        alt="Download"
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                          objectFit: "fill",
                                        }}
                                      />
                                      <p>{t("insuranceFile")}</p>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div style={{ margin: "5px 0" }}>
                              <p
                                className={style.title}
                                style={{
                                  lineHeight: isRtl ? "30px" : "normal",
                                }}
                              >
                                {`${t("insurance")} ${t("and")} ${t("policy")}`}
                              </p>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                              }}
                            >
                              <div>
                                {policyDocumentUrl && (
                                  <button
                                    onClick={() =>
                                      downloadAndSaveImage(
                                        policyDocumentUrl,
                                        "PolicyDocument"
                                      )
                                    }
                                    style={{
                                      border: "none",
                                      cursor: "pointer",
                                      width: "211px",
                                      height: "40px",
                                      fontSize: "14px",
                                      color: "#FFFFFF",
                                      backgroundColor: "#0E54A3",
                                      boxShadow: "4px 4px 12px 0px #00000040",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      borderRadius: "24px",
                                      gap: "8px",
                                    }}
                                  >
                                    <img
                                      src={LabDownload}
                                      alt="Download"
                                      style={{
                                        height: "20px",
                                        width: "20px",
                                        objectFit: "fill",
                                      }}
                                    />
                                    <p style={{ margin: 0 }}>
                                      {t("policyDocuments")}
                                    </p>
                                  </button>
                                )}
                              </div>

                              <div>
                                {claimProcess && (
                                  <button
                                    onClick={() =>
                                      downloadAndSaveImage(
                                        claimProcess,
                                        "ClaimProcess"
                                      )
                                    }
                                    style={{
                                      border: "none",
                                      cursor: "pointer",
                                      width: "211px",
                                      height: "40px",
                                      fontSize: "14px",
                                      color: "#FFFFFF",
                                      backgroundColor: "#0E54A3",
                                      boxShadow: "4px 4px 12px 0px #00000040",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      borderRadius: "24px",
                                      gap: "8px",
                                    }}
                                  >
                                    <img
                                      src={LabDownload}
                                      alt="Download"
                                      style={{
                                        height: "20px",
                                        width: "20px",
                                        objectFit: "fill",
                                      }}
                                    />
                                    <p style={{ margin: 0 }}>
                                      {t("claimProcess")}
                                    </p>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ marginBottom: "5px" }}>
                            <p className={style.title}>{t("paymentDetails")}</p>
                          </div>

                          {typeof items.isPaidFull === "boolean" &&
                          items.isPaidFull === false ? (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {paymentDetails
                                  .filter(
                                    (item) => item.value && item.value !== "-"
                                  )
                                  .map((item, index) => (
                                    <div className={style.itembar} key={index}>
                                      <p className={style.item}>
                                        {t(item.item)}
                                      </p>
                                      <p className={style.value}>
                                        {item.value}
                                      </p>
                                    </div>
                                  ))}
                                <div style={{ marginTop: "10px" }}>
                                  <span style={{ color: "#B3261E" }}>
                                    {t("pendingAmountMessage")}
                                  </span>
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flex: 1,
                                  marginTop: "10px",
                                }}
                              >
                                <button
                                  className={style.Paybtn}
                                  onClick={handlePayment}
                                >
                                  {t("payment")}
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className={style.paymentcontainer}>
                              <p className={style.paymentComplete}>
                                {t("paymentCompleted")}
                              </p>
                            </div>
                          )}
                        </>
                      )
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footerr />
    </>
  );
};

export default UserDetails;
