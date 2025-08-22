import { useState } from "react";
import classNames from "classnames";
import CommonStyles from "shared/utils/common.module.css";
import LoginStyles from "./Uselogin.module.css";
import { CustomInput } from "shared/components";
import { PrimaryButton } from "shared/components";
import Logo from "assets/images/UserForget.png";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "shared/services";
import CustomLoader from "shared/components/New_Loader/Loader";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";

const Forget_Password = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleNext = () => {
    const currentUrl = window.location.href;
    const newUrl = `${currentUrl}?`;
    window.history.pushState({}, "", newUrl);
    HandleNextPress();
  };

  const HandleNextPress = () => {
    let params = {
      email: value,
    };
    setLoading(true);
    resetPassword(params)
      .then((res: any) => {
        notifySuccess(res?.data?.message);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/user/ResetPassword", {
            state: { email: value },
          });
        }, 1000);
      })
      .catch((err: any) => {
        notifyError(err?.response.data?.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className={classNames(
        LoginStyles.paretns,
        CommonStyles.flx,
        CommonStyles.flxWrap
      )}
    >
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
      <div
        className={classNames(
          CommonStyles.col6,
          CommonStyles.colmd12,
          CommonStyles.colsm12,
          LoginStyles.centerContent
        )}
      >
        <form className={LoginStyles.loginFormContainer}>
          <p
            className={classNames(
              CommonStyles.fs28,
              CommonStyles.semiBold,
              CommonStyles.colorBlue
            )}
          >
            Forgot
          </p>
          <p
            className={classNames(
              CommonStyles.fs16,
              CommonStyles.semiBold,
              CommonStyles.colorBlue
            )}
          >
            Please enter your email to receive a verification code
          </p>

          <div className={CommonStyles.mt14}>
            <CustomInput
              placeholder="Please enter Email"
              id="Email"
              name="Email"
              type="text"
              value={value}
              onChange={(e: any) => setValue(e?.target?.value)}
            />
          </div>

          <div className={classNames(CommonStyles.mt24)}>
            <PrimaryButton
              type="button"
              children={"Next"}
              colorType={"blue"}
              onClick={handleNext}
            />
          </div>
          <div
            className={classNames(
              CommonStyles.mt24,
              CommonStyles.flx,
              CommonStyles.flxBetween
            )}
          >
            <p className={classNames(CommonStyles.regular, CommonStyles.fs14)}>
              Already signed up?
            </p>
            <a
              className={classNames(
                CommonStyles.colorBlue,
                CommonStyles.fs16,
                CommonStyles.Bold,
                LoginStyles.cursor
              )}
              onClick={() => navigate("/user/login")}
            >
              Login
            </a>{" "}
          </div>
        </form>
      </div>
      {loading && <CustomLoader />}
    </div>
  );
};

export default Forget_Password;
