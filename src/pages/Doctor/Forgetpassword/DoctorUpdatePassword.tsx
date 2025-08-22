import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from "./forgetPassword.module.css";
import { doctorConfirmPasswordSchema, GetColorCode } from "shared/utils";
import commonStyles from "shared/utils/common.module.css";
import { _resetPassword } from "shared/services/DoctorService";
import {
  CustomModal,
  InputField,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { EmailSendModel } from "shared/components/CustomEmailModel/emailSendModel";
import backgroundimg from "assets/images/Background.png";
import logo from "assets/images/logoMed.png";
import { useTranslation } from "react-i18next";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
const DoctorUpdatePassword = () => {
  const navigate = useNavigate();
  const { t }: any = useTranslation();
  const { resetPassword } = GetColorCode();
  const [loading, setLoading] = useState(false);
  const [SuccessModel, setSuccessModel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [desireshowPassword, setdesireshowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      desiredPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object(doctorConfirmPasswordSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    let params = {
      newPassword: formik.values.confirmPassword,
    };
    const token = localStorage.getItem("token");

    if (token !== null) {
      _resetPassword(params, token, resetPassword)
        .then((res: any) => {
          if (res.status === 200) {
            setSuccessModel(true);

            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        })
        .catch((err: any) => {
          notifyError(
            err?.response?.data?.message || "An unknown error occurred"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error("Token is null");
    }
  };

  return (
    <div className={styles.container}>
      <img
        src={backgroundimg}
        alt="Background"
        className={styles.backgroundimg}
      />
      <div className={styles.formcontainer}>
        <img src={logo} alt="logo4" className={styles.logo} />
        <p className={styles.welcomback}>
          <span className={styles.colorBlue}>{t("reset")}</span>{" "}
          <span className={styles.colorOrange}>{t("password")}</span>
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ marginBottom: "8px", marginTop: "16px" }}>
            <div style={{ marginBottom: "16px" }}>
              <InputField
                id="desiredPassword"
                formik={formik}
                placeholder={t("desiredPassword")}
                onChange={formik?.handleChange("desiredPassword")}
                showPassword={desireshowPassword}
                password={true}
                togglePassword={() =>
                  setdesireshowPassword(!desireshowPassword)
                }
                type={desireshowPassword ? "text" : "password"}
              />
            </div>
            <InputField
              id="confirmPassword"
              formik={formik}
              placeholder={t("confirmPassword")}
              onChange={formik?.handleChange("confirmPassword")}
              showPassword={showPassword}
              password={true}
              togglePassword={() => setShowPassword(!showPassword)}
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div className={classNames(commonStyles.mb56, commonStyles.mt56)}>
            <PrimaryButton
              children={
                loading ? (
                  <RingLoader size={35} color={"#fff"} />
                ) : (
                  "Password Update"
                )
              }
              colorType={"MedicalService"}
            />
          </div>
        </form>
      </div>
      <CustomModal
        showModal={SuccessModel}
        children={
          <EmailSendModel
            setSuccessModel={setSuccessModel}
            showText="Password Successfully Updated, Please Login"
          />
        }
      />
    </div>
  );
};

export default DoctorUpdatePassword;
