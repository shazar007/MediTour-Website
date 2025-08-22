import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { InputField, RingLoader } from "shared/components";
import { GetColorCode, user_ResetPassword } from "shared/utils";
import { PrimaryButton } from "shared/components";
import { initialValues, onSumbit } from "./resetProps";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import classNames from "classnames";
import LoginStyles from "./Uselogin.module.css";
import CommonStyles from "shared/utils/common.module.css";
import styles from "././SignUplogin/userSignUpMain.module.css";
import style from "../../Doctor/login/style.module.css";
import { FaChevronLeft } from "react-icons/fa";
import commonStyles from "shared/utils/common.module.css";
import logo from "assets/images/logoMed.png";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { __sendLinkToEmail } from "shared/services/DoctorService";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa6";

const ResetPassword = () => {
  const { t, i18n }: any = useTranslation();
  const isRTL = ["ur", "ar", "ps", "pr"].includes(i18n.language);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { systemType } = useSelector((state: any) => state.root.common);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { sendLink, loginScreen } = GetColorCode();
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [canResend]);

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(user_ResetPassword),
    onSubmit: (values: any) =>
      onSumbit(setLoading, values, state, navigate, systemType, loginScreen),
  });

  const check =
    systemType === "physiotherapist" ||
    systemType === "doctor" ||
    systemType === "psychologist" ||
    systemType === "paramedic" ||
    systemType === "nutritionist";
  const resendCode = () => {
    let params: any = {
      email: state?.email,
      type: check ? "doctor" : systemType,
    };
    if (check) {
      params.doctorKind = systemType;
    }

    setLoading(true);
    __sendLinkToEmail(params, sendLink)
      .then((res: any) => {
        notifySuccess(res?.data?.message);
        setTimer(60);
        setCanResend(false);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const handleGoToHome = () => {
    navigate("/joinVender");
  };

  return (
    <div
      className={styles.containerSignUpLogin}
      style={{ justifyContent: "center" }}
    >
      <div className={style.SwitchButtonConatiner}>
        <div
          className={style.BackToHome}
          style={{ marginTop: "15px" }}
          onClick={handleGoToHome}
        >
          {isRTL ? (
            <FaChevronRight className={style.BackIcon} />
          ) : (
            <FaChevronLeft className={style.BackIcon} />
          )}
          <p
            className={classNames(
              commonStyles.colorBlue,
              commonStyles.fs14,
              commonStyles.semiBold
            )}
          >
            {t("backToHome")}
          </p>
        </div>
      </div>

      <form
        className={LoginStyles.loginFormContainer}
        onSubmit={formik?.handleSubmit}
      >
        <div
          className={LoginStyles.logo}
          style={{
            alignSelf: "center",
            display: "flex",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ marginBottom: 0 }}
            className={LoginStyles.logoImage}
          />
        </div>
        <p className={styles.head}>
          <span className={styles.colorBlue}>{t("create")}</span>{" "}
          <span className={styles.colorOrange}>{t("newPassword")}</span>
        </p>
        <p
          className={classNames(
            CommonStyles.fs16,
            CommonStyles.regular,
            CommonStyles.colorBlue
          )}
          style={{
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {t("yourNewPassword_")}
        </p>
        <div style={{ marginBottom: "16px" }}>
          <InputField
            formik={formik}
            placeholder={t("enterYourDesirePassword")}
            password
            id="newPassword"
            showPassword={showPassword}
            type={showPassword ? "text" : "password"}
            togglePassword={() => setShowPassword(!showPassword)}
            value={formik?.values?.newPassword}
            onChange={formik?.handleChange("newPassword")}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <InputField
            formik={formik}
            password
            placeholder={t("confirmYourPassword")}
            id="confirmPassword"
            showPassword={showConfirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            value={formik?.values?.confirmPassword}
            onChange={formik?.handleChange("confirmPassword")}
          />
        </div>

        <InputField
          formik={formik}
          placeholder={t("verificationCode")}
          id="verificationCode"
          value={formik?.values?.verificationCode}
          onChange={formik?.handleChange("verificationCode")}
        />
        {canResend ? (
          <p onClick={resendCode} className={LoginStyles.resendCode}>
            {t("resendCode")}
          </p>
        ) : (
          <p style={{ color: "#a0a0a0" }}>
            {t("resendCodein")} {timer} {t("seconds")}
          </p>
        )}

        <div
          style={{
            marginTop: "16px",
            width: "100%",
          }}
        >
          <PrimaryButton
            disabled={loading}
            children={
              loading ? <RingLoader size={35} color={"#fff"} /> : t("next")
            }
            type="submit"
            colorType={"blue"}
          />
        </div>

        <div
          className={classNames(
            CommonStyles.mt24,
            CommonStyles.flx,
            CommonStyles.flxBetween
          )}
          style={{ alignSelf: "center" }}
        >
          <p className={classNames(CommonStyles.regular, CommonStyles.fs14)}>
            {t("alreadySignedUp")}?
          </p>
          <a
            className={classNames(
              CommonStyles.colorBlue,
              CommonStyles.fs16,
              CommonStyles.Bold,
              LoginStyles.cursor
            )}
            onClick={() => navigate("/user/login")}
            style={{ marginLeft: "6px" }}
          >
            {t("login")}
          </a>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
