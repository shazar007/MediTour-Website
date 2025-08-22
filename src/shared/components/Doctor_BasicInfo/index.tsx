import React, { useState, useEffect } from "react";
import classNames from "classnames";
import MainMedicalstyle from "./mainMedicalService.module.css";
import commonStyles from "shared/utils/common.module.css";
import styles from "./Dotorinfo.module.css";
import { CustomInput, CustomModal } from "shared/components";
import { Experiences, doctor_BasicInfoSchema, speciality } from "shared/utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PrimaryButton } from "shared/components";
import CustomSelect from "shared/components/CustomSelect";
import ImgPicker from "shared/components/Img-picker";
import { useSelector } from "react-redux";
import Datepicker from "shared/components/DatePicker";
import dayjs from "dayjs";
import LocationInput from "shared/components/LocationInput";
import CustomMultiSelect from "shared/components/CustomMultiSelect";
import { Checkbox } from "@mui/material";
import {
  addCustomSpeciality,
  getAllSpecialities,
} from "shared/services/DoctorService";
import { useTranslation } from "react-i18next";

interface Props {
  handleNext: any;
}
const Doctor_BasicInfo = (props: Partial<Props>) => {
  const {t} : any = useTranslation()
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [specialities, setsetSpecialities] = useState<any>([]);
  const [specialitiesForModal, setsetSpecialitiesForModal] = useState<any>([]);
  const [specialityLogo, setSpecialityLogo] = useState("");
  const [specialityTitle, setSpecialityTitle] = useState("");
  const [spError, setSPError] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const { handleNext } = props;

  const { doctorFormData } = useSelector((state: any) => state.root.common);

  const [registrationDate, setRegistrationDate] = useState(
    doctorFormData?.cnicExpiry ? dayjs(doctorFormData.cnicExpiry) : null
  );
  const [pmdcExpiryDate, setPmdcExpiryDate] = useState(
    doctorFormData?.pmdcExpiry ? dayjs(doctorFormData.pmdcExpiry) : null
  );
  const cnicImageUrl = doctorFormData?.cnicImage
    ? doctorFormData?.cnicImage?.split("/")?.pop()
    : "";

  const pmdcInitialUrl = doctorFormData?.pmdcImage
    ? doctorFormData?.pmdcImage?.split("/")?.pop()
    : "";

  const formik: any = useFormik({
    initialValues: {
      type: "",
      name: "",
      cnicNumber: "",
      cnicImage: "",
      cnicExpiry: "",
      qualification: "",
      speciality: "",
      clinicName: "",
      experience: "",
      pmdcNumber: "",
      pmdcImage: "",
      pmdcExpiry: "",
      address: "",
      lat: "",
      lng: "",
      city: "",
      fbUrl: "",
      instaUrl: "",
      twitterUrl: "",
      webUrl: "",
    },
    validationSchema: Yup.object(doctor_BasicInfoSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleCheckboxChange = (value: string) => {
    setSelectedOption(value);
    formik.setFieldValue("type", value);
  };

  useEffect(() => {
    formik.setValues(doctorFormData);
  }, []);

  const handleSelectSpeciality = (value: any) => {
    setSelectedOptions(value);
    formik.setFieldValue("speciality", value);
  };
  const handleSelect = (value: any) => {
    formik.setFieldValue("address", value.label);
    formik.setFieldValue("lat", value.lat);
    formik.setFieldValue("lng", value.lng);
    formik.setFieldValue("city", value.city);
  };
  const [addSpeciality, setsetSpeciality] = useState(false);

  const handleSelectExperience = (value: any) => {
    formik.setFieldValue("experience", value);
  };
  const handleCnicExpiry = (date: any) => {
    const selectedDate = dayjs(date);
    setRegistrationDate(selectedDate);
    const formattedDate = dayjs(date).format("DD-MM-YYYY");
    formik.setFieldValue("cnicExpiry", formattedDate);
  };
  const handlePmdcExpiry = (date: any) => {
    const selectedDate = dayjs(date);
    setPmdcExpiryDate(selectedDate);
    const formattedDate = dayjs(date).format("DD-MM-YYYY");
    formik.setFieldValue("pmdcExpiry", formattedDate);
  };
  const handleCnicUrl = (url: any) => {
    formik.setFieldValue("cnicImage", url);
  };
  const handlePmdcImageUrl = (url: any) => {
    formik.setFieldValue("pmdcImage", url);
  };

  const handleSpecialityUrl = (url: any) => {
    setSPError("");
    setSpecialityLogo(url);
  };
  const handleSubmit = async () => {
    try {
      await handleNext(formik.values);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const handleAddCustomSpeciality = () => {
    let params = {
      specialityTitle: specialityTitle,
    };

    if (specialityTitle) {
      setAddLoading(true);

      addCustomSpeciality(params)
        .then((res: any) => {
          const updatedSpecialtyNames = [
            res?.data?.speciality?.specialityTitle,
            ...specialitiesForModal,
          ];
          setsetSpecialitiesForModal(updatedSpecialtyNames);
          setShowCustomSpeciality(false);
        })
        .catch((err: any) => {
          setSPError(err?.response?.data?.message);
        })
        .finally(() => {
          setAddLoading(false);
        });
    } else {
      setSPError("Speciality required.");
    }
  };

  useEffect(() => {
    fetchSpeciality();
  }, []);

  const fetchSpeciality = () => {
    getAllSpecialities(1, "")
      .then((res: any) => {
        setsetSpecialities(res?.data?.specialities);
        const specialtyTitles = res?.data?.specialities?.map(
          (specialty: any) => specialty?.specialityTitle
        );
        setsetSpecialitiesForModal(specialtyTitles);
      })
      .catch((err: any) => {});
  };
  const [showCustomDosageModal, setShowCustomSpeciality] = useState(false);
  return (
    <div className={classNames(commonStyles.col12)}>
      <div
        className={classNames(
          commonStyles.flxBetween,
          commonStyles.colorBlue,
          commonStyles.col6,
          commonStyles.colsm12,
          commonStyles.colmd8,
          commonStyles.mt32
        )}
      >
        <div
          className={classNames(
            commonStyles.flx,
            commonStyles.col3,
            commonStyles.colsm6
          )}
        >
          <Checkbox
            className={styles.DoctorCheckBox}
            checked={selectedOption === "Consultant"}
            onChange={() => handleCheckboxChange("Consultant")}
          />
          <p className={commonStyles.fs14}>Consultant</p>
        </div>
        <div
          className={classNames(
            commonStyles.flx,
            commonStyles.col5,
            commonStyles.colsm6
          )}
        >
          <Checkbox
            className={styles.DoctorCheckBox}
            checked={selectedOption === "General Physician"}
            onChange={() => handleCheckboxChange("General Physician")}
          />
          <p className={commonStyles.fs14}>General Physician</p>
        </div>
      </div>
      {formik.touched.type && formik.errors.type ? (
        <div className={classNames(commonStyles.error)}>
          *{formik.errors.type}
        </div>
      ) : null}

      <form onSubmit={formik.handleSubmit}>
        <div
          className={classNames(
            commonStyles.mb16,
            MainMedicalstyle.flx,
            commonStyles.mt16
          )}
        >
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="Name"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values?.name}
              />
              {formik.touched?.name && formik.errors?.name ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors?.name}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          ></div>
        </div>
        <div className={classNames(commonStyles.mb16, MainMedicalstyle.flx)}>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="CNIC / Passport Number (Optional)"
                id="cnicNumber"
                name="cnicNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values?.cnicNumber}
              />
              {/* {formik.touched?.cnicNumber && formik.errors?.cnicNumber ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors?.cnicNumber} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <ImgPicker
                placeholder="CNIC / Passport Image (Optional)"
                setData={handleCnicUrl}
                initialValue={cnicImageUrl}
              />

              {/* {formik.touched.cnicImage && formik.errors.cnicImage ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.cnicImage} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <Datepicker
                placeholder="CNIC / Passport Expiry (Optional)"
                setData={handleCnicExpiry}
                value={registrationDate}
              />

              {/* {formik.touched.cnicExpiry && formik.errors.cnicExpiry ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.cnicExpiry} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            commonStyles.col12,
            commonStyles.colsm10,
            commonStyles.mtsm28
          )}
        >
          <div className={commonStyles.mr32}>
            <CustomInput
              placeholder="Qualification"
              id="qualification"
              name="qualification"
              type="text"
              onChange={formik.handleChange}
              value={formik.values?.qualification}
            />
          </div>
          {formik.touched?.qualification && formik.errors?.qualification ? (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors?.qualification}
            </div>
          ) : null}
        </div>
        <div className={classNames(commonStyles.mb16, MainMedicalstyle.flx)}>
          <div
            className={classNames(
              commonStyles.col12,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <div className={classNames(commonStyles.flx, commonStyles.col12)}>
              <div className={classNames(commonStyles.col12)}>
                <CustomMultiSelect
                  options={specialitiesForModal}
                  onSelect={(value) => handleSelectSpeciality(value)}
                  selectedOptions={selectedOptions}
                  placeholder="Speciality"
                  value={doctorFormData?.speciality}
                />
              </div>
              <div
                className={classNames(
                  commonStyles.colorOrange,
                  commonStyles.medium,
                  commonStyles.underLine,
                  commonStyles.col3
                )}
              >
                <p
                  className={classNames()}
                  style={{
                    marginTop: "21px",
                    cursor: "pointer",
                    fontSize: "14px",
                    width: "100%",
                    textAlign: "start",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => setShowCustomSpeciality(true)}
                >
                  Add Custom Speciality
                </p>
              </div>
            </div>
            {formik.touched.speciality && formik.errors.speciality ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.speciality}
              </div>
            ) : null}
            <CustomModal showModal={showCustomDosageModal}>
              <div style={{ width: "420px" }}>
                <CustomInput
                  value={specialityTitle}
                  onChange={(e: any) => {
                    setSPError("");
                    setSpecialityTitle(e.target.value);
                  }}
                  placeholder="Enter Speciality"
                  id="dosage"
                  name="dosage"
                  type="text"
                />
              </div>
              {spError ? (
                <div className={classNames(commonStyles.error)}>*{spError}</div>
              ) : null}
              <div
                style={{ gap: "24px" }}
                className={classNames(
                  styles.mt16,
                  commonStyles.col12,
                  commonStyles.flx
                )}
              >
                <PrimaryButton
                  colorType={"Red"}
                  children={"Close"}
                  type="button"
                  onClick={() => setShowCustomSpeciality(false)}
                />
                <PrimaryButton
                  colorType={"green"}
                  children={addLoading ? "loading..." : "Save"}
                  type="button"
                  onClick={() => handleAddCustomSpeciality()}
                />
              </div>
            </CustomModal>
          </div>
        </div>
        <div className={classNames(commonStyles.mb16, MainMedicalstyle.flx)}>
          <div
            className={classNames(
              commonStyles.col8,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              {" "}
              <CustomInput
                placeholder="Clinic Name"
                id="clinicName"
                name="clinicName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values?.clinicName}
              />
              {formik.touched?.clinicName && formik.errors?.clinicName ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors?.clinicName}
                </div>
              ) : null}
            </div>
          </div>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <div className={commonStyles.mr32}>
              <CustomSelect
                options={Experiences}
                placeholder="Experience"
                value={doctorFormData?.experience}
                onSelect={(value) => handleSelectExperience(value)}
              />
              {formik.touched?.experience && formik.errors?.experience ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors?.experience}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className={classNames(commonStyles.mb16, MainMedicalstyle.flx)}>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="PMDC Number (Optinal)"
                id="pmdcNumber"
                name="pmdcNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values?.pmdcNumber}
              />
              {/* {formik.touched?.pmdcNumber && formik.errors?.pmdcNumber ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors?.pmdcNumber} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>

          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <ImgPicker
                placeholder="PMDC Image (Optinal)"
                setData={handlePmdcImageUrl}
                initialValue={pmdcInitialUrl}
              />

              {/* {formik.touched.pmdcImage && formik.errors.pmdcImage ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.pmdcImage} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <Datepicker
                placeholder="PMDC Expiry (Optional)"
                setData={handlePmdcExpiry}
                value={pmdcExpiryDate}
              />
              {/* {formik.touched.pmdcExpiry && formik.errors.pmdcExpiry ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.pmdcExpiry} */}
              </div>
              {/* ) : null}  */}
            </div>
          </div>
        </div>
        <div className={classNames(MainMedicalstyle.flx, commonStyles.colsm12)}>
          <div
            className={classNames(
              commonStyles.col12,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <div className={commonStyles.mr32}>
              <LocationInput
                placeholder="Clinic Address"
                setData={handleSelect}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.address}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={MainMedicalstyle.buttonWidth}>
          <PrimaryButton
            children={"Next"}
            type="submit"
            colorType={"MedicalService"}
          />
        </div>
      </form>
    </div>
  );
};

export default Doctor_BasicInfo;
