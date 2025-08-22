import { useEffect, useState } from "react";
import classNames from "classnames";
import CommonStyles from "shared/utils/common.module.css";
import LoginStyles from "./Uselogin.module.css";
import { CustomInput } from "shared/components";
import { PrimaryButton } from "shared/components";
import Logo from "assets/images/Frame.png";
import VerifyModal from "shared/components/VerifyModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { confirmEmail, user_SendCodeToEmail } from "shared/services";
import { useNavigate } from "react-router-dom";
import CustomLoader from "shared/components/New_Loader/Loader";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";

const Email_Verify = () => {
  const { t, i18n }: any = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [value, setValue] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const naviagte = useNavigate();
  const isRTL = ["ur", "ar", "ps", "pr"].includes(i18n.language);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleVerifyClick = (text: any) => {
    if (value) {
      setLoading(true);
      let params = {
        email: value,
      };
      setLoading(true);
      user_SendCodeToEmail(params)
        .then((res: any) => {
          notifySuccess(res?.data?.message);
          if (text !== "send agian") {
            setShowModal(true);
          }
        })
        .catch((err: any) => {})
        .finally(() => setLoading(false));
    } else {
      notifyError(t("pleaseEnterYourEmail"));
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    let params: any = {
      code: code,
      email: value,
    };
    confirmEmail(params)
      .then((res: any) => {
        setShowModal(false);
        notifySuccess(res?.data?.message);
        naviagte("/user/SignUp_User", {
          state: { email: value },
        });
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
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
            {" "}
            <div
              className={classNames(
                CommonStyles.col6,
                CommonStyles.colmd12,
                CommonStyles.colsm12,
                LoginStyles.centerContent
              )}
            >
              <div
                className={LoginStyles.loginFormContainer}
                style={{
                  marginTop: "10%",
                  marginBottom: "10%",
                }}
              >
                <div
                  className={classNames(CommonStyles.flx)}
                  onClick={() => naviagte("/user/login")}
                >
                  {isRTL ? (
                    <FaChevronRight className={LoginStyles.BackIcon} />
                  ) : (
                    <FaChevronLeft className={LoginStyles.BackIcon} />
                  )}
                  <p
                    className={classNames(
                      CommonStyles.fs16,
                      CommonStyles.colorBlue
                    )}
                  >
                    {t("back")}
                  </p>
                </div>
                <p
                  className={classNames(
                    CommonStyles.fs28,
                    CommonStyles.semiBold,
                    CommonStyles.colorBlue
                  )}
                  style={{ marginTop: "32px" }}
                >
                  {t("emailverification")}
                </p>
                <p
                  className={classNames(
                    CommonStyles.fs16,
                    CommonStyles.semiBold,
                    CommonStyles.colorBlue
                  )}
                >
                  {t("yourJourneyBeginsHere")}
                </p>
                <div className={CommonStyles.mt24}>
                  <CustomInput
                    placeholder="Please enter Email"
                    id="Email"
                    name="Email"
                    type="text"
                    value={value}
                    onChange={(e: any) => setValue(e?.target?.value)}
                  />
                </div>
                <div className={CommonStyles.mt16}>
                  <div className={classNames(CommonStyles.flxBetween)}></div>
                  <PrimaryButton
                    children={"Verify"}
                    colorType={"blue"}
                    onClick={handleVerifyClick}
                  />
                </div>
              </div>
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
                <img src={Logo} alt="Logo" />
              </div>
            </div>
            {showModal && (
              <VerifyModal
                loading={loading}
                showModal={showModal}
                handleSubmit={handleSubmit}
                code={code}
                setCode={setCode}
                codeError={codeError}
                setCodeError={setCodeError}
                handleSendCodeToEmail={() => handleVerifyClick("send again")}
              />
            )}
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
            <div
              className={LoginStyles.loginFormContainer}
              style={{
                marginTop: "10%",
                marginBottom: "10%",
              }}
            >
              <div className={classNames(CommonStyles.flx)} onClick={() => {}}>
                <FaChevronLeft className={LoginStyles.BackIcon} />
                <p
                  className={classNames(
                    CommonStyles.fs16,
                    // CommonStyles.semiBold,
                    CommonStyles.colorBlue
                  )}
                >
                  {t("back")}
                </p>
              </div>
              <div
                className={classNames(
                  CommonStyles.flx,
                  CommonStyles.flxBetween
                )}
              >
                <p
                  className={classNames(
                    CommonStyles.fs28,
                    CommonStyles.semiBold,
                    CommonStyles.colorBlue
                  )}
                  style={{ marginTop: "32px", whiteSpace: "nowrap" }}
                >
                  {t("emailverification")}
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
                {t("yourJourneyBeginsHere")}
              </p>
              <div className={CommonStyles.mt24}>
                <CustomInput
                  placeholder="Please enter Email"
                  id="Email"
                  name="Email"
                  type="text"
                  value={value}
                  onChange={(e: any) => setValue(e?.target?.value)}
                />
              </div>
              <div className={CommonStyles.mt16}>
                <div className={classNames(CommonStyles.flxBetween)}></div>
                <div className={classNames(CommonStyles.mb16)}>
                  <PrimaryButton
                    children={"Verify"}
                    colorType={"blue"}
                    onClick={handleVerifyClick}
                  />
                </div>
              </div>
            </div>
          </div>
          {showModal && (
            <VerifyModal
              loading={loading}
              showModal={showModal}
              handleSubmit={handleSubmit}
              code={code}
              setCode={setCode}
              codeError={codeError}
              setCodeError={setCodeError}
              handleSendCodeToEmail={() => handleVerifyClick("send again")}
            />
          )}
        </>
      )}
    </>
  );
};

export default Email_Verify;
