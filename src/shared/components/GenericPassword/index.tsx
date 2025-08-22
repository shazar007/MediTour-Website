import React, { useState } from "react";
import styles from "../GenericSocialInfo.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { doctor_VerifySchemaNew } from "shared/utils";
import { useSelector } from "react-redux";
import { InputField, SuccessModal } from "shared/components";
import { useTranslation } from "react-i18next";
const GenericPassword = (props: any) => {
        const {t} : any = useTranslation()
  
  const { loading, handleSignup, showSuccessModal, handleCloseSuccessModal, type, handleBack } =
    props;
  const { doctorFormData } = useSelector((state: any) => state.root.common);
  const [showPassword, setShowPassword] = useState(false);
   const checkType = type === "branch" || type === "doctor" || type === "labs" || type === "pharmacy" || type==="travel" || type ==="hotel"
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object(doctor_VerifySchemaNew(t)),
    onSubmit: () => {
      let currentData = formik.values;
      handleSignup(currentData);
    },
  });
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      formik.handleSubmit();
    }
  };
  return (
    <>
      <form onSubmit={formik?.handleSubmit}>
        <div className={styles.rowSocial}>
          <div className={styles.inputGroupSocial}>
            <InputField
              id="password"
              password={true}
              formik={formik}
              placeholder={`${t("password")}*`}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              type={showPassword ? "text" : "password"}
              onChange={formik?.handleChange("password")}
            // onKeyDown={handleKeyPress}
            />
          </div>

          <div className={styles.inputGroupSocial}>
            <InputField
              id="confirmPassword"
              password={true}
              formik={formik}
              placeholder={`${t("confirmPassword")}*`}
              showPassword={showConfirmPassword}
              togglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              type={showConfirmPassword ? "text" : "password"}
              onChange={formik?.handleChange("confirmPassword")}
            onKeyDown={handleKeyPress}
            />
          </div>
        </div>
        {checkType ? (
          <div className={styles.branchContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            {t("back")}
          </button>
 
          <button className={styles.nextButton} type="submit">
          {loading ? t("loading") : `${t("submit")} →`}
          </button>
        </div>
        ) : (
          <div className={styles.buttonContainer}>
            <button className={styles.continueButton} type="submit">
              {loading ? t("loading") : `${t("submit")} →`}
            </button>
          </div>
        )}

      </form>
      <SuccessModal
        showModal={showSuccessModal}
        successMessage={type == "branch"?t("createdSuccessfully"):t("signupCompletedSuccessfully")}
        hanldeCloseModal={handleCloseSuccessModal}
      />
    </>
  );
};

export default GenericPassword;
