import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import GenericVerifyEmailVendor from "../GenericVerifyEmailVendor";
import GenericBasicInfoComapny from "../GenericBasicInfoComapny";
import GenericSocialInfo from "../GenericSocialInfo";
import GenericBankDetails from "../GenericBankDetails";
import GenericPassword from "../GenericPassword";
import { useDispatch, useSelector } from "react-redux";
import { getDepartment, sendCodeCompany } from "shared/services";
import { setDoctorFormData } from "shared/redux";
import { Modal, Radio } from "@mui/material";
import CustomStepper from "../CustomStepper";
import logo from "assets/images/logoMed.png";
import InputField from "../A_New_Components/InputField";
import RingLoader from "../RingLoader";
import BasicInfo from "pages/Doctor/signup/Component/BasicInfo";
import { paraSignup } from "shared/services/Paramedic";

import { SignUpRoute } from "./propsSignup";
import sending from "assets/images/sending.png";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import CustomModal from "../Modal";
import { useTranslation } from "react-i18next";
import { notifySuccess } from "../A_New_Components/ToastNotification";
const LoginModel = ({
  setOpen,
  showModal,
  hitApi,
  type,
}: {
  setOpen?: any;
  showModal?: any;
  hitApi?: any;
  type?: any;
}) => {
  const { t, i18n }: any = useTranslation();
  const [step, setStep] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [value, setValue] = useState<any>("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [openEmail, setopenEmail] = useState<any>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [typeValue, setType] = useState<any>("");
  const [showSending, setShowSending] = useState(false);
  const [selected, setSelected] = useState<any>("");
  const [selectedError, setSelectedError] = useState("");
  const [selectDepartment, setSelctedDepart] = useState<any>("");
  const [departmentData, setDepartmentData] = useState<any>("");
  const [open, setopenDepartment] = useState<any>(false);
  const [departmentEror, setDepartmentEror] = useState("");
  const [selectedId, setDepartmentId] = useState<any>("");
  const [lostModel, setLostModel] = useState(false);
  const { doctorFormData, fcmToken, systemType, user } = useSelector(
    (state: any) => state.root.common
  );
  const { signUpEndPoint, paramsInsert, sendCodeToemail, headText, lowerText } =
    SignUpRoute(type, email, selected, systemType, selectDepartment, t);

  const registerHospital = (passwordKey: any) => {
    let currentData = passwordKey;
    setLoading(true);
    let params: any = {
      name: doctorFormData.name,
      cnicOrPassportNo: doctorFormData.cnicOrPassportNo,
      cnicImage: doctorFormData.cnicImage,
      cnicOrPassportExpiry: doctorFormData.cnicOrPassportExpiry,

      ...(doctorFormData?.companyEmergencyNo && type === "hotel"
        ? { companyEmergencyNo: doctorFormData?.companyEmergencyNo }
        : { emergencyNo: doctorFormData?.companyEmergencyNo }),
      ...(doctorFormData.logo && { logo: doctorFormData.logo }),
      ...(doctorFormData.labOpenTime && {
        openTime: doctorFormData.labOpenTime,
      }),
      ...(doctorFormData.closeTime && {
        closeTime: doctorFormData.labCloseTime,
      }),
      ...(typeValue && { doctorKind: typeValue?.toLowerCase() }),
      ...(doctorFormData.doctorType && {
        doctorType:
          doctorFormData.doctorType == "Consultant"
            ? "consultant"
            : "generalPhysician",
      }),
      ...(doctorFormData.speciality && {
        speciality: doctorFormData.speciality,
      }),
      ...(doctorFormData?.experience && {
        experience: doctorFormData?.experience,
      }),
      ...(doctorFormData?.features?.length === 0
        ? null
        : {
            features: doctorFormData?.features,
          }),
      // ...............socialOInfo
      instagram: doctorFormData.socialInfo.instaUrl,
      facebook: doctorFormData.socialInfo.fbUrl,
      youtube: doctorFormData?.socialInfo?.youtube,
      linkedIn: doctorFormData?.socialInfo?.linkedIn,
      // ...............bankFields
      ntn: doctorFormData.bankInfo?.ntn,
      bankName: doctorFormData.bankInfo?.bankName,
      accountNumber: doctorFormData.bankInfo?.accountNumber,
      accountTitle: doctorFormData?.bankInfo?.accountTitle,
      taxFileImage: doctorFormData?.bankInfo?.taxFile,
      // /////////////
      ...(fcmToken && { fcmToken }),
      phoneNumber: doctorFormData.phoneNumber,
      email: doctorFormData.email,
      password: currentData.password,
    };
    if (type === "doctor") {
      params = {
        ...params,
        qualifications: doctorFormData.qualifications,
        clinicExperience: doctorFormData.clinicExperience,
        pmdcNumber: doctorFormData.pmdcNumber,
        pmdcImage: doctorFormData.pmdcImage,
        pmdcExpiry: doctorFormData.pmdcExpiry,
        isNational:
          doctorFormData.countrySelection === "Pakistan" ? true : false,
        country: doctorFormData.countrySelection,
        location: {
          lat: doctorFormData.lat,
          lng: doctorFormData.lng,
          address: doctorFormData.address,
          city: doctorFormData.city,
        },
        entityType: systemType === "company" ? "company" : "individual",
        ...(selectedId && { departmentId: selectedId }),
        ...(systemType === "company"
          ? { docCompanyId: user?._id }
          : { hospitalId: user?._id }),
      };
    } else if (type === "labs") {
      params = {
        labLicenseNumber: doctorFormData.companyLicenseNo,
        licenseExpiry: doctorFormData?.companyLicenseExpiry,
        labLicenseImage: doctorFormData?.licenseImage,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        description: doctorFormData.labDescription,
        location: {
          lat: user?.location?.lat,
          lng: user?.location?.lng,
          address: user?.location?.address,
          city: user?.location?.city,
        },
        country: user.country,
        isNational: user?.isNational,
        hospitalId: user?._id,
        ...params,
      };
    } else if (type == "pharmacy") {
      params = {
        licenseExpiry: doctorFormData?.companyLicenseExpiry,
        pharmacyLicenseImage: doctorFormData?.licenseImage,
        description: doctorFormData.labDescription,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        hospitalId: user?._id,
        country: user.country,
        pharmacyLicenseNumber: doctorFormData.companyLicenseNo,
        ...params,
        location: {
          lat: user?.location?.lat,
          lng: user?.location?.lng,
          address: user?.location?.address,
          city: user?.location?.city,
        },
        // isNational: user?.isNational,
      };
    } else if (type == "travel") {
      params = {
        companyLicenseNo: doctorFormData.companyLicenseNo,
        licenseExpiry: doctorFormData?.companyLicenseExpiry,
        comapnyLicenseImage: doctorFormData?.licenseImage,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        isNational:
          doctorFormData.countrySelection === "Pakistan" ? true : false,
        country: doctorFormData.countrySelection,
        travelCompanyId: user?._id,
        isAddingCompany: false,
        location: {
          lat: doctorFormData.lat,
          lng: doctorFormData.lng,
          address: doctorFormData.address,
          city: doctorFormData.city,
        },
        ...params,
      };
    } else if (type === "hotel") {
      params = {
        companyLicenseNo: doctorFormData.companyLicenseNo,
        companyLicenseExpiry: doctorFormData?.companyLicenseExpiry,
        licenseImage: doctorFormData?.licenseImage,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        isNational:
          doctorFormData.countrySelection === "Pakistan" ? true : false,
        country: doctorFormData.countrySelection,
        travelCompanyId: user?._id,
        isAddingCompany: false,
        location: {
          lat: doctorFormData.lat,
          lng: doctorFormData.lng,
          address: doctorFormData.address,
          city: doctorFormData.city,
        },
        ...params,
      };
    } else {
      params = {
        hospitalRegNo: doctorFormData.companyLicenseNo,
        registrationExpiry: doctorFormData?.companyLicenseExpiry,
        registrationImage: doctorFormData?.licenseImage,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        isNational:
          doctorFormData.countrySelection === "Pakistan" ? true : false,
        country: doctorFormData.countrySelection,
        openTime: doctorFormData.openTime,
        closeTime: doctorFormData.closeTime,
        location: {
          lat: doctorFormData.lat,
          lng: doctorFormData.lng,
          address: doctorFormData.address,
          city: doctorFormData.city,
        },

        ...params,
      };
    }
    console.log(params, signUpEndPoint, "........both testing ....");
    paraSignup(params, signUpEndPoint)
      .then((res: any) => {
        dispatch(setDoctorFormData(""));
        setShowSuccessModal(true);
        if (type == "hotel" || type == "travel") {
          hitApi("");
        } else {
          hitApi(1, "");
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setOpen(false);
    setStep(false);
    setCurrentStep(0);
  };

  const getHeaderText = () => {
    switch (currentStep) {
      case 0:
        return t("basic");
      case 1:
        return t("social");
      case 2:
        return t("bank");
      case 3:
        return t("password");
      default:
        return t("register");
    }
  };
  const handleBack = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 0) {
        setStep(false);
        setOpen(false);
        return prevStep;
      } else {
        return prevStep - 1;
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
    setDepartmentEror("");
    setError("");
    setSelectedError("");
  };
  const goback = () => {
    setopenEmail(false);
  };
  const steps = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
  ];
  const options: any = [
    { id: 1, title: "Doctor" },
    { id: 2, title: "Physiotherapist" },
    { id: 3, title: "Psychologist" },
    { id: 4, title: "Nutritionist" },
  ];
  const handleVerifyClick = () => {
    console.log("........");
    if (loading) return;
    if (systemType !== "company" && type !== "travel" && type !== "hotel") {
      if (!selectDepartment?._id) {
        setDepartmentEror(t("pleaseSelectDepartment"));
        return;
      }
    }
    if (!email) {
      setError(t("pleaseEnterEmail"));
      return;
    }
    if (type === "doctor" && !selected) {
      setSelectedError(t("pleaseSelectDoctorType"));
      return;
    }
    setLoading(true);
    const params = paramsInsert;
    console.log(params, "....params");
    sendCodeCompany(params, sendCodeToemail)
      .then((res: any) => {
        notifySuccess(t("sendRequest"));
        setShowSending(true);
      })
      .catch((err: any) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (id: any) => {
    setSelected(id);
  };
  useEffect(() => {
    if (type == "doctor") {
      fetchDepart();
    }
  }, []);
  const fetchDepart = () => {
    getDepartment()
      .then((res: any) => {
        setDepartmentData(res?.data?.departments);
      })
      .catch((err: any) => {
        console.log(err, "....errorFromDepart");
      })
      .finally(() => {});
  };
  const handleModelBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLostModel(true);
  };

  const handleDiscard = () => {
    setLostModel(false);
    setOpen(false);
    setStep(false);
    setopenEmail(false);
    dispatch(setDoctorFormData({}));
  };
  return (
    <>
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className={style.modal}>
            {!step && (
              <>
                {type == "doctor" || type == "travel" || type === "hotel" ? (
                  <>
                    {!openEmail && !showSending && (
                      <div className={style.formcontainer}>
                        <img src={logo} alt="logo" className={style.logo} />
                        <p className={style.welcomback}>{headText}</p>
                        <div
                          style={{
                            margin: "0 auto",
                            width: "80%",
                          }}
                        >
                          {systemType === "company" ||
                          type === "travel" ||
                          type === "hotel" ? null : (
                            <div style={{ position: "relative" }}>
                              <div
                                className={style.inputGroupBasic}
                                onClick={() => setopenDepartment(!open)}
                              >
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400px",
                                  }}
                                >
                                  {selectDepartment?.categoryId?.categoryName
                                    ? selectDepartment?.categoryId?.categoryName
                                    : `${t("selectDepartment")}*`}
                                </div>
                                <IoIosArrowDown size={20} color={"#CCCCCC"} />
                              </div>
                              {departmentEror ? (
                                <div style={{ color: "red" }}>
                                  *{departmentEror}
                                </div>
                              ) : null}
                              <div style={{ marginBottom: "24px" }} />
                              {open && (
                                <>
                                  <div className={style?.options}>
                                    {departmentData?.map((i: any) => {
                                      return (
                                        <div
                                          style={{
                                            padding: "8px",
                                            backgroundColor:
                                              selectDepartment === i
                                                ? "red"
                                                : "#fff",
                                            cursor: "pointer",
                                            color:
                                              selectDepartment === i
                                                ? "#fff"
                                                : "black",
                                          }}
                                          onClick={() => {
                                            setSelctedDepart(i);
                                            setDepartmentEror("");
                                            setopenDepartment(false);
                                          }}
                                        >
                                          {i?.categoryId?.categoryName}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                          <div style={{ marginBottom: "8px" }}>
                            <div style={{ marginBottom: "16px" }}>
                              <InputField
                                id="value"
                                borderRadius={"32px"}
                                placeholder={t("enterValidEmail")}
                                value={email}
                                onChange={(e: any) => {
                                  setEmail(e?.target?.value);
                                  if (error) {
                                    setError("");
                                  }
                                }}
                              />
                              {error ? (
                                <div style={{ color: "red" }}>*{error}</div>
                              ) : null}
                            </div>
                          </div>
                          {type === "doctor" && (
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  alignItems: "center",
                                  width: "100%",
                                  flexWrap: "wrap",
                                  justifyContent: "center",
                                }}
                              >
                                {options.map((option: any) => (
                                  <div
                                    key={option.id}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      // width: "130px",
                                    }}
                                  >
                                    <label
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* <input
                                        type="radio"
                                        name="single-select"
                                        onChange={() =>
                                          handleChange(option.title)
                                        }
                                        style={{
                                          accentColor:
                                            selected === option.id
                                              ? "#0e54a3"
                                              : "#000",
                                        }}
                                      /> */}

                                      <Radio
                                        sx={{
                                          color: "#0D47A1",
                                          "&.Mui-checked": {
                                            color: "#0D47A1",
                                          },
                                        }}
                                        onChange={() =>
                                          handleChange(option.title)
                                        }
                                        checked={selected === option.title}
                                      />

                                      {option.title}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              {selectedError ? (
                                <div style={{ color: "red" }}>
                                  *{selectedError}
                                </div>
                              ) : null}
                            </div>
                          )}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "52px",
                            }}
                          >
                            <button
                              className={style.backbtn}
                              onClick={handleClose}
                            >
                              {t("back")}
                            </button>

                            <button
                              className={style.verifybtn}
                              onClick={handleVerifyClick}
                              disabled={loading ? true : false}
                            >
                              {loading ? (
                                <RingLoader size={35} color={"#fff"} />
                              ) : (
                                t("sendRequest")
                              )}
                            </button>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "30px",
                              color: "#0E54A3",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setopenEmail(true);
                            }}
                          >
                            {lowerText}
                          </div>
                        </div>
                      </div>
                    )}
                    {showSending && (
                      <div className={style.sendContent}>
                        <div
                          className={style.closeButton}
                          onClick={() => {
                            setShowSending(false);
                            setOpen(false);
                            setEmail("");
                          }}
                        >
                          <RxCross2
                            size={"48px"}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <img
                          src={sending}
                          className={style.sendingImage}
                          alt="sending"
                        />
                        <div className={style.title}>{t("requestSent")}</div>
                        <div className={style.subtitle}>
                          {t("requestSentTo")}{" "}
                        </div>
                        <div className={style.email}>{email}</div>
                        <div className={style.separator} />
                        <div className={style.footerText}>
                          {t("ifYouHaveNotRecieved_")}{" "}
                          <span
                            className={style.footerLink}
                            onClick={handleVerifyClick}
                          >
                            {loading ? (
                              <RingLoader size={35} color={"#0E54A3"} />
                            ) : (
                              t("resendRequest")
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    {openEmail && (
                      <>
                        <GenericVerifyEmailVendor
                          type={type}
                          setStep={setStep}
                          setEmail={setValue}
                          setType={setType}
                          setDepartmentId={setDepartmentId}
                          handleBack={goback}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <GenericVerifyEmailVendor
                    type={type}
                    setStep={setStep}
                    setType={setType}
                    setEmail={setValue}
                    handleBack={handleClose}
                  />
                )}
              </>
            )}
            {step && (
              <div className={style.modalContent}>
                <CustomStepper steps={steps} selectedStep={currentStep} />
                <div className={style.mainHeadingSignUpPage}>
                  {getHeaderText()}
                  <span className={style.secondMainHeadingSignUp}>
                    {t("info")}
                  </span>
                </div>
                <div>
                  {currentStep === 0 ? (
                    type == "doctor" ? (
                      <>
                        <BasicInfo
                          setCurrentStep={setCurrentStep}
                          state={value}
                          handleBack={handleModelBack}
                        />
                      </>
                    ) : (
                      <GenericBasicInfoComapny
                        type={type}
                        setCurrentStep={setCurrentStep}
                        state={value}
                        handleBack={handleModelBack}
                      />
                    )
                  ) : currentStep === 1 ? (
                    <GenericSocialInfo
                      type={type}
                      setCurrentStep={setCurrentStep}
                      handleBack={handleBack}
                    />
                  ) : currentStep === 2 ? (
                    <GenericBankDetails
                      type={type}
                      setCurrentStep={setCurrentStep}
                      handleBack={handleBack}
                    />
                  ) : (
                    <GenericPassword
                      type={type}
                      loading={loading}
                      handleSignup={registerHospital}
                      showSuccessModal={showSuccessModal}
                      handleCloseSuccessModal={handleCloseSuccessModal}
                      handleBack={handleBack}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <CustomModal showModal={lostModel}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  color: "#7D7D7D",
                  fontSize: "16px",
                  fontWeight: "600",
                  textAlign: "center",
                  width: "70%",
                  wordWrap: "break-word",
                  whiteSpace: "pre-line",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {t("ifYouGoBack_")}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "70%",
                  marginTop: "40px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#0E54A3",
                    color: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "24px",
                    boxShadow: "4px 4px 12px 0px #00000040",
                    width: "120px",
                    height: "45px",
                    cursor: "pointer",
                  }}
                  onClick={() => setLostModel(false)}
                >
                  {t("cancel")}
                </div>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#7D7D7D",
                    color: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "24px",
                    boxShadow: "4px 4px 12px 0px #00000040",
                    width: "120px",
                    height: "45px",
                    cursor: "pointer",
                  }}
                  onClick={handleDiscard}
                >
                  {t("discard")}
                </div>
              </div>
            </div>
          </CustomModal>
        </>
      </Modal>
    </>
  );
};

export default LoginModel;
