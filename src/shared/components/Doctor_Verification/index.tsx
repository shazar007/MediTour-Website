import React, { useState, useEffect } from "react";
import classNames from "classnames";
import MainMedicalstyle from "./mainMedicalService.module.css";
import commonStyles from "shared/utils/common.module.css";
import { useFormik } from "formik";
import styles from "./verification.module.css";
import * as Yup from "yup";
import { doctor_VerifySchema } from "shared/utils";
import { Checkbox } from "@mui/material";
import {
  CustomInput,
  PhoneNumberInput,
  PrimaryButton,
  SuccessModal,
  VerifyModal,
} from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import {
  docCompleteSignup,
  docSendCodeToEmail,
  docVerifyEmail,
} from "shared/services/DoctorService";
import { set_IsEmailVerified, set_IsPhoneVerified } from "shared/redux";
import { useNavigate } from "react-router-dom";
import PasswordInput from "shared/components/PasswordInput";
import {
  hospitalCompleteSignup,
  hospitalConfirmEmail,
  hospitalSendCodeToEmail,
} from "shared/services/HospitalService";
import {
  rentCarCompleteSignup,
  rentCarConfirmEmail,
  rentCarSendCodeToEmail,
} from "shared/services/RentaCar";
import Modal from "../ModelTermsAndCondition/Model";
import TermsAndConditions from "../ModelTermsAndCondition";

interface Props {
  handleClickNext?: any;
  handle_SendCodeToEmail?: any;
  handle_SubmitCode?: any;
  handle_CompleteSignup?: any;
}

const Doctor_Verification = (props: Partial<Props>) => {
  const { handle_SendCodeToEmail, handle_SubmitCode, handle_CompleteSignup } =
    props;

  const [verifyLoading, setVerifyLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [verifyError, setVerifyError] = React.useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { DocUser_id } = useSelector((state: any) => state.root.doctor);
  const { is_EmailVerified, is_PhoneVerified, systemType } = useSelector(
    (state: any) => state.root.common
  );

  const formik = useFormik({
    initialValues: {
      phoneNo: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object(doctor_VerifySchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModalTerms = () => {
    setModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = passwordVisible ? "text" : "password";
  const inputPassword = showPassword ? "text" : "password";

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const handlePhoneVerification = () => {
    dispatch(set_IsPhoneVerified(true));
  };

  useEffect(() => {
    return () => {
      dispatch(set_IsPhoneVerified(false));
    };
  }, []);

  const handleTimer = () => {
    setMinutes(1);
    setSeconds(59);
    setShowVerifyModal(true);
  };

  const sendDoctorCode = (params: any) => {
    docSendCodeToEmail(params)
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          handleTimer();
        }
      })
      .catch((err: any) => {
        setVerifyError(err.response.data.message);
      })
      .finally(() => {
        setVerifyLoading(false);
      });
  };

  const sendHospitalCode = (params: any) => {
    hospitalSendCodeToEmail(params)
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          handleTimer();
        }
      })
      .catch((err: any) => {
        setVerifyError(err.response.data.message);
      })
      .finally(() => {
        setVerifyLoading(false);
      });
  };

  const sendRentACarCode = (params: any) => {
    rentCarSendCodeToEmail(params)
      .then((res: any) => {
        handleTimer();
      })
      .catch((err: any) => {
        setVerifyError(err.response.data.message);
      })
      .finally(() => {
        setVerifyLoading(false);
      });
  };
  const handleVerifyEmail = () => {
    setVerifyLoading(true);
    let params = {
      email: formik.values.email,
    };

    if (systemType === "hospital") {
      sendHospitalCode(params);
    } else if (systemType === "rentacar") {
      sendRentACarCode(params);
    } else if (
      systemType === "laboratory" ||
      systemType === "hotel" ||
      systemType === "donation" ||
      systemType === "insurance" ||
      systemType === "pharmaceutical"
    ) {
      handle_SendCodeToEmail(
        params,
        setVerifyLoading,
        setVerifyError,
        handleTimer
      );
    } else {
      sendDoctorCode(params);
    }
  };

  const handleVerifySuccess = (res: any) => {
    setSuccessMessage(res.data.message);
    dispatch(set_IsEmailVerified(true));
    setVerifyError("");
  };

  const handleVerifyDoctorEmail = (params: any) => {
    if (code.length == 6) {
      setLoading(true);
      docVerifyEmail(params)
        .then((res: any) => {
          if (res.data.status) {
            handleVerifySuccess(res);
          }
        })
        .catch((err: any) => {
          setCodeError(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleVerifyHospitalEmail = (params: any) => {
    if (code.length == 6) {
      hospitalConfirmEmail(params)
        .then(async (res: any) => {
          if (res.data.status) {
            handleVerifySuccess(res);
          }
        })
        .catch((err: any) => {
          setCodeError(err.response.data.message);
        })
        .finally(() => {
          setVerifyLoading(false);
        });
    }
  };
  const handleVerifyRentACarEmail = (params: any) => {
    if (code.length == 6) {
      rentCarConfirmEmail(params)
        .then(async (res: any) => {
          if (res.data.status) {
            handleVerifySuccess(res);
          }
        })
        .catch((err: any) => {
          setCodeError(err.response.data.message);
        })
        .finally(() => {
          setVerifyLoading(false);
        });
    }
  };

  const handleSubmitCode = () => {
    let params = {
      email: formik.values.email,
      code: code,
    };

    if (systemType === "hospital") {
      handleVerifyHospitalEmail(params);
    } else if (systemType === "rentacar") {
      handleVerifyRentACarEmail(params);
    } else if (
      systemType === "laboratory" ||
      systemType === "hotel" ||
      systemType === "donation" ||
      systemType === "insurance" ||
      systemType === "pharmaceutical"
    ) {
      handle_SubmitCode(
        params,
        setVerifyLoading,
        setCodeError,
        handleVerifySuccess
      );
    } else {
      handleVerifyDoctorEmail(params);
    }
  };

  const hos_complete_signup = (params: any) => {
    hospitalCompleteSignup(params, DocUser_id)
      .then((res: any) => {
        if (res.status == 200 && res.statusText == "OK") {
          handleSignupSuccess();
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setVerifyLoading(false);
        dispatch(set_IsEmailVerified(false));
      });
  };

  const doc_complete_signup = (params: any) => {
    docCompleteSignup(params, DocUser_id)
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          handleSignupSuccess();
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setVerifyLoading(false);
        dispatch(set_IsEmailVerified(false));
      });
  };

  const rentacar_complete_signup = (params: any) => {
    rentCarCompleteSignup(params, DocUser_id)
      .then((res: any) => {
        if (res.status == 200 && res.statusText == "OK") {
          handleSignupSuccess();
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setVerifyLoading(false);
        dispatch(set_IsEmailVerified(false));
      });
  };

  const handleSignupSuccess = () => {
    setShowSuccessModal(true);
    dispatch(set_IsEmailVerified(false));
    dispatch(set_IsPhoneVerified(false));
  };

  const handleSubmit = async () => {
    let values = formik.values;

    if (termsAccepted) {
      let params = {
        phoneNumber: values.phoneNo,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      if (is_EmailVerified) {
        if (systemType === "hospital") {
          hos_complete_signup(params);
        } else if (systemType === "rentacar") {
          rentacar_complete_signup(params);
        } else if (
          systemType === "laboratory" ||
          systemType === "hotel" ||
          systemType === "donation" ||
          systemType === "insurance" ||
          systemType === "pharmaceutical"
        ) {
          handle_CompleteSignup(params, handleSignupSuccess);
        } else {
          doc_complete_signup(params);
        }
      } else {
        setVerifyError("Please verify email and phone number first.");
      }
    } else {
      setVerifyError("Please accept Terms & Conditions");
    }
  };
  const handleCloseModal = () => {
    setShowVerifyModal(false);
  };
  const hanldeCloseVerification = () => {
    setShowVerifyModal(false);
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handlePhone = (value: any) => {
    formik.setFieldValue("phoneNo", value);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div
          className={classNames(
            commonStyles.col9,
            commonStyles.colsm12,
            commonStyles.mt56
          )}
        >
          {verifyError && (
            <div className={classNames(commonStyles.error)}>*{verifyError}</div>
          )}
          <div className={classNames(commonStyles.mb16, commonStyles.flx)}>
            <div className={classNames(commonStyles.col10)}>
              <PhoneNumberInput
                value={formik.values.phoneNo}
                setValue={handlePhone}
              />

              {formik.touched.phoneNo && formik.errors.phoneNo ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.phoneNo}
                </div>
              ) : null}
            </div>
            {/* <div>
              {is_PhoneVerified ? (
                <button
                  type="button"
                  disabled={true}
                  className={commonStyles.Verified}
                >
                  Verified
                </button>
              ) : (
                <button
                  onClick={handlePhoneVerification}
                  disabled={
                    formik.values.phoneNo && formik.values.phoneNo.length >= 10
                      ? false
                      : true
                  }
                  type="button"
                  className={
                    formik.values.phoneNo && formik.values.phoneNo.length >= 10
                      ? styles.VerifyActive
                      : styles.Verify
                  }
                >
                  Verify
                </button>
              )}
            </div> */}
          </div>
          <div className={classNames(commonStyles.mb16, commonStyles.flx)}>
            <div
              className={classNames(commonStyles.col11, commonStyles.mtsm28)}
            >
              <CustomInput
                placeholder="Email Address"
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
            {is_EmailVerified ? (
              <button
                type="button"
                disabled={true}
                className={commonStyles.Verified}
              >
                Verified
              </button>
            ) : (
              <button
                type="button"
                disabled={verifyLoading || formik.values.email ? false : true}
                className={
                  formik.values.email
                    ? commonStyles.VerifyActive
                    : commonStyles.Verify
                }
                onClick={handleVerifyEmail}
              >
                {verifyLoading ? "loading..." : "Verify"}
              </button>
            )}
          </div>
          <div className={classNames(commonStyles.mb16, commonStyles.flx)}>
            <div
              className={classNames(commonStyles.col11, commonStyles.mtsm28)}
            >
              <PasswordInput
                type={inputType}
                placeholder="Password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          <div className={classNames(commonStyles.mb16, commonStyles.flx)}>
            <div
              className={classNames(commonStyles.col11, commonStyles.mtsm28)}
            >
              <PasswordInput
                type={inputPassword}
                placeholder="Re-Password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={classNames(commonStyles.col12)}>
          <div className={classNames(commonStyles.flx)}>
            <Checkbox
              value={termsAccepted}
              onChange={() => {
                setTermsAccepted(!termsAccepted);
              }}
              size="small"
              style={{
                color: "#ff7631",
                marginLeft: -10,
              }}
            />

            <div>
              <p
                className={classNames(commonStyles.regular, commonStyles.fs10)}
              >
                I agree meditour{" "}
                <span
                  className={classNames(commonStyles.colorOrange)}
                  onClick={handleOpenModal}
                  style={{ cursor: "pointer" }}
                >
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <a
                  className={classNames(commonStyles.colorOrange)}
                  href="/privactpolicys"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy
                </a>
              </p>

              {/* Modal Component */}
              <Modal isOpen={isModalOpen} onClose={handleCloseModalTerms}>
                <TermsAndConditions />
              </Modal>
            </div>
          </div>
          {/* <div className={classNames(commonStyles.flx, commonStyles.mb28)}>
            <Checkbox
              size="small"
              style={{
                color: "#ff7631",
                marginLeft: -10,
              }}
            />

            <div>
              <p
                className={classNames(commonStyles.regular, commonStyles.fs10)}
              >
                Please contact via phone or email to assist my inquery
              </p>
            </div>
          </div> */}
        </div>
        <div className={MainMedicalstyle.buttonWidth}>
          <PrimaryButton
            children={"Submit"}
            type="submit"
            colorType={"MedicalService"}
          />
        </div>
      </form>
      <VerifyModal
        loading={loading}
        showModal={showVerifyModal}
        handleSubmit={handleSubmitCode}
        code={code}
        codeError={codeError}
        hanldeCloseVerification={hanldeCloseVerification}
        setCodeError={setCodeError}
        setCode={setCode}
        minutes={minutes}
        seconds={seconds}
        handleSendCodeToEmail={handleVerifyEmail}
        successMessage={successMessage}
        hanldeCloseModal={handleCloseModal}
      />
      <SuccessModal
        showModal={showSuccessModal}
        successMessage={"Signup Completed Successfully!"}
        hanldeCloseModal={handleCloseSuccessModal}
      />
    </div>
  );
};

export default Doctor_Verification;
