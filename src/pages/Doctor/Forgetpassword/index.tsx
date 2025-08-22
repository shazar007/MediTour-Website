import { useState } from "react";
import classNames from "classnames";
import styles from "./forgetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "assets/images/logoMed.png";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { doctorResetSchema, GetColorCode } from "shared/utils";
import { __sendLinkToEmail } from "shared/services/DoctorService";
import backgroundimg from "assets/images/Background.png";
import userBackgroundimg from "assets/images/BackgroundLoginSignUp.png";
import {
  CustomModal,
  InputField,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { EmailSendModel } from "shared/components/CustomEmailModel/emailSendModel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
const DoctorForgetPassword = () => {
  const { isRtl } = useDirection();
  const { t }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const { sendLink, newPasswordRout } = GetColorCode();
  const [SuccessModel, setSuccessModel] = useState(false);

  const { systemType } = useSelector((state: any) => state.root.common);
  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object(doctorResetSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const check =
    systemType === "physiotherapist" ||
    systemType === "doctor" ||
    systemType === "psychologist" ||
    systemType === "paramedic" ||
    systemType === "nutritionist";
  const handleSubmit = () => {
    setLoading(true);
    let params: any = {
      email: formik.values.Email,
      type: check ? "doctor" : systemType,
    };
    if (check) {
      params.doctorKind = systemType;
    }

    __sendLinkToEmail(params, sendLink)
      .then((res: any) => {
        if (res.status === 200) {
          notifySuccess(res?.data?.message);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate(newPasswordRout, {
              state: { email: formik.values.Email },
            });
          }, 1000);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate(`/${systemType}/login`);
  };
  return (
    <div className={styles.container}>
      <img
        src={systemType === "user" ? userBackgroundimg : backgroundimg}
        alt="Background"
        className={styles.backgroundimg}
      />

      <div className={styles.SwitchButtonConatiner}>
        <div className={styles.BackToHome} onClick={handleGoToHome}>
          {isRtl ? (
            <FaChevronRight className={styles.BackIcon} />
          ) : (
            <FaChevronLeft className={styles.BackIcon} />
          )}
          <p
            className={classNames(
              commonStyles.colorBlue,
              commonStyles.fs14,
              commonStyles.semiBold
            )}
          >
            {t("backToLogin")}
          </p>
        </div>
      </div>
      <div className={styles.formcontainer}>
        <img src={logo} alt="logo3" className={styles.logo} />
        <div style={{ alignSelf: "center", display: "flex" }}>
          <p className={styles.welcomback}>
            <span className={styles.colorBlue}>{t("forgotyour")}</span>{" "}
            <span className={styles.colorOrange}> {t("password")}</span>
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          style={{
            width: "80%",
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: "8px", marginTop: "50px" }}>
            <div style={{ marginBottom: "16px" }}>
              <InputField
                id="Email"
                formik={formik}
                placeholder={t("pleaseEnterEmail")}
                onChange={formik?.handleChange("Email")}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <PrimaryButton
              arrowNext
              children={
                loading ? (
                  <RingLoader size={35} color={"#fff"} />
                ) : (
                  t("sendCode")
                )
              }
              type="submit"
              colorType={systemType === "user" ? "blue" : "MedicalService"}
            />
            {loading && <CustomLoader />}
          </div>
        </form>
      </div>
      <CustomModal
        showModal={SuccessModel}
        children={
          <EmailSendModel
            setSuccessModel={setSuccessModel}
            showText={t("linkSendToTheEmail_")}
          />
        }
      />
    </div>
  );
};

export default DoctorForgetPassword;
