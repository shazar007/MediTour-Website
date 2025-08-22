import React, { useState, memo } from "react";
import style from "./mianslider.module.css";
import { Fade } from "react-slideshow-image";
import classNames from "classnames";
import "react-slideshow-image/dist/styles.css";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF, FaYoutube } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import FirstImage from "assets/images/FirstSlide.webp";
const SliderButtons = memo(({ isRtl, t, onTreatment, onContact }: any) => {
  const rtlStyle = isRtl
    ? { flexDirection: "row-reverse" as const, gap: "10px" }
    : undefined;

  const iconTransform = isRtl ? { transform: "rotate(-180deg)" } : undefined;

  return (
    <div className={style.flxcenter} style={{ marginTop: "40px" }}>
      <button
        className={style.Treatment}
        onClick={onTreatment}
        style={rtlStyle}
      >
        <p>{t("findTreatments")}</p>
        <IoArrowForwardCircleSharp
          className={style.Icon}
          style={iconTransform}
        />
      </button>
      <button className={style.OPd} onClick={onContact} style={rtlStyle}>
        <p>{t("freeOpd")}</p>
        <IoArrowForwardCircleSharp
          className={style.Iconm2}
          style={iconTransform}
        />
      </button>
    </div>
  );
});

const MainSlider = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRtl } = useDirection();
  const [index, setIndex] = useState(0);
  const handleGoTreatment = () => navigate("/treatment");
  const handleGoContactUs = () => navigate("/freeOPD");

  const fadeImages = [
    {
      image: FirstImage,
      heading: (
        <div className={style.flxCenter}>
          <p className={style.Nature1}>{t("nature")},</p>
          <p className={classNames(style.orange, style.heals)}>{t("heals")}</p>
        </div>
      ),
      text: t("natureHealsContent"),
      family: "Nature",
      weight: 500,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FSecondSlide.jpg?alt=media&token=e9ddcf35-223e-4220-9d34-0ebfc8f82e9d",
      heading: (
        <div className={classNames(style.flxh)}>
          <p className={classNames(style.white, style.headingSizetoExcel)}>
            {t("committed")}
          </p>
          <p className={classNames(style.orange, style.headingSizetoExcel)}>
            {t("excellence")}
          </p>
        </div>
      ),
      text: t("committedContent"),
      family: "Poppins",
      weight: 400,
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FThirdSlide.jpg?alt=media&token=e06c063c-18e6-4b38-ae20-5f5f581741af",
      heading: (
        <div className={classNames(style.flxh, style.headingSize)}>
          <p className={style.white}>{t("we")}</p>
          <p className={style.orange}>{t("care")}</p>
        </div>
      ),
      text: t("weCareContent"),
      family: "Poppins",
      weight: 400,
    },
  ];

  return (
    <div className={style.slidecontainer}>
      <Fade
        autoplay
        duration={10000}
        transitionDuration={2000}
        pauseOnHover={false}
        arrows={false}
        onChange={(i) => setIndex(i)}
      >
        {fadeImages.map((item, idx) => {
          return (
            <div key={idx}>
              {!loaded && <div className={style.skeleton}></div>}
              <img
                src={item.image}
                alt={`slide ${idx}`}
                className={`${style.imgsss} ${loaded ? style.loaded : ""}`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
              />

              <div className={style.textoverlay}>
                <div
                  className={style.overlayHeading}
                  style={{ fontFamily: item.family }}
                >
                  {item.heading}
                </div>
                <p
                  className={style.overlaytext}
                  style={{ fontWeight: item.weight }}
                >
                  {item.text}
                </p>

                <SliderButtons
                  isRtl={isRtl}
                  t={t}
                  onTreatment={handleGoTreatment}
                  onContact={handleGoContactUs}
                />

                <div className={style.bottomSection}>
                  <div className={style.iconsGroup}>
                    <a
                      href="https://www.instagram.com/themeditour.global/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <RiInstagramFill className={style.SocialIcon} />
                    </a>
                    <div className={style.borderright}></div>
                    <a
                      href="https://www.facebook.com/profile.php?id=61560461618333"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF className={style.SocialIcon} />
                    </a>
                    <div className={style.borderright}></div>
                    <a
                      href="https://www.youtube.com/@themeditour.global"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaYoutube className={style.SocialIcon} />
                    </a>
                  </div>
                  <div className={style.dotsGroup}>
                    {fadeImages.map((_, dotIdx) => (
                      <React.Fragment key={dotIdx}>
                        <div className={style.dots}>
                          <div
                            className={
                              index === dotIdx ? style.dotsFillActive : ""
                            }
                          ></div>
                        </div>
                        {dotIdx !== fadeImages.length - 1 && (
                          <div className={style.borderright}></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Fade>
    </div>
  );
};

export default MainSlider;
