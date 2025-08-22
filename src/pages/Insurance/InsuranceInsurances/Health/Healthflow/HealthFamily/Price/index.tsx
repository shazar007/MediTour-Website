import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { InputField, PrimaryButton } from "shared/components";
import { useSelector } from "react-redux";
import { insuranceAddHealth_Family } from "shared/services/Insurance";
import { insurancePriceSchema } from "shared/utils";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";

export default function PriceInsurance() {
  const { insuranceHealthFamilyPackage } = useSelector(
    (state: any) => state.root.insurance
  );
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      actualPrice: "",
      perYear: "",
    },
    validationSchema: Yup.object(insurancePriceSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = () => {
    let currentData = formik.values;

    let params = {
      yourAgeCriteria: {
        startAge: insuranceHealthFamilyPackage.insuranceAgestart,
        endAge: insuranceHealthFamilyPackage.insuranceAgeend,
      },
      spouseAgeCriteria: {
        startAge: insuranceHealthFamilyPackage.spouseAgeStart,
        endAge: insuranceHealthFamilyPackage.spouseAgeEnd,
      },
      kidsAge: {
        startAge: insuranceHealthFamilyPackage.kidsAgeStart,
        endAge: insuranceHealthFamilyPackage.kidsAgeEnd,
      },
      hospitalizationLimit: {
        startLimit: insuranceHealthFamilyPackage.hospitalizationStartLimit,
        endLimit: insuranceHealthFamilyPackage.hospitalizationEndLimit,
      },
      packageName: insuranceHealthFamilyPackage.packageName,
      packageLogo: insuranceHealthFamilyPackage.packageLogo,
      hospitalizationPerPerson:
        insuranceHealthFamilyPackage.hospitalizationPerPerson,
      dailyRoomAndBoardLimit: insuranceHealthFamilyPackage.dailyRoomBoardLimit,
      claimPayoutRatio: insuranceHealthFamilyPackage.claimPayoutRatio,
      hospitals: insuranceHealthFamilyPackage.hospitals,
      laboratories: insuranceHealthFamilyPackage.labs,
      icuCcuLimits: insuranceHealthFamilyPackage.icu,
      accidentalEmergencyLimits: insuranceHealthFamilyPackage.additionalLimit,
      ambulanceCoverage: insuranceHealthFamilyPackage.ambulanceService,
      waitingPeriod: insuranceHealthFamilyPackage.weeks,
      policyDocument: insuranceHealthFamilyPackage.policyDocument,
      claimProcess: insuranceHealthFamilyPackage.claimProcess,
      heading: insuranceHealthFamilyPackage.heading,
      description: insuranceHealthFamilyPackage.description,
      //CurrentData
      actualPrice: currentData.actualPrice,
      // meditourPrice: currentData.meditourPrice,
      perYear: currentData.perYear,
    };

    insuranceAddHealth_Family(params)
      .then((res: any) => {
        navigate("/insurance/MyFamilyMian");
      })
      .catch((err: any) => {
        notifyError(err.response.data?.message);
      })
      .finally(() => {});
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(commonStyles.col6)}>
          <div
            className={classNames(
              commonStyles.flx,
              commonStyles.col12,
              commonStyles.mb24
            )}
          >
            <div className={classNames(commonStyles.col12)}>
              <InputField
                placeholder="Price "
                id="actualPrice"
                name="actualPrice"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.actualPrice}
              />
              {formik.touched.actualPrice && formik.errors.actualPrice ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.actualPrice}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className={classNames(
              commonStyles.flx,
              commonStyles.col12,
              commonStyles.mb24
            )}
          >
            <div className={classNames(commonStyles.col12)}>
              <InputField
                placeholder="Per Year"
                id="perYear"
                name="perYear"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.perYear}
              />
              {formik.touched.perYear && formik.errors.perYear ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.perYear}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={commonStyles.flxEnd}>
          <div className={commonStyles.BtnWidth}>
            <PrimaryButton
              children={"Submit"}
              colorType={"New_blue"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
