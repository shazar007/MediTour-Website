import { useEffect, useState } from "react";
import style from "../travelFamily.module.css";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import { InputField, PrimaryButton } from "shared/components";
import ImgPicker from "shared/components/Img-picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "shared/components/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  Covering,
  insuranceTravelIndividualSchema,
  Medical,
  PackageCategory,
} from "shared/utils";
import { Checkbox } from "@mui/material";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";

interface Props {
  handleClickNext: any;
}

export default function FamilyBasicInfoCovering(props: Partial<Props>) {
  const { handleClickNext } = props;
  const { t, i18n }: any = useTranslation();
  const dispatch = useDispatch();
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const [countryName, setCountryName] = useState(
    addInsuranceForm?.CountryName || ""
  );

  const formik: any = useFormik({
    initialValues: {
      packageName: addInsuranceForm?.packageName || "",
      packageLogo: addInsuranceForm?.packageLogo || "",
      medicalCover: addInsuranceForm?.medicalCover || "",
      coveringUpTo: addInsuranceForm?.coveringUpTo || "",
      packageDescription: addInsuranceForm?.packageDescription || "",
      CountryName: addInsuranceForm?.CountryName || "",
      packageCategory: addInsuranceForm?.packageCategory || "",
      packageLogoPath: addInsuranceForm?.packageLogoPath || "",
    },
    validationSchema: Yup.object(insuranceTravelIndividualSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleCheckboxChange = (title: string) => {
    setCountryName(title);
    if (title === "allCountries") {
      formik.setFieldValue("CountryName", "allCountries");
    } else {
      formik.setFieldValue("CountryName", "");
    }
  };

  const handleLogoUrl = (url: any, imagePath: any) => {
    formik.setFieldValue("packageLogo", url);
    setTimeout(() => {
      formik.setFieldValue("packageLogoPath", imagePath);
    }, 100);
  };
  const handleValue = (selectedOption: string, val: any) => {
    formik.setFieldValue(val, selectedOption);
  };

  const handleSubmit = () => {
    dispatch(
      setAddInsuranceForm({
        ...addInsuranceForm,
        ...formik.values,
      })
    );
    handleClickNext();
  };

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  return (
    <div className={classNames(commonStyles.col12)}>
      <form onSubmit={formik.handleSubmit}>
        <div
          className={classNames(commonStyles.flx, commonStyles.mb24)}
          style={{ gap: "24px" }}
        >
          <div className={classNames(style.col4)}>
            <InputField
              placeholder={t("packageName")}
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
            <ImgPicker
              placeholder={t("packageLogo")}
              initialValue={formik?.values?.packageLogoPath}
              setData={handleLogoUrl}
            />

            {formik.touched.packageLogo && formik.errors.packageLogo ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.packageLogo}
              </div>
            ) : null}
          </div>{" "}
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleValue}
              keyValue={"medicalCover"}
              value={formik?.values?.medicalCover}
              placeholder={t("medicalCover")}
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
          style={{ gap: "24px" }}
        >
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleValue}
              keyValue={"coveringUpTo"}
              placeholder={t("coveringUpTo")}
              value={formik?.values?.coveringUpTo}
              options={Covering(t)}
            />
            {formik.touched.coveringUpTo && formik.errors.coveringUpTo ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.coveringUpTo}
              </div>
            ) : null}
          </div>
          <div className={classNames(style.col4)}>
            <InputField
              placeholder={t("packageDescription")}
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
              onSelect={handleValue}
              keyValue={"packageCategory"}
              placeholder={t("packageCategory")}
              value={formik?.values?.packageCategory}
              options={PackageCategory(t)}
            />
            {formik.touched.packageCategory && formik.errors.packageCategory ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.packageCategory}
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={classNames(commonStyles.flx, commonStyles.mb24)}
          style={{ gap: "24px" }}
        >
          <div className={classNames(style.col4, commonstyle.flx)}>
            <Checkbox
              className={style.checkbox}
              checked={countryName === "allCountries" ? true : false}
              onChange={() => handleCheckboxChange("allCountries")}
            />{" "}
            <p>{t("packageForWorldwide")}</p>
          </div>

          <div className={classNames(style.col4, commonstyle.flx)}>
            <Checkbox
              className={style.checkbox}
              checked={countryName !== "allCountries" ? true : false}
              onChange={() => handleCheckboxChange("sepecificCountry")}
            />{" "}
            <p>{t("specificCountry")}</p>
          </div>

          {countryName !== "allCountries" && (
            <div className={classNames(style.col4)}>
              <InputField
                placeholder={t("countryName")}
                id="CountryName"
                name="CountryName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.CountryName}
              />
              {formik.touched.CountryName && formik.errors.CountryName ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.CountryName}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className={commonStyles.flxEnd}>
          <div style={{ width: "210px", marginTop: "24px" }}>
            <PrimaryButton
              children={t("next")}
              colorType={"New_blue"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
