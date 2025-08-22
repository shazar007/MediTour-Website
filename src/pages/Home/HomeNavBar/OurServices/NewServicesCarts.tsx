import { useEffect } from "react";
import Footerr from "../Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocation, setSystemType } from "shared/redux";
import styles from "./NewServicesCarts.module.css";
import doctorIcon from "assets/images/servicesIcons/Icon.png";
import HOMEIcon from "assets/images/servicesIcons/iconHome.png";
import LabIcon from "assets/images/servicesIcons/Iconlab.png";
import PharmacyIcon from "assets/images/servicesIcons/Iconpharamc.png";
import TravelIcon from "assets/images/servicesIcons/IconTravel.png";
import rightimage from "../../../../assets/images/Untitled-6 1.png";
import secondImage from "../../../../assets/images/secondImage.png";
import donationIcon from "../../../../assets/images/servicesIcons/Icon Donation.png";
import donationService from "../../../../assets/images/donationService.png";
import thirdRightImage from "../../../../assets/images/QYS_8063 c 1.png";
import ForthImage from "../../../../assets/images/Untitled-5 2.png";
import InsuranceIcon from "../../../../assets/images/servicesIcons/Icon Insurance (1).png";
import HotalIcon from "../../../../assets/images/servicesIcons/Icon Hotels.png";
import TravelImage from "../../../../assets/images/TourService.png";
import HotelImage from "../../../../assets/images/HotelServices.png";
import labmiror from "../../../../assets/images/servicesIcons/QYS_8063 c 1 1.png";
import phrmirror from "../../../../assets/images/servicesIcons/Untitled-5 2 1.png";
import TravelImage12 from "../../../../assets/images/TravelImage12.png";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { useDirection } from "shared/utils/DirectionContext";
const CenteredLayout = () => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  useEffect(() => {
    document.title = "MediTour Global | Services";
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (name: string) => {
    switch (name) {
      case "Donation":
        navigate("/services/donation");
        break;

      case "RentACar":
        break;

      case "Pharmacy":
        navigate("/services/pharmacy");
        break;
      case "Hotel":
        navigate("/services/hotel");
        break;
      case "Laboratory":
        navigate("/services/laboratory");
        break;
      case "Paramedic Staff":
        navigate("/services/paramedicstaff");
        break;
      case "Travel Agency":
        navigate("/services/travel/Selection", {
          state: { serviceName: name },
        });
        break;
      case "Insurance":
        navigate("/services/insurance");
        break;
      case "HomeServices":
        navigate("/services/homeService");
        break;
      default:
        navigate("/services/doctor/Selection", {
          state: { serviceName: name },
        });
        break;
    }
  };

  useEffect(() => {
    dispatch(setSystemType("user"));
    if (navigator?.geolocation) {
      navigator?.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setLocation({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
              error: null,
            })
          );
        },
        (error) => {
          dispatch(
            setLocation({
              latitude: null,
              longitude: null,
              error: error.message,
            })
          );
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
  return (
    <div className={styles.BgOuter}>
      <ServiceHeader
        desc_width="65%"
        headingBlue={t("whatWe")}
        headingOrange={t("offer")}
        content={t("whatWeContent")}
      />

      <div className={styles.container}>
        <div
          className={styles.DoctorBg}
          onClick={() => handleNavigate("Doctor")}
        >
          <div
            className={
              ["ur", "ar", "ps", "pr"].includes(i18n.language)
                ? styles.flxxur
                : styles.flxx
            }
          >
            <img src={doctorIcon} alt="doctorIcon" className={styles.icon} />

            <div>
              <p className={styles.title}>{t("doctors")}</p>
              <p
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? styles.Contentur
                    : styles.Content
                }
              >
                {t("verifiedDoctors")}
              </p>
            </div>
          </div>
          <div>
            <img
              src={rightimage}
              alt="rightimage"
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? styles.doctorImaGur
                  : styles.doctorImaG
              }
            />
          </div>
        </div>
        <div className={styles.simpleflx} style={{ marginTop: "16px" }}>
          <div
            className={styles.homeBg}
            onClick={() => handleNavigate("HomeServices")}
          >
            <div
              className={classNames(
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? styles.flxxur
                  : styles.flxx,
                styles.pt34
              )}
            >
              <img src={HOMEIcon} alt="homeIcons" className={styles.icon} />

              <div>
                <p className={styles.title}>{t("homeServices")}</p>
                <p
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.Contentur
                      : styles.Content
                  }
                >
                  {t("doctors")}
                </p>{" "}
                <p
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.Contentur
                      : styles.Content
                  }
                >
                  {t("ambulance")}
                </p>{" "}
                <p
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.Contentur
                      : styles.Content
                  }
                >
                  {t("psychology")}
                </p>{" "}
                <p
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.Contentur
                      : styles.Content
                  }
                >
                  {t("physiotherapy")}
                </p>{" "}
                <p
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.Contentur
                      : styles.Content
                  }
                >
                  {t("nutritionist")}
                </p>{" "}
                <p
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.Contentur
                      : styles.Content
                  }
                >
                  {t("nurses")}{" "}
                </p>{" "}
              </div>
            </div>
            <div>
              <img
                src={secondImage}
                style={{ position: "relative" }}
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? styles.homeImaGur
                    : styles.homeImaG
                }
              />
            </div>
          </div>
          <div className={classNames(styles.simpleflx, styles.w40)}>
            <div
              onClick={() => handleNavigate("Laboratory")}
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? styles.labBgur
                  : styles.labBg
              }
              style={{ position: "relative" }}
            >
              <div>
                <img src={LabIcon} alt="LabIcon" className={styles.icon} />

                <p className={styles.titlelab}>{t("laboratory")}</p>
              </div>
              <div>
                <img
                  alt="labmiror"
                  src={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? labmiror
                      : thirdRightImage
                  }
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.labImgur
                      : styles.labImg
                  }
                />
              </div>
            </div>{" "}
            <div
              onClick={() => handleNavigate("Pharmacy")}
              style={{ position: "relative" }}
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? styles.PhramcyBgur
                  : styles.PhramcyBg
              }
            >
              <div>
                <img
                  alt="PharmacyIcon"
                  src={PharmacyIcon}
                  className={styles.icon}
                />

                <p className={styles.titlelab}>{t("pharmacy")}</p>
              </div>
              <div>
                <img
                  src={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? phrmirror
                      : ForthImage
                  }
                  alt="phrmirror"
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.PharImgur
                      : styles.PharImg
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "16px" }} className={styles.simpleflx}>
          <div className={classNames(styles.w60, styles.simpleflx)}>
            <div
              className={styles.travelBg}
              onClick={() => handleNavigate("Travel Agency")}
            >
              <div
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? styles.flxxur
                    : styles.flxx
                }
              >
                <img
                  src={TravelIcon}
                  alt="TravelIcon"
                  className={styles.icon}
                />

                <div>
                  <p className={styles.title}>{t("travelAndTourism")}</p>
                  <p
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.Contentur
                        : styles.Content
                    }
                  >
                    {`${t("rentACar")} ${t("services")}`}
                  </p>
                  <p
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.Contentur
                        : styles.Content
                    }
                  >
                    {t("planYourExcursion")}
                  </p>
                  <p
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.Contentur
                        : styles.Content
                    }
                  >
                    {t("visaServices")}
                  </p>{" "}
                  <p
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.Contentur
                        : styles.Content
                    }
                    style={isRtl ? { marginRight: "13px" } : {}}
                  >
                    {t("airTicket")}
                  </p>
                </div>
              </div>
              <div className={styles.flxend}>
                <img
                  src={TravelImage}
                  alt="TravelImage"
                  className={styles.travelmaG}
                />
              </div>
            </div>
            <div
              className={styles.hotelBg}
              onClick={() => handleNavigate("Hotel")}
            >
              <div
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? styles.flxxur
                    : styles.flxx
                }
              >
                <img src={HotalIcon} alt="HotalIcon" className={styles.icon} />

                <div>
                  <p className={styles.title}>{t("hotel")}</p>
                  <p
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.Contentur
                        : styles.Content
                    }
                  >
                    {t("stayAtbestPlace")}
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={HotelImage}
                  alt="HotelImage1"
                  className={styles.HotelImaG}
                />
              </div>
            </div>
          </div>
          <div className={classNames(styles.w40, styles.flxcol)}>
            <div
              className={styles.insuranceBg}
              onClick={() => handleNavigate("Insurance")}
            >
              <div
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? styles.flxxur
                    : styles.flxx
                }
              >
                <img
                  src={InsuranceIcon}
                  alt="InsuranceIcon"
                  className={styles.icon}
                />

                <div>
                  <p className={styles.title}>{t("insurance")}</p>
                  <p
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.Contentur
                        : styles.Content
                    }
                  >
                    {t("healthAndTravel")}
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={TravelImage12}
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.donationImaGur
                      : styles.donationImaG
                  }
                  alt="TravelImage12"
                />
              </div>
            </div>
            <div
              className={styles.DonationBg}
              onClick={() => handleNavigate("Donation")}
            >
              <div
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? styles.flxxur
                    : styles.flxx
                }
              >
                <img
                  src={donationIcon}
                  alt="donationIcon"
                  className={styles.icon}
                />

                <div>
                  <p className={styles.title}>{t("donation")}</p>
                  <p
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.Contentur
                        : styles.Content
                    }
                  >
                    {t("helpPeople")}
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={donationService}
                  alt="donationService"
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? styles.donationImaGur
                      : styles.donationImaG
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footerr />
    </div>
  );
};

export default CenteredLayout;
