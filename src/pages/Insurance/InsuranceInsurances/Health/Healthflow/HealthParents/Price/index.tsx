import * as Yup from "yup";
import { useFormik } from "formik";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { InputField, PrimaryButton } from "shared/components";
import { insurancePriceSchema } from "shared/utils";
import { insuranceAddHealth_Parents } from "shared/services/Insurance";

export default function PriceInsurance() {
  const { insuranceHealthParentPackage } = useSelector(
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
      ageCriteria: {
        startAge: insuranceHealthParentPackage.parentsAgeStart,
        endAge: insuranceHealthParentPackage.parentsAgeEnd,
      },
      hospitalizationLimit: {
        startLimit: insuranceHealthParentPackage.hospitalizationStartLimit,
        endLimit: insuranceHealthParentPackage.hospitalizationEndLimit,
      },
      packageName: insuranceHealthParentPackage.packageName,
      packageLogo: insuranceHealthParentPackage.packageLogo,
      hospitalizationPerPerson:
        insuranceHealthParentPackage.hospitalizationPerPerson,
      dailyRoomAndBoardLimit: insuranceHealthParentPackage.dailyRoomBoardLimit,
      claimPayoutRatio: insuranceHealthParentPackage.claimPayoutRatio,
      hospitals: insuranceHealthParentPackage.hospitals,
      laboratories: insuranceHealthParentPackage.labs,
      icuCcuLimits: insuranceHealthParentPackage.icu,
      accidentalEmergencyLimits: insuranceHealthParentPackage.additionalLimit,
      ambulanceCoverage: insuranceHealthParentPackage.ambulanceService,
      specializedInvestigationCoverage:
        insuranceHealthParentPackage.investigation,
      waitingPeriod: insuranceHealthParentPackage.weeks,
      maternity: insuranceHealthParentPackage.maternity,
      policyDocument: insuranceHealthParentPackage.policyDocument,
      claimProcess: insuranceHealthParentPackage.claimProcess,
      heading: insuranceHealthParentPackage.heading,
      description: insuranceHealthParentPackage.packageDescription,
      actualPrice: currentData.actualPrice,
      perYear: currentData.perYear,
    };

    insuranceAddHealth_Parents(params)
      .then((res: any) => {
        navigate("/insurance/ParentsMian");
      })
      .catch((err: any) => {})
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
                placeholder="Actual Price "
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
              commonStyles.mb32
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
        </div>{" "}
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
