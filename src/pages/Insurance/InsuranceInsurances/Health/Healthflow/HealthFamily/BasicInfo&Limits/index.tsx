import { useEffect } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import style from "../myFamily.module.css";
import { useFormik } from "formik";
import { InputField, PrimaryButton } from "shared/components";
import ImgPicker from "shared/components/Img-picker";
import { useSelector, useDispatch } from "react-redux";
import { setInsuranceHealthFamilyPackage } from "shared/redux";

interface Props {
  handleClickNext: any;
}
export default function BasicInfoLimits(props: Partial<Props>) {
  const { handleClickNext } = props;
  const { insuranceHealthFamilyPackage } = useSelector(
    (state: any) => state.root.insurance
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      packageName: "",
      packageLogo: "",
      hospitalizationPerPerson: "",
      dailyRoomBoardLimit: "",
      claimPayoutRatio: "",
      packageDescription: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = () => {
    handleClickNext();
    dispatch(setInsuranceHealthFamilyPackage({ ...formik.values }));
  };
  const handlePackageUrl = (url: any) => {
    formik.setFieldValue("packageLogo", url);
  };
  useEffect(() => {
    formik.setValues(insuranceHealthFamilyPackage);
  }, []);
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
                placeholder="Package Name"
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
                placeholder="Package Logo"
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
                placeholder="Hospitalization Per person "
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
                placeholder="Daily Room & Board Limit "
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
                placeholder="Claim Payout Ratio "
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
                placeholder="Package Description "
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
                children={"Next"}
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
