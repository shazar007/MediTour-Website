import React, { useState } from "react";
import styles from "./mainHomeServices.module.css";
import logoImage from "assets/images/smallLogo.png";
import buttonImage from "assets/images/BackSignUpButton.png";
import BasicInfo from "./Component/BasicInfo";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import ParamedicBasicInfo from "./Component/ParamedicBasicInfo";
import PasswordVerification from "./PasswordVerification";
import Social from "./Social";
import BankDetail from "./BankDetail";
import { GetColorCode } from "shared/utils";
import {
  GenericBasicInfoComapny,
  PharmaceuticalBasicInfo,
} from "shared/components";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const DoctorSignup: React.FC = () => {
  const navigate = useNavigate();
  const { isRtl } = useDirection();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { headerText } = GetColorCode();
  const { state } = useLocation();
  const { systemType } = useSelector((state: any) => state.root.common);
  const { t }: any = useTranslation();

  const handleBack = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 0) {
        navigate(`/${systemType}/login`);
        return prevStep;
      } else {
        return prevStep - 1;
      }
    });
  };

  const check =
    systemType === "physiotherapist" ||
    systemType === "doctor" ||
    systemType === "psychologist" ||
    systemType === "paramedic" ||
    systemType === "nutritionist";
  const getHeaderText = () => {
    switch (currentStep) {
      case 0:
        return t("basic");
      case 1:
        return t("social");
      case 2:
        return t("bank");
      case 3:
        return t("password");
      default:
        return t("register");
    }
  };
  return (
    <div className={styles.containerSignUpLogin}>
      <div
        className={styles.header}
        onClick={handleBack}
        style={
          isRtl
            ? {
                display: "flex",
                flexDirection: "row-reverse",
                gap: "10px",
                cursor: "pointer",
              }
            : { cursor: "pointer" }
        }
      >
        <img src={buttonImage} alt="Button" className={styles.imageButton} />
        <p className={styles.registerHeader}>
          {" "}
          {`${headerText} ${t("registration")}`}
        </p>
      </div>
      {/* <LanguageSelector /> */}
      <Link to="/">
        <img src={logoImage} alt="Logo" className={styles.logo} />
      </Link>
      <hr className={styles.horizontalLine} />
      <div className={styles.roundButtonContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`${styles.roundButton} ${
              index === currentStep
                ? styles.activeButton
                : index < currentStep
                ? styles.completedButton
                : ""
            }`}
          >
            {index < currentStep ? "✓" : index + 1}{" "}
          </div>
        ))}
      </div>
      <div className={styles.buttonLabels}>
        <div className={styles.label}>{`${t("basic")} ${t("info")}`}</div>
        <div className={styles.label}>{`${t("social")} ${t("info")}`}</div>
        <div className={styles.label}>{`${t("bank")} ${t("info")}`}</div>
        <div className={styles.label}>{`${t("password")} ${t("info")}`}</div>
      </div>
      <div className={styles.stepContent}>
        <div className={styles.basicInfoStepForm}>
          <div className={styles.mainHeadingSignUpPage}>
            {getHeaderText()}
            <span className={styles.secondMainHeadingSignUp}>{t("info")}</span>
          </div>
          {currentStep === 0 ? (
            systemType == "paramedic" ? (
              <ParamedicBasicInfo
                setCurrentStep={setCurrentStep}
                state={state?.email}
              />
            ) : check ? (
              <BasicInfo setCurrentStep={setCurrentStep} state={state?.email} />
            ) : systemType == "pharmaceutical" ? (
              <PharmaceuticalBasicInfo
                setCurrentStep={setCurrentStep}
                state={state?.email}
              />
            ) : (
              <GenericBasicInfoComapny
                setCurrentStep={setCurrentStep}
                state={state?.email}
              />
            )
          ) : currentStep === 1 ? (
            <Social setCurrentStep={setCurrentStep} />
          ) : currentStep === 2 ? (
            <BankDetail setCurrentStep={setCurrentStep} />
          ) : (
            <PasswordVerification loading={loading} setLoading={setLoading} />
          )}
        </div>
      </div>

      {loading && <CustomLoader />}
    </div>
  );
};

export default DoctorSignup;
