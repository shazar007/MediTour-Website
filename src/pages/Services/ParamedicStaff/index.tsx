import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import commonstyle from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { addParamedic } from "shared/services";
import styles from "./paramedicStaff.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatepickerNew from "shared/components/DatePicker/DatePickerNew";
import DownloadImagelogo from "../../../assets/images/DownloadImagelogo.png";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import ThankyouModel from "shared/components/ThankyouModel";
import { InputField } from "shared/components";
import CustomLoader from "shared/components/New_Loader/Loader";
import classNames from "classnames";
import { Radio } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ParamedicStaff: React.FC = () => {
  const { t, i18n }: any = useTranslation();
  const { state }: any = useLocation();
  const { isRtl } = useDirection();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoggedIn } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();

  const formik: any = useFormik({
    initialValues: {
      name: state?.name || "",
      email: state?.email || "",
      contact: state?.contact || "",
      address: state?.address || "",
      gender: state?.gender || "male",
      userArea: state?.userArea?.address || "",
      city: state?.city || "",
      remarks: state?.remarks || "",
      schedule: state?.schedule || "",
      customSchedule: state?.customSchedule || "",
      preferredDate: state?.preferredDate || null,
      preferredTime: state?.preferredTime || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("nameIsRequired")),
      email: Yup.string().required(t("inValidEmail")),
      contact: Yup.string().required(t("contactIsRequired")),
      address: Yup.string().required(t("addressIsRequired")),
      gender: Yup.string().required(t("genderIsRequired")),
      userArea: Yup.string().required(t("areaIsRequired")),
      city: Yup.string().required(t("cityIsRequired")),
      remarks: Yup.string().required(t("remarksIsRequired")),
      schedule: Yup.string().required(t("scheduleIsRequired")),
      preferredDate: Yup.date().required(t("dateIsRequired")),
      preferredTime: Yup.string().required(t("timeIsRequired")),
      customSchedule: Yup.string().when("schedule", {
        is: (val: string) => val === "other",
        then: (schema) => schema.required(t("specifyYourSchedule")),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    enableReinitialize: false,
    onSubmit: (values) => {
      const data = {
        ...values,
        userArea: {
          area: values.userArea,
          address: values.address,
          city: values.city,
        },
        customSchedule:
          values.schedule === "other" ? values.customSchedule : undefined,
      };
      if (isLoggedIn) {
        setLoading(true);
        addParamedic(data)
          .then(() => {
            setIsModalVisible(true);
            setTimeout(() => {
              formik.resetForm({
                values: {
                  name: "",
                  email: "",
                  contact: "",
                  address: "",
                  gender: "male",
                  userArea: "",
                  city: "",
                  remarks: "",
                  schedule: "",
                  customSchedule: "",
                  preferredDate: null,
                  preferredTime: "",
                },
              });
              setIsModalVisible(false);
            }, 2000);
          })
          .catch((err) => {
            console.error("Error submitting form:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        navigate("/user/login", {
          state: {
            state: data,
            loginFrom: "paramedic",
          },
          replace: true,
        });
      }
    },
  });
  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={styles.paramedicFormContainer}>
        <div className={styles.textContainer}>
          <p
            className={styles.bluetext}
            style={
              isRtl
                ? { display: "flex", flexDirection: "row-reverse" }
                : undefined
            }
          >
            {t("getTheRightParamedicFor")}{" "}
            <span className={styles.orangetext}>
              {i18n.language !== "ur" && <>{t("yourNeeds")}</>}
            </span>
          </p>
          <div style={{ marginTop: "14px" }}>
            <p
              className={styles.textdetail}
              style={i18n.language === "ur" ? { lineHeight: "34px" } : {}}
            >
              {t("needSkilledNursing_")}
            </p>
          </div>
        </div>
        <div className={styles.paramedicForm}>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.formSectionsContainer}>
              <div
                className={classNames(commonstyle.col6, commonstyle.colsm12)}
              >
                <div style={{ marginBottom: "24px" }}>
                  <p className={styles.patientDetailsHeading}>
                    {t("addPatientDetails")}
                  </p>
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <InputField
                    id="name"
                    name={"name"}
                    formik={formik}
                    placeholder={`${t("_name")}*`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    height="48px"
                    backgroundColor="#f5f5f5"
                  />
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <InputField
                    id="email"
                    name={"email"}
                    formik={formik}
                    placeholder={`${t("email")}*`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    height="48px"
                    backgroundColor="#f5f5f5"
                  />
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <InputField
                    id="contact"
                    name={"contact"}
                    formik={formik}
                    placeholder={`${t("contact")}*`}
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    height="48px"
                    backgroundColor="#f5f5f5"
                  />
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <InputField
                    id="address"
                    name={"address"}
                    formik={formik}
                    placeholder={`${t("address")}*`}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    height="48px"
                    backgroundColor="#f5f5f5"
                  />
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <textarea
                    className={styles.reviewTextAreaParamedicForm}
                    placeholder={t("writeYourRemarksHere")}
                    name={"remarks"}
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.remarks && formik.errors.remarks && (
                    <span className={styles.error}>
                      {formik.errors.remarks}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={classNames(commonstyle.col6, commonstyle.colsm12)}
              >
                <div className={styles.inputGroupContainerParamedicForm}>
                  <div style={{ marginBottom: "24px" }}>
                    <p className={styles.patientDetailsHeading}>
                      {t("requirements")}
                    </p>
                  </div>
                  <label className={styles.inputLabelParamedicForm}>
                    {t("gender")}
                  </label>

                  <div
                    className={styles.radioOptionsContainerParamedicForm}
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {["male", "female"].map((option) => (
                      <label
                        key={option}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          cursor: "pointer",
                          alignSelf: "center",
                        }}
                      >
                        <Radio
                          name="gender"
                          value={option}
                          checked={formik.values.gender === option}
                          onChange={formik.handleChange}
                          sx={{
                            width: "16px",
                            height: "16px",
                            color: "#FF9500",
                            "&.Mui-checked": { color: "#FF9500" },
                            padding: 0,
                          }}
                        />
                        <span style={{ fontSize: "14px" }}>
                          {/* {option.charAt(0).toUpperCase() + option.slice(1)} */}
                          {t(option)}
                        </span>
                      </label>
                    ))}
                  </div>

                  {formik.touched.gender && formik.errors.gender && (
                    <span className={commonstyle.error}>
                      {formik.errors.gender}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <div className={styles.widthDatePicker}>
                    <DatepickerNew
                      setData={(date: dayjs.Dayjs | null) => {
                        if (date?.isValid()) {
                          formik.setFieldValue(
                            "preferredDate",
                            date.format("YYYY-MM-DD")
                          );
                        } else {
                          formik.setFieldValue("preferredDate", null);
                        }
                      }}
                      onChange={(e: dayjs.Dayjs | null) => {
                        formik.setFieldValue(
                          "preferredDate",
                          e?.isValid() ? e.format("YYYY-MM-DD") : null
                        );
                      }}
                      value={
                        formik.values?.preferredDate &&
                          dayjs(formik.values.preferredDate).isValid()
                          ? dayjs(formik.values.preferredDate)
                          : null
                      }
                      height="48px"
                      className={styles.dateInput}
                      backgroundColor="#f5f5f5"
                    />
                    {formik.touched.preferredDate &&
                      formik.errors.preferredDate && (
                        <div className={styles.error}>
                          {t("dateIsRequired")}
                        </div>
                      )}
                  </div>
                  <div className={styles.inputGroupBasic}>
                    <CustomTimePicker
                      AM="hh:mm A"
                      setData={(time) =>
                        formik.setFieldValue("preferredTime", time)
                      }
                      type="box"
                      value={formik.values.preferredTime}
                    />
                    {formik.touched.preferredTime &&
                      formik.errors.preferredTime && (
                        <div className={styles.error}>
                          {formik.errors.preferredTime}
                        </div>
                      )}
                  </div>
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <InputField
                    id="userArea"
                    name={"userArea"}
                    formik={formik}
                    placeholder={t("enterYourArea")}
                    value={formik.values.userArea}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    height="48px"
                    backgroundColor="#f5f5f5"
                  />
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <InputField
                    id="city"
                    name={"city"}
                    formik={formik}
                    placeholder={t("enterYourCity")}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    height="48px"
                    backgroundColor="#f5f5f5"
                  />
                </div>

                <div className={styles.inputGroupContainerParamedicForm}>
                  <label className={styles.inputLabelParamedicForm}>
                    {t("schedule")}
                  </label>

                  <div
                    className={styles.radioOptionsContainerParamedicForm}
                    style={{
                      display: "flex",
                      gap: "25x",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {["day", "night", "other"].map((option) => (
                      <label
                        key={option}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          cursor: "pointer",
                        }}
                      >
                        <Radio
                          name="schedule"
                          value={option}
                          checked={formik.values.schedule === option}
                          onChange={formik.handleChange}
                          sx={{
                            width: "16px",
                            height: "16px",
                            color: "#FF9500",
                            "&.Mui-checked": { color: "#FF9500" },
                            padding: 0, // tighter spacing
                          }}
                        />
                        <span style={{ fontSize: "14px", margin: '0 5px' }}>{t(option)}</span>
                      </label>
                    ))}
                  </div>
                  {formik.touched.schedule && formik.errors.schedule && (
                    <span className={styles.error}>
                      {formik.errors.schedule}
                    </span>
                  )}
                </div>

                {formik.values.schedule === "other" && (
                  <div className={styles.inputGroupContainerParamedicForm}>
                    <InputField
                      id="customSchedule"
                      name="customSchedule"
                      formik={formik}
                      placeholder={t("enterYourSchedule")}
                      value={formik.values.customSchedule}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      height="48px"
                    />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              {t("submit")}
              <img
                src={DownloadImagelogo}
                alt="Logo"
                className={styles.downloadButtonLogo}
                style={isRtl ? { transform: "scaleX(-1)" } : undefined}
              />
            </button>
          </form>
        </div>

        {loading && <CustomLoader />}
        {isModalVisible && (
          <ThankyouModel
            mainMessageLine1={t("yourRequestHasBeen")}
            mainMessageLine2={t("successfullyShared")}
            subMessage={t("weWillNotifyYou")}
            footerMessage={t("thankYou")}
            onClose={() => setIsModalVisible(false)}
          />
        )}
      </div>
      <Footerr />
    </div>
  );
};

export default ParamedicStaff;
