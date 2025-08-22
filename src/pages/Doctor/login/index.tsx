import { useState } from "react";
import { GenericVerifyEmailVendor } from "shared/components";
import style from "./style.module.css";
import commonStyles from "shared/utils/common.module.css";
import { useDispatch, useSelector } from "react-redux";
import backgroundimg from "assets/images/Background.png";
import NewLoginContent from "shared/components/NewLoginContent/NewLoginContent";
import SwitchButton from "shared/components/NewLoginContent/SwitchButton";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { set_User, setIsLoggedIn, setToken } from "shared/redux";
import { docLogin } from "shared/services/DoctorService";
import { GetColorCode } from "shared/utils";
import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa6";
const DoctorLogin = () => {
  const { systemType, fcmToken } = useSelector(
    (state: any) => state.root.common
  );
  const { t, i18n }: any = useTranslation();
  const { loginEndpoint, loginNavigate } = GetColorCode();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [active, setActive] = useState<any>("login");

  const handleGoToHome = () => {
    navigate("/joinVender");
  };
  const check =
    systemType === "physiotherapist" ||
    systemType === "doctor" ||
    systemType === "psychologist" ||
    systemType === "paramedic" ||
    systemType === "nutritionist";
  const check1 =
    systemType === "physiotherapist" ||
    systemType === "doctor" ||
    systemType === "psychologist" ||
    systemType === "nutritionist";
  const handleDispatchData = (token: any, data: any) => {
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(set_User(data));
    if (check1) {
      navigate(`/${systemType}/dashboard`, { replace: true });
    } else {
      navigate(loginNavigate);
    }
  };
  const doctor_login = (email: any, password: any) => {
    const body: any = {
      email,
      password,
      ...(fcmToken && { fcmToken }),
      ...(check && { doctorKind: systemType }),
    };
    docLogin(body, loginEndpoint)
      .then((res: any) => {
        if (systemType == "donation") {
          handleDispatchData(res?.data?.token, res?.data?.donation);
        } else if (systemType == "hospital") {
          handleDispatchData(res?.data?.token, res?.data?.hospital);
        } else if (systemType == "laboratory") {
          handleDispatchData(res?.data?.token, res?.data?.lab);
        } else if (systemType == "travelagency") {
          handleDispatchData(res?.data?.token, res?.data?.travelAgency);
        } else if (systemType == "insurance") {
          handleDispatchData(res?.data?.token, res?.data?.insurance);
        } else if (systemType == "pharmaceutical") {
          handleDispatchData(res?.data?.token, res?.data?.pharmacuetical);
        } else if (systemType == "rentacar") {
          handleDispatchData(res?.data?.token, res?.data?.rentCar);
        } else if (systemType == "hotel") {
          handleDispatchData(res?.data?.token, res?.data?.hotel);
        } else if (systemType == "ambulance") {
          handleDispatchData(res?.data?.token, res?.data?.ambulance);
        } else if (systemType == "pharmacy") {
          handleDispatchData(res?.data?.token, res?.data?.pharm);
        } else {
          handleDispatchData(res?.data?.token, res?.data?.doctor);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className={style.container}>
        <img
          src={backgroundimg}
          alt="Background"
          className={style.backgroundimg}
        />

        <div className={style.SwitchButtonConatiner}>
          <div className={style.BackToHome} onClick={handleGoToHome}>
            <>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <FaChevronRight className={style.BackIcon} />
              ) : (
                <FaChevronLeft className={style.BackIcon} />
              )}
            </>{" "}
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
          <div className={style.SwitchButton}>
            <SwitchButton active={active} setActive={setActive} />
          </div>
        </div>
        {active == "login" ? (
          <NewLoginContent
            loading={loading}
            setLoading={setLoading}
            loginApi={doctor_login}
          />
        ) : (
          <GenericVerifyEmailVendor />
        )}
      </div>
    </>
  );
};

export default DoctorLogin;
