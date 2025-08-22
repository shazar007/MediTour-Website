import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./freeopd.module.css";
import Footerr from "../HomeNavBar/Footer";
import { useTranslation } from "react-i18next";
import { InputField, RingLoader } from "shared/components";
import classNames from "classnames";
import { FREE_OPD } from "shared/services/UserService";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";

const FreeOpd = () => {
  const { t }: any = useTranslation();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phonenumber: "",
      email: "",
      freeopd: "",
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
        message: values.freeopd || "",
      };

      setLoading(true);

      try {
        const response = await FREE_OPD(payload);
        console.log("✅ Success Response:", response.data);
        notifySuccess(t("yourFarmHas_"));
        formik.resetForm();

        // Reset loading state
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className={classNames(styles.formoutercontainer)}>
        <form
          onSubmit={formik.handleSubmit}
          className={classNames(styles.formcontainer)}
        >
          <div>
            <p className={styles.gettext}>
              {t("get")}{" "}
              <span className={styles.orangetext}>{t("freeOnline")}</span>{" "}
              {t("consultation")}
            </p>

            <div className={styles.subtextcontainer}>
              <p className={styles.subtext}>{t("fillForm")}</p>
            </div>

            <div className={styles.inputarea}>
              <div className={styles.inputfieldz}>
                <div className={styles.inputfield1}>
                  <InputField
                    id="name"
                    name="name"
                    formik={formik}
                    placeholder={t("_name")}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    height="48px"
                  />
                </div>

                <div className={styles.inputfield1}>
                  <InputField
                    id="phonenumber"
                    name="phonenumber"
                    formik={formik}
                    placeholder={t("phoneNumber")}
                    value={formik.values.phonenumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    height="48px"
                  />
                </div>
              </div>

              <div className={styles.inputfield2} style={{ margin: "16px 0" }}>
                <InputField
                  id="email"
                  name="email"
                  formik={formik}
                  placeholder={t("email")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  height="48px"
                />
              </div>

              <div className={styles.inputfield2}>
                <textarea
                  id="freeopd"
                  rows={4}
                  placeholder={t("message")}
                  value={formik.values.freeopd}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.textarea}
                />
                {formik.touched.freeopd && formik.errors.freeopd && (
                  <div className={styles.error}>{formik.errors.freeopd}</div>
                )}
              </div>

              <div className={styles.submitBtnWrapper}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <RingLoader size={35} color={"#fff"} />
                  ) : (
                    t("submit")
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footerr />
    </>
  );
};

export default FreeOpd;
