import { useState } from "react";
import classNames from "classnames";
import NavBarr from "pages/Home/HomeNavBar/NavBarr";
import { useLocation, useNavigate } from "react-router-dom";
import mStyle from "./moreDetail.module.css";
import style from "../DoctarServices/Doctor.module.css";
import commonstyles from "shared/utils/common.module.css";
import { IoIosArrowForward, IoMdArrowForward } from "react-icons/io";
import LocationInput from "shared/components/LocationInput";
import Datepicker from "shared/components/DatePicker";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import { Checkbox } from "@mui/material";
import CardStyless from "../DoctarServices/Cards.module.css";
import dayjs from "dayjs";
const UserInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pickupLocation, setPickupLocation] = useState<any>("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState<any>("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [dropOffDate, setdropOffDate] = useState<any>("");
  const [picKupTime, setpicKupTime] = useState<any>("");
  const [DropOffTime, setDropOffTime] = useState<any>("");
  const [withDriver, setWithDriver] = useState(false);
  const [pickLocError, setPickLocError] = useState<any>("");
  const [dropLocError, setDropLocError] = useState<any>("");
  const [pickDateError, setPickDateError] = useState<any>("");
  const [dropDateError, setDropDateError] = useState<any>("");
  const [pickTimeError, setPickTimeError] = useState<any>("");
  const [dropTimeError, setDropTimeError] = useState<any>("");
  const handleSelect = (newLocation: string) => {
    setPickupLocation(newLocation);
  };
  const handleDropOff = (newLocation: string) => {
    setDropoffLocation(newLocation);
  };
  const { name, phoneNo, age, items } = state || {};
  const handleAptDate = (date: any) => {
    const selectedDate = dayjs(date);
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    setPickupDate(formattedDate);
  };
  const handleCheckboxChange = (event: any) => {
    setWithDriver(event.target.checked);
  };
  const handleDropOffDate = (date: any) => {
    const selectedDate = dayjs(date);
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    setdropOffDate(formattedDate);
  };
  const handleContinue = () => {
    let isValid = true;

    if (!pickupLocation) {
      setPickLocError("Please enter Pickup Location");
      isValid = false;
    } else {
      setPickLocError("");
    }

    if (!isEnabled && !dropoffLocation) {
      setDropLocError("Please enter Dropoff Location");
      isValid = false;
    } else {
      setDropLocError("");
    }

    if (!pickupDate) {
      setPickDateError("Please select Pickup Date");
      isValid = false;
    } else {
      setPickDateError("");
    }

    if (!dropOffDate) {
      setDropDateError("Please select Dropoff Date");
      isValid = false;
    } else {
      setDropDateError("");
    }

    if (!picKupTime) {
      setPickTimeError("Please select Pickup Time");
      isValid = false;
    } else {
      setPickTimeError("");
    }

    if (!DropOffTime) {
      setDropTimeError("Please select Dropoff Time");
      isValid = false;
    } else {
      setDropTimeError("");
    }

    if (isValid) {
      const newData = {
        name,
        phoneNo,
        age,
        items,
        pickupLocation,
        isEnabled,
        dropoffLocation: isEnabled ? pickupLocation : dropoffLocation,
        pickDate: pickupDate,
        dropDate: dropOffDate,
        withDriver,
        DropOffTime,
        picKupTime,
      };
      navigate("/services/rentacar/RentaCarBooking/", { state: { newData } });
    }
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
      <LocationInput placeholder="Pickup location" setData={handleSelect} />
      {pickLocError ? (
        <div className={classNames(commonstyles.error)}>*{pickLocError}</div>
      ) : null}
      {!isEnabled && (
        <LocationInput
          placeholder="Drop-off Location"
          setData={handleDropOff}
        />
      )}
      {!isEnabled && dropLocError ? (
        <div className={classNames(commonstyles.error)}>*{dropLocError}</div>
      ) : null}
      <Datepicker placeholder="Pickup date" setData={handleAptDate} />
      {pickDateError ? (
        <div className={classNames(commonstyles.error)}>*{pickDateError}</div>
      ) : null}
      <CustomTimePicker
        placeholder="Pickup Time"
        setData={setpicKupTime}
        value={picKupTime}
      />
      {pickTimeError ? (
        <div className={classNames(commonstyles.error)}>*{pickTimeError}</div>
      ) : null}
      <Datepicker placeholder="Dropoff date" setData={handleDropOffDate} />
      {dropDateError ? (
        <div className={classNames(commonstyles.error)}>*{dropDateError}</div>
      ) : null}
      <CustomTimePicker
        placeholder="Dropoff Time"
        setData={setDropOffTime}
        value={DropOffTime}
      />
      {dropTimeError ? (
        <div className={classNames(commonstyles.error)}>*{dropTimeError}</div>
      ) : null}
      <div className={mStyle.checkboxcontainer}>
        <Checkbox
          sx={{ width: "24px", height: "24px" }}
          className={mStyle.checkBoxx}
          checked={withDriver}
          onChange={handleCheckboxChange}
        />
        <p> With Driver </p>
      </div>
      <div className={mStyle.samelocationmain}>
        <div>
          <p>Return to same location</p>
        </div>
        <div>
          <label className={mStyle.switch}>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <span className={mStyle.slider}></span>
          </label>
        </div>
      </div>

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
              onClick={handleContinue}
              className={CardStyless.showMoreButton}
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
  );
};

export default UserInfo;
