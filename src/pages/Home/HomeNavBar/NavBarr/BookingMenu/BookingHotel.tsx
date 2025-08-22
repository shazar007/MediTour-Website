import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "../../Footer";
import { useNavigate } from "react-router-dom";
import styles from "./BookingHotel.module.css";
import DownloadImagelogo from "../../../../../assets/images/DownloadImagelogo.png";
import Styles from "./NavigateBar.module.css";
import { getAllBookings } from "shared/services";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import DoubleButton from "shared/components/Buttons/DoubleButton";
import NewPagination from "shared/components/NewPagination/NewPagination";
import FlightContent from "./FlightContent";
import BidDetailsComponent from "./Travel/BidDetails/BidDetailsComponent";
import CustomLoader from "shared/components/New_Loader/Loader";
import dayjs from "dayjs";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useDirection } from "shared/utils/DirectionContext";
import UserCard from "shared/components/A_New_Components/UserCard";
import { BiFontSize } from "react-icons/bi";
const MyBookingHotel = React.memo((props) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("selectedTab") || t("hotel");
  });
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState(() => {
    return localStorage.getItem("shiftTab") || "FLIGHTS";
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const onsSelectCard = async (title: any) => {
    setList([]);
    setSelected(title);
  };
  useEffect(() => {
    setLoading(true);
    fetchOrders(currentPage);
  }, [selected, shift]);

  const fetchOrders = (pagenum: number) => {
    setLoading(true);
    let type =
      selected === "Travel" && shift === "FLIGHTS"
        ? "flight"
        : selected === "Travel" && shift === "TOURS"
          ? "tour"
          : selected === "Rent a car"
            ? "rentcar"
            : selected?.toLowerCase();
    getAllBookings(type, pagenum)
      .then((res: any) => {
        setList(res?.data?.bookings);
        console.log("🚀 ~ .then ~ bookings:", res?.data?.bookings);
        setTotalItems(res?.data?.totalBookings);
        // console.log("🚀 ~ .then ~ totalBookings:", res?.data?.totalBookings);
      })
      .catch((err: any) => {
        console.log("🚀 ~ fetchOrders ~ err:", err?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTabChange = (tab: any) => {
    setList([]);
    setShift(tab);
  };
  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    const savedShift = localStorage.getItem("shiftTab");

    if (savedTab) {
      setSelected(savedTab);
    }

    if (savedShift) {
      setShift(savedShift);
    }

    setLoading(true);
    // fetchOrders(currentPage);
  }, [currentPage]);

  const viewDetails = (item?: any, checkTraveler?: any) => {
    console.log("🚀 ~ viewDetails ~ item:", item)
    localStorage.setItem("selectedTab", selected);
    localStorage.setItem("shiftTab", shift);

    const baseDetails: any = {
      title: selected,
      type: "",
    };
    // console.log("🚀 ~ viewDetails ~ baseDetails:", baseDetails)

    if (selected === "Insurance") {
      baseDetails.item = item;
      baseDetails.type = "insurance";
    } else if (selected === "Rent a car") {
      baseDetails.items = item;
      baseDetails.type = "BookingCar";
      baseDetails.pickupLocation = item?.pickupLocation;
      baseDetails.dropoffLocation = item?.dropoffLocation;
      baseDetails.pickDate = dayjs
        .utc(item?.pickupDateTime)
        .format("MM/DD/YYYY, hh:mm A");
      baseDetails.dropDate = dayjs
        .utc(item?.dropoffDateTime)
        .format("MM/DD/YYYY, hh:mm A");
    } else if (selected === t("hotel")) {
      baseDetails.data = item;
      baseDetails.type = "hotelRemaining";
    } else if (selected === "Travel" && shift === "TOURS") {
      baseDetails.title = "Tour";
      baseDetails.item = item;
      baseDetails.type = "TourBooking";
    } else if (selected === "Travel" && shift === "FLIGHTS") {
      baseDetails.title = "Flight";
      baseDetails.data = item;
      baseDetails.totalTravelers = checkTraveler;
      baseDetails.type = "Flight";
    } else if (selected === "Ambulance") {
      baseDetails.title = "Ambulance";
      baseDetails.data = item;
      baseDetails.type = "Ambulance";
    }
    const handleSpaces =
      selected === "Rent a car" ? selected.replace(/\s+/g, "") : selected;
    // console.log("🚀 ~ viewDetails ~ handleSpaces:", handleSpaces);

    navigate(`/services/userDetails/${handleSpaces}`, {
      state: {
        details: baseDetails, // only ONE key sent
      },
    });
    // console.log("........show ", handleSpaces)
  };

  // console.log("🚀 ~ viewDetails ~ selected:", selected);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchOrders(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    fetchOrders(currentPage - 1);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div>
          <ServiceHeader
            desc_width="65%"
            headingBlue={t("my")}
            headingOrange={t("bookings")}
          />
          <HeaderCard
            Styles={Styles}
            setSelected={onsSelectCard}
            selected={selected}
          />
          <div
            className={classNames(commonstyles.container)}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 0",
            }}
          >
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>

          {selected === "Travel" && (
            <div style={{ margin: "20px 0" }}>
              <DoubleButton
                tab1Label="FLIGHTS"
                tab2Label="TOURS"
                shift={shift}
                onTabChange={handleTabChange}
              />
            </div>
          )}
        </div>
        {list?.length > 0 ? (
          <div>
            {list.map((item: any) => {
              const totalTravelers =
                item?.adult + item?.children + item?.infant;
              const inBooking =
                item.requestId?.adult +
                item?.requestId?.children +
                item?.requestId?.infant;
              const checkTraveler = totalTravelers || inBooking;

              return (
                <>
                  {(() => {
                    const commonProps = {
                      buttontext: t("details"),
                      onButtonClick: () =>
                        selected === "Travel" && shift === "FLIGHTS"
                          ? viewDetails(item, checkTraveler)
                          : viewDetails(item),
                    };

                    // Determine card type
                    const isFlight =
                      selected === "Travel" && shift === "FLIGHTS";
                    const isAmbulance = selected === "Ambulance";
                    const isInsurance = selected === "Insurance";
                    const isrentacar = selected === "Rent a car";


                    const isTour = selected === "Travel" && shift === "TOURS";

                    // Dynamic props
                    const cardProps = {
                      img: isFlight
                        ? item?.agencyId?.logo || ""
                        : item?.insuranceCompanyId?.logo ||
                        item?.vehicleId?.vehicleImages?.[0] ||
                        item?.tourId?.images?.[0] ||
                        item?.serviceId?.propertyphoto?.[0] ||
                        "",

                      name: isFlight
                        ? item?.agencyId?.name || "N/A"
                        : item?.insuranceCompanyId?.name ||
                        item?.vehicleId?.vehicleName ||
                        item?.packageName ||
                        item?.serviceId?.propertyName ||
                        (isAmbulance ? item?.ambulanceId?.name : "") ||
                        "N/A",

                      verified: !isFlight && item?.vehicleId?.vehicleType,

                      paid: isFlight ? (
                        <span
                          className={styles.eTicketText}
                          style={{
                            color: item?.eTicket ? "#13A89E" : "#B3261E",
                          }}
                        >
                          {item?.eTicket
                            ? t("eTicketUploaded")
                            : t("eTicketUploadedIn_")}
                        </span>
                      ) : isAmbulance ? (
                        <p
                          style={{
                            marginTop: "16px",
                            color:
                              item?.status === "in-progress"
                                ? "rgba(0, 39, 109, 1)"
                                : "rgba(0, 123, 27, 1)",
                          }}
                        >
                          {item?.status === "in-progress"
                            ? t("yourAmbulanceIsInRunning")
                            : t("yourAmbulanceCompleted")}
                        </p>
                      ) : isInsurance ? (
                        item?.gatewayName === "stripe" && item?.dollarAmount ? (
                          <p
                            style={{
                              fontWeight: 600,
                              fontSize: 24,
                              lineHeight: "14px",
                              letterSpacing: "-0.25px",
                              color: "#131313",
                            }}
                          >
                            <span style={{ fontSize: 16 }}>$ </span>
                            {item.dollarAmount}
                          </p>
                        ) : item?.totalAmount ? (
                          <p
                            style={{
                              fontWeight: 600,
                              fontSize: 24,
                              lineHeight: "14px",
                              letterSpacing: "-0.25px",
                              color: "#131313",
                            }}
                          >
                            <span style={{ fontSize: 16 }}>Pkr </span>
                            {item.totalAmount}
                          </p>
                        ) : (
                          "N/A"
                        )
                      ) : (
                        <span
                          style={{
                            color:
                              item?.isPaidFull === false
                                ? "#B3261E"
                                : "#2E7D32",
                          }}
                        >
                          {item?.isPaidFull === false
                            ? t("pendingAmountMessage")
                            : t("fullyPaid")}
                        </span>
                      ),

                      items: isFlight
                        ? [
                          {
                            title: t("flightType"),
                            value: item?.requestId?.requestType || "N/A",
                          },
                          { title: t("traveler"), value: inBooking || "N/A" },
                          {
                            title: t("from"),
                            value:
                              Array.isArray(item?.requestId?.flights) &&
                                item.requestId.flights.length > 0
                                ? item.requestId.flights[0]?.from || "N/A"
                                : "N/A",
                          },
                          {
                            title: t("to"),
                            value:
                              Array.isArray(item?.requestId?.flights) &&
                                item.requestId.flights.length > 0
                                ? item.requestId.flights[0]?.to || "N/A"
                                : "N/A",
                          },
                          {
                            title: t("class"),
                            value: item?.requestId?.flightClass,
                          },
                          {
                            title: t("departure"),
                            value: dayjs(item?.requestId?.departure).format(
                              "MM-DD-YYYY"
                            ),
                          },
                        ]
                        : isAmbulance
                          ? [
                            {
                              title: t("from"),
                              value: item?.requestId?.pickUp?.address,
                            },
                            {
                              title: t("to"),
                              value: item?.requestId?.dropOff?.address,
                            },
                            {
                              title: t("status"),
                              value: item?.requestId?.status,
                            },
                          ].filter(Boolean)
                          : [
                            ...(selected === "Rent a car"
                              ? [
                                {
                                  title: t("bookingId"),
                                  value: item?.orderId || item?.bookingId,
                                },
                              ]
                              : []),
                            ...(item?.insuranceId?.perYear ||
                              item?.pickupDateTime
                              ? [
                                {
                                  title: item?.insuranceId?.perYear
                                    ? t("duration")
                                    : t("pickupDate&Time"),
                                  value:
                                    item?.insuranceId?.perYear ||
                                    dayjs
                                      .utc(item?.pickupDateTime)
                                      .format("M/D/YYYY, h:mm A")

                                },
                              ]
                              : []),
                            ...(selected !== "Insurance" &&
                              item?.dropoffDateTime
                              ? [
                                {
                                  title: t("dropOffDate&Time"),
                                  value: dayjs
                                    .utc(item.dropoffDateTime)
                                    .format("M/D/YYYY, h:mm A")

                                },
                              ]
                              : []),
                            ...(isTour
                              ? [
                                {
                                  title: t("bookingDate&Time"),
                                  value: item?.totalUser,
                                },
                              ]
                              : []),


                            ...(isInsurance && item?.createdAt
                              ? [
                                {
                                  title: t("policyStartDate"),
                                  value: dayjs
                                    .utc(item?.createdAt)
                                    .format("M/D/YYYY, h:mm A")

                                },
                                {
                                  title: `${t("id")} ${t("insurance")}`,
                                  value:
                                    item?.insuranceCompanyId?.vendorId ||
                                    "--",
                                },
                              ]
                              : []),
                          ].filter(Boolean),
                      TotalAmount: isAmbulance || isrentacar
                        ? item?.gatewayName === "stripe"
                          ? `$${item?.dollarAmount || "0"}`
                          : `Rs ${item?.totalAmount || "0"}`
                        : selected !== "Insurance" && shift !== "FLIGHTS"
                          ? item?.gatewayName === "stripe" && item?.dollarAmount
                            ? `$${item.dollarAmount}`
                            : item?.totalAmount
                              ? `Rs ${item.totalAmount}`
                              : "N/A"
                          : undefined
                    };

                    return <UserCard {...commonProps} {...cardProps} />;
                  })()}
                </>
              );
            })}
          </div>
        ) : (
          <div>{!loading && <PhysiotheristsEmpty />}</div>
        )}

        {loading && <CustomLoader />}
      </div>
      <Footerr />
    </>
  );
});

export const HeaderCard = ({
  Styles,
  setSelected,
  selected,
  shift,
}: {
  Styles?: any;
  setSelected?: (value: string) => void;
  selected?: string;
  shift?: string;
}) => {
  const { t }: any = useTranslation();

  const data = [
    { id: 0, title: "Hotel" },
    { id: 4, title: "Rent a car" },
    { id: 1, title: "Insurance" },
    { id: 3, title: "Travel" },
    { id: 2, title: "Ambulance" },
  ];

  const translationMap: Record<string, string> = {
    Hotel: t("hotel"),
    "Rent a car": t("rentACar"),
    Insurance: t("insurance"),
    Travel: t("travel"),
    Ambulance: t("ambulance"),
  };

  return (
    <div className={Styles.navContainer}>
      {data.map((item) => (
        <button
          key={item.id}
          className={`${Styles.navButton} ${selected === item.title ? Styles.active : ""
            }`}
          onClick={() => setSelected?.(item.title)}
        >
          {translationMap[item.title] || item.title}
        </button>
      ))}
    </div>
  );
};

export default MyBookingHotel;
