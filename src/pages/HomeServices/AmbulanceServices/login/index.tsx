import { useState } from "react";
import { GenericVerifyEmailVendor } from "shared/components";
import style from "./AmbulanceLogin.module.css";
import commonStyles from "shared/utils/common.module.css";
import { useDispatch, useSelector } from "react-redux";
import backgroundimg from "assets/images/Background.png";
import NewLoginContent from "shared/components/NewLoginContent/NewLoginContent";
import SwitchButton from "shared/components/NewLoginContent/SwitchButton";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { set_User, setIsLoggedIn, setSystemType, setToken } from "shared/redux";
import { ambLogin } from "shared/services/Ambulance";
const Ambulancelogin = () => {
  const { fcmToken } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [active, setActive] = useState<any>("login");
  const handleGoToHome = () => {
    navigate("/joinVender");
  };
  const handleDispatchData = (token: any, data: any) => {
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(set_User(data));
    dispatch(setSystemType("ambulance"));
    navigate("/ambulance/dashboard");
  };
  const doctor_login = (email: any, password: any) => {
    const body = {
      email: email,
      password: password,
      fcmToken,
    };

    ambLogin(body)
      .then((res: any) => {
        handleDispatchData(res?.data?.token, res?.data?.ambulance);
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
            <FaChevronLeft className={style.BackIcon} />
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

export default Ambulancelogin;
