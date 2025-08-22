import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import Styles from "./BasicInfo.module.css";
import "react-datepicker/dist/react-datepicker.css";
import LocationInput from "shared/components/LocationInput";
import Modal from "shared/components/ModelTermsAndCondition/Model";
import TermsAndConditions from "shared/components/ModelTermsAndCondition";
import DatepickerNew from "shared/components/DatePicker/DatePickerNew";
import * as Yup from "yup";
import { donationBasicInfoValidation, GetColorCode } from "shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorFormData } from "shared/redux";
import ImagNewPicker from "../ImagNewPicker";
import PhoneNumberInputNew from "../PhoneNumberInputNew";
import CustomTimePicker from "../TimePicker/TimePICKER2";
import { Checkbox } from "@mui/material";
import InputField from "../A_New_Components/InputField";
import { PlaceHolderProps } from "./props";
import { FaAngleDown, FaChevronDown } from "react-icons/fa6";
import { gethotelCompany, selection } from "shared/services";
import { useTranslation } from "react-i18next";
interface Props {
  setCurrentStep: any;
  state: any;
  type?: any;
  handleBack?: any;
}

const options: any = [
  { id: 1, title: "Individual" },
  { id: 2, title: "Attach with Company" },
];
const hotelFeacture = [
  { id: 1, title: "Room Service" },
  { id: 2, title: "Restaurant" },
  { id: 3, title: "Internet" },
  { id: 4, title: "Parking" },
  { id: 5, title: "Outdoor" },
  { id: 6, title: "Activities" },
];
const travelAgency = [
  { id: 1, title: "Flight Bookings" },
  { id: 2, title: "Packages" },
  { id: 3, title: "Interpreter" },
  { id: 4, title: "Visa & Passport" },
  { id: 5, title: "Currency Exchange" },
  { id: 6, title: "Insurance" },
];
const GenericBasicInfoComapny = (props: Props) => {
  const { t, i18n }: any = useTranslation();
  const { setCurrentStep, state, type, handleBack } = props;
  const [isAgreed, setAgree] = useState(false);
  const { placeHolder } = GetColorCode();
  const { placeHolderNew } = PlaceHolderProps(type, t);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [verifybutton, setVerifyEror] = useState("");
  const dispatch = useDispatch();
  const [country, setCountry] = useState<any>([]);
  const [selectedType, setSelectedTye] = useState("");

  const types = type === "labs" || type === "pharmacy";
  console.log(error, "....error");
  useEffect(() => {
    fetchSelection();
  }, []);
  const sameTypes =
    type === "labs" ||
    type === "pharmacy" ||
    type === "travel" ||
    type === "hotel";

  const { doctorFormData, systemType } = useSelector(
    (state: any) => state.root.common
  );
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
      name: savedFormData?.name || "",
      email: state || "",
      phoneNumber: savedFormData?.phoneNumber || "",
      cnicOrPassportNo: savedFormData?.cnicOrPassportNo || "",
      cnicImage: savedFormData?.cnicImage || "",
      companyLicenseNo: savedFormData?.companyLicenseNo || "",
      address: savedFormData?.address || "",
      lat: savedFormData?.lat || "",
      lng: savedFormData?.lng || "",
      city: savedFormData?.city || "",
      cnicName: savedFormData?.cnicName || "",
      nicName: savedFormData?.nicName || "",
      logo: savedFormData?.logo || "",
      companyName: savedFormData?.companyName || "",
      companyLicenseExpiry: savedFormData?.companyLicenseExpiry || "",
      licenseImage: savedFormData?.licenseImage || "",
      companyEmergencyNo: savedFormData?.companyEmergencyNo || "",
      ownerFirstName: savedFormData?.ownerFirstName || "",
      ownerLastName: savedFormData?.ownerLastName || "",
      cnicOrPassportExpiry: savedFormData?.cnicOrPassportExpiry || "",
      closeTime: savedFormData?.closeTime || "",
      openTime: savedFormData?.openTime || "",
      labDescription: savedFormData?.labDescription || "",
      experience: savedFormData?.experience || "",
      features: savedFormData?.features || [],
      selectedType: savedFormData?.selectedType || "",
      travelCompanyId: savedFormData?.travelCompanyId || "",
      countrySelection: savedFormData?.countrySelection || "",
      country: savedFormData?.country || "",
    },
    validationSchema: Yup.object(
      donationBasicInfoValidation(systemType, types, type, selectedType, t)
    ),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const handleSubmit = async (values: any) => {
    try {
      await handleNext(values);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  const handleHospitalOpenTime = (time: any) => {
    formik.setFieldValue("openTime", time);
  };
  const handleLocationChange = async (newLocation: any) => {
    const labelParts: any = newLocation?.label.split(", ");
    const country = labelParts[labelParts.length - 1]?.trim();
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
  const namecomapny = formik.values?.companyName;
  const handleCnicUrl = (url: any) => {
    formik.setFieldValue("cnicImage", url);
  };
  const handlelicenseImage = (url: any) => {
    formik.setFieldValue("licenseImage", url);
  };
  const handleCompany = (url: any) => {
    formik.setFieldValue("logo", url);
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

  const handleCompanyName = (name: any) => {
    formik.setFieldValue("companyName", name);
  };
  const handleHospitalCloseTime = (time: any) => {
    formik.setFieldValue("closeTime", time);
  };

  const handleChange = (title: any) => {
    formik.setFieldValue("selectedType", title);
    setSelectedTye(title);
  };

  const datacheck =
    type === "travel" || systemType === "travelagency"
      ? travelAgency
      : hotelFeacture;

  const fetchSelection = () => {
    selection()
      .then((res: any) => {
        console.log(res?.data, "....res data");
        setCountry(res?.data?.countries);
      })
      .catch(() => {})
      .finally(() => {});
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
            value={formik.values.name}
            id="name"
            formik={formik}
            placeholder={sameTypes ? placeHolderNew?.name : placeHolder?.name}
            onChange={formik?.handleChange("name")}
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <ImagNewPicker
            placeholder={sameTypes ? placeHolderNew?.logo : placeHolder?.logo}
            setData={handleCompany}
            setName={handleCompanyName}
            accept={"image/*"}
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
            value={formik.values.email}
            id="email"
            formik={formik}
            readOnly
            contentEditable={false}
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
          <InputField
            value={formik.values.companyLicenseNo}
            id="companyLicenseNo"
            formik={formik}
            placeholder={
              sameTypes ? placeHolderNew?.licenseNo : placeHolder?.licenseNo
            }
            onChange={formik?.handleChange("companyLicenseNo")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <div className={Styles.widthDatePicker}>
            <DatepickerNew
              setData={(date) =>
                formik.setFieldValue("companyLicenseExpiry", date)
              }
              value={formik.values.companyLicenseExpiry}
              placeholder={
                sameTypes
                  ? placeHolderNew?.licenseExpiry
                  : placeHolder?.licenseExpiry
              }
              className={Styles.dateInput}
            />
            {formik.touched.companyLicenseExpiry &&
            formik.errors.companyLicenseExpiry ? (
              <div className={Styles.error} style={{ marginTop: "24px" }}>
                {formik.errors.companyLicenseExpiry}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <PhoneNumberInputNew
            placeHolder={`${t("emergencyNo")}*`}
            value={formik.values.companyEmergencyNo}
            setValue={(newValue: string) => {
              formik.setFieldValue("companyEmergencyNo", newValue);
            }}
          />
          {formik.touched.companyEmergencyNo &&
          formik.errors.companyEmergencyNo ? (
            <div className={Styles.error}>
              {formik.errors.companyEmergencyNo}
            </div>
          ) : null}
        </div>
        <div className={Styles.inputGroupBasic}>
          <ImagNewPicker
            placeholder={
              sameTypes
                ? placeHolderNew?.licenseImage
                : placeHolder?.licenseImage
            }
            setData={handlelicenseImage}
            setName={handleNicName}
            initialValue={nicName}
          />
          {formik.touched.licenseImage && formik.errors.licenseImage ? (
            <div className={Styles.error}>{formik.errors.licenseImage}</div>
          ) : null}
        </div>
      </div>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            placeholder={t("ownerFirstName")}
            value={formik.values.ownerFirstName}
            id="ownerFirstName"
            formik={formik}
            onChange={formik?.handleChange("ownerFirstName")}
            height="48px"
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <InputField
            placeholder={t("ownerLastName")}
            value={formik.values.ownerLastName}
            id="ownerLastName"
            formik={formik}
            onChange={formik?.handleChange("ownerLastName")}
            height="48px"
          />
        </div>
      </div>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <InputField
            placeholder={t("nic_passport")}
            value={formik.values.cnicOrPassportNo}
            id="cnicOrPassportNo"
            formik={formik}
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
      {(systemType === "hotel" ||
        systemType === "travelagency" ||
        type === "hotel" ||
        type === "travel") && (
        <div className={Styles.rowBasic}>
          <div className={Styles.inputGroupBasic}>
            <InputField
              placeholder={t("experience")}
              value={formik.values.experience}
              id="experience"
              type={"number"}
              formik={formik}
              onChange={formik?.handleChange("experience")}
              height="48px"
            />
          </div>
          <FeactureSelection formik={formik} data={datacheck} t={t} />
        </div>
      )}

      {(systemType === "hospital" ||
        systemType === "laboratory" ||
        systemType === "pharmacy") && (
        <>
          {" "}
          <div className={Styles.rowBasic}>
            <div className={Styles.inputGroupBasic}>
              <CustomTimePicker
                placeholder={
                  types ? placeHolderNew?.openTime : placeHolder?.openTime
                }
                AM={"hh:mm A"}
                setData={handleHospitalOpenTime}
                type={"box"}
                value={formik.values.openTime}
              />
              {formik.touched.openTime && formik.errors.openTime ? (
                <div className={Styles.error}>{formik.errors.openTime}</div>
              ) : null}
            </div>
            <div className={Styles.inputGroupBasic}>
              <CustomTimePicker
                placeholder={
                  types ? placeHolderNew?.closeTime : placeHolder?.closeTime
                }
                AM={"hh:mm A"}
                type={"box"}
                setData={handleHospitalCloseTime}
                value={formik.values.closeTime}
              />
              {formik.touched.closeTime && formik.errors.closeTime ? (
                <div className={Styles.error}>{formik.errors.closeTime}</div>
              ) : null}
            </div>
          </div>
        </>
      )}
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <ImagNewPicker
            placeholder={t("nic_PassportImage")}
            setData={handleCnicUrl}
            setName={handleCnicName}
            initialValue={cnicImageUrl}
          />
        </div>

        {type === "labs" || type === "pharmacy" ? null : (
          <div className={Styles.inputGroupBasic}>
            <LocationInput
              placeholder={formik.values.address || `${t("address")}*`}
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
        )}
      </div>
      {type === "labs" || type === "pharmacy" ? null : (
        <div className={Styles.rowBasic}>
          <div className={Styles.addressWidthSet}>
            <CountrySelection
              t={t}
              data={country}
              systemType={systemType}
              countrySelection={formik?.values?.countrySelection}
              setCountrySelection={formik?.setFieldValue}
            />
            {formik.errors?.countrySelection && (
              <div className={Styles.error}>
                {formik.errors.countrySelection}
              </div>
            )}
          </div>
        </div>
      )}
      {(systemType === "laboratory" || systemType === "pharmacy" || types) && (
        <div>
          <textarea
            rows={4}
            id="labDescription"
            placeholder={
              types ? placeHolderNew?.description : placeHolder?.description
            }
            value={formik.values.labDescription}
            onChange={formik.handleChange("labDescription")}
            style={{
              width: "calc(100% - 10px)",
              maxWidth: "100%",
              boxSizing: "border-box",
              resize: "none",
            }}
          />
          {formik.touched.labDescription && formik.errors.labDescription ? (
            <div className={Styles.error}>{formik.errors.labDescription}</div>
          ) : null}
        </div>
      )}
      {(systemType === "hotel" || systemType === "travelagency") && (
        <>
          <div className={Styles.rowBasic}>
            <SelectCompany
              t={t}
              selected={formik.values?.selectedType}
              formik={formik}
            />
          </div>
          {formik.values?.selectedType === "Attach with Company" && (
            <div
              style={{ color: "red", fontSize: "12px", marginBottom: "12px" }}
            >
              {t("allMeditourPayments_")}
            </div>
          )}
          <CheckboxInput
            selected={formik.values?.selectedType}
            handleChange={handleChange}
            formik={formik}
          />
        </>
      )}
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
          {sameTypes || type == "branch" ? null : (
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

        {/* </label> */}
      </div>
      {verifybutton && <div className={Styles.error}>{verifybutton}</div>}
      {type == "branch" || sameTypes ? (
        <div className={Styles.branchContainer}>
          <button
            className={Styles.backButton}
            type="button"
            onClick={handleBack}
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

const FeactureSelection = ({
  formik,
  data,
  t,
}: {
  formik: any;
  data?: any;
  t: any;
}) => {
  const [openFeacture, setOpen] = useState(false);

  const handleFeatureChange = useCallback(
    (title: number) => {
      const selectedFeatures = formik.values.features;
      formik.setFieldValue(
        "features",
        selectedFeatures?.includes(title)
          ? selectedFeatures.filter((feature: any) => feature !== title)
          : [...selectedFeatures, title]
      );
    },
    [formik]
  );
  return (
    <>
      <div className={Styles.inputGroupBasic} style={{ position: "relative" }}>
        <div
          className={Styles?.feacture}
          onClick={() => setOpen(!openFeacture)}
        >
          {formik.values.features.length > 0 ? (
            <div className={Styles?.tab}>
              {formik.values.features.map((feacture: number) => (
                <div className={Styles.selectLable}>{feacture}</div>
              ))}
            </div>
          ) : (
            <div className={Styles.lable}>{t("selectFeatures")}</div>
          )}
          <FaChevronDown size={16} color={"#7D7D7D"} />
        </div>
        {openFeacture && (
          <div className={Styles.absolute}>
            {data?.map((item: any) => (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: formik.values.features?.includes(item.title)
                    ? "#0E54A3"
                    : "#fff",
                  color: formik.values.features?.includes(item.title)
                    ? "#fff"
                    : "#0E54A3",
                }}
                onClick={() => handleFeatureChange(item?.title)}
              >
                {item?.title}
              </div>
            ))}
          </div>
        )}
        {formik.touched.features && formik.errors.features ? (
          <div className={Styles.error}>{formik.errors.features}</div>
        ) : null}
      </div>
    </>
  );
};

const SelectCompany = ({
  t,
  formik,
  selected,
}: {
  t: any;
  formik?: any;
  selected?: any;
}) => {
  const [openFeature, setOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const isDisabled = selected !== "Attach with Company";
  const handleFeatureChange = (item: any) => {
    formik.setFieldValue("travelCompanyId", item);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    gethotelCompany()
      .then((res: any) => {
        console.log(res?.data?.data, "..data");
        setData(res?.data?.data);
      })
      .catch((err: any) => {
        console.log(err, "...eror");
      })
      .finally(() => {});
  };
  return (
    <div
      className={`${Styles.inputGroupBasic} ${
        isDisabled ? Styles.disabled : ""
      }`}
      style={{
        position: "relative",
        pointerEvents: isDisabled ? "none" : "auto",
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      <div
        className={Styles?.selectCompany}
        onClick={() => !isDisabled && setOpen(!openFeature)}
      >
        <div className={Styles.justifyContent}>
          <div className={Styles.lable}>
            {formik?.values?.travelCompanyId?.name
              ? formik?.values?.travelCompanyId.name
              : t("selectCompany")}
          </div>
          <FaChevronDown size={16} color={"#7D7D7D"} />
        </div>
      </div>
      {openFeature && (
        <div className={Styles.absolute}>
          {data?.map((item: any) => (
            <div
              style={{
                padding: "10px",
                backgroundColor:
                  formik?.values?.travelCompanyId?._id === item._id
                    ? "#0E54A3"
                    : "#fff",
                color:
                  formik?.values?.travelCompanyId?._id === item._id
                    ? "#fff"
                    : "#0E54A3",
              }}
              onClick={() => handleFeatureChange(item)}
            >
              {item?.name}
            </div>
          ))}
        </div>
      )}
      {formik.touched.travelCompanyId && formik.errors.travelCompanyId ? (
        <div className={Styles.error}>{formik.errors.travelCompanyId}</div>
      ) : null}
    </div>
  );
};

const CheckboxInput = ({
  selected,
  handleChange,
  formik,
}: {
  selected?: any;
  handleChange?: any;
  formik?: any;
}) => {
  return (
    <div>
      <div style={{ display: "flex", gap: "16px" }}>
        {options.map((option: any) => (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="radio"
              name="single-select"
              checked={selected === option.title}
              onChange={() => handleChange(option.title)}
              style={{
                width: "20px",
              }}
            />
            <div style={{ color: "#7D7D7D" }}>{option?.title}</div>
          </div>
        ))}
      </div>
      {formik.touched.selectedType && formik.errors.selectedType ? (
        <div className={Styles.error}>{formik.errors.selectedType}</div>
      ) : null}
    </div>
  );
};
const CountrySelection = ({
  t,
  data,
  countrySelection,
  setCountrySelection,
  systemType,
}: any) => {
  const [open, setOpen] = useState(false);
  const filteredCountries =
    systemType === "hotel" ||
    systemType === "hospital" ||
    systemType === "travelagency"
      ? data
      : ["Pakistan"];
  return (
    <>
      <div className={Styles.selectionDrop} onClick={() => setOpen(!open)}>
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
          {filteredCountries?.map((country: any) => (
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
export default GenericBasicInfoComapny;
