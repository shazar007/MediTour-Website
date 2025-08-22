import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./adminlogin.module.css";
import commonStyles from "shared/utils/common.module.css";
import { PrimaryButton, RingLoader } from "shared/components";
import { Checkbox } from "@mui/material";
import Logo from "assets/images/loginLogo.png";
import AdminInput from "../Components/AdminInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddminLoginSchema } from "shared/utils";
import { adminLogin } from "shared/services";
import { setIsLoggedIn, setSystemType, setToken, setUser } from "shared/redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  useEffect(() => {
    document.title = "MediTour Global | Admin";
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fcmToken } = useSelector((state: any) => state.root.common);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object(AddminLoginSchema),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const inputType = passwordVisible ? "text" : "password";

  const handleLogin = async (values: any) => {
    setError("");
    setLoading(true);

    try {
      // const permission = await checkNotificationPermission();
      // if (permission === "denied") {
      //   alert(
      //     "To continue with the login process, please enable notifications."
      //   );
      //   setLoading(false);
      //   return;
      // }

      let params = {
        email: values.email,
        password: values.password,
        ...(fcmToken && { fcmToken }),
      };

      adminLogin(params)
        .then((res: any) => {
          if (res?.data?.auth) {
            dispatch(setToken(res?.data?.token));
            dispatch(setSystemType("admin"));
            dispatch(setIsLoggedIn(true));
            dispatch(setUser(res?.data?.admin));

            // Navigate to dashboard
            navigate("/admin/dashboard");
          } else {
            // Handle case where login fails (authentication failed)
            setError("Invalid login credentials. Please try again.");
          }
        })
        .catch((err: any) => {
          console.error("Login error:", err);
          setError(
            err?.response?.data?.message || "An unexpected error occurred."
          );
        })
        .finally(() => setLoading(false));
    } catch (err: any) {
      console.error("Error during notification permission check:", err);
      setError("An error occurred while checking notification permissions.");
      setLoading(false);
    }
  };

  const checkNotificationPermission = () => {
    return new Promise<string>((resolve) => {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          resolve(permission);
        });
      } else {
        resolve(Notification.permission);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <div className={classNames(styles.OuterLogin)}>
      <div className={styles.LoginBox}>
        <div className={styles.Outerlogo}>
          <img src={Logo} alt="logo1" className={styles.logo} />
        </div>
        <p
          className={classNames(
            commonStyles.fs40,
            commonStyles.bold,
            styles.mt16,
            styles.primarycolor
          )}
        >
          Login
        </p>
        <p
          className={classNames(
            commonStyles.fs16,
            commonStyles.regular,
            styles.colorgray,
            styles.mt
          )}
          style={{ fontWeight: "400" }}
        >
          Login to access at Admin Panel
        </p>
        {error && (
          <div className={classNames(commonStyles.error)}>*{error}</div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.mt24}>
            <AdminInput
              placeholder="Email"
              Label={"Example@gmail.com"}
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
          <div className={styles.mt24}>
            <AdminInput
              ispassword={"password"}
              placeholder="Password"
              id="password"
              name="password"
              type={inputType}
              onChange={formik.handleChange}
              value={formik.values.password}
              onKeyDown={handleKeyDown}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className={classNames(commonStyles.flx, styles.mt8)}>
            <Checkbox
              sx={{ width: "24px", height: "24px" }}
              className={styles.checkBoxx}
            />
            <p
              className={classNames(
                styles.primarycolor,
                commonStyles.fs14,
                commonStyles.semiBold
              )}
            >
              Remember me
            </p>
          </div>
          <div className={classNames(commonStyles.mt56)}>
            {/* {error ? (
              <div
                style={{ marginBottom: "8px" }}
                className={classNames(commonStyles.error)}
              >
                *{error}
              </div>
            ) : null} */}
            <PrimaryButton
              disabled={loading}
              onClick={formik.handleSubmit}
              children={
                loading ? <RingLoader size={35} color={"#fff"} /> : "Login"
              }
              colorType={"admin"}
              type="submit"
            />
          </div>{" "}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
