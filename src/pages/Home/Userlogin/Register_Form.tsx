import { useEffect, useState } from "react";
import classNames from "classnames";
import CommonStyles from "shared/utils/common.module.css";
import LoginStyles from "./Uselogin.module.css";
import { CustomInput, PrimaryButton } from "shared/components";
import PasswordInput from "shared/components/PasswordInput";
import Datepicker from "shared/components/DatePicker";
import PhoneNumberInput from "shared/components/PhoneNumberInput";
import CustomSelect from "shared/components/CustomSelect";
import Logo from "assets/images/UserForm.png";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { userSignup } from "shared/services";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  setIsLoggedIn,
  setSystemType,
  setToken,
  setUserAge,
  set_User,
} from "shared/redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register_Form = () => {
  const { state }: any = useLocation();
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const { fcmToken } = useSelector((state: any) => state.root.common);

  const cDate = new Date();

  const [Dob, setDob] = useState(dayjs(cDate));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAge = async (daetOfBirth: any) => {
    const dobString = daetOfBirth;
    const dob = new Date(
      dobString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
    );
    const now = new Date();
    const diffMilliseconds = now.getTime() - dob.getTime();
    const calculatedAge = Math.floor(
      diffMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );
    const ageConvert_InString = calculatedAge?.toLocaleString();
    await dispatch(setUserAge(ageConvert_InString));
  };

  const formik: any = useFormik({
    initialValues: {
      name: "",
      email: state?.email,
      dateOfBirth: "",
      phoneNumber: "",
      gender: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      let params = {
        name: values?.name,
        email: values?.email,
        dateOfBirth: values?.dateOfBirth,
        phone: values?.phoneNumber,
        gender: values?.gender,
        password: values?.password,
        fcmToken: fcmToken,
      };
      userSignup(params)
        .then((res: any) => {
          if (res?.data?.auth) {
            dispatch(set_User(res?.data?.user));
            dispatch(setIsLoggedIn(true));
            dispatch(setToken(res?.data?.token));
            dispatch(setSystemType("user"));
            handleAge(res?.data?.user?.dateOfBirth);
            toast.success("Register Successful");
            navigate("/");
          }
        })
        .catch((err: any) => {
          notifySuccess(err?.response?.data?.message);
        })
        .finally(() => setLoading(false));
    },
  });

  const handleAptDate = (date: any) => {
    const selectedDate = dayjs(date);
    setDob(selectedDate);
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    formik.setFieldValue("dateOfBirth", formattedDate);
  };

  return (
    <>
      <div
        className={classNames(
          LoginStyles.paretns,
          CommonStyles.flx,
          CommonStyles.flxWrap
        )}
      >
        {!isMobile && (
          <>
            <div
              className={classNames(
                CommonStyles.col6,
                CommonStyles.colmd12,
                CommonStyles.colsm12,
                LoginStyles.centerContent
              )}
            >
              <form
                className={LoginStyles.loginFormContainer}
                onSubmit={formik.handleSubmit}
                style={{
                  padding: "20px",
                }}
              >
                <p
                  className={classNames(
                    CommonStyles.fs40,
                    CommonStyles.semiBold,
                    CommonStyles.colorBlue
                  )}
                >
                  {t("signup")}
                </p>
                <p
                  className={classNames(
                    CommonStyles.fs16,
                    CommonStyles.semiBold,
                    CommonStyles.colorBlue
                  )}
                >
                  {t("pleasegetregistertocontinue")}
                </p>
                <div className={CommonStyles.mt8}>
                  <CustomInput
                    placeholder={t("fullName")}
                    id="name"
                    name="name"
                    type="text"
                    value={formik?.values?.name}
                    onChange={formik?.handleChange("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className={classNames(CommonStyles.error)}>
                      *{formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className={CommonStyles.mt8}>
                  <CustomInput
                    contentEditable={false}
                    placeholder={t("pleaseEnterYourEmail")}
                    id="email"
                    name="email"
                    type="text"
                    value={formik?.values?.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className={classNames(CommonStyles.error)}>
                      *{formik?.errors?.email}
                    </div>
                  ) : null}
                </div>
                <div className={CommonStyles.mt8}>
                  <Datepicker value={Dob} setData={handleAptDate} />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className={classNames(CommonStyles.error)}>
                      *{formik.errors.dateOfBirth}
                    </div>
                  ) : null}
                </div>
                <div className={CommonStyles.mt8}>
                  <PhoneNumberInput
                    value={formik.values.phoneNumber}
                    setValue={(v: any) =>
                      formik.setFieldValue("phoneNumber", v)
                    }
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className={classNames(CommonStyles.error)}>
                      *{formik.errors.phoneNumber}
                    </div>
                  ) : null}
                </div>
                <div className={CommonStyles.mt8}>
                  <CustomSelect
                    options={["male", "female", "other"]}
                    placeholder={t("selectGender")}
                    onSelect={(option) =>
                      formik.setFieldValue("gender", option)
                    }
                    value={formik.values.gender}
                  />
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className={classNames(CommonStyles.error)}>
                      *{formik.errors.gender}
                    </div>
                  ) : null}
                </div>
                <div className={CommonStyles.mt8}>
                  <PasswordInput
                    placeholder={t("enterPassword")}
                    id="password"
                    name="password"
                    // type={inputType}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />

                  {formik.touched.password && formik.errors.password ? (
                    <div className={classNames(CommonStyles.error)}>
                      *{formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className={CommonStyles.mt16}>
                  <PrimaryButton
                    type="submit"
                    children={loading ? t("loading") : t("signup")}
                    colorType={"blue"}
                  />
                </div>
              </form>
            </div>
            <div
              className={classNames(
                LoginStyles.imgBackgrond,
                CommonStyles.col6,
                CommonStyles.colmd12,
                CommonStyles.colsm12
              )}
            >
              <div className={classNames(LoginStyles.centerContent)}>
                <img src={Logo} alt="Logo" className={LoginStyles.logoImage} />
              </div>
            </div>
          </>
        )}
      </div>
      {loading && <CustomLoader />}

      {isMobile && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px  0",
            }}
          >
            <form
              className={LoginStyles.loginFormContainer}
              onSubmit={formik.handleSubmit}
              style={{
                padding: "20px",
              }}
            >
              <div
                className={classNames(
                  CommonStyles.flx,
                  CommonStyles.flxBetween
                )}
              >
                <p
                  className={classNames(
                    CommonStyles.fs40,
                    CommonStyles.semiBold,
                    CommonStyles.colorBlue
                  )}
                >
                  {t("signup")}
                </p>
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    display: "flex",
                    width: "80px",
                  }}
                />
              </div>

              <p
                className={classNames(
                  CommonStyles.fs16,
                  CommonStyles.semiBold,
                  CommonStyles.colorBlue
                )}
              >
                {t("pleasegetregistertocontinue")}
              </p>
              <div className={CommonStyles.mt8}>
                <CustomInput
                  placeholder={t("fullName")}
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className={classNames(CommonStyles.error)}>
                    *{formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className={CommonStyles.mt8}>
                <CustomInput
                  placeholder={t("pleaseEnterYourEmail")}
                  id="email"
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className={classNames(CommonStyles.error)}>
                    *{formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className={CommonStyles.mt8}>
                <Datepicker
                  value={dayjs(formik.values.dateOfBirth)}
                  setData={handleAptDate}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <div className={classNames(CommonStyles.error)}>
                    *{formik.errors.dateOfBirth}
                  </div>
                ) : null}
              </div>
              <div className={CommonStyles.mt8}>
                <PhoneNumberInput
                  value={formik.values.phoneNumber}
                  setValue={(v: any) => formik.setFieldValue("phoneNumber", v)}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className={classNames(CommonStyles.error)}>
                    *{formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>
              <div className={CommonStyles.mt8}>
                <CustomSelect
                  options={["male", "female", "other"]}
                  placeholder={t("selectGender")}
                  onSelect={(option) => formik.setFieldValue("gender", option)}
                  value={formik.values.gender}
                />
                {formik.touched.gender && formik.errors.gender ? (
                  <div className={classNames(CommonStyles.error)}>
                    *{formik.errors.gender}
                  </div>
                ) : null}
              </div>
              <div className={CommonStyles.mt8}>
                <PasswordInput
                  placeholder={t("enterPassword")}
                  id="password"
                  name="password"
                  // type={inputType}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className={classNames(CommonStyles.error)}>
                    *{formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className={CommonStyles.mt16}>
                <PrimaryButton
                  type="submit"
                  children={loading ? t("loading") : t("signup")}
                  colorType={"blue"}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Register_Form;
