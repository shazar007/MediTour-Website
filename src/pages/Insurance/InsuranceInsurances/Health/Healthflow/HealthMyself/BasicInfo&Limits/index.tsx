import { useEffect } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import * as Yup from "yup";
import style from "../Myself.module.css";
import { useFormik } from "formik";
import { InputField, PrimaryButton } from "shared/components";
import ImgPicker from "shared/components/Img-picker";
import { insurancePackageBasicinfo } from "shared/utils";
import { useSelector, useDispatch } from "react-redux";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";

interface Props {
  handleClickNext: any;
  planType?: any;
}
export default function MYselfBasicInfoLimits(props: Partial<Props>) {
  const { t, i18n }: any = useTranslation();
  const { handleClickNext } = props;
  const dispatch = useDispatch();

  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const formik: any = useFormik({
    initialValues: {
      packageName: addInsuranceForm?.packageName || "",
      packageLogo: addInsuranceForm?.packageLogo || "",
      hospitalizationPerPerson:
        addInsuranceForm?.hospitalizationPerPerson || "",
      dailyRoomBoardLimit: addInsuranceForm?.dailyRoomBoardLimit || "",
      claimPayoutRatio: addInsuranceForm?.claimPayoutRatio || "",
      packageDescription: addInsuranceForm?.packageDescription || "",
      imagePath: addInsuranceForm?.imagePath || "",
    },
    validationSchema: Yup.object(insurancePackageBasicinfo(t)),
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    dispatch(
      setAddInsuranceForm({
        ...addInsuranceForm,
        ...formik.values,
      })
    );
    handleClickNext();
  };
  const handlePackageUrl = (url: any, placeholder: any) => {
    formik?.setFieldValue("packageLogo", url);
    setTimeout(() => {
      formik.setFieldValue("imagePath", placeholder);
    }, 1000);
  };

  useEffect(() => {
    formik?.validateForm();
  }, [i18n.language]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(commonStyles.col12)}>
          <div
            className={classNames(
              commonStyles.flx,
              style.gap24,
              commonStyles.mb24
            )}
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
                placeholder={formik?.values?.imagePath || t("packageLogo")}
                setData={handlePackageUrl}
              />
              {formik.touched.packageLogo && formik.errors.packageLogo ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.packageLogo}
                </div>
              ) : null}
            </div>{" "}
            <div className={classNames(style.col4)}>
              <InputField
                placeholder={t("hospitalizationPerPerson")}
                id="hospitalizationPerPerson"
                name="hospitalizationPerPerson"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.hospitalizationPerPerson}
              />
              {formik.touched.hospitalizationPerPerson &&
              formik.errors.hospitalizationPerPerson ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.hospitalizationPerPerson}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className={classNames(
              commonStyles.flx,
              style.gap24,
              commonStyles.mb24
            )}
          >
            <div className={classNames(style.col4)}>
              <InputField
                placeholder={t("dailyRoom&BoardLimit")}
                id="dailyRoomBoardLimit"
                name="dailyRoomBoardLimit"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.dailyRoomBoardLimit}
              />
              {formik.touched.dailyRoomBoardLimit &&
              formik.errors.dailyRoomBoardLimit ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.dailyRoomBoardLimit}
                </div>
              ) : null}
            </div>

            <div className={classNames(style.col4)}>
              <InputField
                placeholder={t("claimPayoutRatio")}
                id="claimPayoutRatio"
                name="claimPayoutRatio"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.claimPayoutRatio}
              />
              {formik.touched.claimPayoutRatio &&
              formik.errors.claimPayoutRatio ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.claimPayoutRatio}
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
            </div>
          </div>
          <div className={commonStyles.flxEnd}>
            <div className={commonStyles.BtnWidth}>
              <PrimaryButton
                children={t("next")}
                colorType={"New_blue"}
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
