import React, { useState } from "react";
import classNames from "classnames";
import styles from "./login.module.css";
import commonStyles from "shared/utils/common.module.css";
import MainhomeStyles from "./mainHomeServices.module.css";
import { Login_Schema } from "shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { SuccessModal, LoadingModal, RingLoader } from "shared/components";
import {
  setIsLoggedIn,
  setToken,
  set_User,
} from "shared/redux/reducers/commonReducer";
import { Checkbox } from "@mui/material";
import { CustomInput, PrimaryButton } from "shared/components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import PasswordInput from "shared/components/PasswordInput";
import { docLogin } from "shared/services/DoctorService";
import { hospitalLogin } from "shared/services/HospitalService";
import CustomLoader from "../New_Loader/Loader";

interface Props {
  dashboard_url: any;
  type: string;
  image_source: any;
  handle_login?: any;
}

const Doctor_Login = (props: Partial<Props>) => {
  const { dashboard_url, type, image_source, handle_login } = props;
  const navigate = useNavigate();
  const [notificationError] = useState("");
  const { systemType, fcmToken } = useSelector(
    (state: any) => state.root.common
  );
  const handleGoToHome = () => {
    navigate("/joinVender");
  };
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object(Login_Schema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = async () => {
    try {
      const permission = await checkNotificationPermission();

      if (permission === "denied") {
        alert(
          "To continue with the login process, please enable notifications."
        );
        // setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      if (
        systemType === "doctor" ||
        systemType === "physiotherapist" ||
        systemType === "nutritionist" ||
        systemType === "psychologist"
      ) {
        await doctor_login();
      } else if (systemType === "hospital") {
        await hospital_login();
      } else if (systemType === "pharmaceutical") {
        let params = {
          email: formik.values.email,
          password: formik.values.password,
          ...(fcmToken && { fcmToken }),
        };
        await handle_login(params, setLoading, setError, handleDispatchData);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred.");

      setLoading(false);
    }
  };

  const checkNotificationPermission = () => {
    return new Promise((resolve, reject) => {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          resolve(permission);
        });
      } else {
        resolve(Notification.permission);
      }
    });
  };

  const handleDispatchData = (token: any, data: any) => {
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(set_User(data));
    setShowSuccessModal(true);
    navigate(`${systemType}/dashboard`);
  };
  const doctor_login = () => {};
  // const doctor_login = () => {
  //   let body = {
  //     doctorKind: systemType,
  //     email: formik.values.email,
  //     password: formik.values.password,
  //     fcmToken,
  //   };

  //   docLogin(body)
  //     .then((res: any) => {
  //       handleDispatchData(res?.data?.token, res?.data?.doctor);
  //     })
  //     .catch((err: any) => {
  //       // setError(err?.response?.data?.message);
  //

  //       window.location.reload();
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const hospital_login = () => {
    let params = {
      email: formik.values.email,
      password: formik.values.password,
      ...(fcmToken && { fcmToken }),
    };

    hospitalLogin(params)
      .then((res: any) => {
        handleDispatchData(res?.data?.token, res?.data?.hospital);
      })
      .catch((err: any) => {
        // setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <div className={classNames(commonStyles.container)}>
      <div className={classNames(MainhomeStyles.flx)}>
        <div
          className={classNames(
            commonStyles.col7,
            commonStyles.colmd7,
            commonStyles.colsm12
          )}
        >
          <div
            className={classNames(
              commonStyles.col8,
              commonStyles.colmd12,
              commonStyles.colsm12
            )}
          >
            <div
              className={classNames(commonStyles.flx, styles.cursor)}
              onClick={handleGoToHome}
            >
              <FaChevronLeft className={styles.BackIcon} />
              <p
                className={classNames(
                  commonStyles.colorBlue,
                  commonStyles.fs14,
                  commonStyles.semiBold
                )}
              >
                Back to Home
              </p>
            </div>
            <p
              className={classNames(
                commonStyles.fs40,
                styles.mt100,
                commonStyles.semiBold,
                commonStyles.colorBlue
              )}
            >
              Login
            </p>
            <p
              className={classNames(
                commonStyles.fs16,
                styles.mt16,
                commonStyles.semiBold,
                commonStyles.colorBlue
              )}
            >
              Login to access account at MediTour
            </p>

            {error && (
              <div className={classNames(commonStyles.error)}>*{error}</div>
            )}
            {notificationError && (
              <div className={classNames(commonStyles.error)}>
                *{notificationError}
              </div>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div
                className={classNames(commonStyles.mt50, commonStyles.mtsm28)}
              >
                <CustomInput
                  placeholder="Enter Your Email"
                  id="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className={classNames(commonStyles.error)}>
                    *{formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div
                className={classNames(commonStyles.mt24, commonStyles.mtsm28)}
              >
                <PasswordInput
                  placeholder="Enter Your Password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onKeyPress={handleKeyPress}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className={classNames(commonStyles.error)}>
                    *{formik.errors.password}
                  </div>
                ) : null}

                <div
                  className={classNames(
                    styles.flxBetween,
                    commonStyles.mb40,
                    styles.mt8
                  )}
                >
                  <div className={classNames(commonStyles.flx)}>
                    <Checkbox style={{ color: "#ff7631" }} />
                    {/* <p
                      className={classNames(
                        commonStyles.colorBlue,
                        commonStyles.fs14
                      )}
                    >
                      Remember me
                    </p> */}
                  </div>
                  <a
                    className={classNames(
                      commonStyles.colorOrange,
                      commonStyles.fs14,
                      commonStyles.flxEnd,
                      styles.cursor
                    )}
                    onClick={() => navigate(`/${systemType}/forgot-password`)}
                  >
                    Forgot Password
                  </a>
                </div>
                <div className={classNames(commonStyles.mb16)}>
                  <PrimaryButton
                    type={"submit"}
                    children={
                      loading ? (
                        <RingLoader size={35} color={"#fff"} />
                      ) : (
                        "Login"
                      )
                    }
                    colorType={type}
                  />
                </div>
                <div>
                  <p
                    className={classNames(
                      commonStyles.regular,
                      commonStyles.fs14,
                      commonStyles.textCenter
                    )}
                  >
                    Haven't created account yet?{" "}
                    <a
                      className={classNames(
                        commonStyles.colorOrange,
                        styles.cursor
                      )}
                      onClick={() => navigate(`/${type}/signup`)}
                    >
                      Sign Up
                    </a>{" "}
                  </p>
                </div>
              </div>
            </form>
            <SuccessModal
              showModal={showSuccessModal}
              successMessage={"LogIn Successful!"}
              hanldeCloseModal={handleCloseSuccessModal}
            />
            {loading && <CustomLoader />}
          </div>
        </div>
        <div className={classNames(commonStyles.colsm12, commonStyles.col4)}>
          <img
            src={image_source}
            alt="DoctorLogin"
            className={commonStyles.LoginVector}
          />
        </div>
      </div>
    </div>
  );
};

export default Doctor_Login;
