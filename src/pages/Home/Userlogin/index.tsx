import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, user_login } from "shared/services";
import styles from "././SignUplogin/userSignUpMain.module.css";
import style from "../../Doctor/login/style.module.css";
import {
  set_User,
  setIsLoggedIn,
  setSystemType,
  setToken,
  setUserAge,
} from "shared/redux";
import NewLoginContent from "shared/components/NewLoginContent/NewLoginContent";
import { FaChevronLeft } from "react-icons/fa";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import { GenericVerifyEmailVendor } from "shared/components";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa6";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";

const UserLogin = () => {
  const { t, i18n }: any = useTranslation();
  const isRTL = ["ur", "ar", "ps", "pr"].includes(i18n.language);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();
  const { fcmToken } = useSelector((state: any) => state.root.common);
  const [active, setActive] = useState<any>("login");

  useEffect(() => {
    const handleResize = () => {};
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

  const handleLogin = (values: any) => {
    setLoading(true);
    const params = {
      email: values.email,
      password: values.password,
      ...(fcmToken && { fcmToken }),
    };

    user_login(params)
      .then((res: any) => {
        if (res?.status === 200 && res?.data?.auth) {
          dispatch(set_User(res.data.user));
          dispatch(setToken(res.data.token));
          dispatch(setSystemType("user"));
          dispatch(setIsLoggedIn(true));

          if (res.data.user.dateOfBirth) {
            handleAge(res.data.user.dateOfBirth);
          }
          setTimeout(() => {
            const routeMap: Record<string, string> = {
              lab: "/services/laboratory/LabortoryDetail",
              doctor: "/services/doctor/DoctorDetail",
              paramedic: "/services/paramedicstaff",
              ambulance: "/services/ambulance",
              pharmacy: "/services/pharmacy",
              travel: "/services/travel/TravelDetail",
              rentAcar: "/services/rentacar",
              insurance: "/services/insurance/insuranceTravelDetails",
              insuranceTravel: "/services/insurance/insuranceTravelDetails",
              insuranceHealth: "/services/insurance/InsuranceHealthDetail",
              donationPackage: "/services/donation/DonationPackeg",
            };
            if (state?.type === "forgot") {
              navigate("/");
            } else {
              const route = routeMap[state?.loginFrom || ""] || "/";
              navigate(route, {
                state: state?.state,
                replace: true,
              });
            }
          }, 800);
        } else {
          dispatch(setIsLoggedIn(false));
          notifyError(t("incorrectemailorpasswordPleasetryagain"));
          window.location.reload();
        }
      })
      .catch((err: any) => {
        dispatch(setIsLoggedIn(false));
        setError(
          err?.response?.data?.message || t("anunexpectederroroccurred")
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleGoToHome = () => {
    if (active !== "login") {
      setActive("login");
    } else {
      navigate("/");
    }
  };
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        ).then((res) => res.json());

        console.log("Google User Info:", userInfo);

        if (!userInfo?.email) {
          notifyError(t("failedtofetchuserdata"));
          return;
        }

        const params = {
          name: userInfo.name,
          email: userInfo.email,
          oauth_id: userInfo.sub,
          userImage: userInfo.picture,
          ...(fcmToken && { fcmToken }),
        };

        googleLogin(params)
          .then((res: any) => {
            if (res?.status === 200 && res?.data?.auth) {
              dispatch(set_User(res.data.user));
              dispatch(setToken(res.data.token));
              dispatch(setSystemType("user"));
              dispatch(setIsLoggedIn(true));
              navigate("/");
            } else {
              dispatch(setIsLoggedIn(false));
              notifyError(t("googleloginfailedTryagain"));
            }
          })
          .catch(() => {
            dispatch(setIsLoggedIn(false));
            notifyError(t("anunexpectederroroccurred"));
          });
      } catch (error) {
        console.error("Google Login Error:", error);
        notifyError(t("failedtofetchgoogleuserdata"));
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
      notifyError(t("googleloginfailedTryagain"));
    },
  });

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
          <>
            {isRTL ? (
              <FaChevronRight className={style.BackIcon} />
            ) : (
              <FaChevronLeft className={style.BackIcon} />
            )}
          </>
          <p
            className={classNames(
              commonStyles.colorBlue,
              commonStyles.fs14,
              commonStyles.semiBold
            )}
          >
            {active !== "login" ? t("backToLogin") : t("backToHome")}
          </p>
        </div>
        <div className={style.SwitchButton}></div>
      </div>

      {active == "login" ? (
        <NewLoginContent
          handleSumbit={handleLogin}
          error={error}
          setActive={setActive}
          loading={loading}
          googleLogin={() => login()}
        />
      ) : (
        <GenericVerifyEmailVendor />
      )}
    </div>
  );
};

export default UserLogin;
