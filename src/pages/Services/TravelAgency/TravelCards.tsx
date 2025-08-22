import { useEffect } from "react";
import img1 from "assets/images/Icon From (1).png";
import img3 from "assets/images/raphael_people.png";
import img5 from "assets/images/material-symbols-light_departure-board (1).png";
import img6 from "assets/images/material-symbols-light_departure-board.png";
import classNames from "classnames";
import style from "./CardStyle.module.css";
import { useNavigate } from "react-router-dom";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
const TravelCards = ({
  data,
}: {
  data?: any;
  handlefavourite: any;
  activeTab: any;
  renderPagination?: any;
}) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handledetaile = (item: any) => {
    navigate("/services/travel/TravelDetail", { state: { item: item } });
  };

  function isValidDate(date: any) {
    return !isNaN(new Date(date).getTime());
  }
  function isValidTimeFormat(time: any) {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  }
  return (
    <div>
      <div className={classNames()}>
        {data?.length > 0 ? (
          <>
            {data.map((item: any) => {
              return (
                <div className={style.DoctorCard}>
                  <div className={style.DoctoriMgOuter}>
                    <img
                      src={
                        item.images[0] ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                      }
                      alt={item.title}
                      className={style.DoctoriMg}
                    />
                  </div>
                  <div className={style.Carddbody}>
                    <div
                      className={isRtl ? style.RTLDoctorInfo : style.DoctorInfo}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                          }}
                        >
                          <p className={style.DoctorName}>
                            {" "}
                            {item.packageName}
                          </p>
                        </div>
                        <p className={style.verified}> {item.to}</p>
                      </div>
                      <div className={style.mt40}>
                        <div className={style.infoRow}>
                          <img
                            src={img1}
                            alt="infoRow"
                            className={style.Iconns}
                          />
                          <p
                            className={style.locationss}
                            style={isRtl ? { lineHeight: "22px" } : {}}
                          >
                            {item.from} {t("to")} {item.to}
                          </p>
                        </div>{" "}
                        <div className={style.infoRow}>
                          <img
                            src={img3}
                            alt="wsdsxzc"
                            className={style.Iconns}
                          />
                          <p
                            className={style.locationss}
                            style={isRtl ? { lineHeight: "28px" } : {}}
                          >
                            {t("maxPeople")} {item.limitedSeats}
                          </p>
                        </div>{" "}
                      </div>
                      <div className={style.DoctorBottom}>
                        <span
                          style={{
                            display: "flex",
                            marginTop: "16px",
                            gap: "8px",
                          }}
                        >
                          <p className={style.rs}>{t("rs")}</p>
                          <p className={style.price}>{item.pricePerHead}/ </p>
                          <p className={style.locationss}>{t("perHead")}</p>
                        </span>

                        <span
                          style={{
                            display: "flex",
                            marginTop: "16px",
                            gap: "8px",
                          }}
                        >
                          <p className={style.rs}>{t("rs")}</p>
                          <p className={style.price}>{item.pricePerCouple}/ </p>
                          <p className={style.locationss}>{t("perCouple")}</p>
                        </span>
                      </div>
                    </div>

                    <div className={style.border}></div>
                    <div style={{}} className={style.w100}>
                      <p className={style.DoctorName}>{t("featuring")}</p>

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

                      <div className={classNames(style.flxBetween, style.mt16)}>
                        <div>
                          <div className={style.w_400}>
                            <img
                              src={img5}
                              alt="wrwe"
                              className={style.Iconns}
                            />
                            <p
                              className={style.locationss}
                              style={isRtl ? { lineHeight: "30px" } : {}}
                            >
                              <p
                                className={style.subheading}
                                dir={isRtl ? "rtl" : "ltr"}
                              >
                                {t("departure")}:
                                {isValidDate(item.departDate)
                                  ? new Date(item.departDate)
                                      .toLocaleDateString(
                                        isRtl ? "ur-PK" : "en-GB",
                                        {
                                          day: "2-digit",
                                          month: isRtl ? "short" : "long", // Use short month names for Urdu
                                          year: "numeric",
                                        }
                                      )
                                      .replace(/ /g, isRtl ? " " : "/") + // Keep spaces for Urdu, slashes for English
                                    (isRtl ? " - " : " - ") + // Adjust spacing if needed
                                    (item.departTime &&
                                    isValidTimeFormat(item.departTime)
                                      ? new Date(
                                          `1970-01-01T${item.departTime}`
                                        ).toLocaleTimeString(
                                          isRtl ? "ur-PK" : "en-US",
                                          {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: !isRtl, // false for Urdu (24hr), true for English (12hr)
                                          }
                                        )
                                      : "Invalid time")
                                  : "Invalid date"}
                              </p>
                            </p>
                          </div>{" "}
                          <div className={style.w_400}>
                            <img
                              src={img6}
                              alt="23asd"
                              className={style.Iconns}
                            />
                            <p
                              className={style.locationss}
                              dir={isRtl ? "rtl" : "ltr"}
                              style={isRtl ? { lineHeight: "30px" } : {}}
                            >
                              <p
                                className={style.subheading}
                                dir={isRtl ? "rtl" : "ltr"}
                              >
                                {t("return")}:
                                {isValidDate(item.returnDate)
                                  ? new Date(item.returnDate)
                                      .toLocaleDateString(
                                        isRtl ? "ur-PK" : "en-GB",
                                        {
                                          day: "2-digit",
                                          month: isRtl ? "short" : "long", // Use short month names for Urdu
                                          year: "numeric",
                                        }
                                      )
                                      .replace(/ /g, isRtl ? " " : "/") + // Keep spaces for Urdu, slashes for English
                                    (isRtl ? " - " : " - ") + // Adjust spacing if needed
                                    (item.returnTime &&
                                    isValidTimeFormat(item.returnTime)
                                      ? new Date(
                                          `1970-01-01T${item.returnTime}`
                                        ).toLocaleTimeString(
                                          isRtl ? "ur-PK" : "en-US",
                                          {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: !isRtl, // false for Urdu (24hr), true for English (12hr)
                                          }
                                        )
                                      : "Invalid time")
                                  : "Invalid date"}
                              </p>
                            </p>
                          </div>{" "}
                        </div>
                        <button
                          className={style.BookBtn}
                          onClick={() => handledetaile(item)}
                        >
                          {" "}
                          {t("details")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>{<PhysiotheristsEmpty />}</div>
        )}
        <div className={style.marginTopContainer}></div>
      </div>
    </div>
  );
};

export default TravelCards;
