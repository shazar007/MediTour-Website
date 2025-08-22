import styles from "./contact.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { IoMdArrowRoundForward, IoMdMail } from "react-icons/io";
import { FaClock } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import i18n from "shared/utils/i18n";
import { useDirection } from "shared/utils/DirectionContext";
export default function ContactUs() {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  const handleButtonClick = () => {
    window.fbq?.("track", "ButtonClick", { buttonName: "Subscribe" });
  };
  return (
    <div>
      <div className={classNames(styles.flxBetween)}>
        <div
          className={classNames(
            commonstyles.col5,
            commonstyles.colsm12,
            commonstyles.colmd12
          )}
        >
          <p
            className={classNames(
              commonstyles.fs32,
              commonstyles.semiBold,
              styles.smmdcenter,
              styles.colorBlue
            )}
          >
            <span className={styles.blueHeading} style={{ color: "#0e54a3" }}>
              {" "}
              {t("getIn")}{" "}
            </span>
            <span className={styles.colororange}> {t("touchWithUs")}</span>
          </p>
          <p
            className={classNames(
              styles.mt16,
              styles.smmdcenter,
              commonstyles.col11,
              styles.text
            )}
            style={
              i18n.language === "ur"
                ? {
                  lineHeight: "1.9rem",
                }
                : undefined
            }
          >
            {t("content")}
          </p>
          <div
            className={classNames(commonstyles.flx, commonstyles.mt56)}
            style={{
              gap: "10px",
            }}
          >
            <div className={styles.SocialIconOuter}>
              <IoMdMail className={styles.Socialicon} />
            </div>
            <div className={styles.textcolor}>
              <p className={styles.text}>{t("email")}</p>
              <p className={styles.text}>info@meditour.global</p>
            </div>
          </div>

          <div
            className={classNames(commonstyles.flx, styles.mt32)}
            style={
              i18n.language === "ur"
                ? {
                  gap: "10px ",
                  display: "flex",
                }
                : {
                  gap: "10px",
                }
            }
          >
            <div className={styles.SocialIconOuter}>
              <FaClock className={styles.Socialicon} />
            </div>
            <p
              className={classNames(styles.text, styles.textcolor)}
              style={
                isRtl
                  ? {
                    display: "flex",
                    flexDirection: "row-reverse",
                  }
                  : undefined
              }
            >
              <span> 24 </span>
              <span> x </span>
              <span> 7 </span>
              <span> / </span>
              <span> 365</span>
            </p>
          </div>
        </div>
        <div
          className={classNames(
            styles.col7,
            commonstyles.colsm12,
            commonstyles.colmd12,
            styles.mtmd50,
            styles.mtsm50
          )}
        >
          <div className={styles.flxBetween}>
            <div className={classNames(styles.Contactt)}>
              <input
                style={{ fontFamily: "inherit" }}
                placeholder={`${t("name")}*`}
              />
            </div>
            <div className={classNames(styles.Contactt)}>
              <input
                style={{ fontFamily: "inherit" }}
                placeholder={`${t("email")}*`}
              />
            </div>
          </div>
          <div className={classNames(styles.flxBetween, styles.mtt24)}>
            <div className={classNames(styles.Contactt)}>
              <input
                style={{ fontFamily: "inherit" }}
                placeholder={`${t("phoneNumber")}*`}
              />
            </div>
            <div className={classNames(styles.Contactt)}>
              <input
                placeholder={`${t("city")}*`}
                style={{ fontFamily: "inherit" }}
              />
            </div>
          </div>
          <div className={classNames(styles.textAera, styles.mt24)}>
            <textarea
              placeholder={`${t("yourMessage")}*`}
              style={{ resize: "none", fontFamily: "inherit" }}
            />
          </div>
          <button
            style={{ fontFamily: "inherit" }}
            className={styles.sendBttn}
            onClick={handleButtonClick}
          >
            <p>{t("submit")}</p>
            <div className={styles.iconOuter}>
              <IoMdArrowRoundForward
                className={styles.Iconm2}
                style={isRtl ? { transform: "rotate(-180deg)" } : undefined}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
