import React, { useEffect } from "react";
import classNames from "classnames";
import MainMedicalStyles from "./mainMedicalService.module.css";
import commonStyles from "shared/utils/common.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { PrimaryButton } from "shared/components";

import { CustomInput } from "shared/components";

interface Props {
  handleNext: any;
}

const Doctor_SocialInfo = (props: Partial<Props>) => {
  const { handleNext } = props;

  const { doctorFormData, systemType, hospitalFormData } = useSelector(
    (state: any) => state.root.common
  );
  const { rentcarUserFormData } = useSelector(
    (state: any) => state.root.rentcar
  );

  const formik = useFormik({
    initialValues: {
      fbUrl: "",
      instaUrl: "",
      twitterUrl: "",
      webUrl: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    if (systemType == "hospital") {
      formik.setValues(hospitalFormData);
    } else if (systemType == "rentacar") {
      formik.setValues(rentcarUserFormData);
    } else {
      formik.setValues(doctorFormData);
    }
  }, []);
  const handleSubmit = async () => {
    handleNext(formik.values);
  };

  return (
    <div className={classNames(commonStyles.col12, commonStyles.mt56)}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(commonStyles.mb16, MainMedicalStyles.flx)}>
          <div
            className={classNames(
              commonStyles.mr32,
              commonStyles.col6,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <CustomInput
              placeholder="Facebook Link             optional"
              id="fbUrl"
              name="fbUrl"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.fbUrl}
            />
            {formik.touched.fbUrl && formik.errors.fbUrl ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.fbUrl}
              </div>
            ) : null}
          </div>
          <div
            className={classNames(
              commonStyles.col6,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <CustomInput
              placeholder="Instagram Link             optional"
              id="instaUrl"
              name="instaUrl"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.instaUrl}
            />
            {formik.touched.instaUrl && formik.errors.instaUrl ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.instaUrl}
              </div>
            ) : null}
          </div>
        </div>
        <div className={classNames(MainMedicalStyles.flx)}>
          <div
            className={classNames(
              commonStyles.mr32,
              commonStyles.col6,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <CustomInput
              placeholder="Twitter Link               optional"
              id="twitterUrl"
              name="twitterUrl"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.twitterUrl}
            />
            {formik.touched.twitterUrl && formik.errors.twitterUrl ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.twitterUrl}
              </div>
            ) : null}
          </div>
          <div
            className={classNames(
              commonStyles.col6,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <CustomInput
              placeholder="website Link              optional"
              id="webUrl"
              name="webUrl"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.webUrl}
            />
            {formik.touched.webUrl && formik.errors.webUrl ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.webUrl}
              </div>
            ) : null}
          </div>
        </div>
        <div className={MainMedicalStyles.buttonWidth}>
          <PrimaryButton
            children={"Next"}
            type="submit"
            colorType={"MedicalService"}
          />
        </div>
      </form>
    </div>
  );
};

export default Doctor_SocialInfo;
