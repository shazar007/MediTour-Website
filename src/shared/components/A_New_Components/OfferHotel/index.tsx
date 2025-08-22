import React, { useRef, useState } from "react";
import styles from "./Offer.module.css";
import v1 from "assets/images/v3.png";
import v2 from "assets/images/v2.png";
import v3 from "assets/images/v1.png";
import v4 from "assets/images/v4.png";
import v5 from "assets/images/v5.png";
import v6 from "assets/images/v6.png";
import { FaChevronDown } from "react-icons/fa6";
import { Checkbox, Radio } from "@mui/material";
import { BsUpload } from "react-icons/bs";
import { add_File } from "shared/services";
import { MdOutlineDelete } from "react-icons/md";
import CheckIn from "../NewTermCondition/CheckIn";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const OfferHotel = ({ formik }: any) => {
  const { t }: any = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const options = ["Room Services", "Air Conditioning", "Laundry"];
  const resturent = ["⁠Dine In", "Room Service", "⁠Not Available"];
  const internet = ["Wifi", "LAN", "No Internet"];
  const activity = ["TV in a room", "GYM", "Swimming"];
  const outdoor = [" ⁠Outdoor Sitting", "Barbecue", "Not Available"];
  const security = [
    " Exterior security camera",
    "Weapons on the property",
    "Security guards",
  ];

  const handleFeatureSelect = (category: string, option: string) => {
    formik.setValues((prevValues: any) => {
      const existingFeature = prevValues.features.find(
        (f: any) => f.name === category
      );
      if (existingFeature) {
        if (existingFeature.options.includes(option)) {
          existingFeature.options = existingFeature.options.filter(
            (o: any) => o !== option
          );
        } else {
          existingFeature.options.push(option);
        }
      } else {
        prevValues.features.push({ name: category, options: [option] });
      }
      return { ...prevValues };
    });
  };

  const handleDelete = (index: number) => {
    const updatedPhotos = [...formik.values.propertyphotos];
    updatedPhotos.splice(index, 1);
    formik.setFieldValue("propertyphotos", updatedPhotos);
  };

  const onUploadImage = async (event: any) => {
    setLoading(true);
    const files = event.target.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files) as File[]; // ✅ Typecast here
      const uploadedUrls: string[] = [];

      try {
        for (const file of fileArray) {
          const formData = new FormData();
          formData.append("file", file); // ✅ Now valid

          const response: any = await add_File(formData); // Assuming it returns { data: { fileUrl: string } }
          uploadedUrls.push(response.data.fileUrl);
        }

        const updatedPhotos = [
          ...(formik.values.propertyphotos || []),
          ...uploadedUrls,
        ];

        formik.setFieldValue("propertyphotos", updatedPhotos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleHospitalOpenTime = (time: any) => {
    formik.setFieldValue("checkInTime", time);
  };
  const handleHospitalTime = (time: any) => {
    formik.setFieldValue("checkOutTime", time);
  };
  const handleSaftyDetails = (option: string) => {
    const updatedSafetyDetails = formik.values.safetyDetails;
    if (updatedSafetyDetails.includes(option)) {
      formik.setFieldValue(
        "safetyDetails",
        updatedSafetyDetails.filter((item: string) => item !== option)
      );
    } else {
      formik.setFieldValue("safetyDetails", [...updatedSafetyDetails, option]);
    }
  };

  return (
    <>
      <h2 className={styles.heading}>{t("tellGuestsWhat_")}</h2>
      <div className={styles.selectProperty}>
        <div className={styles.selectText}>{t("selectFeatures")}</div>
        <div className={styles.selectionbox}>
          <SelectionCheckBox
            t={t}
            source={v1}
            title={t("services")}
            options={options}
            selectedOptions={formik.values.features}
            handleFeatureSelect={handleFeatureSelect}
          />
          <SelectionCheckBox
            t={t}
            source={v3}
            title={t("restaurant")}
            options={resturent}
            selectedOptions={formik.values.features}
            handleFeatureSelect={handleFeatureSelect}
          />
          <SelectionCheckBox
            t={t}
            source={v2}
            title={t("internet")}
            options={internet}
            selectedOptions={formik.values.features}
            handleFeatureSelect={handleFeatureSelect}
          />
          <ParkingSelection t={t} source={v6} formik={formik} />
          <SelectionCheckBox
            t={t}
            source={v4}
            title={t("outdoor")}
            options={outdoor}
            selectedOptions={formik.values.features}
            handleFeatureSelect={handleFeatureSelect}
          />
          <SelectionCheckBox
            t={t}
            source={v5}
            title={t("activities")}
            options={activity}
            selectedOptions={formik.values.features}
            handleFeatureSelect={handleFeatureSelect}
          />
        </div>

        {formik.errors.parking && formik.touched.parking && (
          <div className={styles.error}>{formik.errors.parking}</div>
        )}
      </div>
      {formik.errors.features && formik.touched.features && (
        <div className={styles.error}>{formik.errors.features}</div>
      )}
      <div className={styles.infoSection}>
        <div className={styles.inputStyle}>
          <div>
            <input
              placeholder={t("countOfThisProperty")}
              className={styles.input}
              value={formik?.values?.propertyCount}
              onChange={formik.handleChange("propertyCount")}
            />
            {formik.errors.propertyCount && formik.touched.propertyCount && (
              <div className={styles.error}>{formik.errors.propertyCount}</div>
            )}
          </div>
          <div>
            <CheckIn
              placeholder={t("check_In_Time")}
              AM={"hh:mm A"}
              setData={handleHospitalOpenTime}
              type={"box"}
              value={formik.values.checkInTime}
            />
            {formik.errors.checkInTime && formik.touched.checkInTime && (
              <div className={styles.error}>{formik.errors.checkInTime}</div>
            )}
          </div>
          <div>
            <CheckIn
              placeholder={t("check_Out_Time")}
              AM={"hh:mm A"}
              setData={handleHospitalTime}
              type={"box"}
              value={formik.values.checkOutTime}
            />
            {formik.errors.checkOutTime && formik.touched.checkOutTime && (
              <div className={styles.error}>{formik.errors.checkOutTime}</div>
            )}
          </div>
          <div>
            <input
              placeholder={`Rs. ${t("setPropertyRent")}`}
              className={styles.input}
              value={formik?.values?.propertyRent}
              onChange={formik.handleChange("propertyRent")}
            />
            {formik.errors.propertyRent && formik.touched.propertyRent && (
              <div className={styles.error}>{formik.errors.propertyRent}</div>
            )}
          </div>
          <div>
            <input
              placeholder={`Rs. ${t("mediTourServiceFee")}`}
              className={styles.input}
              value={formik?.values?.meditourFee}
              onChange={formik.handleChange("meditourFee")}
            />
            {formik.errors.meditourFee && formik.touched.meditourFee && (
              <div className={styles.error}>{formik.errors.meditourFee}</div>
            )}
          </div>
          <div>
            <SomokingBox
              t={t}
              title={t("smoking")}
              chargeOption={formik?.values?.smoking}
              formik={formik}
              field={"smoking"}
            />
            {formik.errors.smoking && formik.touched.smoking && (
              <div className={styles.error}>{formik.errors.smoking}</div>
            )}
          </div>
          <div>
            <SomokingBox
              t={t}
              title={t("pets")}
              chargeOption={formik?.values?.pets}
              formik={formik}
              field={"pets"}
            />
            {formik.errors.pets && formik.touched.pets && (
              <div className={styles.error}>{formik.errors.pets}</div>
            )}
          </div>
          <div>
            <SomokingBox
              t={t}
              title={t("provideExtraBeding")}
              chargeOption={formik?.values?.extraBeds}
              formik={formik}
              field={"extraBeds"}
            />
            {formik.errors.extraBeds && formik.touched.extraBeds && (
              <div className={styles.error}>{formik.errors.extraBeds}</div>
            )}
          </div>
        </div>
        <div className={styles.secoundColumn}>
          <div>
            <SaftyDetail
              t={t}
              title={t("selectSafetyDetails")}
              options={security}
              selectedOptions={formik.values.safetyDetails}
              handleOptionChange={handleSaftyDetails}
            />
            {formik.errors.safetyDetails && formik.touched.safetyDetails && (
              <div className={styles.error}>{formik.errors.safetyDetails}</div>
            )}
          </div>
          <div>
            <input
              placeholder={t("surroundingProperty")}
              className={styles.input}
              value={formik?.values?.sorroundingProperty}
              onChange={formik.handleChange("sorroundingProperty")}
            />
            {formik.errors.sorroundingProperty &&
              formik.touched.sorroundingProperty && (
                <div className={styles.error}>
                  {formik.errors.sorroundingProperty}
                </div>
              )}
          </div>
          <div>
            <div className={styles.photoClass} onClick={handleClick}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                placeholder={t("uploadPhotos")}
                onChange={onUploadImage}
                multiple
              />
              <p className={styles.textSelected3}>{t("uploadPhotos")}</p>
              <BsUpload size={24} color="#7D7D7D" />
            </div>
            <p className={styles.redPhoto}>{t("min_1_uploads")}</p>
            {formik.errors.propertyphotos && formik.touched.propertyphotos && (
              <div className={styles.error}>{formik.errors.propertyphotos}</div>
            )}
            {loading ? (
              <div className={styles.loaderContainer}>
                <div className={styles.spinner}></div>
              </div>
            ) : (
              <div className={styles.uploadedImages}>
                {formik?.values?.propertyphotos.map(
                  (photo: any, index: any) => (
                    <div key={index} className={styles.imageContainer}>
                      <img
                        key={index}
                        src={photo}
                        alt={`${t("")} ${index}`}
                        className={styles.uploadedImage}
                      />
                      <IoClose
                        size={16}
                        color="red"
                        className={styles.deleteIcon}
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* {loading && <CustomLoader />} */}
    </>
  );
};

const SelectionCheckBox = ({
  t,
  title,
  options,
  handleFeatureSelect,
  selectedOptions,
  source,
}: any) => {
  const [open, setOpen] = useState(false);
  const feature = selectedOptions?.find((f: any) => f.name === title);
  const isSelected = feature && feature.options.length > 0;

  // Add this handler for the dropdown icon
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div
      className={styles.dropDown}
      onClick={() => setOpen(!open)}
      style={{ backgroundColor: isSelected ? "#0E54A3" : "transparent" }}
    >
      <div className={styles.gap}>
        <img
          src={source}
          className={styles.imageStyle}
          style={{ filter: isSelected ? "brightness(0) invert(1)" : "none" }}
        />
        <p
          className={styles.textSelected}
          style={{ color: isSelected ? "#fff" : "#131313" }}
        >
          {title}
        </p>
      </div>
      <div onClick={handleDropdownClick}>
        <FaChevronDown size={16} color={isSelected ? "#fff" : "#131313"} />
      </div>
      {open && (
        <div className={styles.modalDrop} onClick={(e) => e.stopPropagation()}>
          <p className={styles.textSelected2}>{t("select")}</p>
          {options.map((option: any) => {
            const feature = selectedOptions.find((f: any) => f.name === title);
            const isChecked = feature
              ? feature.options.includes(option)
              : false;
            return (
              <div
                key={option}
                className={styles.checkedbox}
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
              >
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => {
                    e.stopPropagation(); // Stop event from bubbling
                    handleFeatureSelect(title, option);
                  }}
                  className={styles.radioMark}
                />
                <p className={styles.textSelected}>{option}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
const ParkingSelection = ({ t, formik, source }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={styles.dropDown}
      style={{
        backgroundColor: formik?.values?.parking ? "#0E54A3" : "transparent",
      }}
      onClick={() => setOpen(!open)}
    >
      <div className={styles.gap}>
        <img
          src={source}
          style={{
            filter: formik?.values?.parking
              ? "brightness(0) invert(1)"
              : "none",
          }}
          className={styles.imageStyle}
        />
        <p
          className={styles.textSelected}
          style={{ color: formik?.values?.parking ? "#fff" : "#131313" }}
        >
          {t("parking")}
        </p>
      </div>
      <div>
        <FaChevronDown
          size={16}
          color={formik?.values?.parking ? "#fff" : "#131313"}
        />
      </div>
      {open && (
        <div className={styles.modalDrop}>
          <p className={styles.textSelected2}>{t("select")}</p>
          <div className={styles.checkedbox}>
            <Radio
              value={"Available"}
              checked={formik?.values?.parking === "Available"}
              onChange={() => formik.setFieldValue("parking", "Available")}
              className={styles.radioMark}
            />
            <p className={styles.textSelected}>Available</p>
          </div>
          <div className={styles.checkedbox}>
            <Radio
              value={"Not Available"}
              checked={formik?.values?.parking === "Not Available"}
              onChange={() => formik.setFieldValue("parking", "Not Available")}
              className={styles.radioMark}
            />
            <p className={styles.textSelected}>Not Available</p>
          </div>
        </div>
      )}
    </div>
  );
};
const SomokingBox = ({ t, title, chargeOption, formik, field }: any) => {
  return (
    <>
      <p className={styles.textSelected}>{title}</p>
      <div className={styles.allowed}>
        <div className={styles.checkedbox1}>
          <Radio
            value={"Allowed"}
            checked={chargeOption === "Allowed"}
            onChange={() => formik.setFieldValue(field, "Allowed")}
            className={styles.radioMark}
          />
          <p className={styles.textSelected3}>{t("allowed")}</p>
        </div>
        <div className={styles.checkedbox1}>
          <Radio
            value={"Not Allowed"}
            checked={chargeOption === "Not Allowed"}
            onChange={() => formik.setFieldValue(field, "Not Allowed")}
            className={styles.radioMark}
          />
          <p className={styles.textSelected3}>{t("notAllowed")}</p>
        </div>
      </div>
    </>
  );
};
const SaftyDetail = ({
  t,
  title,
  options,
  handleOptionChange,
  selectedOptions,
}: any) => {
  const [open, setOpen] = useState(false);

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div
      className={styles.dropDownbox}
      onClick={() => setOpen(!open)}
      style={{
        backgroundColor: selectedOptions.length > 0 ? "#0E54A3" : "transparent",
      }}
    >
      <div className={styles.gap}>
        <p
          className={styles.textSelected3}
          style={{ color: selectedOptions.length > 0 ? "#fff" : "none" }}
        >
          {title}
        </p>
      </div>
      <div onClick={handleDropdownClick}>
        <FaChevronDown
          size={16}
          color={selectedOptions.length > 0 ? "#fff" : "#131313"}
        />
      </div>
      {open && (
        <div className={styles.modalDrop} onClick={(e) => e.stopPropagation()}>
          <p className={styles.textSelected2}>{t("select")}</p>
          {options.map((option: any) => {
            return (
              <div
                key={option}
                className={styles.checkedbox}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleOptionChange(option);
                  }}
                  className={styles.radioMark}
                />
                <p className={styles.textSelected}>{option}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OfferHotel;
