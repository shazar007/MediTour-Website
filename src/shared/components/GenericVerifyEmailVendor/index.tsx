import React, { useEffect, useState } from "react";
import style from "./GenericVerifyVendor.module.css";
import logo from "assets/images/logoMed.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genericSending, verifyGenric } from "shared/services/DoctorService";
import InputField from "../A_New_Components/InputField";
import PrimaryButton from "../PrimaryButton";
import RingLoader from "../RingLoader";
import VerifyModal from "../VerifyModal";
import { GetColorCode } from "shared/utils";
import { notifySuccess } from "../A_New_Components/ToastNotification";
import { codeToEmail, getDepartment, verifyCompanyCode } from "shared/services";
import { EmailProps } from "./props";
import { IoIosArrowDown } from "react-icons/io";
import { Radio } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
const GenericVerifyEmailVendor = ({
  type,
  setStep,
  setEmail,
  handleBack,
  setType,
  setDepartmentId,
}: {
  type?: any;
  setStep?: any;
  setEmail?: any;
  ref?: any;
  setDepartmentId?: any;
  handleBack?: any;
  setType?: any;
}) => {
  const { t }: any = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [selected, setSelected] = useState<any>("");
  const [codeError, setCodeError] = useState("");
  const [value, setValue] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [selectedError, setSelectedError] = useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [minutes, setMinutes] = useState(0);
  const [selectDepartment, setSelctedDepart] = useState<any>("");
  const [departmentData, setDepartmentData] = useState<any>("");
  const [open, setopenDepartment] = useState<any>(false);
  const [departmentEror, setDepartmentEror] = useState("");
  const [seconds, setSeconds] = useState(0);
  const { placeHolder, paramsInsert, sendCode, paramsVerify, confirmCode } =
    EmailProps(type, value, selected, code, selectDepartment, t);
  const { systemType } = useSelector((state: any) => state.root.common);
  const naviagte = useNavigate();
  const hanldeCloseVerification = () => {
    setShowModal(false);
  };
  const { signUpRout } = GetColorCode();

  const [error, setError] = useState("");
  const typeCheck =
    type === "labs" ||
    type === "branch" ||
    type === "doctor" ||
    type === "pharmacy" ||
    type === "travel" ||
    type == "hotel";
  const check =
    systemType === "physiotherapist" ||
    systemType === "doctor" ||
    systemType === "psychologist" ||
    systemType === "paramedic" ||
    systemType === "nutritionist";

  const handleVerifyClick = () => {
    setLoading(true);
    if (type === "doctor") {
      if (systemType !== "company" && !selectDepartment?._id) {
        setDepartmentEror(t("pleaseSelectDepartment"));
        setLoading(false);

        return;
      }
    }
    if (!value) {
      setLoading(false);
      setError(t("pleaseEnterYourEmail"));

      return;
    }
    if (type === "doctor" && !selected) {
      setLoading(false);

      setSelectedError(t("pleaseSelectDoctorType"));
      return;
    }
    let params: any;
    if (typeCheck) {
      params = paramsInsert;
    } else {
      params = {
        email: value,
        type: check ? "doctor" : systemType,
        ...(check && { doctorKind: systemType }),
      };
    }

    const request = typeCheck
      ? codeToEmail(params, sendCode)
      : genericSending(params);
    request
      .then((res: any) => {
        // if (res.status === "200" && res.statusText === "OK") {

        handleTimer();
        // }
        notifySuccess(res.data.message);
      })
      .catch((err: any) => {
        // setError(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleSubmit = () => {
    setLoading(true);
    let params: any;
    if (typeCheck) {
      params = paramsVerify;
    } else {
      params = {
        code: code,
        email: value,
        ...(check && { doctorKind: systemType }),
      };
    }
    const request = typeCheck
      ? verifyCompanyCode(params, confirmCode)
      : verifyGenric(params);

    request
      .then((res: any) => {
        if (res.data.status) {
          notifySuccess(res.data.message);
        }
        setShowModal(false);
        if (typeCheck) {
          setStep(true);
          setEmail(value);
          if (type === "doctor") {
            setType(selected);
            setDepartmentId(selectDepartment?._id);
          }
        } else {
          naviagte(signUpRout, {
            state: { email: value },
          });
        }
      })
      .catch((err: any) => {
        // toast?.error(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
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
  const handleTimer = () => {
    setMinutes(1);
    setSeconds(59);
    setShowModal(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleVerifyClick();
    }
  };
  const options: any = [
    { id: 1, title: "Doctor" },
    { id: 2, title: "Physiotherapist" },
    { id: 3, title: "Psychologist" },
    { id: 4, title: "Nutritionist" },
  ];
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
      .catch((err: any) => {})
      .finally(() => {});
  };
  return (
    <div className={style.formcontainer}>
      <img src={logo} alt="" className={style.logo} />
      <div>
        {typeCheck ? (
          <p className={style.welcomback}>
            <span className={style.colorBlue}>{placeHolder?.name}</span>{" "}
            <span className={style.colorOrange}>{placeHolder?.endName}</span>
          </p>
        ) : (
          <p className={style.welcomback}>
            <span className={style.colorBlue}>{t("welcomeTo")}</span>{" "}
            <span className={style.colorOrange}>{t("portal")}</span>
          </p>
        )}
      </div>

      <div
        style={{
          margin: "0 auto",
          width: "80%",
        }}
      >
        {systemType === "company"
          ? null
          : type === "doctor" && (
              <div style={{ position: "relative" }}>
                <div
                  className={style.inputGroupBasic}
                  onClick={() => setopenDepartment(!open)}
                >
                  <div>
                    {selectDepartment?.categoryId?.categoryName
                      ? selectDepartment?.categoryId?.categoryName
                      : `${t("selectDepartment")}*`}
                  </div>
                  <IoIosArrowDown size={32} color={"#CCCCCC"} />
                </div>
                {departmentEror ? (
                  <div style={{ color: "red" }}>*{departmentEror}</div>
                ) : null}
                <div style={{ marginBottom: "24px" }} />
                {open && (
                  <>
                    <div className={style?.options}>
                      {Array?.isArray(departmentData) &&
                        departmentData?.length > 0 &&
                        departmentData?.map((i: any) => {
                          return (
                            <div
                              key={i?.categoryId?.categoryName}
                              style={{
                                padding: "8px",
                                backgroundColor:
                                  selectDepartment === i ? "red" : "#fff",
                                cursor: "pointer",
                                color:
                                  selectDepartment === i ? "#fff" : "black",
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
              id="email"
              borderRadius={typeCheck ? "32px" : ""}
              placeholder={t("enterValidEmail")}
              value={value}
              onKeyDown={handleKeyPress}
              onChange={(e: any) => {
                setValue(e?.target?.value);
                if (error) {
                  setError("");
                }
              }}
            />
            {error ? <div style={{ color: "red" }}>*{error}</div> : null}
          </div>
        </div>
        {type == "doctor" ? (
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
                      // width: "130px",
                    }}
                  >
                    <Radio
                      sx={{
                        color: "#0D47A1",
                        "&.Mui-checked": {
                          color: "#0D47A1",
                        },
                      }}
                      checked={selected === option.title}
                      onChange={() => handleChange(option.title)}
                    />
                    {option.title}
                  </label>
                </div>
              ))}
            </div>
            {selectedError ? (
              <div style={{ color: "red" }}>*{selectedError}</div>
            ) : null}
          </div>
        ) : null}
        {typeCheck ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "52px",
            }}
          >
            <button className={style.backbtn} onClick={handleBack}>
              {t("back")}
            </button>

            <button className={style.verifybtn} onClick={handleVerifyClick}>
              {loading ? <RingLoader size={35} color={"#fff"} /> : t("verify")}
            </button>
          </div>
        ) : (
          <div className={style.buttonContainer} style={{ marginTop: "56px" }}>
            <PrimaryButton
              arrowNext={loading ? false : true}
              onClick={handleVerifyClick}
              disabled={loading}
              children={
                loading ? <RingLoader size={35} color={"#fff"} /> : t("verify")
              }
              colorType={systemType == "user" ? "blue" : t("medicalService")}
            />
          </div>
        )}
      </div>
      {showModal && (
        <VerifyModal
          loading={loading}
          showModal={showModal}
          hanldeCloseVerification={hanldeCloseVerification}
          handleSubmit={handleSubmit}
          code={code}
          setCode={setCode}
          codeError={codeError}
          minutes={minutes}
          seconds={seconds}
          setCodeError={setCodeError}
          successMessage={successMessage}
          handleSendCodeToEmail={handleVerifyClick}
        />
      )}
    </div>
  );
};

export default GenericVerifyEmailVendor;
