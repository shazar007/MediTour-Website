import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footerr from "pages/Home/HomeNavBar/Footer";
import commonstyles from "shared/utils/common.module.css";
import cardimg from "assets/images/Hotel/cardimg.png";
import HotelSlider from "./Slider/Sliderimg";
import room from "assets/images/Hotel/Rooms.png";
import Restaurant from "assets/images/Hotel/Restaurant.png";
import Home from "assets/images/Hotel/Home.png";
import RangePickerStepByStep from "shared/components/A_New_Components/RangeDatePicker";
import { Dayjs } from "dayjs";
import house from "assets/images/Hotel/Iocn House.png";
import camp from "assets/images/Hotel/icon-camp.png";
import container from "assets/images/Hotel/Icon container.png";
import pod from "assets/images/Hotel/Icon Pod.png";
import farmhouse from "assets/images/Hotel/Icon Farmhouse.png";
import Rooms from "assets/images/Hotel/IconRooms.png";
import GuestHouse from "assets/images/Hotel/Icon Guest House.png";
import TreeHouse from "assets/images/Hotel/Icon TreeHouse.png";
import Suite from "assets/images/Hotel/Icon Suite.png";
import DetailCard from "../DetailCard";
import RoomService from "assets/images/Hotel/RoomService.png";
import Icon_Ac from "assets/images/Hotel/Icon_Ac.png";
import Icon_Parking from "assets/images/Hotel/Icon_Parking.png";
import Icon_SecurityCam from "assets/images/Hotel/Icon_SecurityCam.png";
import Icon_Wifi from "assets/images/Hotel/Icon_Wifi.png";
import Icon_gym from "assets/images/Hotel/Icon_gym.png";
import Icon_swimming from "assets/images/Hotel/Icon_swimming-bold.png";
import Icons_washing from "assets/images/Hotel/Icons_washing-machine.png";
import Icon_tv from "assets/images/Hotel/Icon_tv.png";
import Icon_worker from "assets/images/Hotel/Icon_worker.png";

import checkin from "assets/images/Hotel/Icon Checkin.png";
import Checkout from "assets/images/Hotel/Icon Checkin.png";
import Cancel from "assets/images/Hotel/Icon Cancel.png";
import payment from "assets/images/Hotel/Icon Payment.png";
import smoking from "assets/images/Hotel/Icon smoking.png";
import Pets from "assets/images/Hotel/Icon Pets.png";
import SurroundingProperty from "assets/images/Hotel/Icon Branches.png";
import Bathroom from "assets/images/Hotel/Icon Bathroom.png";
import NewReviews from "shared/components/A_New_Components/Reviews";
import { GoDotFill } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { FaLocationDot } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdLocalPhone } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const addressItems = [
  { img: <MdLocalPhone color="#7d7d7d" />, item: "+92-322-1234567" },
  {
    img: <FaLocationDot color="#7d7d7d" />,
    item: "154-D Mall Road, Naltar, Gilgit.",
  },
];

const features = [
  "Room Service",
  "Restaurant",
  "Internet",
  "Parking",
  "Outdoor",
  "Activities",
];

const propertyDetails = [
  {
    img: checkin,
    title: "Check-in",
    time: "From 2:00 PM",
    description:
      "You need to let the property know what time you'll be arriving in advance.",
  },
  {
    img: Checkout,
    title: "Check-out",
    time: "From 11:00 AM",
    description: "Check-out before this time to avoid extra charges.",
  },
  {
    img: Cancel,
    title: "Cancellation",
    description:
      "Cancellation and prepayment policies vary according to accommodation type.",
  },
  {
    img: payment,
    title: "Payment",
    description:
      "Accepted payment methods include credit/debit cards and cash.",
  },
  {
    img: smoking,
    title: "Smoking",
    description: "Smoking is not allowed inside the property.",
  },
  {
    img: Pets,
    title: "Pets",
    description: "Pets are not allowed.",
  },
  {
    img: SurroundingProperty,
    title: "Surroundings",
    description: "Explore nearby attractions and local branches.",
  },
  {
    img: Bathroom,
    title: "Bathroom",
    description: "Private bathrooms available in every unit.",
  },
];

const reviews = [
  {
    ratingstar: 4,
    comment:
      "The house is equipped with all the things necessary. Rooms on the first floor are nice with comfy beds. The room in the basement has a bit of a smell of dampness, perhaps the lack",
    name: "Umair Yacoob",
  },
  {
    ratingstar: 5,
    comment:
      "Great place! Everything was perfect, and the service was top-notch. Highly recommended.",
    name: "Sara Ali",
  },
  {
    ratingstar: 3,
    comment:
      "The room was okay, but it could be better maintained. Service was decent, though.",
    name: "John Doe",
  },
  {
    ratingstar: 4,
    comment:
      "A good experience overall, with friendly staff and a comfortable environment.",
    name: "Aisha Khan",
  },
];

const amenities = [
  { img: RoomService, title: "Room Services" },
  { img: Icon_Ac, title: "Air Conditioning" },
  { img: Icon_Parking, title: "Parking" },
  { img: Icon_tv, title: "TV" },
  { img: Icon_SecurityCam, title: "Security Cam" },
  { img: Icon_Wifi, title: "Wi-Fi" },
  { img: Icon_gym, title: "Gym" },
  { img: Icon_swimming, title: "Swimming Pool" },
  { img: Icons_washing, title: "Laundry" },
  { img: Icon_worker, title: "Security Guards" },
];

const HotelDetail = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const [showNumber, setShowNumber] = useState(false);
  const [showCalender, setshowCalender] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [showGuest, setshowGuest] = useState(false);
  const [showHouse, setshowHouse] = useState(false);
  const [activePicker, setActivePicker] = useState<"start" | "end" | null>(
    null
  );

  const roomData = [
    { img: room, item: `22 ${t("rooms")}` },
    { img: Home, item: `03 ${t("suites")}` },
    { img: Restaurant, item: `${t("restaurant")}` },
  ];

  const handleroomNavigate = () => {
    navigate("/services/hotel/HotelBooking", { state: { type: "room" } });
  };

  const handleNavigatehotel = () => {
    navigate("/services/hotel/HotelBooking", { state: { type: "other" } });
  };
  const location = useLocation();
  const type = location.state?.type;
  const handleCheckInClick = () => {
    setshowCalender(true);
    setActivePicker("start");
  };

  const handleCheckOutClick = () => {
    setshowCalender(true);
    setActivePicker("end");
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const handleLguest = () => {
    setshowGuest(true);
  };
  const handlehome = () => {
    setshowHouse(true);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setshowCalender(false);
        setshowGuest(false);
        setshowHouse(false);
        setActivePicker(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className={classNames(style.maincontainer)}>
        <div className={classNames(style.labcontainer)}>
          <div className={classNames(style.firstcolumn)}>
            <section className={classNames(style.mainsection)}>
              <div className={classNames(style.imgcontainer)}>
                <HotelSlider />
              </div>
              <div className={classNames(style.detailsection)}>
                <div style={{ marginTop: "10px" }}>
                  <p className={style.labname}>Green Pak North</p>
                  <div
                    className={classNames(commonstyles.mt16, commonstyles.mb16)}
                  >
                    <p className={style.verifiedtext}>Hotel One Hunza</p>
                  </div>
                </div>

                <section className={classNames(style.bottomsection)}>
                  <LabBottom
                    text="Lahore: 7-Jail Road Main Gulberg"
                    img={<FaLocationDot color="#7d7d7d" />}
                  />
                </section>
              </div>
            </section>

            {type !== "room" && (
              <>
                <section className={classNames(style.aboutsection)}>
                  <p className={style.labname}>{t("featuring")}</p>
                </section>

                <div className={style.featureContainer}>
                  {features.map((feature, index) => (
                    <Feature key={index} item={feature} />
                  ))}
                </div>

                <DetailCard
                  cardImage={cardimg}
                  hotelName="Hotel Name"
                  onPannelText={true}
                  cityName="Gilgit"
                  data={roomData}
                  address={addressItems}
                  features={features}
                  experience="08 Years"
                  satisfiedGuest="98% (660)"
                  onDetailsClick={handleNavigatehotel}
                />
              </>
            )}

            <section className={classNames(style.aboutsection)}>
              <p className={style.labname}>{t("hostedBy")}</p>
            </section>

            <div className={style.hostedcontainer}>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div className={style.hostedimgconatiner}>
                  <img
                    src={cardimg}
                    alt="hostedimg"
                    className={style.hostedimg}
                  />
                </div>
                <p
                  className={style.verifiedtext}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Hotel One Hunza
                </p>
              </div>
              <p
                className={style.hotstedtext}
                style={
                  isRtl
                    ? {
                        direction: "ltr",
                        textAlign: "justify",
                        textAlignLast: "auto",
                      }
                    : {}
                }
              >
                <span>
                  Situated in the heart of the stunning Hunza Valley, GreenPak
                  Hotel Hunza is your serene retreat amidst the awe-inspiring
                  Himalayas.
                </span>
              </p>
            </div>

            <section className={classNames(style.aboutsection)}>
              <p className={style.labname}>{t("whatThisPlaceOffers")}</p>
            </section>

            <div className={style.placeConatiner}>
              {amenities.map((item, index) => (
                <div key={index} className={style.placeCard}>
                  <div className={style.placeimgConatiner}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className={style.placeimg}
                    />
                  </div>
                  <p className={style.placeText}>{item.title}</p>
                </div>
              ))}
            </div>

            <section className={classNames(style.aboutsection)}>
              <p className={style.labname}>{t("aboutThisProperty")}</p>
            </section>
            <div className={style.propertycard}>
              {propertyDetails.map((item, index) => (
                <div key={index} className={style.propertyrow}>
                  <div className={style.leftSide}>
                    <div className={style.placeimgConatiner}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className={style.placeimg}
                      />
                    </div>
                    <p className={style.placeText}>{item.title}</p>
                  </div>

                  <div className={style.rightSide}>
                    <p className={style.propertytext}>
                      {item.time && (
                        <p>
                          {item.time}
                          <br />
                        </p>
                      )}

                      <p
                        style={
                          isRtl ? { direction: "rtl", textAlign: "right" } : {}
                        }
                      >
                        {item.description}
                      </p>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <AboutSection
              sections={[
                {
                  aboutText: t("hotelRule"),
                  detailText: [
                    `${t("checkIn")} 2:00pm ${t("to")} 7:00pm ${t(
                      t("checkout")
                    )} 11:00am `,
                    t("clarityStateIfThe_"),
                    t("specifyIfPetsAllowed"),
                    t("guestsWillBeHeld_"),
                    t("theHotelIsNotResponsible_"),
                    t("theHotelIsNotLiable_"),
                  ],
                },
                {
                  aboutText: t("reservationConfirmation"),
                  detailText: [t("reservationConfirmationCon")],
                },
                {
                  aboutText: t("cancellationWindow"),
                  detailText: [
                    t("canellationAndPrepaymemt_Des"),
                    t("EnterYourStayDates_Des"),
                  ],
                },
              ]}
            />

            <section className={classNames(style.aboutsection)}>
              <p className={style.labname}>{t("reviews")}</p>
            </section>

            <div className={style.reviewConatiner}>
              {reviews.map((review, index) => (
                <div key={index} style={{ width: "330px" }}>
                  <NewReviews
                    ratingstar={review.ratingstar}
                    comment={review.comment}
                    name={review.name}
                  />
                </div>
              ))}
            </div>

            {/* ............. */}
          </div>
          <div className={classNames(style.secoundtcolumn)}>
            <div className={classNames(style.bookingcard)}>
              <p className={style.abouttext}>{t("requestaConsult")}</p>

              <p
                className={style.deatiltext}
                style={isRtl ? { lineHeight: "34px" } : {}}
              >
                {t("sendRequestsupport")}
              </p>

              <div
                style={{
                  marginTop: "16px",
                  marginBottom: "36px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {!showNumber && (
                  <button
                    className={style.helpbutton}
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
              </div>

              <p className={style.abouttext}>{t("selectCheckInCheckout")}</p>

              <div
                className={style.buttonContainer}
                style={{ position: "relative" }}
              >
                <button
                  className={style.checkinbtn}
                  onClick={handleCheckInClick}
                >
                  <p>{t("checkInDate")}</p>
                  <p>
                    {startDate
                      ? startDate.format("DD MMMM, YYYY")
                      : "23 April, 2025"}
                  </p>
                </button>
                <button
                  className={style.checkinbtn}
                  onClick={handleCheckOutClick}
                >
                  <p>{t("checkoutDate")}</p>
                  <p>
                    {endDate
                      ? endDate.format("DD MMMM, YYYY")
                      : "23 April, 2025"}
                  </p>
                </button>

                {showCalender && (
                  <div ref={containerRef}>
                    <RangePickerStepByStep
                      activePicker={activePicker}
                      setActivePicker={setActivePicker}
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      startAnchorStyle={{
                        position: "absolute",
                        top: 20,
                        left: 100,
                      }}
                      endAnchorStyle={{
                        position: "absolute",
                        top: 20,
                        left: 100,
                      }}
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  position: "relative",
                }}
              >
                <button className={style.guestbtn} onClick={handleLguest}>
                  <p>
                    {" "}
                    <span style={{ fontWeight: 600 }}>{t("who")}</span> !{" "}
                    {t("addGuest")}
                  </p>
                  <MdKeyboardArrowDown
                    color="#7d7d7d"
                    style={{
                      width: "14px ",
                      height: "24px",
                      display: "flex",
                      alignSelf: "center",
                    }}
                  />
                </button>
                <button className={style.guestbtn} onClick={handlehome}>
                  <p> {t("selectType")}</p>
                  <MdKeyboardArrowDown
                    color="#7d7d7d"
                    style={{
                      width: "14px ",
                      height: "24px",
                      display: "flex",
                      alignSelf: "center",
                    }}
                  />
                </button>
                {showGuest && (
                  <div ref={containerRef}>
                    <Guest t={t} onClose={() => setshowGuest(false)} />
                  </div>
                )}

                {showHouse && (
                  <div ref={containerRef}>
                    <SelectType t={t} onClose={() => setshowHouse(false)} />
                  </div>
                )}
              </div>

              <button
                className={style.helpbutton}
                // onClick={() => setShowNumber(true)}
                onClick={handleroomNavigate}
              >
                {t("search")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footerr />
    </>
  );
};

export default HotelDetail;

const LabBottom = ({ text, img }: any) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px ",
        alignItems: "center",
        margin: "6px 0",
      }}
    >
      <div className={classNames(style.detailimgcontainer)}>
        <img
          src={img}
          alt="detail"
          style={{ width: "100%", height: "100%", display: "flex" }}
        />
      </div>
      <p className={style.detailitemtext}>{text}</p>
    </div>
  );
};

export const AboutSection = ({
  sections,
}: {
  sections?: { aboutText?: any; detailText?: any[] }[];
}) => {
  return (
    <>
      {sections?.map((section, index) => (
        <section
          key={index}
          style={{
            marginTop: "36px",
          }}
        >
          {section.aboutText && (
            <p className={style.abouttext}>{section.aboutText}</p>
          )}
          {section.detailText?.map((text, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                margin: "12px 0",
              }}
            >
              <GoDotFill className={style.lidot} />
              <div style={{ width: "90%" }}>
                <p className={style.deatiltext}>{text}</p>
              </div>
            </div>
          ))}
        </section>
      ))}
    </>
  );
};

const Feature = ({ item }: any) => {
  return (
    <div>
      <div className={style.featureCard}>{item}</div>
    </div>
  );
};

type GuestType = "adult" | "children" | "infants" | "pets";
type GuestItem = {
  type: GuestType | "footer";
  label: string;
  subtitle?: string;
};

const initialGuestTypes: GuestItem[] = [
  { type: "adult", label: "adult", subtitle: "age13_Above" },
  { type: "children", label: "children", subtitle: "age2_12" },
  { type: "infants", label: "infants", subtitle: "under2" },
  { type: "pets", label: "pets" },
  { type: "footer", label: "footer" },
];

const Guest = ({ t, onClose }: any) => {
  const [guestCounts, setGuestCounts] = useState<Record<GuestType, number>>({
    adult: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleChange = (type: GuestType, isIncrement: boolean) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: isIncrement ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  const handleClear = () => {
    setGuestCounts({
      adult: 1,
      children: 0,
      infants: 0,
      pets: 0,
    });
  };

  return (
    <div className={style.guestContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 5px",
          borderBottom: "0.5px #7D7D7D dotted",
        }}
      >
        <p className={style.cardheading}>{t("addGuest")}</p>
        <IoClose
          style={{ width: 12, height: 12, cursor: "pointer" }}
          onClick={onClose}
        />
      </div>

      {initialGuestTypes.map((item) => {
        if (item.type === "footer") {
          return (
            <div
              key={item.type}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <button className={style.clearbtn} onClick={handleClear}>
                {t("clear")}
              </button>
              <button className={style.clearbtn}>{t("ok")}</button>
            </div>
          );
        }

        return (
          <div
            key={item.type}
            className={style.cardrow}
            style={
              item.type === "pets"
                ? {
                    padding: "19px 0",
                  }
                : {}
            }
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p className={style.rowtitle}>{t(item.label)}</p>
              {item.subtitle && (
                <p className={style.rowsubtitle}>{t(item.subtitle)}</p>
              )}
            </div>
            {item.type !== "pets" && (
              <div className={style.additionbar}>
                <button
                  onClick={() => handleChange(item.type as GuestType, false)}
                  className={style.circleMinus}
                >
                  -
                </button>
                <div className={style.value}>
                  {guestCounts[item.type as GuestType]}
                </div>
                <button
                  onClick={() => handleChange(item.type as GuestType, true)}
                  className={style.circlePlus}
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const SelectType = ({ t, onClose }: any) => {
  const selctType = [
    { img: house, label: "house" },
    { img: Rooms, label: "rooms" },
    { img: GuestHouse, label: "guestHouse" },
    { img: camp, label: "camp" },
    { img: container, label: "container" },
    { img: pod, label: "pod" },
    { img: farmhouse, label: "farmHouse" },
    { img: TreeHouse, label: "treeHouse" },
    { img: Suite, label: "suite" },
  ];
  return (
    <div className={style.typeContainer}>
      <div
        style={{
          height: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 5px",
            borderBottom: "0.5px #7D7D7D dotted",
          }}
        >
          <p className={style.cardheading}>{t("selectType")}</p>
          <IoClose
            style={{ width: 12, height: 12, cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div className={style.HouseContainer}>
          <div className={style.typerow}>
            {selctType.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: " 0px 10px",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "24px", height: "24px" }}>
                  <img
                    src={item.img}
                    alt={item.label}
                    className={style.browseimg}
                  />
                </div>
                <p className={style.cardText}>{t(item.label)}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button className={style.clearbtn}>{t("ok")}</button>
        </div>
      </div>
    </div>
  );
};
