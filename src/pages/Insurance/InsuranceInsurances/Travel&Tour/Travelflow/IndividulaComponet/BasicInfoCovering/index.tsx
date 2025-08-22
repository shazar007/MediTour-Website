import React, { useEffect, useState } from "react";
import style from "../single.module.css";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { InputField, PrimaryButton } from "shared/components";
import commonstyle from "shared/utils/common.module.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import ImgPicker from "shared/components/Img-picker";
import CustomSelect from "shared/components/CustomSelect";
import { setInsuranceTravelIndividualPackage } from "shared/redux";
import { Checkbox } from "@mui/material";

const Medical = ["10,000", "20,000", "30,000", "40,000", "50,000"];
const PackageCategory = ["Silver", "Gold", "Platinum"];
const Covering = [
  "1 Day",
  "2 Days",
  "3 Days",
  "4 Days",
  "5 Days",
  "6 Days",
  "7 Days",
  "8 Days",
  "9 Days",
  "10 Days",
];

interface Props {
  handleClickNext: any;
}

export default function BasicInfoCovering(props: Partial<Props>) {
  const [error, setError] = React.useState("");
  const { handleClickNext } = props;
  const dispatch = useDispatch();
  const [isSpecificCountryChecked, setIsSpecificCountryChecked] = useState<
    boolean | undefined
  >(undefined);

  const formik = useFormik({
    initialValues: {
      packageName: "",
      packageLogo: "",
      medicalCover: "",
      coveringUpTo: "",
      packageDescription: "",
      packageCategory: "",
      CountryName: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleCheckboxChange = (isSpecific: boolean) => {
    setIsSpecificCountryChecked(isSpecific);
    if (!isSpecific) {
      formik.setFieldValue("CountryName", "package for world wide");
    } else {
      formik.setFieldValue("CountryName", "");
    }
  };

  const handleCountryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSpecificCountryChecked) {
      formik.setFieldValue("CountryName", e.target.value);
    }
  };

  const handleLogoUrl = (url: any) => {
    formik.setFieldValue("packageLogo", url);
  };

  const handleMedicalCover = (selectedOption: string) => {
    formik.setFieldValue("medicalCover", selectedOption);
  };

  const handleCovering = (selectedOption: string) => {
    formik.setFieldValue("coveringUpTo", selectedOption);
  };

  const packageCategoryhandle = (selectedOption: string) => {
    formik.setFieldValue("packageCategory", selectedOption);
  };
  const handleSubmit = () => {
    if (!formik.values.CountryName && isSpecificCountryChecked) {
      setError(
        "Please enter a Country Name when 'Specific Country' is selected."
      );
    } else {
      dispatch(setInsuranceTravelIndividualPackage({ ...formik.values }));
      handleClickNext();
    }
  };

  useEffect(() => {}, [formik.values]);
  return (
    <div className={classNames(commonStyles.col12)}>
      <form onSubmit={formik.handleSubmit}>
        <div
          className={classNames(commonStyles.flx, commonStyles.mb24)}
          style={{
            gap: "24px",
          }}
        >
          <div className={classNames(style.col4)}>
            <InputField
              placeholder="Package Name"
              id="packageName"
              name="packageName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.packageName}
            />
            {formik.touched.packageName && formik.errors.packageName ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.packageName}
              </div>
            ) : null}
          </div>
          <div className={classNames(style.col4)}>
            <ImgPicker placeholder="Package Logo" setData={handleLogoUrl} />
            {formik.touched.packageLogo && formik.errors.packageLogo ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.packageLogo}
              </div>
            ) : null}
          </div>{" "}
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleMedicalCover}
              placeholder="Medical cover"
              options={Medical}
            />
            {formik.touched.medicalCover && formik.errors.medicalCover ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.medicalCover}
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={classNames(commonStyles.flx, commonStyles.mb24)}
          style={{
            gap: "24px",
          }}
        >
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleCovering}
              placeholder="Covering up to"
              options={Covering}
            />
            {formik.touched.coveringUpTo && formik.errors.coveringUpTo ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.coveringUpTo}
              </div>
            ) : null}
          </div>{" "}
          <div className={classNames(style.col4)}>
            <InputField
              placeholder="Package Description"
              id="packageDescription"
              name="packageDescription"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.packageDescription}
            />
            {formik.touched.packageDescription &&
            formik.errors.packageDescription ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.packageDescription}
              </div>
            ) : null}
          </div>{" "}
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={packageCategoryhandle}
              placeholder="Package Category"
              options={PackageCategory}
            />
            {formik.touched.packageCategory && formik.errors.packageCategory ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.packageCategory}
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={commonstyle.flx}
          style={{
            gap: "24px",
          }}
        >
          <div className={classNames(style.col4, commonStyles.flx)}>
            <Checkbox
              className={style.checkbox}
              checked={isSpecificCountryChecked === false}
              onChange={() => handleCheckboxChange(false)}
            />{" "}
            <p>Package for Worldwide (multi tour)</p>
          </div>

          <div className={classNames(style.col4, commonStyles.flx)}>
            <Checkbox
              className={style.checkbox}
              checked={isSpecificCountryChecked === true}
              onChange={() => handleCheckboxChange(true)}
            />{" "}
            <p>Specific Country......</p>
          </div>

          {isSpecificCountryChecked && (
            <div className={classNames(style.col4)}>
              <InputField
                placeholder="Country Name"
                id="CountryName"
                name="CountryName"
                type="text"
                onChange={(e: any) => {
                  formik.handleChange(e);
                  handleCountryNameChange(e);
                }}
                value={formik.values.CountryName}
              />
              {formik.touched.CountryName && formik.errors.CountryName ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.CountryName}
                </div>
              ) : null}
            </div>
          )}
          {error && (
            <div className={classNames(commonStyles.error)}>*{error}</div>
          )}
        </div>

        <div className={commonStyles.flxEnd}>
          <div style={{ width: "210px", marginTop: "24px" }}>
            <PrimaryButton
              children={"Next"}
              colorType={"New_blue"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
