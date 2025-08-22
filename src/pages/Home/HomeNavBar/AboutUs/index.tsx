import React, { useEffect } from "react";
import classNames from "classnames";
import style from "./aboutUs.module.css";
import Footerr from "../Footer";
import Facilities from "assets/aboutUsImages/World-Class Medical.webp";
import Professionals from "assets/aboutUsImages/Highly Skilled Medical Professionals.webp";
import Treatments from "assets/aboutUsImages/Cost-Effective Treatments.webp";
import Services from "assets/aboutUsImages/Comprehensive Range of Services.webp";
import Times from "assets/aboutUsImages/Shorter Waiting Times.webp";
import Language from "assets/aboutUsImages/Cultural and Language Compatibility.webp";
import Destinations from "assets/aboutUsImages/Stunning Travel Destinations.webp";
import Attention from "assets/aboutUsImages/Personalized Care and Attention.webp";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const AboutUs = React.memo((props) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  useEffect(() => {
    document.title = "MediTour Global | About Us";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ServiceHeader
        headingBlue={t("about")}
        headingOrange={t("us")}
        content={t("aboutUsContent")}
      />{" "}
      <div style={{ width: "300px", margin: "0 auto" }}>
        <div style={{ borderBottom: "1px dashed #7d7d7d" }}></div>
      </div>
      <div className={classNames(style.outer)}>
        <div className={style.col6}>
          <img alt="Facilities" src={Facilities} className={style.IMages} />
        </div>
        <div className={style.col6}>
          <p>
            <span className={style.colorBlue}>{t("worldClassMedical")}</span>{" "}
            <span className={style.colorOrange}> {t("facilities")}</span>{" "}
          </p>
          <p
            className={classNames(style.aboutext)}
            style={isRtl ? { lineHeight: "30px" } : undefined}
          >
            {t("aboutUsContent1")}
          </p>
        </div>
      </div>
      <div className={classNames(style.container)}>
        <div className={classNames(style.outer, style.flxreverse)}>
          <div className={style.col6}>
            <p>
              <span className={style.colorBlue}>
                {t("highliSkilledMedical")}
              </span>
              <span className={style.colorOrange}> {t("professionals")}</span>{" "}
            </p>
            <p
              className={classNames(style.aboutext)}
              style={isRtl ? { lineHeight: "30px" } : undefined}
            >
              {t("aboutUsContent2")}
            </p>
          </div>{" "}
          <div className={style.col6}>
            <img
              alt="Professionals"
              src={Professionals}
              className={style.IMages}
            />
          </div>
        </div>
      </div>
      <div className={classNames(style.outer)}>
        <div className={style.col6}>
          <img alt="Treatments" src={Treatments} className={style.IMages} />
        </div>
        <div className={style.col6}>
          <p>
            <span className={style.colorBlue}>{t("costEffective")}</span>
            <span className={style.colorOrange}> {t("treatments")}</span>{" "}
          </p>
          <p
            className={classNames(style.aboutext)}
            style={isRtl ? { lineHeight: "30px" } : undefined}
          >
            {t("aboutUsContent3")}
          </p>
        </div>{" "}
      </div>{" "}
      <div className={classNames(style.container)}>
        <div className={classNames(style.outer, style.flxreverse)}>
          <div className={style.col6}>
            <p>
              <span className={style.colorBlue}>
                {" "}
                {t("comprehensiveRangeOF")}
              </span>
              <span className={style.colorOrange}> {t("services")}</span>{" "}
            </p>
            <p
              className={classNames(style.aboutext)}
              style={isRtl ? { lineHeight: "30px" } : undefined}
            >
              {t("aboutUsContent4")}
            </p>
          </div>{" "}
          <div className={style.col6}>
            <img alt="Services" src={Services} className={style.IMages} />
          </div>
        </div>
      </div>
      <div className={classNames(style.outer)}>
        <div className={style.col6}>
          <img alt="Times" src={Times} className={style.IMages} />
        </div>
        <div className={style.col6}>
          <p>
            <span className={style.colorBlue}> {t("shorterWaiting")} </span>
            <span className={style.colorOrange}> {t("times")}</span>{" "}
          </p>
          <p
            className={classNames(style.aboutext)}
            style={isRtl ? { lineHeight: "30px" } : undefined}
          >
            {t("aboutUsContent5")}
          </p>
        </div>{" "}
      </div>
      <div className={classNames(style.container)}>
        <div className={classNames(style.outer, style.flxreverse)}>
          <div className={style.col6}>
            <p>
              <span className={style.colorBlue}>
                {" "}
                {t("culturalAndLanguage")}{" "}
              </span>
              <span className={style.colorOrange}> {t("compatibility")}</span>{" "}
            </p>
            <p
              className={classNames(style.aboutext)}
              style={isRtl ? { lineHeight: "30px" } : undefined}
            >
              {t("aboutUsContent6")}
            </p>
          </div>{" "}
          <div className={style.col6}>
            <img alt="Language" src={Language} className={style.IMages} />
          </div>
        </div>
      </div>
      <div className={classNames(style.outer)}>
        <div className={style.col6}>
          <img alt="Destinations" src={Destinations} className={style.IMages} />
        </div>
        <div className={style.col6}>
          <p>
            <span className={style.colorBlue}> {t("stunningTravel")} </span>
            <span className={style.colorOrange}> {t("destinations")}</span>{" "}
          </p>
          <p
            className={classNames(style.aboutext)}
            style={isRtl ? { lineHeight: "30px" } : undefined}
          >
            {t("aboutUsContent7")}
          </p>
        </div>{" "}
      </div>
      <div className={classNames(style.container)}>
        <div className={classNames(style.outer, style.flxreverse)}>
          <div className={style.col6}>
            <p>
              <span className={style.colorBlue}>
                {t("personalizedCareAnd")}
              </span>
              <span className={style.colorOrange}> {t("attention")}</span>{" "}
            </p>
            <p
              className={classNames(style.aboutext)}
              style={isRtl ? { lineHeight: "30px" } : undefined}
            >
              {t("aboutUsContent8")}
              <br /> <br />
              {t("aboutUsContent9")}
            </p>
          </div>{" "}
          <div className={style.col6}>
            <img alt="Attention" src={Attention} className={style.IMages} />
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
});

export default AboutUs;
