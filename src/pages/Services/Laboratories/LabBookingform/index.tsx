import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./style.module.css";
import { InputField, RingLoader } from "shared/components";
import classNames from "classnames";
import { Radio } from "@mui/material";
import { useSelector } from "react-redux";
import { confirm_Booking } from "shared/services";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LabBookingForm = ({
  selectedPreference,
  actualAmount,
  serviceName,
  labId,
}: any) => {
  const { t, i18n }: any = useTranslation();
  const { user, userAge } = useSelector((state: any) => state.root.common);
  const [loading, setLoading] = useState(false);
  const [preference, setPreference] = useState(selectedPreference);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      phonenumber: user?.phone,
      email: user?.email,
      age: userAge,
      preference: "",
    },
    validationSchema: Yup.object({
      preference: Yup.string().required(t("pleaseSelectPreference")),
    }),
    enableReinitialize: false,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        phone: values.phonenumber,
        email: values.email || "",
        age: values.age || "",
        preference: values.preference,
      };

      try {
        setLoading(true);
        const result = await confirm_Booking(payload);
        notifySuccess(t("bookingSuccessful"));
      } catch (error) {
        notifyError(t("bookingFailed"));
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const handlePreferenceChange = (value: any) => {
    setPreference(value);
  };

  const handlePayment = async () => {
    navigate("/services/paymentDetail", {
      state: {
        actualAmount: actualAmount,
        serviceName: serviceName,
        labId: labId,
        selectedPreference: preference,
      },
    });
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classNames(styles.formcontainer)}
    >
      <div className={classNames(styles.textcontainer)}>
        <div className={styles.inputarea}>
          <div className={styles.inputfieldz}>
            <div className={styles.inputfield1}>
              <label className={styles.labeltext}> {t("_name")}</label>
              <InputField
                id="name"
                name="name"
                formik={formik}
                placeholder={t("_name")}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
                height="48px"
                backgroundColor="rgba(18, 17, 17, 0.17)"
                borderRadius="16px"
              />
            </div>
            <div className={styles.inputfield1}>
              <label className={styles.labeltext}>{t("phoneNumber")}</label>

              <InputField
                id="phonenumber"
                name="phonenumber"
                formik={formik}
                placeholder={t("phoneNumber")}
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                height="48px"
                backgroundColor="rgba(18, 17, 17, 0.17)"
                borderRadius="16px"
                disabled
              />
            </div>
          </div>

          {/* Email & Age */}
          <div className={styles.inputfieldz}>
            <div className={styles.inputfield1}>
              <label className={styles.labeltext}>{t("email")}</label>

              <InputField
                id="email"
                name="email"
                formik={formik}
                placeholder={t("email")}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                height="48px"
                backgroundColor="rgba(18, 17, 17, 0.17)"
                borderRadius="16px"
                disabled
              />
            </div>
            <div className={styles.inputfield1}>
              <label className={styles.labeltext}>{t("age")}</label>

              <InputField
                id="age"
                name="age"
                formik={formik}
                placeholder={t("age")}
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                height="48px"
                backgroundColor="rgba(18, 17, 17, 0.17)"
                borderRadius="16px"
                disabled
              />
            </div>
          </div>

          <div className={styles.prefrencecontainer}>
            <p className={styles.prefrencetext}>{t("preference")}</p>

            <div className={styles.radiobarcontainer}>
              <div
                style={{ display: "flex", gap: "0 10px", alignItems: "center" }}
              >
                <Radio
                  sx={{
                    width: "16px",
                    height: "16px",
                    color: "#FF9500",
                    "&.Mui-checked": { color: "#FF9500" },
                  }}
                  checked={preference === "lab" ? true : false}
                  onChange={() => handlePreferenceChange("lab")}
                />
                <p className={styles.labvisittext}>{t("labVisit")}</p>
              </div>

              <div
                style={{ display: "flex", gap: "0 10px", alignItems: "center" }}
              >
                <Radio
                  sx={{
                    width: "16px",
                    height: "16px",
                    color: "#FF9500",
                    "&.Mui-checked": { color: "#FF9500" },
                  }}
                  checked={preference === "home" ? true : false}
                  onChange={() => handlePreferenceChange("home")}
                />
                <p className={styles.labvisittext}>{t("homeSample")}</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className={styles.submitBtnWrapper}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
              onClick={handlePayment}
            >
              {loading ? (
                <RingLoader size={35} color={"#fff"} />
              ) : (
                t("confirmBooking")
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LabBookingForm;
