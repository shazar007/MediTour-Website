import React, { useCallback, useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import Styles from "./BasicInfo.module.css";
import "react-datepicker/dist/react-datepicker.css";
import LocationInput from "shared/components/LocationInput";
import Modal from "shared/components/ModelTermsAndCondition/Model";
import TermsAndConditions from "shared/components/ModelTermsAndCondition";
import DatepickerNew from "shared/components/DatePicker/DatePickerNew";
import * as Yup from "yup";
import { doctor_BasicInfoSchema } from "shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorFormData } from "shared/redux";
import { getAllSpecialities } from "shared/services/DoctorService";
import {
  ImagNewPicker,
  InputField,
  PhoneNumberInputNew,
  TextInputWithDropdown,
} from "shared/components";
import { Checkbox } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { selection } from "shared/services";
import { useTranslation } from "react-i18next";
interface Props {
  setCurrentStep: any;
  handleBack?: any;
  state: any;
}
const BasicInfo = (props: Props) => {
  const { setCurrentStep, state, handleBack } = props;
  const { t }: any = useTranslation();
  const dispatch = useDispatch();
  const [isAgreed, setAgree] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [country, setCountry] = useState<any>([]);
  const [verifybutton, setVerifyEror] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [specialitiesForModal, setsetSpecialitiesForModal] = useState<any>([]);
  const { doctorFormData, systemType } = useSelector(
    (state: any) => state.root.common
  );
  const [focusedSelector, setFocusedSelector] = useState<string | null>(null);

  const handleNext = (data: any) => {
    if (!isAgreed) {
      setVerifyEror(t("mustAgreeTermsAndConditions"));
      return;
    }
    dispatch(setDoctorFormData(data));
    setCurrentStep(1);
  };
  const savedFormData = doctorFormData;
  const formik: any = useFormik({
    initialValues: {
      doctorType: savedFormData?.doctorType || "",
      name: savedFormData?.name || "",
      email: state || "",
      phoneNumber: savedFormData?.phoneNumber || "",
      cnicOrPassportNo: savedFormData?.cnicOrPassportNo || "",
      cnicOrPassportExpiry: savedFormData?.cnicOrPassportExpiry || "",
      cnicImage: savedFormData?.cnicImage || "",
      qualifications: savedFormData?.qualifications || "",
      speciality: savedFormData?.speciality || [],
      clinicExperience: savedFormData?.clinicExperience || "",
      pmdcNumber: savedFormData?.pmdcNumber || "",
      gender: savedFormData?.gender || "",
      pmdcImage: savedFormData?.pmdcImage || "",
      pmdcExpiry: savedFormData?.pmdcExpiry || "",
      address: savedFormData?.address || "",
      lat: savedFormData?.lat || "",
      lng: savedFormData?.lng || "",
      city: savedFormData?.city || "",
      cnicName: savedFormData?.cnicName || "",
      nicName: savedFormData?.nicName || "",
      countrySelection: savedFormData?.countrySelection || "",
      country: savedFormData?.country || "",
    },
    validationSchema: Yup.object(doctor_BasicInfoSchema(t)),
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
  const cnicImageUrl = formik.values?.cnicName;
  const nicName = formik.values?.nicName;
  const handleCnicUrl = (url: any) => {
    formik.setFieldValue("cnicImage", url);
  };
  const handlePmdc = (url: any) => {
    formik.setFieldValue("pmdcImage", url);
  };
  const handleCnicName = (name: any) => {
    formik.setFieldValue("cnicName", name);
  };
  const handleNicName = (name: any) => {
    formik.setFieldValue("nicName", name);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModalTerms = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    fetchSpeciality();
    fetchSelection();
  }, []);
  const fetchSpeciality = () => {
    getAllSpecialities("", "")
      .then((res: any) => {
        const specialtyTitles = res?.data?.specialities?.map(
          (specialty: any) => specialty?.specialityTitle
        );
        setsetSpecialitiesForModal(specialtyTitles);
      })
      .catch((err: any) => {
        console.error("Error fetching specialities:", err);
      });
  };
  const fetchSelection = () => {
    selection()
      .then((res: any) => {
        console.log(res?.data, "....res data");
        setCountry(res?.data?.countries);
      })
      .catch(() => {})
      .finally(() => {});
  };
  const handleSpecialityChange = useCallback(
    (v: any) => {
      formik.setFieldValue("speciality", v);
    },
    [formik]
  );

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
          <div
            className={`${Styles.datePickerContainer} ${
              focusedSelector === "doctorType" ? Styles.focused : ""
            }`}
            onFocus={() => setFocusedSelector("doctorType")}
            onBlur={() => setFocusedSelector(null)}
          >
            <CustomSelector
              options={["Consultant", "General Physician"]}
              placeholder={`${t("selectType")}*`}
              onChange={(v: any) => formik.setFieldValue("doctorType", v)}
              value={formik.values.doctorType}
            />
          </div>
          {formik.touched.doctorType && formik.errors.doctorType ? (
            <div className={Styles.error}>{formik.errors.doctorType}</div>
          ) : null}
        </div>
      </div>

      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            id="email"
            formik={formik}
            value={formik.values.email}
            readOnly
            placeholder={`${t("email")}*`}
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
          <div className={Styles.selectContainer}>
            <div
              className={`${Styles.datePickerContainer} ${
                isFocused ? Styles.focused : ""
              }`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <CustomSelector
                t={t}
                options={["Male", "Female", "Confidential"]}
                placeholder={`${t("selectGender")}*`}
                onChange={(v: any) => {
                  formik.setFieldValue("gender", v);
                }}
                value={formik.values.gender}
              />
            </div>
            {formik.touched.gender && formik.errors.gender ? (
              <div className={Styles.error}>{formik.errors.gender}</div>
            ) : null}
          </div>
        </div>
        <div className={Styles.inputGroupBasic}>
          <InputField
            id="cnicOrPassportNo"
            formik={formik}
            placeholder={t("nic_passport")}
            value={formik.values.cnicOrPassportNo}
            onChange={formik?.handleChange("cnicOrPassportNo")}
            height="48px"
          />
        </div>
      </div>

      <div className={Styles.rowBasic}>
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
            id="qualifications"
            formik={formik}
            placeholder={`${t("qualification")}*`}
            value={formik.values.qualifications}
            onChange={formik?.handleChange("qualifications")}
            height="48px"
          />
        </div>

        <div className={Styles.inputGroupBasic}>
          <TextInputWithDropdown
            options={specialitiesForModal || []}
            placeholder={`${t("addSpecialities")}*`}
            onChange={handleSpecialityChange}
            value={formik.values.speciality || []}
          />
          {formik.touched.speciality && formik.errors.speciality ? (
            <div className={Styles.error}>{formik.errors.speciality}</div>
          ) : null}
        </div>
      </div>

      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            id="clinicExperience"
            formik={formik}
            type="number"
            value={formik.values.clinicExperience}
            placeholder={`${t("experienceInYears")}*`}
            onChange={formik?.handleChange("clinicExperience")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <InputField
            id="pmdcNumber"
            formik={formik}
            type="text"
            placeholder={t("pmdcNumber")}
            value={formik.values.pmdcNumber}
            onChange={formik?.handleChange("pmdcNumber")}
            height="48px"
          />
        </div>
      </div>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <div className={Styles.widthDatePicker}>
            <DatepickerNew
              setData={(date) => formik.setFieldValue("pmdcExpiry", date)}
              value={formik.values.pmdcExpiry}
              placeholder={t("pmdcExpiry")}
              className={Styles.dateInput}
            />
          </div>
        </div>
        <div className={Styles.inputGroupBasic}>
          <ImagNewPicker
            placeholder={t("pmdecImage")}
            setData={handlePmdc}
            setName={handleCnicName}
            initialValue={cnicImageUrl}
          />
        </div>
      </div>
      <div className={Styles.rowBasic}>
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
      <div className={Styles.rowBasic}>
        <CountrySelection
          t={t}
          data={country}
          countrySelection={formik?.values?.countrySelection}
          setCountrySelection={formik?.setFieldValue}
        />
        {formik.errors.countrySelection && (
          <div className={Styles.error}>{formik.errors.countrySelection}</div>
        )}
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
          {systemType === "hospital" ? null : (
            <>
              {t("and")}{" "}
              <a
                className={Styles.linkText}
                href="/privactpolicys"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("privacyPolicy")}
              </a>
            </>
          )}
        </span>
      </div>
      {verifybutton && <div className={Styles.error}>{verifybutton}</div>}
      {systemType === "hospital" ? (
        <div className={Styles.branchContainer}>
          <button
            className={Styles.backButton}
            onClick={handleBack}
            type="button"
          >
            {t("back")}
          </button>

          <button className={Styles.nextButton} type="submit">
            {t("next")} →
          </button>
        </div>
      ) : (
        <div className={Styles.buttonContainer}>
          <button className={Styles.continueButton} type="submit">
            {t("next")} →
          </button>
        </div>
      )}
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
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <div
        className={`${Styles.selectionDrop} ${focused ? Styles.focused : ""}`}
        onClick={() => {
          setOpen(!open);
          setFocused(true);
        }}
      >
        <div
          className={Styles.customText}
          style={{ color: countrySelection ? "#000000" : "#7D7D7D" }}
        >
          {countrySelection || `${t("selectCountry")}*`}
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
                setFocused(false);
              }}
            >
              {country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasicInfo;

export const CustomSelector = ({
  t,
  options,
  placeholder,
  value = "",
  onChange,
  type,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: any) => {
    if (options.length <= 3) {
      const newValue = selectedOptions === option ? "" : option;
      setSelectedOptions(newValue);
      onChange(newValue);
      setIsOpen(false);
    } else {
      const updatedSelection = selectedOptions.includes(option)
        ? selectedOptions.filter((item: any) => item !== option)
        : [...selectedOptions, option];
      setSelectedOptions(updatedSelection);
      onChange(updatedSelection);
    }
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleRemoveOption = (e: React.MouseEvent, option: any) => {
    e.stopPropagation();
    const updatedSelection = selectedOptions.filter(
      (item: any) => item !== option
    );
    setSelectedOptions(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    <div
      className={Styles.custom_selector}
      ref={dropdownRef}
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={inputContainerRef}
        className={`${Styles.input_container} ${isOpen ? Styles.active : ""}`}
        onClick={toggleDropdown}
        onFocus={(e) => {
          if (!isOpen) e.currentTarget.blur();
        }}
        tabIndex={0}
      >
        <div className={Styles.select_input}>
          {selectedOptions?.length > 0 ||
          (typeof selectedOptions === "string" && selectedOptions) ? (
            options.length <= 3 ? (
              <span className={Styles.singleSelection}>{selectedOptions}</span>
            ) : (
              <div className={Styles.truncatedSelection}>
                {selectedOptions.slice(0, 2).map((option: any, index: any) => (
                  <span key={index} className={Styles.selectedOption}>
                    <span className={Styles.optionText}>{option}</span>
                    <button
                      className={Styles.removeOption}
                      onClick={(e) => handleRemoveOption(e, option)}
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedOptions.length > 2 && (
                  <span className={Styles.ellipsis}>
                    +{selectedOptions.length - 2} {t("more")}
                  </span>
                )}
              </div>
            )
          ) : (
            <span className={Styles.placeholder}>{placeholder}</span>
          )}
        </div>

        {type == "department" ? (
          <span
            style={{
              backgroundColor: "#F2F2F2",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              position: "absolute",
              right: "10px",
            }}
          >
            <IoIosArrowDown size={32} color={isOpen ? "#FF9500" : "#CCCCCC"} />
          </span>
        ) : (
          <span className={`${Styles.dropdown_icon} ${isOpen ? "open" : ""}`}>
            ▼
          </span>
        )}
      </div>

      {isOpen && (
        <div className={Styles.options}>
          {options.map((option: any, index: any) => (
            <div
              key={index}
              className={`${Styles.option} ${
                (options.length <= 3 && selectedOptions === option) ||
                (options.length > 3 && selectedOptions?.includes(option))
                  ? Styles.selected
                  : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <span className={Styles.optionText}>{option}</span>
              {(options.length <= 3 && selectedOptions === option) ||
              (options.length > 3 && selectedOptions?.includes(option)) ? (
                <span className={Styles.tick}>✔</span>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
