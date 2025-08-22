import React, { useState } from "react";
import { useFormik } from "formik";
import Styles from "./BasicInfo.module.css";
import "react-datepicker/dist/react-datepicker.css";
// import LocationInput from "shared/components/LocationInput";
// import Modal from "shared/components/ModelTermsAndCondition/Model";
// import TermsAndConditions from "shared/components/ModelTermsAndCondition";
// import CustomInput from "shared/components/A_New_Components/CustomInput";
import * as Yup from "yup";
import { pharmaceuticalInfoSchema } from "shared/utils";
import { useDispatch, useSelector } from "react-redux";
// import { ImagNewPicker, PhoneNumberInputNew } from "shared/components";
import { setDoctorFormData } from "shared/redux";
import { Checkbox } from "@mui/material";
import InputField from "../A_New_Components/InputField";
import ImagNewPicker from "../ImagNewPicker";
import PhoneNumberInputNew from "../PhoneNumberInputNew";
import LocationInput from "../LocationInput";
import Modal from "../ModelTermsAndCondition/Model";
import TermsAndConditions from "../ModelTermsAndCondition";
import { FaAngleDown } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
interface Props {
  setCurrentStep: any;
  state: any;
}
const PharmaceuticalBasicInfo = (props: Props) => {
  const { setCurrentStep, state } = props;
  const [isAgreed, setAgree] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [verifybutton, setVerifyEror] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { t }: any = useTranslation();
  const { doctorFormData } = useSelector((state: any) => state.root.common);
  const handleNext = (data: any) => {
    if (!isAgreed) {
      setVerifyEror("You must agree to the terms and conditions.");
      return;
    }
    dispatch(setDoctorFormData(data));
    setCurrentStep(1);
  };
  const savedFormData = doctorFormData;
  const formik: any = useFormik({
    initialValues: {
      name: savedFormData?.name || "",
      logo: savedFormData?.logo || "",
      ownerFirstName: savedFormData?.ownerFirstName || "",
      ownerLastName: savedFormData?.ownerLastName || "",
      emergencyNumber: savedFormData?.emergencyNumber || "",
      address: savedFormData?.address || "",
      lat: savedFormData?.lat || "",
      lng: savedFormData?.lng || "",
      city: savedFormData?.city || "",
      companyName: savedFormData?.companyName || "",
      email: state || "",
      phoneNumber: savedFormData?.phoneNumber || "",
      countrySelection: savedFormData?.countrySelection || "",
      country: savedFormData?.country || "",
    },
    validationSchema: Yup.object(pharmaceuticalInfoSchema(t)),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values: any) => {
    try {
      await handleNext(values);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  const handleLocationChange = async (newLocation: any) => {
    const labelParts: any = newLocation?.label.split(", ");
    const country = labelParts[labelParts.length - 1];
    formik?.setFieldValue("address", newLocation?.label);
    formik?.setFieldValue("city", newLocation?.city);
    formik?.setFieldValue("country", country);
    const address = newLocation?.label;
    const apiKey = "AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A";
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        formik?.setFieldValue("lat", location.lat);
        formik?.setFieldValue("lng", location.lng);
      } else {
        console.error("Geocoding error: ", data.status);
      }
    } catch (error) {
      console.error("Error fetching geocoding data: ", error);
    }
  };
  const handleAgreementChange = () => {
    setAgree((prev) => {
      const newAgreeState = !prev;
      return newAgreeState;
    });
  };
  const namecomapny = formik.values?.companyName;

  const handleCompany = (url: any) => {
    formik.setFieldValue("logo", url);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModalTerms = () => {
    setModalOpen(false);
  };

  const handleCompanyName = (name: any) => {
    formik.setFieldValue("companyName", name);
  };
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position, "...position");
        const { latitude, longitude } = position.coords;
        const apiKey = "AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A";
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
        try {
          const response = await fetch(geocodeUrl);
          const data = await response.json();
          if (data.results.length > 0) {
            const address = data.results[0].formatted_address;
            const location = data.results[0].geometry.location;
            let city = "";
            for (const component of data.results[0].address_components) {
              if (component.types.includes("locality")) {
                city = component.long_name;
                break;
              }
            }
            formik?.setFieldValue("address", address);
            formik?.setFieldValue("city", city);
            formik?.setFieldValue("lat", location.lat);
            formik?.setFieldValue("lng", location.lng);
          } else {
          }
        } catch (error) {
          console.error("Geocoding API Error:", error);
        }
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            id="name"
            formik={formik}
            value={formik.values.name}
            placeholder={`${t("_name")}`}
            onChange={formik?.handleChange("name")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <ImagNewPicker
            placeholder={t("logo")}
            setData={handleCompany}
            setName={handleCompanyName}
            initialValue={namecomapny}
          />
          {formik.touched.logo && formik.errors.logo ? (
            <div className={Styles.error}>{formik.errors.logo}</div>
          ) : null}
        </div>
      </div>

      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            id="email"
            readOnly
            formik={formik}
            value={formik.values.email}
            placeholder={`${t("email")}`}
            onChange={formik?.handleChange("email")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <PhoneNumberInputNew
            value={formik.values.phoneNumber}
            setValue={(newValue: string) => {
              formik.setFieldValue("phoneNumber", newValue);
            }}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className={Styles.error}>{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
      </div>

      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            id="ownerFirstName"
            formik={formik}
            value={formik.values.ownerFirstName}
            placeholder={`${t("ownerFirstName")}`}
            onChange={formik?.handleChange("ownerFirstName")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <InputField
            id="ownerLastName"
            formik={formik}
            value={formik.values.ownerLastName}
            placeholder={`${t("ownerLastName")}`}
            onChange={formik?.handleChange("ownerLastName")}
            height="48px"
          />
        </div>
      </div>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <PhoneNumberInputNew
            placeHolder={`${t("emergencyNo")}`}
            value={formik.values.emergencyNumber}
            setValue={(newValue: string) => {
              formik.setFieldValue("emergencyNumber", newValue);
            }}
          />
          {formik.touched.emergencyNumber && formik.errors.emergencyNumber ? (
            <div className={Styles.error}>{formik.errors.emergencyNumber}</div>
          ) : null}
        </div>
        <div className={Styles.inputGroupBasic}>
          <LocationInput
            placeholder={formik.values.address || t("address")}
            type={"box"}
            setData={handleLocationChange}
            defaultValue={formik.values.address}
          />
          {/* <div className={Styles.locationButton} onClick={fetchLocation}>
              📍 Get Current Location
            </div> */}
          {formik.touched.address && formik.errors.address ? (
            <div className={Styles.error}>{formik.errors.address}</div>
          ) : null}
        </div>
      </div>
      <div className={Styles.rowBasic}>
        <div className={Styles.addressWidthSet}>
          <CountrySelection
            t={t}
            data={["Pakistan"]}
            countrySelection={formik?.values?.countrySelection}
            setCountrySelection={formik?.setFieldValue}
          />
          {formik.errors.countrySelection && (
            <div className={Styles.error}>{formik.errors.countrySelection}</div>
          )}
        </div>
      </div>
      <div className={Styles.agreementContainer}>
        <Checkbox
          checked={isAgreed}
          onChange={handleAgreementChange}
          className={Styles.radioMark}
        />
        <span className={Styles.agreementText}>
          {t("iAgreetoMediTour")}{" "}
          <span
            className={Styles.linkText}
            onClick={handleOpenModal}
            style={{ cursor: "pointer" }}
          >
            {t("terms&Condition")}
          </span>{" "}
          {t("and")}{" "}
          <a
            className={Styles.linkText}
            href="/privactpolicys"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("privacyPolicy")}
          </a>
        </span>
      </div>
      {verifybutton && <div className={Styles.error}>{verifybutton}</div>}
      <div className={Styles.buttonContainer}>
        <button className={Styles.continueButton} type="submit">
          {t("next")} →
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModalTerms}>
        <TermsAndConditions />
      </Modal>
    </form>
  );
};
const CountrySelection = ({
  t,
  data,
  countrySelection,
  setCountrySelection,
}: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={Styles.selectionDrop} onClick={() => setOpen(!open)}>
        <div
          className={Styles.customText}
          style={{ color: countrySelection ? "#000000" : "#7D7D7D" }}
        >
          {countrySelection || `${t("selectCountry")}`}
        </div>
        <FaAngleDown color="#7d7d7d" size={16} />
      </div>
      {open && (
        <div className={Styles.dropdown}>
          {data.map((country: any) => (
            <div
              key={country}
              className={
                countrySelection === country
                  ? Styles.countrySelected
                  : Styles.countryText
              }
              onClick={() => {
                setCountrySelection("countrySelection", country);
                setOpen(false);
              }}
            >
              {country}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default PharmaceuticalBasicInfo;
