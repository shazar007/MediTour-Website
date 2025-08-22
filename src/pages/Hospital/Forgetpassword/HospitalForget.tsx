import React, { useState } from "react";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./forgetPassword.module.css";
import commonStyles from "shared/utils/common.module.css";
import { resetLinkhospital } from "shared/services/HospitalService";
import { hospitalResetSchema } from "shared/utils";
import { CustomModal, PrimaryButton } from "shared/components";
import { CustomInput } from "shared/components";
import { EmailSendModel } from "shared/components/CustomEmailModel/emailSendModel";
import Logo from "assets/images/hospitalLock.png";
import { FaChevronLeft } from "react-icons/fa6";
const HospitalForget = () => {
  const [error, setError] = React.useState("");
  const [SuccessModel, setSuccessModel] = useState(false);

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object(hospitalResetSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    let params = {
      email: formik.values.Email,
    };

    resetLinkhospital(params)
      .then((res: any) => {
        if (res.status === 200) {
          setSuccessModel(true);
        }
      })
      .catch((err: any) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {});
  };
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate("/hospital/login");
  };
  return (
    <div className={classNames(commonStyles.MianOuter)}>
      <div className={classNames(commonStyles.flxBetween)}>
        <div
          className={classNames(
            commonStyles.col4,
            commonStyles.colmd8,
            commonStyles.colsm11
          )}
        >
          {" "}
          <div
            className={classNames(commonStyles.flx, styles.cursor)}
            onClick={handleGoToHome}
          >
            <FaChevronLeft className={styles.BackIcon} />
            <p
              className={classNames(
                commonStyles.colorBlue,
                commonStyles.fs14,
                commonStyles.semiBold
              )}
            >
              Back to Home
            </p>
          </div>
          <p
            className={classNames(
              commonStyles.fs30,
              styles.mt100,
              commonStyles.semiBold,
              commonStyles.colorBlue
            )}
          >
            Forgot your password?
          </p>
          <p
            className={classNames(
              commonStyles.fs16,
              commonStyles.col8,
              styles.mt16,
              styles.colorGray
            )}
          >
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </p>
          {error && (
            <div className={classNames(commonStyles.error)}>*{error}</div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div
              className={classNames(
                commonStyles.mb28,
                styles.mt50m,
                commonStyles.flx
              )}
            >
              <div className={classNames(commonStyles.col12)}>
                <CustomInput
                  placeholder="Please Enter Email"
                  id="Email"
                  name="Email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.Email}
                />
                {formik.touched.Email && formik.errors.Email ? (
                  <div className={classNames(commonStyles.error)}>
                    *{formik.errors.Email}
                  </div>
                ) : null}
              </div>
            </div>
            <div className={classNames(commonStyles.mt56)}>
              <PrimaryButton
                children={"Send Link"}
                type="submit"
                colorType={"MedicalService"}
              />
            </div>
          </form>
          <CustomModal
            showModal={SuccessModel}
            children={
              <EmailSendModel
                setSuccessModel={setSuccessModel}
                showText="Link Send to the Email, Please Check Email"
              />
            }
          />
        </div>
        <div className={classNames(commonStyles.colsm12)}>
          <img src={Logo} alt="logoo" className={commonStyles.lockVector} />
        </div>
      </div>
    </div>
  );
};

export default HospitalForget;
