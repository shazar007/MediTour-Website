import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";

import {
  getAll_CarsDetails,
  GetAllRentACarReview_Rating,
} from "shared/services";
import CustomLoader from "shared/components/New_Loader/Loader";
import labcardlocation from "assets/images/tdesign_location-filled.png";
import labcardcity from "assets/images/labcardcity.png";
import clockicon from "assets/images/IconClock.png";
import Icondriver from "assets/images/Icondriver.png";
import { GoDotFill } from "react-icons/go";
import seat from "assets/images/icon-seat.png";
import Ac from "assets/images/Icon Ac.png";
import { AboutSection } from "pages/Services/HotelServices/HotelDetail/HotelDetailitems";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const RentaCarDetail = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const { item } = useParams();
  const [data, setData] = useState<any>([]);
  const [cars, setCars] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const carsToShow = cars;

  const handleViewMoreClick = (items: any) => {
    navigate(`/services/rentacar/RentaCarmoreDetail/`, { state: { items } });
  };
  useEffect(() => {
    if (item) {
      getTopRentalCars_Details(item);
      getReviewRent(item);
    }
  }, [item]);
  const getTopRentalCars_Details = (itemId: any) => {
    setLoading(true);
    let params = {
      id: itemId,
    };
    getAll_CarsDetails(params)
      .then((res: any) => {
        setData(res?.data?.rentACar);
        setCars(res?.data?.allVehicles);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getReviewRent = (itemId: any) => {
    let params = {
      vendorId: itemId,
    };
    GetAllRentACarReview_Rating(params)
      .then((res: any) => {})
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  if (loading) {
    return <CustomLoader />;
  }
  return (
    <div>
      <div className={classNames(style.maincontainer)}>
        <ServiceHeader
          headingBlue={t("bookNowWith")}
          headingOrange="MediTour"
          desc_width="70%"
          content={t("chooseFromAWideRange_")}
          Mirroreffect={true}
        />
        <div className={style.innerConatiner}>
          <div className={classNames(style.firstcolumn)}>
            <section className={classNames(style.mainsection)}>
              <div className={classNames(style.imgcontainer)}>
                <img
                  src={data.logo}
                  alt="datalog0"
                  className={classNames(style.labimg)}
                />
              </div>
              <div className={classNames(style.detailsection)}>
                <div style={{ marginTop: "10px" }}>
                  <p className={style.labname}>{data?.name}</p>
                  <div
                    className={classNames(commonstyles.mt16, commonstyles.mb16)}
                  >
                    <p className={style.verifiedtext}>Islamabad, Pakistan</p>
                  </div>
                </div>

                <section className={classNames(style.bottomsection)}>
                  <section className={classNames(style.bottomsection)}>
                    <CardBottom
                      text={t("punctualityInService")}
                      img={clockicon}
                    />

                    <CardBottom
                      text={t("professionalDrivers")}
                      img={Icondriver}
                    />

                    <CardBottom text={t("latestModelCar")} img={labcardcity} />

                    <CardBottom
                      text={data?.location?.address}
                      img={labcardlocation}
                    />
                  </section>
                </section>
              </div>
            </section>

            <section className={classNames(style.aboutsection)}>
              <p className={style.labname}>{t("about")}</p>
            </section>

            <p className={classNames(style.deatiltext)}>{data?.description}</p>

            <div className={classNames(commonstyles.mt16)}>
              <p
                className={classNames(style.labname)}
                style={{ fontSize: "24px" }}
              >
                {t("ourFleet")}
              </p>

              <div className={classNames(style.cardContainer)}>
                {carsToShow && carsToShow.length > 0 ? (
                  carsToShow.map((car: any, index: any) => (
                    <>
                      <div className={style.DoctorCard}>
                        <div className={style.DoctoriMgOuter}>
                          <img
                            src={
                              car?.vehicleImages[0] ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                            }
                            alt="vehicleImages"
                            className={style.DoctoriMg}
                          />
                        </div>
                        <div className={style.Carddbody}>
                          <div
                            // className={style.DoctorInfo}
                            className={
                              isRtl ? style.RTLDoctorInfo : style.DoctorInfo
                            }
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
                                  <p>{car?.vehicleName}</p>
                                </p>
                              </div>
                            </div>
                            <div className={style.mt40}>
                              <div className={style.infoRow}>
                                <img
                                  src={seat}
                                  alt="Seat"
                                  className={style.Iconns}
                                />
                                <p
                                  className={style.locationss}
                                  style={
                                    isRtl ? { lineHeight: "32px" } : undefined
                                  }
                                >
                                  {car?.passengerSeats}

                                  {t("seats")}
                                </p>
                              </div>{" "}
                              <div className={style.infoRow}>
                                <img
                                  src={Ac}
                                  alt="ac"
                                  className={style.Iconns}
                                />
                                <p
                                  className={style.locationss}
                                  style={
                                    isRtl ? { lineHeight: "22px" } : undefined
                                  }
                                >
                                  {" "}
                                  {car?.vehicleType}
                                </p>
                              </div>{" "}
                            </div>
                            <div className={style.DoctorBottom}>
                              <span
                                style={{
                                  display: "flex",
                                  marginTop: "16px",
                                  flexDirection: "column",
                                  gap: "10px",
                                }}
                              >
                                <p
                                  className={style.DoctorName}
                                  style={{
                                    display: "flex",
                                    gap: "5px",
                                    alignItems: "center",
                                    flexDirection: isRtl
                                      ? "row-reverse"
                                      : "row",
                                  }}
                                >
                                  {t("rs")}
                                  <span style={{ fontSize: "24px" }}>
                                    {car?.actualPricePerDay}
                                  </span>
                                  <span
                                    style={{
                                      display: "flex",
                                      gap: "4px",
                                      alignItems: "center",
                                      flexDirection: isRtl
                                        ? "row-reverse"
                                        : "row",
                                    }}
                                  >
                                    <span>/</span>

                                    <span>{t("day")}</span>
                                  </span>
                                </p>
                              </span>
                            </div>
                          </div>

                          <div className={style.border}></div>
                          <div style={{}} className={style.w100}>
                            <div>
                              <p className={style.DoctorName}>
                                {t("featuring")}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <FeatureRow text={t("fuelSameToSame")} />
                                <FeatureRow text={t("unlimitedMileage")} />
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <FeatureRow text={t("carryNoOfBags")} />
                                <FeatureRow text={t("excellentCondition")} />
                              </div>
                            </div>
                            <div
                              style={
                                isRtl
                                  ? {
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      padding: "0 10px",
                                    }
                                  : {
                                      display: "flex",
                                      justifyContent: "flex-end",

                                      padding: "0 10px",
                                    }
                              }
                            >
                              <button
                                className={style.Details}
                                onClick={() => handleViewMoreClick(car)}
                              >
                                {t("book")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  ></div>
                )}
              </div>

              <AboutSection
                sections={[
                  {
                    aboutText: t("eligibilityAndRequirements_"),
                    detailText: [
                      t("aBookingIsOnly_"),
                      t("aValidUnexpiredDrivers_"),
                      t("government-IssuedPhotoID"),
                    ],
                  },
                  {
                    aboutText: t("rentalAgreementAndTerms"),
                    detailText: [
                      t("aLegallyBinding_"),
                      t("onlyDriversListed_"),
                      t("theRenterAndRental_"),
                      t("anyExistingDamages_"),
                      t("theRenterRecieves_"),
                    ],
                  },
                  {
                    aboutText: `${t("cancellationPolicy")}`,
                    detailText: [`${t("cancellationPolicyDetail")}`],
                    // detailText: [],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default RentaCarDetail;

const CardBottom = ({ text, img }: any) => {
  const { isRtl } = useDirection();

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        margin: isRtl ? "10px 0" : "2px 0",
      }}
    >
      <img
        src={img}
        alt="detail"
        style={{
          width: "16px",
          height: "16px",
          display: "flex",
          alignSelf: "",
        }}
      />
      <div style={{ width: "95%", display: "flex", alignItems: "center" }}>
        <p className={style.detailitemtext}>{text}</p>
      </div>
    </div>
  );
};

const FeatureRow = ({ text }: any) => {
  const { isRtl } = useDirection();
  return (
    <div className={style.featureRow}>
      <div className={style.dot}>
        <GoDotFill color="0e54a3" size={14} />
      </div>

      <p
        className={style.featuretext}
        style={isRtl ? { lineHeight: "22px" } : undefined}
      >
        {text}
      </p>
    </div>
  );
};
