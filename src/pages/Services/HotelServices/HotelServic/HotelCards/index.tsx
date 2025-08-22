import React from "react";
import style from "./style.module.css";

import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface HotelCardProps {
  cardImage: string;
  hotelName: string;
  onPannelText?: boolean;
  cityName: string;
  data: { img: string; item: string }[];
  address: { img: string | JSX.Element; item: string }[];
  features: string[];
  experience: string;
  satisfiedGuest: string;
  showNumber: boolean;
  setShowNumber: React.Dispatch<React.SetStateAction<boolean>>;
  onDetailsClick?: any;
}

const HotelCard: React.FC<HotelCardProps> = ({
  cardImage,
  hotelName,
  address,
  onPannelText,
  cityName,
  data,
  features,
  experience,
  satisfiedGuest,
  showNumber,
  setShowNumber,
  onDetailsClick,
}) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  return (
    <div className={style.cardContainer}>
      <div className={style.cardbody}>
        <div className={style.firstcol}>
          <div className={style.imgcontainer}>
            <img src={cardImage} alt="firstcolHotal" className={style.img} />
          </div>
          <div className={style.firstcontent}>
            <div className={style.firstcontenthead}>
              <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                <div
                  style={{
                    display: "flex ",
                    justifyContent: "space-between",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  <p className={style.hotelName}>{hotelName}</p>
                  {onPannelText && (
                    <p className={style.onPannel}>{t("partnerHotel")}</p>
                  )}
                </div>
                <div style={{ margin: "10px 0" }}>
                  <p className={style.citynamee}>{cityName}</p>
                </div>
              </div>
              <div>
                {data.map((dataItem, index) => (
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
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className={style.title}>{experience}</p>
                  <p className={style.smalltext}>{t("experience")}</p>
                </div>
                <div className={style.bottomsperator}></div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p className={style.title}>{satisfiedGuest}</p>
                  <p className={style.smalltext}>{t("satisfiedGuest")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.secoundcol}>
          <div className={style.cardsperator}></div>
          <div className={style.secoundContent}>
            <div className={style.secoundContentheader}>
              <p className={style.hotelName}>{t("featuring")}</p>

              <div className={style.featureContainer}>
                {features.map((feature, index) => (
                  <Feature key={index} item={feature} />
                ))}
              </div>
            </div>

            <div className={style.secoundContentbottom}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignSelf: "flex-end",
                }}
              >
                {address.map((item, index) => (
                  <Address key={index} img={item.img} item={item.item} />
                ))}
              </div>

              <div className={style.cardbuttoncontainer}>
                <button
                  className={style.carddeialbutton}
                  onClick={onDetailsClick}
                >
                  {t("details")}
                </button>
                {!showNumber && (
                  <button
                    className={style.cardhelplbutton}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotelCard;

const ListItem = ({ img, item }: any) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ width: "16px", height: "16px" }}>
        <img
          src={img}
          alt="ListItem"
          style={{ width: "100%", height: "100%", display: "flex" }}
        />
      </div>
      <p className={style.item}>{item}</p>
    </div>
  );
};

const Address = ({ img, item }: any) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          display: "flex",
          alignSelf: "center",
        }}
      >
        {img}
      </div>

      <div
        dir="ltr"
        style={{
          alignSelf: "center",
          direction: "ltr",
          unicodeBidi: "bidi-override",
          display: "inline-block",
        }}
      >
        <p className={style.item}>{item}</p>
      </div>
    </div>
  );
};

const Feature = ({ item }: any) => {
  return (
    <div>
      <div className={style.featureCard}>{item}</div>
    </div>
  );
};
