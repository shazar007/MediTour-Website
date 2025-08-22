import React, { useState } from "react";
import classNames from "classnames";
import styles from "./forgetPassword.module.css";
import commonStyles from "shared/utils/common.module.css";
import { ambulanceResetSchema } from "shared/utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomModal, PrimaryButton } from "shared/components";
import { resetLinkAmbulance } from "shared/services/Ambulance";
import { CustomInput } from "shared/components";
import { useNavigate } from "react-router-dom";
import { EmailSendModel } from "shared/components/CustomEmailModel/emailSendModel";
import Logo from "assets/images/AmblanceLock.png";
import { FaChevronLeft } from "react-icons/fa6";
import MainhomeStyles from "../../mainHomeServices.module.css";

const AmbulanceForget = () => {
  const [SuccessModel, setSuccessModel] = useState(false);
  const [error, setError] = React.useState("");

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object(ambulanceResetSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    let params = {
      email: formik.values.Email,
    };

    resetLinkAmbulance(params)
      .then((res: any) => {
        if (res.status === 200) {
          setSuccessModel(true);
        }
      })
      .catch((err: any) => {
        setError(err?.response?.data?.message);
      });
  };
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate("/ambulance/login");
  };
  return (
    <div className={classNames(commonStyles.MianOuter, commonStyles.col12)}>
      <div className={classNames(MainhomeStyles.flxBetween)}>
        <div className={classNames(commonStyles.col4, commonStyles.colsm12)}>
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
              <PrimaryButton
                children="Send Link"
                type="submit"
                colorType={"Ambulance"}
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
        <div className={classNames(commonStyles.colsm12, commonStyles.col6)}>
          <img
            src={Logo}
            alt="AmbluanceLogo"
            className={commonStyles.lockVector}
          />
        </div>
      </div>
    </div>
  );
};

export default AmbulanceForget;
