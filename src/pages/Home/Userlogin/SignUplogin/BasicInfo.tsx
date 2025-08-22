import { useState } from "react";
import Styles from "./styles.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "shared/components/ModelTermsAndCondition/Model";
import UserAgreement from "shared/components/ModelTermsAndCondition/UserAgreement";
import { PhoneNumberInputNew } from "shared/components";
import CustomInput from "shared/components/A_New_Components/InputField";
import { Checkbox } from "@mui/material";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useDirection } from "shared/utils/DirectionContext";

interface Props {
  formik?: any;
  onAgreementChange: (agreed: boolean) => void;
}

const BasicInfo = (props: Props) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const { formik } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModalTerms = () => {
    setModalOpen(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <CustomInput
            id="fullName"
            type="text"
            placeholder={t("fullName")}
            value={formik.values.fullName}
            onChange={formik.handleChange("fullName")}
            height="48px"
            error={
              formik.touched.fullName && formik.errors.fullName
                ? formik.errors.fullName
                : ""
            }
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <CustomInput
            id="fatherName"
            type="text"
            placeholder={t("fatherName")}
            value={formik.values.fatherName}
            onChange={formik.handleChange("fatherName")}
            height="48px"
            error={
              formik.touched.fatherName && formik.errors.fatherName
                ? formik.errors.fatherName
                : ""
            }
          />
        </div>
      </div>

      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <CustomInput
            id="email"
            type="text"
            placeholder={t("email")}
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            height="48px"
            readOnly
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <div className={Styles.widthPhonePicker}>
            <PhoneNumberInputNew
              width="100%"
              value={formik.values.phoneNumber}
              setValue={(newValue: string) => {
                formik.setFieldValue("phoneNumber", newValue);
              }}
              dir={isRtl ? "rtl" : "ltr"}
            />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className={Styles.error}>{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
      </div>

      <div className={Styles.rowBasic}>
        <div className={Styles.inputGroupBasic}>
          <CustomInput
            password
            id="password"
            type="password"
            togglePassword={togglePassword}
            showPassword={showPassword}
            placeholder={t("password")}
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            height="48px"
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />
        </div>
        <div className={Styles.inputGroupBasic}>
          <CustomInput
            password
            id="confirmPassword"
            type="password"
            togglePassword={toggleConfirmPassword}
            showPassword={showConfirmPassword}
            placeholder={t("confirmPassword")}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange("confirmPassword")}
            height="48px"
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""
            }
          />
        </div>
      </div>

      <div className={Styles.agreementContainer}>
        <Checkbox
          checked={formik.values.isAgreed}
          onChange={formik.handleChange("isAgreed")}
          className={Styles.radioMark}
        />
        <span className={Styles.agreementText}>
          {t("thisIagreetoMediTour")}{" "}
          <span
            className={Styles.linkText}
            onClick={handleOpenModal}
            style={{ cursor: "pointer" }}
          >
            {t("terms&Condition")}
          </span>{" "}
          <span style={{ textTransform: "lowercase" }}> {t("and")}</span>{" "}
          <a
            className={Styles.linkText}
            href="/privactpolicys"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("privacyPolicy")}
          </a>
        </span>
        {/* </label> */}
      </div>

      {formik.touched.isAgreed && formik.errors.isAgreed ? (
        <div className={classNames(commonStyles.error)}>
          *{formik.errors.isAgreed}
        </div>
      ) : null}

      <div className={Styles.buttonContainer}>
        <button className={Styles.continueButton} type="submit">
          {t("save")} {isRtl ? <FaArrowLeftLong /> : <FaArrowRightLong />}
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModalTerms}>
        <UserAgreement />
      </Modal>
    </form>
  );
};

export default BasicInfo;
