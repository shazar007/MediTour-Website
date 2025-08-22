import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import styles from "./forgetPassword.module.css";
import commonStyles from "shared/utils/common.module.css";
import MainInsuranceStyle from "../mainInsurance.module.css";
import { PrimaryButton } from "shared/components";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "shared/components";
import { insuranceResetSchema } from "shared/utils";
import { resetLinkInsurance } from "shared/services/Insurance";
import Logo from "assets/images/InsuranceLock.png";
import { FaChevronLeft } from "react-icons/fa6";

const InsuranceForget = () => {
  const [error, setError] = React.useState("");
  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object(insuranceResetSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    let params = {
      email: formik.values.Email,
    };

    resetLinkInsurance(params)
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          if (res?.data?.auth) {
          }
        }
      })
      .catch((err: any) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {});
  };
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate("/insurance/login");
  };
  return (
    <div className={classNames(commonStyles.MianOuter)}>
      <div className={classNames(MainInsuranceStyle.flxBetween)}>
        <div
          className={classNames(
            commonStyles.col4,
            commonStyles.colmd8,
            commonStyles.colsm12
          )}
        >
          <div
            className={classNames(commonStyles.flx, styles.cursor)}
            onClick={handleGoToHome}
          >
            <FaChevronLeft className={styles.BackIcon} />
            <p
              className={classNames(
                commonStyles.colorBlue,
                commonStyles.fs14,
                commonStyles.semiBold,
                styles.cursor
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
              commonStyles.col12,
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
                styles.mt50,
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
              <PrimaryButton children={"Send Link"} colorType={"Insurance"} />
            </div>
          </form>
        </div>
        <div className={classNames(commonStyles.colsm12, commonStyles.col6)}>
          <img
            src={Logo}
            alt="InsuranceLogo"
            className={commonStyles.lockVector}
          />
        </div>
      </div>
    </div>
  );
};

export default InsuranceForget;
