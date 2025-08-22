import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import RangePickerStepByStep from "../../../../shared/components/A_New_Components/RangeDatePicker";
import Footerr from "pages/Home/HomeNavBar/Footer";
import slider from "assets/images/hotelslider.png";
import slider1 from "assets/images/hotelslider1.png";
import slider2 from "assets/images/hotelslider2.png";
import house from "assets/images/Hotel/Iocn House.png";
import camp from "assets/images/Hotel/icon-camp.png";
import container from "assets/images/Hotel/Icon container.png";
import pod from "assets/images/Hotel/Icon Pod.png";
import farmhouse from "assets/images/Hotel/Icon Farmhouse.png";
import Rooms from "assets/images/Hotel/IconRooms.png";
import GuestHouse from "assets/images/Hotel/Icon Guest House.png";
import TreeHouse from "assets/images/Hotel/Icon TreeHouse.png";
import Suite from "assets/images/Hotel/Icon Suite.png";
import RoomCard from "./HotelCards/RoomCard";
import room from "assets/images/Hotel/Rooms.png";
import Restaurant from "assets/images/Hotel/Restaurant.png";
import Home from "assets/images/Hotel/Home.png";
import cardimg from "assets/images/Hotel/cardimg.png";
import HotelCard from "./HotelCards/index";
import { Dayjs } from "dayjs";
import LocationInput from "shared/components/LocationInput";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import ServiceHeader from "shared/components/ServicesHeaders";
import { MdKeyboardArrowDown, MdLocalPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const images = [slider, slider1, slider2];

const HotelServic = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showCalender, setshowCalender] = useState(false);
  const [showLocation, setshowLocation] = useState(false);
  const [showGuest, setshowGuest] = useState(false);
  const [showHouse, setshowHouse] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isFavorite, setIsFavorite] = useState<{ [key: string]: boolean }>({});
  const [activePicker, setActivePicker] = useState<"start" | "end" | null>(
    null
  );
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const [showNumber, setShowNumber] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setshowCalender(false);
        setshowLocation(false);
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === images.length) {
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = "none";
          setCurrentIndex(0);
        }
      }, 500);
    } else {
      if (sliderRef.current) {
        sliderRef.current.style.transition = "transform 0.5s ease-in-out";
      }
    }
  }, [currentIndex]);
  const handleCheckInClick = () => {
    setshowCalender(true);
    setActivePicker("start");
  };

  const handleCheckOutClick = () => {
    setshowCalender(true);
    setActivePicker("end");
  };
  const handleLocation = () => {
    setshowLocation(true);
  };

  const handleLguest = () => {
    setshowGuest(true);
  };

  const handlehome = () => {
    setshowHouse(true);
  };

  const browseData = [
    { img: house, label: ` ${t("house")}` },
    { img: Rooms, label: "rooms" },
    { img: GuestHouse, label: "guestHouse" },

    { img: camp, label: "camp" },
    { img: container, label: "container" },
    { img: pod, label: "pod" },
    { img: farmhouse, label: "farmHouse" },
    { img: TreeHouse, label: "treeHouse" },
    { img: Suite, label: "suite" },
  ];
  const roomData = [
    { img: room, item: `22 ${t("rooms")}` },
    { img: Home, item: `03 ${t("suites")}` },
    { img: Restaurant, item: `01 ${t("restaurant")}` },
  ];

  const dummyHotels = Array.from({ length: 9 }, (_, index) => ({
    id: index,
    hotelName: `Hotel Name ${index + 1}`,
    onPannelText: "On pannel",
    cityName: `City ${index + 1}`,
    experience: `${5 + index} Years`,
    satisfiedGuest: `${95 + index}% (66${index})`,
  }));

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

  const toggleFavorite = (hotelId: number) => {
    setIsFavorite((prev) => ({
      ...prev,
      [String(hotelId)]: !prev[String(hotelId)],
    }));
  };

  const navigate = useNavigate();

  const handleroomNavigate = () => {
    navigate("/services/hotel/HotelDetails", { state: { type: "room" } });
  };

  const handleNavigate = () => {
    navigate("/services/hotel/HotelDetails", { state: { type: "other" } });
  };
  return (
    <>
      <div className={classNames(style.container)}>
        <div className={style.main}>
          <ServiceHeader
            headingBlue={t("findYourPerfectHotel_")}
            headingOrange="MediTour"
            Mirroreffect={true}
          />
          {/* ........................ */}
          <div
            className={style.slidermainConatiner}
            style={
              isRtl
                ? {
                    display: "flex",
                    flexDirection: "row-reverse",
                  }
                : undefined
            }
          >
            <div
              className={style.sliderimageConatiner}
              ref={sliderRef}
              style={
                isRtl
                  ? {
                      transform: `translateX(+${currentIndex * 100}%)`,
                    }
                  : {
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }
              }
            >
              {images.concat(images[0]).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Hotel slider ${index + 1}`}
                  className={style.sliderimg}
                />
              ))}
            </div>

            <div className={style.contentConatiner}>
              <button className={style.wherebtn} onClick={handleLocation}>
                <span style={{ fontWeight: 600 }}>{t("where")}</span> !{" "}
                {t("searchDestinations")}
              </button>

              <div className={style.buttonContainer}>
                <button
                  className={style.checkinbtn}
                  onClick={handleCheckInClick}
                >
                  <p>{t("checkInDate")}</p>
                  <p>
                    {startDate ? (
                      <>
                        <span style={{ fontSize: "16px", fontWeight: "600" }}>
                          {startDate.format("DD")}
                        </span>{" "}
                        <br />
                        <span style={{ fontSize: "16px" }}>
                          {startDate.format("MMMM")} <br />
                        </span>
                        <span style={{ fontSize: "16px" }}>
                          {startDate.format("YYYY")}
                        </span>
                      </>
                    ) : (
                      t("selectDate_")
                    )}
                  </p>
                </button>
                <button
                  className={style.checkinbtn}
                  onClick={handleCheckOutClick}
                >
                  <p>{t("checkoutDate")}</p>
                  <p>
                    {endDate ? (
                      <>
                        <>
                          <span style={{ fontSize: "16px", fontWeight: "600" }}>
                            {endDate.format("DD")}
                          </span>{" "}
                          <br />
                          <span style={{ fontSize: "16px" }}>
                            {endDate.format("MMMM")} <br />
                          </span>
                          <span style={{ fontSize: "16px" }}>
                            {endDate.format("YYYY")}
                          </span>
                        </>
                      </>
                    ) : (
                      t("selectDate")
                    )}
                  </p>
                </button>
              </div>
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
                <p> {selectedType ? t(selectedType) : t("selectType")}</p>
                <MdKeyboardArrowDown
                  color="#7d7d7d"
                  style={{
                    width: "14px",
                    height: "24px",
                    display: "flex",
                    alignSelf: "center",
                  }}
                />
              </button>

              <button className={style.searchbtn}>{t("search")}</button>
            </div>

            {showCalender && (
              <div
                className={isRtl ? style.Rtloverlay : style.overlay}
                ref={containerRef}
              >
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

            {showGuest && (
              <div ref={containerRef}>
                <Guest t={t} onClose={() => setshowGuest(false)} />
              </div>
            )}

            {showHouse && (
              <div ref={containerRef}>
                <SelectType
                  t={t}
                  onClose={() => setshowHouse(false)}
                  onSelect={(type: any) => {
                    setSelectedType(type);
                    setshowHouse(false); // optional: close on select
                  }}
                />
              </div>
            )}
            {showLocation && (
              <div
                className={isRtl ? style.Rtloverlay : style.overlay}
                ref={containerRef}
              >
                <LocationInput
                  placeholder={t("enterYourLocation")}
                  type={"box"}
                  setData={() => {}}
                />
              </div>
            )}
          </div>

          {/* .......................... */}

          <div className={style.browseContainer}>
            <p className={style.headingtext}> {t("browseByType")} </p>
            <div className={style.browseCardContainer}>
              {browseData.map((item, index) => (
                <div className={style.browseCard} key={index}>
                  <div className={style.browsecardimConatiner}>
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

          <div>
            <p className={style.headingtext}> {t("exploreHotels")}</p>

            <HotelCard
              cardImage={cardimg}
              hotelName="Hotel Name"
              onPannelText={true}
              cityName="Gilgit"
              data={roomData}
              address={addressItems}
              features={features}
              experience="08 Years"
              satisfiedGuest="98% (660)"
              showNumber={showNumber}
              setShowNumber={setShowNumber}
              onDetailsClick={handleNavigate}
            />
          </div>

          <div style={{ marginTop: "36px" }}>
            <p className={style.headingtext}> {t("ourHotelsRooms")}</p>
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
                  onDetailsClick={handleroomNavigate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footerr />
    </>
  );
};

export default HotelServic;

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

{
  /* .......................... */
}

const SelectType = ({ t, onClose, onSelect }: any) => {
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
              onClick={() => onSelect(item.label)}
              style={{
                display: "flex",
                gap: "0px 10px",
                alignItems: "center",
                cursor: "pointer",
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
    </div>
  );
};
