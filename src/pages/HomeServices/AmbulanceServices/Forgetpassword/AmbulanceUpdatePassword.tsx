import React, { useEffect, useState } from "react";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import { ambulanceConfirmPasswordSchema } from "shared/utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomModal, PrimaryButton } from "shared/components";
import { resetPasswordAmbulance } from "shared/services/Ambulance";
import { CustomInput } from "shared/components";
import { EmailSendModel } from "shared/components/CustomEmailModel/emailSendModel";

const AmbulanceUpdatePassword = () => {
  const [error, setError] = React.useState("");
  const [SuccessModel, setSuccessModel] = useState(false);
  const formik = useFormik({
    initialValues: {
      desiredPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object(ambulanceConfirmPasswordSchema),
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
      resetPasswordAmbulance(params, token)
        .then((res: any) => {
          if (res.status === 200) {
            setSuccessModel(true);
          }
        })
        .catch((err: any) => {
          setError(err?.response?.data?.message || "An unknown error occurred");
        });
    }
  };

  return (
    <div className={classNames(commonStyles.MianOuter)}>
      {error && <div className={classNames(commonStyles.error)}>*{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(commonStyles.col4)}>
          <div className={classNames(commonStyles.mb28, commonStyles.col12)}>
            <CustomInput
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
            <CustomInput
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
            <PrimaryButton
              children={"Password Update"}
              colorType={"Ambulance"}
            />
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

export default AmbulanceUpdatePassword;
