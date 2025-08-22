import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paramedicStaffBasicInfoSchema } from "shared/utils";
import Styles from "./BasicInfo.module.css";
import * as Yup from "yup";
import Modal from "shared/components/ModelTermsAndCondition/Model";
import DatepickerNew from "shared/components/DatePicker/DatePickerNew";
import LocationInput from "shared/components/LocationInput";
import { setDoctorFormData } from "shared/redux";
import {
  ImagNewPicker,
  InputField,
  PhoneNumberInputNew,
} from "shared/components";
import TermsAndConditions from "shared/components/ModelTermsAndCondition";
import { Checkbox } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { Console } from 'console';
const ParamedicBasicInfo = (props: any) => {
  const { state, setCurrentStep } = props;
  const dispatch = useDispatch();
  const [isAgreed, setAgree] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [verifybutton, setVerifyEror] = useState("");
  const { doctorFormData } = useSelector((state: any) => state.root.common);
  const { t }: any = useTranslation();
  const savedFormData = doctorFormData;
  const formik: any = useFormik({
    initialValues: {
      name: savedFormData?.name || "",
      email: state || "",
      phoneNumber: savedFormData?.phoneNumber || "",
      cnicOrPassportNo: savedFormData?.cnicOrPassportNo || "",
      qualifications: savedFormData?.qualifications || "",
      address: savedFormData?.address || "",
      lat: savedFormData?.lat || "",
      lng: savedFormData?.lng || "",
      city: savedFormData?.city || "",
      cnicOrPassportExpiry: savedFormData?.cnicOrPassportExpiry || "",
      cnicImage: savedFormData?.cnicImage || "",
      nicName: savedFormData?.nicName || "",
      countrySelection: savedFormData?.countrySelection || "",
      country: savedFormData?.country || "",
    },
    validationSchema: Yup.object(paramedicStaffBasicInfoSchema(t)),
    onSubmit: (values) => {
      handleSubmit(values);
      console.log("Form submitted with values:", values);
    },
  });
  const handleSubmit = async (values: any) => {
    try {
      await handleNext(values);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const handleNext = (data: any) => {
    if (!isAgreed) {
      setVerifyEror(t("mustAgreeTermsAndConditions"));
      return;
    }
    dispatch(setDoctorFormData(data));
    setCurrentStep(1);
  };
  const nicName = formik.values?.nicName;
  const handleCnicUrl = (url: any) => {
    formik.setFieldValue("cnicImage", url);
  };
  const handleNicName = (name: any) => {
    formik.setFieldValue("nicName", name);
  };

  const handleAgreementChange = () => {
    setAgree((prev) => {
      const newAgreeState = !prev;
      return newAgreeState;
    });
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

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModalTerms = () => {
    setModalOpen(false);
  };
  console.log("formik.values", formik.values);
  console.log("formik.errors", formik.errors);
  console.log("formik.touched", formik.touched);
  console.log("code chal ra hai")
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            value={formik.values.name}
            id="name"
            formik={formik}
            placeholder={`${t("fullName")}*`}
            onChange={formik?.handleChange("name")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <InputField
            value={formik.values.email}
            id="email"
            formik={formik}
            placeholder={t("email")}
            onChange={formik?.handleChange("email")}
            height="48px"
            readOnly
          />
        </div>
      </div>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            value={formik.values.cnicOrPassportNo}
            id="cnicOrPassportNo"
            formik={formik}
            placeholder={t("nic_passport")}
            onChange={formik?.handleChange("cnicOrPassportNo")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <div className={Styles.widthDatePicker}>
            <DatepickerNew
              setData={(date) =>
                formik.setFieldValue("cnicOrPassportExpiry", date)
              }
              value={formik.values.cnicOrPassportExpiry}
              placeholder={t("nic_passportExpiry")}
              className={Styles.dateInput}
            />
          </div>
        </div>
      </div>
      <div className={Styles.rowBasic}>
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
        <div className={Styles.inputGroupBasic}>
          <ImagNewPicker
            placeholder={t("nic_PassportImage")}
            setData={handleCnicUrl}
            setName={handleNicName}
            initialValue={nicName}
          />
        </div>
      </div>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            value={formik.values.qualifications}
            id="qualifications"
            formik={formik}
            placeholder={`${t("qualification")}*`}
            onChange={formik?.handleChange("qualifications")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <LocationInput
            placeholder={formik.values.address || `${t("residentialAddress")}*`}
            type={"box"}
            setData={handleLocationChange}
            defaultValue={formik.values.address}
          />

          {formik.touched.address && formik.errors.address ? (
            <div className={Styles.error}>{formik.errors.address}</div>
          ) : null}
        </div>
      </div>
      {/* <div className={Styles.rowBasic}> */}
      {/* <div className={Styles.addressWidthSet}> */}
      <CountrySelection
        t={t}
        data={["Pakistan"]}
        countrySelection={formik?.values?.countrySelection}
        setCountrySelection={formik?.setFieldValue}
      />
      {formik.errors.countrySelection && (
        <div className={Styles.error}>{formik.errors.countrySelection}</div>
      )}
      {/* </div> */}
      {/* </div> */}
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
      <div className={Styles.selectionDrop22} onClick={() => setOpen(!open)}>
        <div
          className={Styles.customText}
          style={{ color: countrySelection ? "#000000" : "#7D7D7D" }}
        >
          {countrySelection || t("selectCountry")}
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
export default ParamedicBasicInfo;
