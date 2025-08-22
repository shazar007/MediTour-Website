import NavBarr from "pages/Home/HomeNavBar/NavBarr";
import { useState } from "react";
import style from "../DoctarServices/Doctor.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import { IoIosArrowForward, IoMdArrowForward } from "react-icons/io";
import { CustomInput } from "shared/components";
import mStyle from "./moreDetail.module.css";
import CardStyless from "../DoctarServices/Cards.module.css";
import { useLocation, useNavigate } from "react-router-dom";
const RentaCarBook = () => {
  const { state } = useLocation();
  let items = state.items;
  const navigate = useNavigate();
  const [name, setName] = useState<any>("");
  const [phoneNo, setPhoneNo] = useState<any>("");
  const [age, setAge] = useState<any>("");
  const [nameError, setNameError] = useState<any>("");
  const [phoneNoError, setPhoneNoError] = useState<any>("");
  const [ageError, setAgeError] = useState<any>("");
  const validateFields = () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError("Please enter your name");
      isValid = false;
    } else {
      setNameError("");
    }
    if (!phoneNo.trim()) {
      setPhoneNoError("Please enter your phone number");
      isValid = false;
    } else {
      setPhoneNoError("");
    }
    if (!age.trim()) {
      setAgeError("Please enter your age");
      isValid = false;
    } else {
      setAgeError("");
    }
    return isValid;
  };

  const handleNext = () => {
    if (!validateFields()) return;
    navigate("/services/rentacar/UserInfo", {
      state: { name, phoneNo, age, items },
    });
  };
  return (
    <div>
      <div className={style.navIMG}>
        <NavBarr />
        <p
          className={classNames(
            commonstyles.fs48,
            commonstyles.semiBold,
            style.mianheading
          )}
        >
          Rent a Car
        </p>
        <div className={style.title}>
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mianheading22
            )}
          >
            Home
          </p>
          <IoIosArrowForward
            className={classNames(commonstyles.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mianheading22
            )}
          >
            Services
          </p>
          <IoIosArrowForward
            className={classNames(commonstyles.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mianheading
            )}
          >
            Rent a Car
          </p>
          <IoIosArrowForward
            className={classNames(commonstyles.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mianheading
            )}
          >
            Details
          </p>
        </div>
      </div>
      <div
        className={classNames(
          mStyle.carform,
          commonstyles.container,
          commonstyles.col5,
          commonstyles.col12
        )}
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <CustomInput
          placeholder="Name"
          value={name}
          type="text"
          onChange={(text: any) => setName(text.target.value)}
        />
        {nameError ? (
          <div className={classNames(commonstyles.error)}>*{nameError}</div>
        ) : null}
        <CustomInput
          placeholder="Phone Number"
          value={phoneNo}
          type="text"
          onChange={(text: any) => setPhoneNo(text.target.value)}
        />
        {phoneNoError ? (
          <div className={classNames(commonstyles.error)}>*{phoneNoError}</div>
        ) : null}
        <CustomInput
          placeholder="Age"
          type="text"
          value={age}
          onChange={(text: any) => setAge(text.target.value)}
        />
        {ageError ? (
          <div className={classNames(commonstyles.error)}>*{ageError}</div>
        ) : null}

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <div>
            <div className={CardStyless.showMoreContainer}>
              <button
                className={CardStyless.showMoreButton}
                onClick={handleNext}
              >
                Continue
                <span className={CardStyless.icon}>
                  <IoMdArrowForward />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentaCarBook;
