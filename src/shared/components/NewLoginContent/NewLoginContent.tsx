import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import logo from "assets/images/logoMed.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { InputField, PrimaryButton, RingLoader } from "shared/components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { genericLoginSchema, GetColorCode } from "shared/utils";
import { useDispatch, useSelector } from "react-redux";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { setDoctorFormData } from "shared/redux";
import { Checkbox } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
interface Props {
  loading?: any;
  setLoading?: any;
  loginApi?: any;
  setActive?: any;
  handleSumbit?: any;
  error?: any;
  googleLogin?: any;
}

const NewLoginContent = (props: Partial<Props>) => {
  const {
    loading,
    setLoading,
    loginApi,
    setActive,
    handleSumbit,
    googleLogin,
  } = props;
  const { systemType } = useSelector((state: any) => state.root.common);
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const [notificationError] = useState("");
  const { forgotRout } = GetColorCode();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { headerText } = GetColorCode();
  const validationSchema = genericLoginSchema(t);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values: any) => {
      systemType == "user" ? handleSumbit(values) : handlelogic(values);
    },
  });
  console.log("working");
  const handlelogic = async (values: any) => {
    try {
      setLoading(true);
      await loginApi(formik.values.email, formik.values.password);
    } catch (err: any) {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };
  const handleRegisterForm = () => {
    setActive("Signup");
  };
  useEffect(() => {
    dispatch(setDoctorFormData(""));
  }, []);
  return (
    <div className={style.formcontainer}>
      <img src={logo} alt="logoLogin" className={style.logo} />
      <div>
        <p className={style.welcomback}>
          <span className={style.colorBlue}> {t("welcome")}</span>{" "}
          {i18n.language !== "ur" && (
            <span className={style.colorOrange}>{t("back")}</span>
          )}
        </p>
      </div>
      {notificationError && (
        <div className={classNames(commonStyles.error)}>
          *{notificationError}
        </div>
      )}
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <div style={{ marginBottom: "16px" }}>
            <InputField
              id="email"
              formik={formik}
              placeholder={t("email")}
              onChange={formik?.handleChange("email")}
            />
          </div>
          <InputField
            id="password"
            password={true}
            formik={formik}
            placeholder={t("password")}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            type={showPassword ? "text" : "password"}
            onChange={formik?.handleChange("password")}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className={style.RembermeContainer}>
          <div className={style.Remberme}>
            <div
              className={classNames(commonStyles.flx)}
              style={{ gap: "8px" }}
            >
              <Checkbox className={style.radioMark} />

              <p className={style.agreementText}>{t("Rememberme")}</p>
            </div>
            <Link className={style.forgot} to={forgotRout}>
              {t("Forgotpassword")}
            </Link>
          </div>
        </div>
        <div className={style.buttonContainer}>
          <PrimaryButton
            disabled={loading}
            arrowNext
            onClick={formik?.handleSubmit}
            type={"submit"}
            children={
              loading ? <RingLoader size={24} color={"#fff"} /> : t("login")
            }
            colorType={systemType === "user" ? "blue" : "MedicalService"}
          />
        </div>
        {systemType === "user" && (
          <div>
            <div className={style.divider}>OR</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={style.googlerow} onClick={googleLogin}>
                <FcGoogle size={24} />
                <p className={style.continueGogle}>{t("loginWithGoogle")}</p>
              </div>
            </div>

            <p
              className={classNames(style.newTo, commonStyles.textCenter)}
              style={{ marginTop: "16px" }}
            >
              {t("newtothisplatform")}
              <a
                style={{ cursor: "pointer" }}
                className={classNames(style.register)}
                onClick={handleRegisterForm}
              >
                {t("Register")}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewLoginContent;
