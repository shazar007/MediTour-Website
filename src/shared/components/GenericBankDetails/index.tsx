import React from "react";
import styles from "../GenericSocialInfo.module.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ImagNewPicker, InputField } from "shared/components";
import { setDoctorFormData } from "shared/redux";
import { useTranslation } from "react-i18next";
interface Props {
  handleSubmit?: any;
  setCurrentStep?: any;
  type?: any;
  handleBack?: any;
}

const GenericBankDetails = (props: Props) => {
      const {t} : any = useTranslation()
  
  const { doctorFormData } = useSelector((state: any) => state.root.common);
  const dispatch = useDispatch();

  const { handleSubmit, setCurrentStep, type, handleBack } = props;
  const checkType =
    type === "branch" ||
    type === "doctor" ||
    type === "labs" ||
    type === "pharmacy" ||
    type === "travel" ||
    type === "hotel";
  const formik = useFormik({
    initialValues: {
      bankName: doctorFormData?.bankInfo?.bankName || "",
      accountNumber: doctorFormData?.bankInfo?.accountNumber || "",
      accountTitle: doctorFormData?.bankInfo?.accountTitle || "",
      ntn: doctorFormData?.bankInfo?.ntn || "",
      cnicName: doctorFormData?.bankInfo?.cnicName || "",
      taxFile: doctorFormData?.bankInfo?.taxFile || "",
    },
    onSubmit: (values) => {
      if (checkType) {
        handleNext(values);
      } else {
        handleSubmit(values);
      }
    },
  });
  const handleNext = (bankInfo: any) => {
    const bankDetail = {
      ...doctorFormData,
      bankInfo,
    };
    dispatch(setDoctorFormData(bankDetail));
    setCurrentStep(3);
  };
  const handlePmdc = (url: any) => {
    formik.setFieldValue("taxFile", url);
  };
  const handleCnicName = (name: any) => {
    formik.setFieldValue("cnicName", name);
  };
  const cnicImageUrl = formik.values?.cnicName;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.rowSocial}>
        <div className={styles.inputGroupSocial}>
          <InputField
            id="bankName"
            formik={formik}
            placeholder={t("bankNameOptional")}
            value={formik?.values?.bankName}
            onChange={formik?.handleChange("bankName")}
          />
        </div>
        <div className={styles.inputGroupSocial}>
          <InputField
            id="accountNumber"
            formik={formik}
            value={formik?.values?.accountNumber}
            placeholder={t("accNumberOptional")}
            onChange={formik?.handleChange("accountNumber")}
          />
        </div>
      </div>
      <div className={styles.rowSocial}>
        <div className={styles.inputGroupSocial}>
          <InputField
            id="accountTitle"
            formik={formik}
            value={formik?.values?.accountTitle}
            placeholder={t("accountTitleOptional")}
            onChange={formik?.handleChange("accountTitle")}
          />
        </div>
        <div className={styles.inputGroupSocial}>
          <InputField
            id="ntn"
            formik={formik}
            value={formik?.values?.ntn}
            placeholder={t("ntnOptional")}
            onChange={formik?.handleChange("ntn")}
          />
        </div>
      </div>
      <div className={styles.bankInfo}>
        <ImagNewPicker
          placeholder={t("attTaxFileOPtional")}
          setData={handlePmdc}
          setName={handleCnicName}
          initialValue={cnicImageUrl}
        />
      </div>
      {checkType ? (
        <div className={styles.branchContainer}>
          <button className={styles.backButton} onClick={handleBack}>
          {t("back")}
          </button>

          <button className={styles.nextButton} type="submit">
          {t("next")} →
          </button>
        </div>
      ) : (
        <div className={styles.buttonContainer}>
          <button className={styles.continueButton} type="submit">
          {t("next")} →
          </button>
        </div>
      )}
    </form>
  );
};

export default GenericBankDetails;
