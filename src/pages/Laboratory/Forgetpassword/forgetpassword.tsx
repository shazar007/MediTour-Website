import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from "./forgetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { labResetSchema } from "shared/utils";
import labMainStyles from "../laboratoryMain.module.css";
import { resetLinklab } from "shared/services/LabService";
import commonStyles from "shared/utils/common.module.css";
import { CustomModal, PrimaryButton } from "shared/components";
import { CustomInput } from "shared/components";
import { EmailSendModel } from "shared/components/CustomEmailModel/emailSendModel";
import Logo from "assets/images/labLock.png";
import { FaChevronLeft } from "react-icons/fa6";

const ForgetPassword = () => {
  const [SuccessModel, setSuccessModel] = useState(false);
  const [error, setError] = React.useState("");

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object(labResetSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    let params = {
      email: formik.values.Email,
    };

    resetLinklab(params)
      .then((res: any) => {
        setSuccessModel(true);

        if (res.status === 200 && res.statusText === "OK") {
          if (res?.data?.auth) {
            setSuccessModel(true);
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
    navigate("/laboratory/login");
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={classNames(commonStyles.MianOuter)}>
        {error && (
          <div className={classNames(commonStyles.error)}>*{error}</div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className={classNames(labMainStyles.flxBetween)}>
            <div
              className={classNames(commonStyles.col6, commonStyles.colsm12)}
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
                  commonStyles.colsm12,
                  commonStyles.colmd12,
                  styles.mt16,
                  styles.colorGray
                )}
              >
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </p>
              <div
                className={classNames(
                  commonStyles.col8,
                  commonStyles.colmd12,
                  commonStyles.colsm12,
                  styles.mt50
                )}
              >
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
                <div className={classNames(commonStyles.mt56)}>
                  <PrimaryButton
                    children={"Submit"}
                    type="submit"
                    colorType={"Linear"}
                  />
                </div>
              </div>{" "}
            </div>
            <div className={classNames(commonStyles.colsm12)}>
              <img src={Logo} alt="logo" className={commonStyles.lockVector} />
            </div>
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
    </div>
  );
};

export default ForgetPassword;
