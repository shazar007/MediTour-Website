import { useEffect } from "react";
import classNames from "classnames";
import styles from "./patientguide.module.css";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "../Footer";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { BsThreads, BsTwitterX } from "react-icons/bs";
import { FaSnapchatGhost } from "react-icons/fa";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";

import { FREE_OPD } from "shared/services/UserService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDirection } from "shared/utils/DirectionContext";

export default function PatientGuide() {
  const { t, i18n }: any = useTranslation();

  const { isRtl } = useDirection();

  const formik = useFormik({
    initialValues: {
      name: "",
      phonenumber: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("nameIsRequired")),
      phonenumber: Yup.string().required(t("contactIsRequired")),
    }),
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        phone: values.phonenumber,
        email: values.email || "",
        message: values.message || "",
      };

      try {
        const response = await FREE_OPD(payload);
        formik.resetForm();
      } catch (error: any) {}
    },
  });
  useEffect(() => {
    document.title = "MediTour Global | Patient Guide";
    window.scrollTo(0, 0);
  }, []);

  const openGmail = () => {
    const sender = encodeURIComponent("info@meditour.global");
    const url = `https://mail.google.com/mail/?view=cm&fs=1&su=${sender}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <ServiceHeader
        headingBlue={t("patient")}
        headingOrange={t("guide")}
        desc_width="60%"
        content={t("patientGuideContent")}
      />
      <div className={classNames(styles.container)}>
        <div className={styles.flxBetween}>
          <div
            className={classNames(
              commonstyles.col6,
              commonstyles.colsm12,
              commonstyles.colmd12
            )}
          >
            <div>
              <path
                className={classNames()}
                style={
                  i18n.language === "ur"
                    ? {
                        display: "flex",
                        flexDirection: "row-reverse",
                        marginRight: "auto",
                        justifyContent: "flex-end",
                      }
                    : undefined
                }
              >
                <span className={styles.colorBlue}> {t("getting")} </span>
                <span className={styles.colorOrange}>{t("started")}</span>{" "}
              </path>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("gettingStartedContent1")}
                <br />
                {t("gettingStartedContent2")}
              </p>
            </div>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}>
                  {" "}
                  {t("choosingYourHealthcare")}{" "}
                </span>
                <span className={styles.colorOrange}> {t("provider")}</span>{" "}
              </p>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("providerContent1")}
                <br />
                {t("providerContent2")}
              </p>
            </div>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}> {t("planningYour")} </span>
                <span className={styles.colorOrange}>{t("trip")}</span>{" "}
              </p>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("tripContent1")}
                <br />
                {t("tripContent2")}
                <br />
                {t("tripContent3")}
              </p>
            </div>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}> {t("beforeYour")} </span>
                <span className={styles.colorOrange}>
                  {t("departure")}
                </span>{" "}
              </p>
              <p
                className={classNames(
                  styles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("departureContent1")}
                <br />
                {t("departureContent2")}
              </p>
            </div>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}> {t("duringYour")} </span>
                <span className={styles.colorOrange}>
                  {t("treatment")}
                </span>{" "}
              </p>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("duringTreatmentContent1")}
                <br />
                {t("duringTreatmentContent2")}
                <br />
                {t("duringTreatmentContent3")}
              </p>
            </div>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}> {t("postTreatment")} </span>
                <span className={styles.colorOrange}>{t("_care")}</span>{" "}
              </p>
              <p
                className={classNames(
                  styles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("postTreatmentContent1")}
                <br />
                {t("postTreatmentContent2")}
                <br />
                {t("postTreatmentContent3")}
              </p>
            </div>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}> {t("additional")} </span>
                <span className={styles.colorOrange}>{t("services")}</span>{" "}
              </p>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("additionalContent1")}
                <br />
                {t("additionalContent2")}
                <br />
                {t("additionalContent3")}
              </p>
            </div>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}> {t("emergency")} </span>
                <span className={styles.colorOrange}>
                  {t("assistance")}
                </span>{" "}
              </p>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={{ textAlign: "justify" }}
              >
                {t("emergencyAssistanceContent")}
              </p>
            </div>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}> {t("contact")} </span>
                <span className={styles.colorOrange}>{t("_us")}</span>{" "}
              </p>{" "}
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("contactUsContent1")}
                <br />
                <br />
                {t("contactUsContent2")}:
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mailBtn}
                >
                  {" "}
                  www.meditour.global
                </a>
                <br />
                {t("email")}:{" "}
                <button className={styles.mailBtn} onClick={openGmail}>
                  info@meditour.global
                </button>
              </p>
            </div>{" "}
            <br />
            <p
              className={classNames(
                commonstyles.fs16,
                styles.mt16,
                styles.textcolor
              )}
              style={isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }}
            >
              {t("contactUsContent3")}
            </p>
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}> {t("getInTouch")} </span>
                <span className={styles.colorOrange}>{t("_us")}</span>{" "}
              </p>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("getInTouchContent")}
              </p>
            </div>{" "}
            <div>
              <p
                className={classNames(
                  styles.fs24,
                  styles.mt16,
                  styles.colorBlue,
                  commonstyles.semiBold
                )}
              >
                <span className={styles.colorBlue}>{t("privacy")} </span>
                <span className={styles.colorOrange}>{t("note")}:</span>{" "}
              </p>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.mt16,
                  styles.textcolor
                )}
                style={
                  isRtl ? { lineHeight: "30px" } : { textAlign: "justify" }
                }
              >
                {t("privacyNoteContent")}
                <br /> <strong> {t("email")}:</strong>
                <button className={styles.mailBtn} onClick={openGmail}>
                  info@meditour.global
                </button>
                <a
                  style={{ cursor: "pointer" }}
                  href="mailto:"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                </a>
                <br />
                <br />{" "}
                <strong className={styles.colorBlue}>{t("callUsAt")}: </strong>
                <br /> <strong>Canada: </strong> +1(437)259-5662
                <br /> <strong> Pakistan: </strong>
                +92-42-37885101-4 , +92-42-35191168
                <br />
                <strong>Uk: </strong>
                +44-7710083013
                <br />
                <strong>USA: </strong>
                +1(347)922-4969
                <br />
                <strong>{t("timing")} </strong> 24/7
              </p>
            </div>
            <div className={classNames(commonstyles.flx, styles.gap16)}>
              <a
                href="https://www.facebook.com/profile.php?id=61560461618333&viewas=&show_switched_toast=false&show_switched_tooltip=false&is_tour_dismissed=false&is_tour_completed=false&show_podcast_settings=false&show_community_review_changes=false&should_open_composer=false&badge_type=NEW_MEMBER&show_community_rollback_toast=false&show_community_rollback=false&show_follower_visibility_disclosure=false&bypass_exit_warning=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className={styles.socialIcons} />
              </a>
              <a
                href="https://www.instagram.com/meditour.global/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram className={styles.socialIcons} />
              </a>
              <a
                href="https://twitter.com/meditourglobal"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <BsTwitterX className={styles.socialIcons} />{" "}
              </a>

              <a
                href="https://www.tiktok.com/@themeditour.global"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className={styles.socialIcons} />{" "}
              </a>
              <a
                href="https://www.linkedin.com/company/themeditourglobal/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className={styles.socialIcons} />{" "}
              </a>
              <a
                href="https://www.youtube.com/@themeditour.global"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className={styles.socialIcons} />
              </a>
              <a>
                <BsThreads className={styles.socialIcons} />
              </a>
              <a>
                <FaSnapchatGhost className={styles.socialIcons} />
              </a>
            </div>
          </div>
          <div
            className={classNames(
              commonstyles.col5,
              styles.mtsm24,
              styles.mtmd32,
              commonstyles.colsm12,
              commonstyles.colmd12
            )}
          >
            <div className={classNames(styles.ConsultancyBox, styles.mtsm32)}>
              <p
                className={classNames(
                  commonstyles.fs24,
                  commonstyles.medium,
                  styles.colorBlue
                )}
              >
                {t("getFreeopd")}
              </p>
              <p
                className={classNames(
                  commonstyles.fs16,
                  styles.colorGray,
                  styles.mt8
                )}
              >
                {t("fillForm")}
              </p>

              <div className={classNames(styles.flexCol, styles.mt24)}>
                <form onSubmit={formik.handleSubmit}>
                  <div className={classNames(styles.flexCol, styles.mt24)}>
                    <label className={styles.labels}>{t("_name")}:*</label>
                    <input
                      className={styles.inputs}
                      placeholder={t("writeHere")}
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className={styles.error}>{formik.errors.name}</div>
                    )}
                  </div>
                  <div className={classNames(styles.flexCol, styles.mt24)}>
                    <label className={styles.labels}>
                      {t("phoneNumber")}:*
                    </label>
                    <input
                      className={styles.inputs}
                      placeholder={t("writeHere")}
                      id="phonenumber"
                      name="phonenumber"
                      value={formik.values.phonenumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phonenumber &&
                      formik.errors.phonenumber && (
                        <div className={styles.error}>
                          {formik.errors.phonenumber}
                        </div>
                      )}
                  </div>
                  <div className={classNames(styles.flexCol, styles.mt24)}>
                    <label className={styles.labels}>{t("email")}:</label>
                    <input
                      className={styles.inputs}
                      placeholder={t("writeHere")}
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className={classNames(styles.flexCol, styles.mt24)}>
                    <label className={styles.labels}>{t("message")}:</label>
                    <textarea
                      className={styles.textaera}
                      placeholder={t("writeHere")}
                      id="message"
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <button type="submit" className={styles.btnSubmit}>
                    {t("submit")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
}
