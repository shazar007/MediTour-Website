import React, { useState, useEffect } from "react";
import classNames from "classnames";
import MainMedicalstyle from "./mainMedicalService.module.css";
import commonStyles from "shared/utils/common.module.css";
import { CustomInput } from "shared/components";
import { hospital_BasicInfoSchema } from "shared/utils";
import { useSelector } from "react-redux";
import { PrimaryButton } from "shared/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImgPicker from "shared/components/Img-picker";
import dayjs from "dayjs";
import Datepicker from "shared/components/DatePicker";
import LocationInput from "shared/components/LocationInput";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";

interface Props {
  handleNext: any;
}
const Hos_BasicInfo = (props: Partial<Props>) => {
  const { hospitalFormData } = useSelector((state: any) => state.root.common);
  const { systemType } = useSelector((state: any) => state.root.common);
  const { handleNext } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      logo: "",
      registrationNo: "",
      registrationImage: "",
      registrationExpiry: "",
      ownerFirstName: "",
      ownerLastName: "",
      emergencyNumber: "",
      cnicNumber: "",
      cnicImage: "",
      cnicExpiryDate: "",
      address: "",
      lat: "",
      lng: "",
      city: "",
      openTime: "",
      closeTime: "",
    },
    validationSchema: Yup.object(hospital_BasicInfoSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    formik.setValues(hospitalFormData);
  }, []);

  const hospitalUrl = hospitalFormData?.logo
    ? hospitalFormData?.logo.split("/").pop()
    : "";

  const RegistrationUrl = hospitalFormData?.registrationImage
    ? hospitalFormData?.registrationImage?.split("/").pop()
    : "";
  const CnicUrl = hospitalFormData?.cnicImage
    ? hospitalFormData?.cnicImage?.split("/").pop()
    : "";

  const [cnicExpiryDate, setCnicExpiryDate] = useState(
    hospitalFormData?.cnicExpiryDate
      ? dayjs(hospitalFormData?.cnicExpiryDate)
      : null
  );
  const [regExpiry, setregExpiry] = useState(
    hospitalFormData?.hospitalRegistrationExpiry
      ? dayjs(hospitalFormData?.hospitalRegistrationExpiry)
      : null
  );

  const handlehospitalLogoUrl = (url: any) => {
    formik.setFieldValue("logo", url);
  };

  const handleRegistrationImage = (url: any) => {
    formik.setFieldValue("registrationImage", url);
  };
  const handleCnicImage = (url: any) => {
    formik.setFieldValue("cnicImage", url);
  };
  const handleCnicExpiry = (date: any) => {
    const selectedDate = dayjs(date);
    setCnicExpiryDate(selectedDate);
    const formattedDate = date.toISOString().split("T")[0];
    formik.setFieldValue("cnicExpiryDate", formattedDate);
  };
  const handleSetAddressData = (value: any) => {
    formik.setFieldValue("address", value.label);
    formik.setFieldValue("lat", value.lat);
    formik.setFieldValue("lng", value.lng);
    formik.setFieldValue("city", value.city);
  };
  const handleRegEpiryDate = (date: any) => {
    const selectedDate = dayjs(date);
    setregExpiry(selectedDate);
    const formattedDate = date.toISOString().split("T")[0];

    formik.setFieldValue("registrationExpiry", formattedDate);
  };
  const handleHospitalOpenTime = (time: any) => {
    // const formattedTime = dayjs(time).format("hh:mm A");
    formik.setFieldValue("openTime", time);
  };
  const handleHospitalCloseTime = (time: any) => {
    // const formattedTime = dayjs(time).format("hh:mm A");
    formik.setFieldValue("closeTime", time);
  };
  const handleSubmit = async () => {
    handleNext(formik.values);
  };

  return (
    <div className={classNames(commonStyles.col12, commonStyles.mt56)}>
      <form onSubmit={formik.handleSubmit}>
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
              <CustomInput
                placeholder="Hospital Name"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.name}
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
            {" "}
            <div className={commonStyles.mr32}>
              <ImgPicker
                placeholder="Hospital Logo"
                setData={handlehospitalLogoUrl}
                initialValue={hospitalUrl}
              />
              {formik.touched.logo && formik.errors.logo ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.logo}
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
                placeholder="Hospital Registration No."
                id="registrationNo"
                name="registrationNo"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.registrationNo}
              />
              {formik.touched.registrationNo && formik.errors.registrationNo ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.registrationNo}
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
            {" "}
            <div className={commonStyles.mr32}>
              <ImgPicker
                placeholder="Registration Image"
                setData={handleRegistrationImage}
                initialValue={RegistrationUrl}
              />
              {formik.touched.registrationImage &&
              formik.errors.registrationImage ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.registrationImage}
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
              <Datepicker
                placeholder="Registration Expiry "
                setData={handleRegEpiryDate}
                value={regExpiry}
              />
              {formik.touched.registrationExpiry &&
              formik.errors.registrationExpiry ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.registrationExpiry}
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
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="Owner First Name"
                id="ownerFirstName"
                name="ownerFirstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.ownerFirstName}
              />
              {formik.touched.ownerFirstName && formik.errors.ownerFirstName ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.ownerFirstName}
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
              <CustomInput
                placeholder="Owner Last Name"
                id="ownerLastName"
                name="ownerLastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.ownerLastName}
              />
              {formik.touched.ownerLastName && formik.errors.ownerLastName ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.ownerLastName}
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
              <CustomInput
                placeholder="Emergency Number"
                id="emergencyNumber"
                name="emergencyNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.emergencyNumber}
              />
              {formik.touched.emergencyNumber &&
              formik.errors.emergencyNumber ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.emergencyNumber}
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
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="CNIC /PassportNumber(Optional)"
                id="cnicNumber"
                name="cnicNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.cnicNumber}
              />
              {/* {formik.touched.cnicNumber && formik.errors.cnicNumber ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.cnicNumber} */}
              </div>
              {/* // ) : null} */}
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
                setData={handleCnicImage}
                initialValue={CnicUrl}
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
            <div className={commonStyles.mr32}>
              <Datepicker
                placeholder="CNIC / Passport Expiry (Optional)"
                setData={handleCnicExpiry}
                value={cnicExpiryDate}
              />
              {/* {formik.touched.cnicExpiryDate && formik.errors.cnicExpiryDate ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.cnicExpiryDate} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
        </div>

        <div className={classNames(commonStyles.flx, commonStyles.mb16)}>
          <div
            className={classNames(
              commonStyles.col12,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <div className={commonStyles.mr32}>
              <LocationInput
                placeholder="Hospital Location"
                setData={handleSetAddressData}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.address}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            MainMedicalstyle.flx,
            commonStyles.mb16,
            commonStyles.col12
          )}
        >
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <div className={classNames(commonStyles.mr32)}>
              <CustomTimePicker
                placeholder="Hospital Open Time"
                setData={handleHospitalOpenTime}
                value={formik.values.openTime}
              />
              {formik.touched.openTime && formik.errors.openTime ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.openTime}
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
            <div className={classNames(commonStyles.mr32)}>
              <CustomTimePicker
                placeholder="Hospital Close Time"
                setData={handleHospitalCloseTime}
                value={formik.values.closeTime}
              />
              {formik.touched.closeTime && formik.errors.closeTime ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.closeTime}
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

export default Hos_BasicInfo;
