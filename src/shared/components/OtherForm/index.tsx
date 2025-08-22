import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import classNames from "classnames";
import { Checkbox } from "@mui/material";
import CustomInput from "../Input";
import LocationInput from "../LocationInput";
import Datepicker from "../DatePicker";
import CustomTimePicker from "../TimePicker/TimePICKER2";
import mStyle from "./styleGenric.module.css";
import commonstyles from "shared/utils/common.module.css";
import InputField from "../A_New_Components/InputField";
import DatepickerNew from "../DatePicker/DatePickerNew";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const OtherForm = ({ items, type }: { items?: any; type?: any }) => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.root.common);

  const calculateAge = (dateOfBirthString: string) => {
    if (!dateOfBirthString) return "";
    const [day, month, year] = dateOfBirthString.split("/").map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const validationSchema = Yup.object().shape({
    ...(type === "otherPerson" && {
      name: Yup.string().trim().required(t("enterYourName")),
      phoneNo: Yup.string().trim().required(t("enterPhoneNumber")),
      age: Yup.string().trim().required(t("enterYourAge")),
    }),

    pickupLocation: Yup.object().shape({
      address: Yup.string().required(t("pleaseEnterPickupLocation")),
    }),
    // dropoffLocation: Yup.string().when("isEnabled", (isEnabled, schema) =>
    //   !isEnabled ? schema.required("Please enter Dropoff Location") : schema
    // ),

    dropoffLocation: Yup.object().when(["isEnabled"], ([isEnabled], schema) => {
      return isEnabled
        ? schema.shape({
          address: Yup.string().notRequired(),
        })
        : schema.shape({
          address: Yup.string().required(t("pleaseEnterDropOffLocation")),
        });
    }),

    //  dropoffLocation: Yup.object().shape({
    //   address: Yup.string().required("Please enter Dropoff Location"),
    // }),

    pickupDate: Yup.string().required(t("pleaseSelectPickupDate")),
    dropOffDate: Yup.string().required(t("pleaseSelectDropoffpDate")),
    picKupTime: Yup.string().required(t("pleaseSelectPickupTime")),
    DropOffTime: Yup.string().required(t("pleaseSelectDropoffTime")),
  });

  const formik = useFormik({
    initialValues: {
      name: type === "otherPerson" ? "" : user?.name || "",
      phoneNo: type === "otherPerson" ? "" : user?.phone || "",
      age:
        type === "otherPerson"
          ? ""
          : calculateAge(user?.dateOfBirth)?.toString() || "",
      pickupLocation: {
        lng: "",
        lat: "",
        address: "",
        city: "",
      },
      dropoffLocation: {
        lng: "",
        lat: "",
        address: "",
        city: "",
      },
      pickupDate: "",
      dropOffDate: "",
      picKupTime: "",
      DropOffTime: "",
      withDriver: false,
      isEnabled: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const calculateDays = () => {
        const start = dayjs(values.pickupDate);
        const end = dayjs(values.dropOffDate);
        return end.diff(start, "days") + 1;
      };

      const calculate_amountPerDay = calculateDays() * items?.actualPricePerDay;

      const newData = {
        name: type === "otherPerson" ? values.name : user?.name,
        phoneNo: type === "otherPerson" ? values.phoneNo : user?.phone,
        age:
          type === "otherPerson"
            ? values.age
            : calculateAge(user?.dateOfBirth)?.toString(),
        items,
        pickupLocation: values.pickupLocation,
        isEnabled: values.isEnabled,
        dropoffLocation: values.isEnabled
          ? values.pickupLocation
          : values.dropoffLocation,
        pickDate: values.pickupDate,
        dropDate: values.dropOffDate,
        withDriver: values.withDriver,
        DropOffTime: values.DropOffTime,
        picKupTime: values.picKupTime,
        type,
      };

      navigate("/services/rentacar/RentaCarBooking/", {
        state: { newData, calculate_amountPerDay, items },
      });
    },
  });

  console.log("formik........", formik.values);

  const handleDropOff = async (location: any, type: any) => {
    await formik.setFieldValue(`${type}.address`, location?.label);
    await formik.setFieldValue(`${type}.lat`, location?.lat);
    await formik.setFieldValue(`${type}.lng`, location?.lng);
  };

  return (
    <div className={mStyle.containerFormRentACar}>
      <form onSubmit={formik.handleSubmit}>
        {type === "otherPerson" && (
          <>
            <div className={classNames(mStyle.inputfieldz)}>
              <div className={mStyle.inputfield1}>
                <InputField
                  id="name"
                  formik={formik}
                  placeholder={t("_name")}
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur}
                  // error={formik.touched.name && formik.errors.name}
                  height="48px"
                />
              </div>
              <div className={mStyle.inputfield1}>
                <InputField
                  id="phoneNo"
                  formik={formik}
                  placeholder={t("phoneNumber")}
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange("phoneNo")}
                  onBlur={formik.handleBlur}
                  height="48px"
                />
              </div>
            </div>

            <div className={classNames(mStyle.inputfieldz)}>
              <div className={mStyle.inputfield1}>
                <InputField
                  id="age"
                  formik={formik}
                  placeholder={t("age")}
                  value={formik.values.age}
                  onChange={formik.handleChange("age")}
                  onBlur={formik.handleBlur}
                  height="48px"
                />
              </div>
            </div>
          </>
        )}

        {/* Date Pickers */}
        <div className={classNames(mStyle.inputfieldz)}>

          <div className={mStyle.inputfield1} style={{ marginTop: '5px' }} >
            <CustomTimePicker
              backgroundColor="#ffff"

              placeholder={t("pickupTime")}
              AM="hh:mm A"
              setData={(time) => formik.setFieldValue("picKupTime", time)}
              type="box"
              value={formik.values.picKupTime}
            />
            {formik.touched.picKupTime && formik.errors.picKupTime && (
              <div className={classNames(mStyle.codeerror)}>
                {formik.errors.picKupTime}
              </div>
            )}
          </div>



          <div className={mStyle.inputfield1}>
            <DatepickerNew


              backgroundColor="#ffff"
              setData={(date) =>
                formik.setFieldValue(
                  "pickupDate",
                  dayjs(date).format("YYYY-MM-DD")
                )
              }
              value={
                formik.values.pickupDate
                  ? dayjs(formik.values.pickupDate)
                  : null
              }
              placeholder={t("pickupDate")}
              className={mStyle.pickupDate}
            />
            {/* </div> */}
            {formik.touched.pickupDate && formik.errors.pickupDate && (
              <div className={classNames(mStyle.codeerror)}>
                {formik.errors.pickupDate}
              </div>
            )}

          </div>
        </div>


        <div className={classNames(mStyle.inputfieldz)}>
          <div className={mStyle.inputfield1} style={{ marginTop: '5px' }} >

            <CustomTimePicker
              backgroundColor="#ffff"
              placeholder={t("dropoffTime")}
              AM="hh:mm A"
              setData={(time) => formik.setFieldValue("DropOffTime", time)}
              type="box"
              value={formik.values.DropOffTime}
            />
            {formik.touched.DropOffTime && formik.errors.DropOffTime && (
              <div className={classNames(commonstyles.error, mStyle.codeerror)}>
                {formik.errors.DropOffTime}
              </div>
            )}

          </div>

          <div className={mStyle.inputfield1}>
            <DatepickerNew

              backgroundColor="#ffff"
              setData={(date) =>
                formik.setFieldValue(
                  "dropOffDate",
                  dayjs(date).format("YYYY-MM-DD")
                )
              }
              value={
                formik.values.dropOffDate
                  ? dayjs(formik.values.dropOffDate)
                  : null
              }
              placeholder={t("dropoffDate")}
              className={mStyle.dropOffDate}
            />
            {/* </div> */}
            {formik.touched.dropOffDate && formik.errors.dropOffDate && (
              <div className={classNames(commonstyles.error, mStyle.codeerror)}>
                {formik.errors.dropOffDate}
              </div>
            )}

          </div>
        </div>

        <div className={classNames(mStyle.samelocationmain)}>
          <div className={mStyle.locationColor}>
            <p>{t("returnToSameLocation")}</p>
          </div>
          <div
            style={{
              marginBottom: "16px",
            }}
          >
            <label className={mStyle.switch}>
              <input
                type="checkbox"
                checked={formik.values.isEnabled}
                onChange={() => {
                  formik.setFieldValue("isEnabled", !formik.values.isEnabled);
                }}
              />
              <span className={mStyle.slider}></span>
            </label>
          </div>
        </div>
        {/* Location Inputs */}

        <div className={classNames(mStyle.inputfieldz)}>
          <div className={mStyle.inputfield1}>
            <LocationInput
              height="57px"
              placeholder={
                formik.values.pickupLocation.address || t("pickupLocation")
              }
              type="box"
              setData={(location: any) =>
                handleDropOff(location, "pickupLocation")
              }
              defaultValue={formik.values.pickupLocation.address}
            />
            {formik.touched.pickupLocation?.address &&
              formik.errors.pickupLocation?.address && (
                <div
                  className={classNames(commonstyles.error, mStyle.codeerror)}
                >
                  {formik.errors.pickupLocation.address}
                </div>
              )}
          </div>

          <div className={mStyle.inputfield1}>
            {!formik.values.isEnabled && (
              <LocationInput
                height="57px"
                placeholder={
                  formik.values.dropoffLocation.address || t("dropOffLocation")
                }
                type="box"
                setData={(location: any) =>
                  handleDropOff(location, "dropoffLocation")
                }
                defaultValue={formik.values.dropoffLocation.address}
              />
            )}
            {!formik.values.isEnabled &&
              formik.touched.dropoffLocation?.address &&
              formik.errors.dropoffLocation?.address && (
                <div
                  className={classNames(commonstyles.error, mStyle.codeerror)}
                >
                  {formik.errors.dropoffLocation.address}
                </div>
              )}
          </div>
        </div>

        {/* Checkboxes and Toggle */}
        <div className={mStyle.checkboxcontainer}>
          <Checkbox
            sx={{ width: "24px", height: "24px" }}
            className={mStyle.checkBoxx}
            checked={formik.values.withDriver}
            onChange={(e) =>
              formik.setFieldValue("withDriver", e.target.checked)
            }
          />
          <p>{t("withDriver")}</p>
        </div>

        {/* Submit Button */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              backgroundColor: "#0E54A3",
              color: "white",
              border: "none",
              borderRadius: "24px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: "16px",
              gap: "8px",
            }}
            onClick={() => formik.handleSubmit()}
            type="button"
          >
            {t("continue")}
            <IoMdArrowForward
              style={
                isRtl
                  ? {
                    transform: "rotate(180deg)",
                  }
                  : {}
              }
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtherForm;
