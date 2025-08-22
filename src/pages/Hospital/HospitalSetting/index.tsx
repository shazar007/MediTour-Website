import { useState } from "react";
import classNames from "classnames";
import style from "./style.module.css";
import commonstyle from "shared/utils/common.module.css";
import { InputField } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { add_File, settignUPdate } from "shared/services";
import image1 from "assets/images/ProfileDownload.png";
import { set_User } from "shared/redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";

const HospitalSetting = () => {
  const { t }: any = useTranslation();
  const { user } = useSelector((state: any) => state?.root?.common);
  const [profileImage, setProfileImage] = useState<string>("");
  const [valueName, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurentPassword, setShowCurentPassword] = useState(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfileImage(reader.result as string);
        try {
          const formData = new FormData();
          if (file) {
            formData.append("file", file);
          }
          const response = await add_File(formData);
          let params = {
            logo: response?.data?.fileUrl,
          };
          settignUPdate(params)
            .then((res: any) => {
              notifySuccess(t("profileUpdatedSuccessfully"));
              dispatch(
                set_User({
                  ...user,
                  logo: response?.data?.fileUrl,
                })
              );
            })
            .catch((err: any) => {
              console.log("🚀 ~ reader.onloadend= ~ err:", err);
            });
          setLoading(false);
        } catch (error) {
          console.error("Upload error:", error);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChange = () => {
    if (!valueName && !currentPassword) {
      notifyError(t("pleaseUpdateAtleastOneField"));
      return;
    }
    if (currentPassword) {
      if (!newPassword) {
        notifyError(t("newPasswordIsRequired"));
        return;
      }
      if (!confirmPassword) {
        notifyError(t("confirmPasswordRequired"));
        return;
      }
      if (newPassword === currentPassword) {
        notifyError(t("newPasswordDifferentFromCurrent"));
        return;
      }
      if (newPassword !== confirmPassword) {
        notifyError(t("passwordMustMatch"));
        return;
      }
    }
    setLoading(true);
    let params = {
      ...(valueName && { name: valueName }),
      ...(currentPassword &&
        newPassword && {
          currentPassword: currentPassword,
          password: newPassword,
        }),
    };
    console.log(params, "....params");
    settignUPdate(params)
      .then((res: any) => {
        notifySuccess(res?.data?.message);
        dispatch(set_User(res?.data?.hospital));
      })
      .catch((err: any) => {
        console.log(err, "...error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={classNames(style.container)}>
        <div className={classNames(commonstyle.mt16, commonstyle.mb16)}>
          <p className={classNames(style.heading)}>{t("settings")}</p>
        </div>
        <div className={classNames(style.profileconatiner)}>
          <div>
            <p className={style.profileName}>{t("profilePicture")}</p>
            <div className={style.profilePage__imageWrapper}>
              <img
                alt="profilePicture"
                src={
                  user?.logo ||
                  profileImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                }
                className={style.profilePage__image}
              />
              <div className={style.profilePage__smallImageWrapper}>
                <img
                  src={image1}
                  alt="Edit"
                  className={style.profilePage__editIcon}
                  onClick={() => document.getElementById("fileInput")?.click()}
                />
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className={style.profileView}>
              <p className={style.profileName}>{t("profileInfo")}</p>

              <div
                className={classNames(
                  commonstyle.flx,
                  commonstyle.flxWrap,
                  commonstyle.flxBetween
                )}
                style={{
                  gap: "18px",
                  marginTop: "24px",
                }}
              >
                <div
                  className={classNames(
                    commonstyle.col5,
                    commonstyle.colmd12,
                    commonstyle.colsm12
                  )}
                >
                  <InputField
                    id="valueName"
                    value={valueName}
                    placeholder={user?.name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </div>
                <div
                  className={classNames(
                    commonstyle.col5,
                    commonstyle.colmd12,
                    commonstyle.colsm12
                  )}
                >
                  <InputField
                    readOnly
                    id="email"
                    value={user?.email}
                    placeholder={t("email")}
                  />
                </div>
              </div>
              <div className={style.changePassword}>{t("changePassword")}</div>
              <div
                className={classNames(
                  commonstyle.col5,
                  commonstyle.colmd12,
                  commonstyle.colsm12
                )}
              >
                <InputField
                  id="currentPassword"
                  password={true}
                  placeholder={t("curentPassword")}
                  showPassword={showCurentPassword}
                  togglePassword={() =>
                    setShowCurentPassword(!showCurentPassword)
                  }
                  type={showCurentPassword ? "text" : "password"}
                  onChange={(e: any) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div
                className={classNames(
                  commonstyle.flx,
                  commonstyle.flxWrap,
                  commonstyle.flxBetween
                )}
                style={{
                  gap: "18px",
                  marginTop: "24px",
                }}
              >
                <div
                  className={classNames(
                    commonstyle.col5,
                    commonstyle.colmd12,
                    commonstyle.colsm12
                  )}
                >
                  <InputField
                    id="newPassword"
                    password={true}
                    placeholder={t("newPassword")}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                    type={showPassword ? "text" : "password"}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                  />
                </div>
                <div
                  className={classNames(
                    commonstyle.col5,
                    commonstyle.colmd12,
                    commonstyle.colsm12
                  )}
                >
                  <InputField
                    id="confirmPassword"
                    password={true}
                    placeholder={t("confirmPassword")}
                    showPassword={showConfirmPassword}
                    togglePassword={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div className={style.saveButton} onClick={saveChange}>
                  {t("saveChanges")}
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && <CustomLoader />}
      </div>
    </div>
  );
};

export default HospitalSetting;
