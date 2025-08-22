import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./userSignUpMain.module.css";
import logoImage from "../../../../assets/images/smallLogo.png";
import buttonImage from "../../../../assets/images/BackSignUpButton.png";
import BasicInfo from "./BasicInfo";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignup } from "shared/services";
import { setIsLoggedIn, setSystemType, setToken, set_User } from "shared/redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
interface FormValues {
  fullName: string;
  fatherName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAgreed: boolean;
}

const SignupLogin: React.FC = () => {
  const { t, i18n }: any = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const { state } = useLocation();

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      fatherName: "",
      phoneNumber: "",
      email: state?.email,
      password: "",
      confirmPassword: "",
      isAgreed: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required(t("nameIsRequired")),
      fatherName: Yup.string().required(t("fatherNameIsRequired")),
      phoneNumber: Yup.string()
        .required(t("phoneIsRequired"))
        .matches(/^\+?\d{1,3}\s?\d{3}\s?\d{7}$/, t("phonenumberisnotvalid")),
      password: Yup.string()
        .min(6, t("passwordmustbeatleast6characters"))
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          t("passwordmustincludeatleast1uppercase")
        )
        .required(t("passwordIsRequired")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], t("passwordMustMatch"))
        .required(t("confirmPasswordRequired")),
      isAgreed: Yup.boolean()
        .oneOf([true], t("mustAgreeTermsAndConditions"))
        .required(t("agreementisrequired")),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    let params = {
      name: values.fullName,
      email: values.email,
      spouseOrGuardianName: values.fatherName,
      phone: values.phoneNumber,
      password: values.password,
    };

    signupMutation.mutate(params);
  };

  const signupMutation = useMutation({
    mutationFn: (newUser: any) => userSignup(newUser),
    onSuccess: (res: any) => {
      dispatch(set_User(res?.data?.user));
      dispatch(setIsLoggedIn(true));
      dispatch(setToken(res?.data?.token));
      dispatch(setSystemType("user"));
      notifySuccess(t("registerSuccessful"));
      navigate("/");
    },
    onError: (err: any) => { },
  });

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/user/login");
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className={styles.containerSignUpLogin}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? styles.headerw33
            : styles.header
        }
        onClick={handleBack}
        style={{ cursor: "pointer" }}
      >
        <img src={buttonImage} alt="Button" className={styles.imageButton} />
        <h2 className={styles.registerHeading}>{t("basicInfo")}</h2>
      </div>
      <Link to="/">
        <img src={logoImage} alt="Logo" className={styles.logo} />
      </Link>
      <hr className={styles.horizontalLine} />

      <div className={styles.basicInfoStepForm}>
        <BasicInfo formik={formik} onAgreementChange={() => {}} />
      </div>

      {signupMutation.isPending && <CustomLoader />}
    </div>
  );
};

export default SignupLogin;
