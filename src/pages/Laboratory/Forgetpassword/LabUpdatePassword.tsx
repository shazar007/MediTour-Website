import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import style from "./forgetPassword.module.css";
import * as Yup from "yup";
import { labConfirmPasswordSchema } from "shared/utils";
import classNames from "classnames";
import { resetPasswordlab } from "shared/services/LabService";
import LabMainStyles from "../../Laboratory/laboratoryMain.module.css";
import commonStyles from "shared/utils/common.module.css";
import { CustomModal, PrimaryButton } from "shared/components";
import { EmailSendModel } from "shared/components/CustomEmailModel/emailSendModel";
import PasswordInput from "shared/components/PasswordInput";

const LabUpdatePassword = () => {
  const [error, setError] = React.useState("");
  const [SuccessModel, setSuccessModel] = useState(false);
  const formik = useFormik({
    initialValues: {
      desiredPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object(labConfirmPasswordSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  const handleSubmit = () => {
    let params = {
      newPassword: formik.values.confirmPassword,
    };
    const token = localStorage.getItem("token");

    if (token !== null) {
      resetPasswordlab(params, token)
        .then((res: any) => {
          if (res.status === 200) {
            setSuccessModel(true);
          }
        })
        .catch((err: any) => {
          setError(err?.response?.data?.message || "An unknown error occurred");
        });
    } else {
      console.error("Token is null");
    }
  };
  return (
    <div className={classNames(LabMainStyles.container2)}>
      {error && <div className={classNames(commonStyles.error)}>*{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(commonStyles.col4)}>
          <p
            className={classNames(
              commonStyles.fs40,
              style.mt100,
              commonStyles.semiBold,
              commonStyles.colorBlue
            )}
          >
            Set a password
          </p>
          <p
            className={classNames(
              commonStyles.fs16,
              style.mt16,
              commonStyles.colorBlue
            )}
          >
            Your previous password has been reseted. Please set a new password
            for your account.
          </p>
          <div
            className={classNames(
              commonStyles.mb28,
              style.mt50,
              commonStyles.col12
            )}
          >
            <PasswordInput
              placeholder="Desired Password"
              id="desiredPassword"
              name="desiredPassword"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.desiredPassword}
            />
            {formik.touched.desiredPassword && formik.errors.desiredPassword ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.desiredPassword}
              </div>
            ) : null}
          </div>
          <div className={classNames(commonStyles.mb28, commonStyles.col12)}>
            <PasswordInput
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <div className={classNames(commonStyles.mt56)}>
            <PrimaryButton children={"Password Update"} colorType={"Linear"} />
          </div>
        </div>
      </form>
      <CustomModal
        showModal={SuccessModel}
        children={
          <EmailSendModel
            setSuccessModel={setSuccessModel}
            showText="Password Successfully Updated, Please Login"
          />
        }
      />
    </div>
  );
};

export default LabUpdatePassword;
