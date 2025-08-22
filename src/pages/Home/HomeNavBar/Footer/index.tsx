import styles from "./footer.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaLocationDot } from "react-icons/fa6";
import Logo from "../../../../assets/images/whitelogonew.png";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

export default function Footerr() {
  const navigate = useNavigate();
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();

  const handleGoContactus = () => {
    navigate("/contactUs");
  };

  const handleGoAboutUs = () => {
    navigate("/aboutUs");
  };

  const handleGoToprivactpolicys = () => {
    navigate("/privactpolicys");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.container2}>
      <div className={styles.mianFooterOuter}>
        <div
          className={classNames(styles.flxBetween, styles.gap24, styles.mb24)}
        >
          <div className={classNames(styles.col5, styles.footerMflx)}>
            <div
              className={classNames(
                styles.textstart,
                styles.col5,
                styles.mtsm20
              )}
            >
              <p className={classNames(styles.footerHeadings)}>
                {t("company")}
              </p>
              <p
                className={classNames(styles.footertext)}
                onClick={handleGoAboutUs}
              >
                {t("aboutUs")}
              </p>
              <p
                className={classNames(styles.footertext)}
                onClick={handleGoContactus}
              >
                {t("contactUs")}
              </p>
              <p className={classNames(styles.footertext)}>{t("careers")}</p>

              <p
                className={classNames(styles.footertext)}
                onClick={handleGoToprivactpolicys}
              >
                {t("privacyPolicy")}
              </p>
            </div>
            <div
              className={classNames(
                styles.textstart,
                styles.col5,
                styles.mtsm20
              )}
            >
              <p className={classNames(styles.footerHeadings)}>
                {t("support")}
              </p>
              <p className={classNames(styles.footertext)}>
                {t("gettingStarted")}
              </p>
              <p className={classNames(styles.footertext)}>{t("helpCenter")}</p>
              <p
                className={classNames(styles.footertext)}
                onClick={handleGoContactus}
              >
                {t("support")}
              </p>
            </div>
          </div>

          <div
            className={classNames(
              styles.col5,
              styles.mtsm20,
              commonstyles.colsm12
            )}
          >
            <p
              className={classNames(styles.newsletter)}
              style={i18n.language === "ur" ? { lineHeight: "56px" } : {}}
            >
              {t("newsLetter")}
            </p>{" "}
            <div className={styles.inputContainer}>
              <input
                placeholder={t("enterYourEmail")}
                // className={styles.inputField}
                style={{
                  textAlign: "left",
                }}
              />
              <button className={styles.SubscribeBtn}>
                <p>{t("subscribe")}</p>
                <IoArrowForwardCircleSharp
                  className={styles.aRROW}
                  style={isRtl ? { transform: "rotate(-180deg)" } : undefined}
                />{" "}
              </button>
            </div>
            <p className={classNames(styles.NewsletterText)}>
              {t("stayUpdated")}
            </p>
          </div>
        </div>
      </div>{" "}
      <div style={{ borderTop: "1px solid white" }}>
        <div className={styles.mianFooterOuter}>
          <MediTourAddress />
        </div>
      </div>
      <div style={{ borderTop: "1px solid white" }}>
        <div className={styles.mianFooterOuter}>
          <div className={classNames(styles.FooterFlx)}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div>
                <img src={Logo} alt="Logo0" className={styles.FooterLogo} />
              </div>
              <p className={classNames(styles.Copyright)}>{t("copyRights")}</p>
            </div>
            <div
              className={classNames(
                styles.flxIcons,
                styles.mtsm20,
                commonstyles.colsm12
              )}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  border: "0.67px solid white",
                  borderRadius: "6px",
                  padding: "4px",
                }}
              >
                <a
                  className={styles.iconOuter}
                  href="https://www.facebook.com/profile.php?id=61575191154380"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className={styles.FooterICONS} />
                </a>
              </div>
              <div
                style={{
                  border: "0.67px solid white",
                  borderRadius: "6px",
                  padding: "4px",
                }}
              >
                <a
                  className={styles.iconOuter}
                  href="https://twitter.com/MediTourglobal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className={styles.FooterICONS} />
                </a>
              </div>
              <div
                style={{
                  border: "0.67px solid white",
                  borderRadius: "6px",
                  padding: "4px",
                }}
              >
                <a
                  className={styles.iconOuter}
                  href="https://www.instagram.com/meditourglobal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiInstagramLogoFill className={styles.FooterICONS} />
                </a>{" "}
              </div>
              <div
                style={{
                  border: "0.67px solid white",
                  borderRadius: "6px",
                  padding: "4px",
                }}
              >
                <a
                  className={styles.iconOuter}
                  href="https://www.linkedin.com/company/theMediTourglobal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className={styles.FooterICONS} />
                </a>{" "}
              </div>
              <div
                style={{
                  border: "0.67px solid white",
                  borderRadius: "6px",
                  padding: "4px",
                }}
              >
                <a
                  className={styles.iconOuter}
                  href="https://www.youtube.com/@meditour.global"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoYoutube className={styles.FooterICONS} />
                </a>{" "}
              </div>
            </div>
            <div className={styles.upernavigation} onClick={scrollToTop}>
              <div className={styles.upernavigationinner}>
                <FaArrowUp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MediTourAddress = () => {
  const addressData = [
    {
      id: 0,
      country: "United States",
      address: "37 Alexander Avenue Staten Island, NY, 10312, USA",
      contact: "+1(347)922-4969",
    },
    {
      id: 1,
      country: "Canada",
      address: "181 Dundas Street East, Toronto Ontario M5A 0N5, Canada",
      contact: "+1(437)259-5662",
    },
    {
      id: 2,
      country: "Pakistan",
      address: "154-D Architects Society Lahore, Punjab, Pakistan",
      contact: "+92-42-37885101-4 / +92-42-35191168",
    },
    {
      id: 2,
      country: "United Kingdom",
      address:
        "Warlies Park House, Upshire,Waltham Abbey EN9 3SL, United Kingdom",
      contact: "+44-7710083013",
    },
  ];
  return (
    <>
      {
        <div className={styles.addressContainer} style={{ gap: 16 }}>
          {addressData.map((item: any, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.circle}>
                <FaLocationDot fill="#FF7631" size={20} />
              </div>
              <div className={styles.address}>
                <p className={classNames(styles.addressHeading)}>
                  {item?.country}
                </p>
                <p className={classNames(styles.addresstext)}>
                  {item?.address}
                </p>
                <p className={classNames(styles.addresstext)}>
                  {item?.contact}
                </p>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
};
