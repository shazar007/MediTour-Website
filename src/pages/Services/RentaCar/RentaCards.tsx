import { useState, useEffect } from "react";
import CardStyless from "./Maincard.module.css";
import CommonStyless from "shared/utils/common.module.css";
import { useNavigate } from "react-router-dom";
import style from "./Fix.module.css";
import { getAll_RentACar } from "shared/services";
import NewPagination from "shared/components/NewPagination/NewPagination";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useDispatch, useSelector } from "react-redux";
import { setRentaCarItem } from "shared/redux";
import img2 from "assets/images/healthicons_truck-driver.png";
import img3 from "assets/images/mingcute_car-line.png";
import classNames from "classnames";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";
import { GoDotFill } from "react-icons/go";
import { useDirection } from "shared/utils/DirectionContext";
import { FaRegClock } from "react-icons/fa6";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";

const RentaCards = () => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const [showNumber, setShowNumber] = useState(false);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [location, setLocation] = useState<any>({
    latitude: null,
    longitude: null,
    error: null,
  });

  const { isLoggedIn } = useSelector((state: any) => state.root.common);

  const handleViewMoreClick = (item: any) => {
    if (isLoggedIn) {
      dispatch(setRentaCarItem({ item }));
      navigate(`/services/rentacar/RentaCarDetail/${item?.rentACar?._id}`);
    } else {
      navigate("/user/login", {
        state: {
          state: {},
          loginFrom: "rentAcar",
        },
        replace: true,
      });
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchNartByCar(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    fetchNartByCar(currentPage - 1);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setLoading(true);
      fetchNartByCar(currentPage);
    }
  }, [location, activeTab]);
  const fetchNartByCar = (pagenum: any) => {
    setLoading(true);
    let params = {
      search: "",
      lat: location?.latitude,
      long: location?.longitude,
      filter: activeTab?.toLowerCase(),
    };
    getAll_RentACar(params, pagenum)
      .then((res: any) => {
        setData(res?.data?.rentACars);

        setTotalItems(res?.data?.rentACars?.length);
      })

      .catch((err: any) => { })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={classNames(CommonStyless.container)}>
        <div className={classNames(CommonStyless.mb28, CommonStyless.mt28)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <p className={style.DoctorName} style={{ fontSize: "24px" }}>
              {t("rentalCompaniesList")}
            </p>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>

          <div className={CardStyless.cardContainer}>
            {data && data?.length > 0 ? (
              data.map((item: any) => {
                return (
                  <div className={style.DoctorCard}>
                    <div className={style.DoctoriMgOuter}>
                      <img
                        src={
                          item?.rentACar?.logo ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                        }
                        alt="rentACarlogo"
                        className={style.DoctoriMg}
                      />
                    </div>
                    <div className={style.Carddbody}>
                      <div
                        className={
                          isRtl ? style.RTLDoctorInfo : style.DoctorInfo
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "16px",
                            }}
                          >
                            <p className={style.DoctorName}>
                              {" "}
                              {item?.rentACar?.name}
                            </p>
                          </div>
                          <p className={style.verified}>
                            {" "}
                            {item?.rentACar?.location?.city}
                          </p>
                        </div>
                        <div className={style.mt40}>
                          <div className={style.infoRow}>
                            <FaRegClock
                              color="#7d7d7d"
                              className={style.Iconns}
                            />
                            <p
                              className={style.locationss}
                              style={
                                i18n.language === "ur"
                                  ? {
                                    lineHeight: "27px",
                                  }
                                  : {}
                              }
                            >
                              {t("punctualityInService")}
                            </p>
                          </div>{" "}
                          <div className={style.infoRow}>
                            <img
                              src={img2}
                              alt="locations"
                              className={style.Iconns}
                            />
                            <p
                              className={style.locationss}
                              style={
                                i18n.language === "ur"
                                  ? {
                                    lineHeight: "27px",
                                  }
                                  : {}
                              }
                            >
                              {t("professionalDrivers")}
                            </p>
                          </div>{" "}
                          <div className={style.infoRow}>
                            <img
                              src={img3}
                              alt="LOcations"
                              className={style.Iconns}
                            />
                            <p
                              className={style.locationss}
                              style={
                                i18n.language === "ur"
                                  ? {
                                    lineHeight: "27px",
                                  }
                                  : {}
                              }
                            >
                              {t("latestModelCar")}
                            </p>
                          </div>{" "}
                        </div>
                        <div className={style.DoctorBottom}></div>
                      </div>

                      <div className={style.border}></div>
                      <div style={{}} className={style.w100}>
                        <div className={style.DescriptionConatiner}>
                          <p className={style.DoctorName}>{t("description")}</p>
                          <div
                            className={style.infoRow}
                            style={{ marginTop: "6px" }}
                          >
                            <div
                              style={{
                                width: "5%",
                                display: "flex",
                                alignSelf: "baseline",
                              }}
                            >
                              <GoDotFill className={style.dot} />
                            </div>
                            <p
                              className={style.Description}
                              style={
                                i18n.language === "ur"
                                  ? {
                                    lineHeight: "25px",
                                  }
                                  : {}
                              }
                            >
                              {item?.rentACar?.description ||
                                t("descriptionIsNotAvailable")}
                            </p>
                          </div>
                        </div>
                        <div
                          className={classNames(style.flxBetween, style.mt16)}
                        >
                          <div className={style.LocationConatiner}>
                            <div className={style.w_400}>
                              <MdLocalPhone color="#7d7d7d" />

                              <p
                                className={style.locationss}
                                dir={isRtl ? "rtl" : "ltr"}
                              >
                                <span
                                  style={{
                                    direction: "ltr",
                                    unicodeBidi: "embed",
                                  }}
                                >
                                  {item?.rentACar?.phoneNumber}
                                </span>
                              </p>
                            </div>
                            <div className={style.w_400}>
                              <MdLocationOn
                                color="#7d7d7d"
                                className={style.Iconns}
                              />
                              <p className={style.locationss}>
                                {item?.rentACar?.location?.address}
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              flexDirection: "column",
                            }}
                          >
                            <button
                              className={style.Details}
                              onClick={() => handleViewMoreClick(item)}
                            >
                              {t("details")}
                            </button>
                            {!showNumber && (
                              <button
                                className={style.BookBtn}
                                onClick={() => setShowNumber(!showNumber)}
                              >
                                {" "}
                                {t("callHelpline")}
                              </button>
                            )}
                            {showNumber && (
                              <p
                                className={style.Number}
                                dir={isRtl ? "rtl" : "ltr"}
                              >
                                <span
                                  style={{
                                    direction: "ltr",
                                    unicodeBidi: "embed",
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
                );
              })
            ) : (
              <div
                className={classNames(
                  CommonStyless.flx,
                  CommonStyless.flxCenter
                )}
                style={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                {" "}
                <div className={classNames(CommonStyless.flx)}>
                  <PhysiotheristsEmpty />
                </div>
              </div>
            )}
          </div>
          {loading && <CustomLoader />}
        </div>
      </div>
    </div>
  );
};

export default RentaCards;
