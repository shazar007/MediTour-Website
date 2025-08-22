import { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import RoomCard from "../HotelServic/HotelCards/RoomCard";
import cardimg from "assets/images/Hotel/cardimg.png";
import LocationInput from "shared/components/LocationInput";
import RangePickerStepByStep from "shared/components/A_New_Components/RangeDatePicker";
import { Dayjs } from "dayjs";
import guestimg from "assets/images/Hotel/ic_round-people.png";
import house from "assets/images/Hotel/Iocn House.png";
import camp from "assets/images/Hotel/icon-camp.png";
import container from "assets/images/Hotel/Icon container.png";
import pod from "assets/images/Hotel/Icon Pod.png";
import farmhouse from "assets/images/Hotel/Icon Farmhouse.png";
import Rooms from "assets/images/Hotel/IconRooms.png";
import GuestHouse from "assets/images/Hotel/Icon Guest House.png";
import TreeHouse from "assets/images/Hotel/Icon TreeHouse.png";
import Suite from "assets/images/Hotel/Icon Suite.png";
import checkin from "assets/images/Hotel/Icon Checkin.png";
import payment from "assets/images/Hotel/Icon Payment.png";
import { FaHeart } from "react-icons/fa6";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

const dummyHotels = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  hotelName: `Hotel Name ${index + 1}`,
  onPannelText: "On pannel",
  cityName: `City ${index + 1}`,
  experience: `${5 + index} Years`,
  satisfiedGuest: `${95 + index}% (66${index})`,
}));

const HotelNewBooking = () => {
  const { t }: any = useTranslation();
  const [isFavorite, setIsFavorite] = useState<{ [key: string]: boolean }>({});
  const [showCalender, setShowCalender] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [showGuest, setShowGuest] = useState(false);
  const [showHouse, setShowHouse] = useState(false);
  const [activePicker, setActivePicker] = useState<"start" | "end" | null>(
    null
  );

  const roomData = [
    { img: guestimg, item: `02 ${t("guestMaximum")}` },
    { img: checkin, item: `${t("checkInAfter")} 12PM` },
    { img: payment, item: " Rs.7,000" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const type = location.state?.type;

  const handleLguest = () => {
    setShowGuest(true);
  };
  const handlehome = () => {
    setShowHouse(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowCalender(false);
        setShowGuest(false);
        setShowHouse(false);
        setActivePicker(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckInClick = () => {
    setShowCalender(true);
    setActivePicker("start");
  };

  const handleCheckOutClick = () => {
    setShowCalender(true);
    setActivePicker("end");
  };

  const toggleFavorite = (hotelId: number) => {
    setIsFavorite((prev) => ({
      ...prev,
      [String(hotelId)]: !prev[String(hotelId)],
    }));
  };
  const formatDate = (date: Dayjs | null) =>
    date ? date.format("DD MMMM, YYYY") : t("selectDate_");

  return (
    <>
      <div className={style.conatiner}>
        <div className={style.mainConatiner}>
          <section className={classNames(style.aboutsection)}>
            <p className={style.labname}>{t("searchFilters")}</p>
          </section>

          <div className={style.slectioncard}>
            <p className={style.tripdetailtext}>{t("yourTripDetails")}</p>
            <div className={style.rowconatiner}>
              <div className={style.cardrow}>
                <div style={{ margin: "10px 0" }}>
                  <p className={style.rowheading}>{t("destination")}</p>
                </div>
                <LocationInput
                  placeholder={t("enterYourLocation")}
                  type={"box"}
                  setData={() => {}}
                  border="none"
                />
              </div>

              <div className={style.cardrow} style={{ position: "relative" }}>
                <div style={{ margin: "10px 0" }}>
                  <p className={style.rowheading}>{t("guests")}</p>
                </div>
                <button className={style.guestbtn} onClick={handleLguest}>
                  <p>
                    {" "}
                    <span style={{ fontWeight: 600 }}>{t("who")}</span> !{" "}
                    {t("addGuest")}
                  </p>
                  <img
                    // src={arrow}
                    alt="arrow"
                    style={{
                      width: "14px ",
                      height: "24px",
                      display: "flex",
                      alignSelf: "center",
                    }}
                  />
                </button>
              </div>
            </div>

            <div className={style.rowconatiner}>
              <div className={style.cardrow}>
                <div style={{ margin: "10px 0" }}>
                  <p className={style.rowheading}>{t("dates")}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div className={style.buttonContainer}>
                    <button
                      className={style.checkinbtn}
                      onClick={handleCheckInClick}
                    >
                      <p>{t("checkInDate")}</p>
                      <p>{formatDate(startDate)}</p>
                    </button>
                    <button
                      className={style.checkinbtn}
                      onClick={handleCheckOutClick}
                    >
                      <p>{t("checkoutDate")}</p>
                      <p>{formatDate(endDate)}</p>
                    </button>
                    <div></div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignSelf: "flex-end",
                    }}
                  ></div>

                  <div style={{ position: "absolute" }}>
                    {showCalender && (
                      <div ref={containerRef}>
                        <RangePickerStepByStep
                          activePicker={activePicker}
                          setActivePicker={setActivePicker}
                          startDate={startDate}
                          endDate={endDate}
                          setStartDate={setStartDate}
                          setEndDate={setEndDate}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={style.cardrow}>
                <div style={{ margin: "10px 0" }}>
                  <p className={style.rowheading}>{t("type")}</p>
                </div>
                <button className={style.guestbtn} onClick={handlehome}>
                  <p> {t("selectType")}</p>
                </button>
              </div>
            </div>
          </div>

          {type === "other" && (
            <>
              <section className={classNames(style.aboutsection)}>
                <p className={style.labname}>{t("property")}</p>
              </section>
              <div className={style.propertycard}>
                <div className={style.pfirst}>
                  <div className={style.pimgConatiner}>
                    <img src={cardimg} alt="" className={style.pimg} />

                    <div className={style.heart}>
                      <FaHeart
                        color={isFavorite ? "#FF7A00" : "transparent"}
                        style={{
                          stroke: "#FF7A00",
                          strokeWidth: 40,
                        }}
                      />
                    </div>
                  </div>

                  <div className={style.pfirstfirstcontent}>
                    <div className={style.pfirstcontenthead}>
                      <div
                        style={{
                          display: "flex ",
                          justifyContent: "space-between",
                          width: "100%",
                          flexWrap: "wrap",
                        }}
                      >
                        <p className={style.hotelName}>Hotel Name</p>
                      </div>
                      <div style={{ margin: "10px 0" }}>
                        <p className={style.citynamee}>Kashmeer</p>
                      </div>
                      <div>
                        {roomData.map((dataItem, index) => (
                          <ListItem
                            key={index}
                            img={dataItem.img}
                            item={dataItem.item}
                          />
                        ))}
                      </div>
                    </div>

                    <div className={style.firstcontentbottom}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "column",
                          }}
                        >
                          <p className={style.title}>06 {t("rooms")}</p>
                          <p className={style.smalltext}>{t("total")}</p>
                        </div>
                        <div className={style.bottomsperator}></div>

                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "column",
                          }}
                        >
                          <p className={style.title}>97% (120)</p>
                          <p className={style.smalltext}>{t("hotelRating")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.psecound}>
                  <div className={style.psecoundcontent}>
                    <div className={style.psecoundconententHead}>
                      <p className={style.pvalue}>
                        <span className={style.pRs}> Rs.</span>17,000
                      </p>

                      <div
                        className={style.pvalue}
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        3<span className={style.pRs}>Night.</span>X
                        <span>
                          <span className={style.pRs}>Rs</span>
                          1700
                        </span>
                      </div>

                      <div
                        className={style.pvalue}
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className={style.pRs}>{t("discount")}</span>

                        <span>
                          <span className={style.pRs}>Rs</span>
                          -1700
                        </span>
                      </div>
                    </div>

                    <div className={style.psecoundconententBottom}>
                      <div
                        className={style.pvalue}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>
                          <span className={style.pRs}>{t("total")}</span>
                        </p>
                        <p className={style.pvalue}>
                          <span className={style.pRs}> Rs.</span>50,000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {type === "room" && (
            <>
              <section className={classNames(style.aboutsection)}>
                <p className={style.labname}>{t("results")}</p>
              </section>

              <div className={style.roomContainer}>
                {dummyHotels.map((hotel) => (
                  <RoomCard
                    key={hotel.id}
                    cardImage={cardimg}
                    hotelName={hotel.hotelName}
                    onPannelText={hotel.onPannelText}
                    cityName={hotel.cityName}
                    data={roomData}
                    experience={hotel.experience}
                    satisfiedGuest={hotel.satisfiedGuest}
                    isFavorite={!!isFavorite[String(hotel.id)]}
                    onToggleFavorite={() => toggleFavorite(hotel.id)}
                  />
                ))}
              </div>
            </>
          )}

          {type === "other" && (
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
          )}
        </div>

        {type === "other" && (
          <div className={style.BookbtnContainer}>
            <button className={style.bookbtn}> {t("bookHotel")}</button>
          </div>
        )}

        {showGuest && (
          <div ref={containerRef}>
            <Guest t={t} onClose={() => setShowGuest(false)} />
          </div>
        )}

        {showHouse && (
          <div ref={containerRef}>
            <SelectType t={t} onClose={() => setShowHouse(false)} />
          </div>
        )}
      </div>

      <Footerr />
    </>
  );
};

export default HotelNewBooking;

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
            className={style.cardrowguest}
            style={
              item.type === "pets"
                ? {
                    padding: "19px 0",
                  }
                : {}
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <p className={style.rowtitle}>{t(item.label)}</p>
              {item.subtitle && (
                <p className={style.rowsubtitle}>{item.subtitle}</p>
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

{
  /* .......................... */
}
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
        <button className={style.clearbtn}>Ok</button>
      </div>
    </div>
  );
};

const AboutSection = ({
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
              <div className={style.lidot}></div>
              <p className={style.deatiltext}>{text}</p>
            </div>
          ))}
        </section>
      ))}
    </>
  );
};

const ListItem = ({ img, item }: any) => {
  return (
    <div
      style={{ display: "flex", gap: "10px", width: "100%", margin: "7px 0" }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={img} alt="ss" style={{ width: "100%", height: "100%" }} />
      </div>
      <p className={style.item}>{item}</p>
    </div>
  );
};
