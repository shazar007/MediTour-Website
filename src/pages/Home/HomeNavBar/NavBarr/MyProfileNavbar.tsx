import React, { useEffect, useRef, useState } from "react";
import Footerr from "../Footer";
import { useFormik } from "formik";
import Styles from "./MyProfileNavbar.module.css";
import { add_File, passwordReset, updateProfile } from "shared/services";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { InputField, PhoneNumberInputNew, RingLoader } from "shared/components";
import IconButton from "@mui/material/IconButton";
import { setToken, set_User } from "shared/redux";
import { FiArrowRight } from "react-icons/fi";
import image1 from "../../../../assets/images/ProfileDownload.png";
import ProfileModal from "./ProfileModel";
import ProfileDataBlock from "shared/components/ProfileDataBlock";
import { bankInfo, socialInfo, userInfo } from "shared/utils";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import LocationInput from "shared/components/LocationInput";
import { finalValue, initialValue } from "./UpdateProfileQuery";
import commonStyle from "shared/utils/common.module.css";
import CustomLoader from "shared/components/New_Loader/Loader";
import DatepickerNew from "shared/components/DatePicker/DatePickerNew";
import dayjs from "dayjs";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useDirection } from "shared/utils/DirectionContext";

const MyProfileNavbar: React.FC = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  const { user } = useSelector((state: any) => state?.root?.common);
  const [profileImage, setProfileImage] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmhowPassword, setconfirmShowPassword] = useState(false);
  const [ringLoading, setRingLoading] = useState(false);
  const [formType, setFormType] = useState<
    "basic" | "social" | "bank" | "changePassword"
  >("basic");
  const [url, setUrl] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const dispatch = useDispatch();
  const handleSaveClick = (values: any) => {
    if (
      formType === "changePassword" &&
      (!values.currentPassword ||
        !values.newPassword ||
        !values.confirmPassword)
    ) {
      notifyError(t("pleasefillallfields"));
      return;
    }
    if (values?.newPassword !== values?.confirmPassword) {
      notifyError(t("passwordsdonotmatch"));
      return;
    }
    const { countryCode, ...otherValues } = values;
    const hasOtherValue = Object.values(otherValues).some((value) => value);
    if (!hasOtherValue) {
      notifyError(t("pleaseenteratleastonefield"));
      return;
    }
    setLoading(true);
    let params: any = finalValue(values, url);
    updateProfile(params)
      .then((res: any) => {
        setModalOpen(false);
        notifySuccess(res?.data?.message);
        dispatch(set_User(res?.data?.user));
      })
      .catch((err: any) => {
        notifyError(err?.response?.data?.message);
      })

      .finally(() => setLoading(false));
  };

  const formik: any = useFormik({
    initialValues: initialValue(user),

    onSubmit: (values) => {
      handleSaveClick(values);
    },
  });

  useEffect(() => {
    finalValue();
  }, [isModalOpen]);

  const handleFileChange = (e: any) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfileImage(reader.result as string);

        try {
          const formData = new FormData();
          if (file) {
            formData.append("file", file);
          }
          const response = await add_File(formData);
          setUrl(response?.data?.fileUrl);
          let params = {
            userImage: response?.data?.fileUrl,
          };

          updateProfile(params)
            .then((res: any) => {
              notifySuccess(t("profileUpdatedSuccessfully"));

              dispatch(
                set_User({
                  ...user,
                  userImage: response?.data?.fileUrl,
                })
              );
            })
            .catch((err: any) => { });
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

  const handleLocationChange = async (newLocation: any) => {
    const labelParts: any = newLocation?.label.split(", ");
    const country = labelParts[labelParts.length - 1];
    formik?.setFieldValue("address", newLocation?.label);
    formik?.setFieldValue("city", newLocation?.city);
    formik?.setFieldValue("country", country);
    const address = newLocation?.label;
    const apiKey = "AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A"; // Replace with your actual API key
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        formik?.setFieldValue("lat", location.lat);
        formik?.setFieldValue("long", location.lng);
      } else {
        console.error("Geocoding error: ", data.status);
      }
    } catch (error) {
      console.error("Error fetching geocoding data: ", error);
    }
  };
  const formatDate = (dob: string | null) => {
    if (dob) {
      return dayjs(dob); // Return a dayjs object instead of a formatted string
    }
    return null; // Return null if no date is provided
  };

  useEffect(() => {
    if (isModalOpen) {
      formik.resetForm({ values: initialValue(user) });
    }
  }, [isModalOpen, user]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };
  const formikUsed = useFormik({
    initialValues: { webpassword: "", webconfirmPassword: "" },
    validationSchema: Yup.object({
      webpassword: Yup.string()
        .min(6, t("passwordmustbeatleast6characters"))
        .required("Password is required"),
      webconfirmPassword: Yup.string()
        .oneOf([Yup.ref("webpassword"), undefined], t("passwordMustMatch"))
        .required(t("confirmPasswordisrequired")),
    }),
    onSubmit: (values) => {
      handleSetPassowird();
    },
  });
  const handleSetPassowird = () => {
    let params = {
      email: user?.email,
      password: formikUsed?.values?.webconfirmPassword,
    };
    setRingLoading(true);
    console.log(params, "....params");
    passwordReset(params)
      .then((res: any) => {
        dispatch(set_User(res.data.user));
        dispatch(setToken(res.data.token));
        notifySuccess(t("passwordSetSuccessfully"));
      })
      .catch((err: any) => {
        console.log(err, ".....error");
      })
      .finally(() => {
        setRingLoading(false);
      });
  };
  return (
    <>
      <div className={Styles.maincontainer}>
        <ServiceHeader headingOrange={t("myProfile")} desc_width="70%" />

        <div className={Styles.profilePage}>
          {user?.password ? (
            <>
              <div className={Styles.profilePage__imageWrapper}>
                <img
                  src={
                    user?.userImage ||
                    profileImage ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                  }
                  alt={user?.name}
                  className={Styles.profilePage__image}
                />
                <div className={Styles.profilePage__smallImageWrapper}>
                  <img
                    src={image1}
                    alt="Edit"
                    className={Styles.profilePage__editIcon}
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
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
              <ProfileDataBlock
                data={userInfo(user)}
                heading={t("basicInfo")}
                setModalOpen={setModalOpen}
                setFormType={() => setFormType("basic")}
              />

              <ProfileDataBlock
                data={socialInfo(user)}
                heading={t("socialMedia")}
                setModalOpen={setModalOpen}
                setFormType={() => setFormType("social")}
              />

              <ProfileDataBlock
                data={bankInfo(user)}
                heading={t("bankDetails")}
                setModalOpen={setModalOpen}
                setFormType={() => setFormType("bank")}
              />

              <div className={Styles.profilePage__socialMediaContainer}>
                <div className={Styles.profilePage__socialMediaHeader}>
                  <h2 className={Styles.profilePage__socialMediaHeading}>
                    {t("changePassword")}
                  </h2>
                  <button
                    className={Styles.profilePage__editButton}
                    onClick={() => {
                      setModalOpen(true);
                      setFormType("changePassword");
                    }}
                  >
                    <FiArrowRight
                      size={20}
                      style={isRtl ? { transform: "rotate(180deg)" } : {}}
                    />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={Styles.cardContainer}>
              <p className={Styles.title}>{t("setYourPassword")}</p>
              <div className={Styles.inputContainer}>
                <InputField
                  id="webpassword"
                  password={true}
                  formik={formikUsed}
                  placeholder={t("newPassword")}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                  onChange={formikUsed.handleChange("webpassword")}
                />
                <InputField
                  id="webconfirmPassword"
                  password={true}
                  formik={formikUsed}
                  placeholder={t("confirmPassword")}
                  showPassword={confirmhowPassword}
                  togglePassword={() =>
                    setconfirmShowPassword(!confirmhowPassword)
                  }
                  onChange={formikUsed.handleChange("webconfirmPassword")}
                />
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  type="submit"
                  className={Styles.submitting}
                  onClick={(e) => {
                    e.preventDefault();
                    formikUsed.handleSubmit();
                  }}
                >
                  {ringLoading ? (
                    <RingLoader color={"#fff"} size={30} />
                  ) : (
                    "Set Password"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <ProfileModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <form
            className={Styles.basicInfoContainer}
            onSubmit={formik.handleSubmit}
          >
            {formType === "basic" && (
              <>
                <h2 className={Styles.sectionTitle}>{t("basicInfo")}</h2>
                <div className={Styles.rowBasic}>
                  <div className={Styles.w50}>
                    <FormikField
                      id={"fullName"}
                      formik={formik}
                      placeHolder={`${t("fullName")} *`}
                    />
                  </div>
                  <div className={Styles.w50}>
                    <FormikField
                      id={"fatherName"}
                      formik={formik}
                      placeHolder={`${t("fatherName")} *`}
                    />
                  </div>
                </div>

                <div className={Styles.rowBasic}>
                  <div className={Styles.inputGroupBasic}>
                    <select
                      style={{ color: "#000", height: "48px" }}
                      id="gender"
                      className={Styles.wideSelect}
                      value={formik.values.gender}
                      onChange={formik.handleChange("gender")}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" disabled>
                        {`${t("selectGender")} *`}
                      </option>
                      <option value="male">{t("male")}</option>
                      <option value="female">{t("female")}</option>
                      <option value="confidential">{t("confidential")}</option>
                    </select>
                  </div>

                  <div className={Styles.inputGroupBasic}>
                    <div
                      className={Styles.dateInput}
                      style={{
                        width: "100%",
                      }}
                    >
                      <DatepickerNew
                        value={
                          formik.values.dob
                            ? formatDate(formik.values.dob)
                            : null
                        }
                        onChange={(date: any) =>
                          formik.setFieldValue(
                            "dob",
                            date?.format("YYYY-MM-DD")
                          )
                        }
                        placeholder={t("dateOfBirth")}
                      />
                    </div>
                  </div>
                </div>

                <div className={Styles.rowBasic}>
                  <div className={Styles.w50}>
                    <FormikField
                      editable={true}
                      id={"email"}
                      formik={formik}
                      placeHolder={t("email")}
                    />
                  </div>

                  <div className={Styles.inputGroupBasic}>
                    <div className={Styles.phoneInputBasic}>
                      <PhoneNumberInputNew
                        value={formik.values.phoneNumber}
                        setValue={(newValue: string) => {
                          formik.setFieldValue("phoneNumber", newValue);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className={Styles.rowBasic}>
                  <FormikField
                    id={"passport"}
                    formik={formik}
                    placeHolder={t("nicPassport")}
                  />
                  <FormikField
                    id={"bloodGroup"}
                    formik={formik}
                    placeHolder={t("bloodGroup")}
                  />
                </div>

                <div className={Styles.rowBasic}>
                  <FormikField
                    id={"qualification"}
                    formik={formik}
                    placeHolder={t("qualification")}
                  />

                  <FormikField
                    id={"childrenNumber"}
                    formik={formik}
                    placeHolder={t("noOfChildren")}
                  />
                </div>
                <div className={Styles.addressInputWidthManage}>
                  <LocationInput
                    placeholder={t("address")}
                    type="box"
                    setData={handleLocationChange}
                    defaultValue={{
                      label:
                        formik?.values?.address ||
                        user?.address?.address ||
                        t("address"), // Shows value or placeholder
                      value: {
                        place_id:
                          formik?.values?.address || user?.address?.address
                            ? "actual_place_id"
                            : null,
                      },
                    }}
                  />
                </div>
                <div className={Styles.rowBasic}>
                  <FormikField
                    id={"city"}
                    formik={formik}
                    placeHolder={t("city")}
                  />
                  <FormikField
                    id={"country"}
                    formik={formik}
                    placeHolder={t("country")}
                  />
                </div>
              </>
            )}

            {formType === "social" && (
              <>
                <h2 className={Styles.sectionTitle}>{t("socialMedia")}</h2>
                <div className={Styles.rowBasic}>
                  <FormikField
                    id={"facebook"}
                    formik={formik}
                    placeHolder={t("facebookPH")}
                  />

                  <FormikField
                    id={"instagram"}
                    formik={formik}
                    placeHolder={t("instagramPH")}
                  />
                </div>

                <div className={Styles.rowBasic}>
                  <FormikField
                    id={"linkedin"}
                    formik={formik}
                    placeHolder={t("linkedInPH")}
                  />

                  <FormikField
                    id={"youtube"}
                    formik={formik}
                    placeHolder={t("youtubePH")}
                  />
                </div>
              </>
            )}

            {formType === "bank" && (
              <>
                <h2 className={Styles.sectionTitle}>{t("bankDetails")}</h2>
                <div className={Styles.rowBasic}>
                  <FormikField
                    id={"bankName"}
                    formik={formik}
                    placeHolder={t("bankNameOp")}
                  />
                  <FormikField
                    id={"accountNumber"}
                    formik={formik}
                    placeHolder={t("accountNumberOp")}
                  />
                </div>
                <div className={Styles.rowBasic}>
                  <FormikField
                    id={"accountTitle"}
                    formik={formik}
                    placeHolder={t("accountTitleOp")}
                  />
                  <FormikField
                    id={"ntn"}
                    formik={formik}
                    placeHolder={t("ntnOp")}
                  />
                </div>
              </>
            )}
            {formType === "changePassword" && (
              <>
                <h2 className={Styles.sectionTitle}>{t("updatePassword")}</h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <div className={commonStyle.col6}>
                    <FormikField
                      id={"currentPassword"}
                      formik={formik}
                      placeHolder={`${t("currentPassword")} *`}
                      type="password"
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className={commonStyle.col6}>
                    <FormikField
                      id={"newPassword"}
                      formik={formik}
                      placeHolder={`${t("newPassword")} *`}
                      type="password"
                    />{" "}
                  </div>{" "}
                  <div className={commonStyle.col6}>
                    <FormikField
                      id={"confirmPassword"}
                      formik={formik}
                      placeHolder={`${t("confirmPassword")} *`}
                      type="password"
                    />{" "}
                  </div>
                </div>
              </>
            )}

            <button type="submit" className={Styles.submitButton}>
              {t("save")}
            </button>
          </form>
        </ProfileModal>
        {loading && <CustomLoader />}
      </div>

      <Footerr />
    </>
  );
};

export default MyProfileNavbar;

const FormikField = ({
  id,
  placeHolder,
  formik,
  editable,
  type = "text",
  onKeyPress,
}: {
  id: any;
  placeHolder: any;
  formik: any;
  editable?: any;
  type?: string;
  onKeyPress?: any;
}) => {
  const { isRtl } = useDirection();

  let value = formik?.values;
  let touched = formik?.touched;
  let error = formik.errors;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={Styles.inputGroupBasic}>
      <div className={Styles.inputWrapper}>
        <input
          disabled={editable}
          style={{
            color: "#000",
            height: "48px",
            ...(isRtl && type === "password" && { paddingRight: "40px" }),
          }}
          type={type === "password" && !showPassword ? "password" : "text"}
          id={id}
          onKeyDown={onKeyPress}
          value={value[id]}
          onChange={formik?.handleChange(id)}
          placeholder={placeHolder}
        />
        {type === "password" && (
          <div className={Styles.passwordToggleIcon}>
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? (
                <BsEyeFill className={Styles.eyeIcon} />
              ) : (
                <BsEyeSlashFill className={Styles.eyeIcon} />
              )}
            </IconButton>
          </div>
        )}
      </div>
      {touched[id] && error[id] && (
        <div className={Styles.error}>{error[id]}</div>
      )}
    </div>
  );
};
