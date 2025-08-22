import React from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { InputField, PrimaryButton } from "shared/components";
import style from "../single.module.css";
import { useFormik } from "formik";
import { insuranceAddTravel_Individual } from "shared/services/Insurance";
import { useNavigate, useParams } from "react-router-dom";
interface Props {
  handleClickNext: any;
}
export default function Price(props: Partial<Props>) {
  const { value } = useParams();
  const { insuranceTravelIndividual } = useSelector(
    (state: any) => state.root.insurance
  );

  const { handleClickNext } = props;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/insurance/Travel");
  };

  const formik = useFormik({
    initialValues: {
      actualPrice: "",
      perYear: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = () => {
    let currentData = formik.values;
    let params = {
      packageName: insuranceTravelIndividual.packageName,
      packageLogo: insuranceTravelIndividual.packageLogo,
      packageDescription: insuranceTravelIndividual.packageDescription,
      medicalCover: insuranceTravelIndividual.medicalCover,
      coveringUpto: insuranceTravelIndividual.coveringUpTo,
      packageCategory: insuranceTravelIndividual.packageCategory,
      repatriationCoverage:
        insuranceTravelIndividual.repatriationofMortalRemains,
      medExpensesHospitalizationCoverage:
        insuranceTravelIndividual.medicalExpense,
      returnOfDependentChildrenCoverage:
        insuranceTravelIndividual.returnofDependentChildren,
      repatriationIllnessInjuryCoverage:
        insuranceTravelIndividual.repatriationInCaseIllness,
      emergencyReturnHomeCoverage:
        insuranceTravelIndividual.emergencyReturnHome,
      medicineDeliveryCoverage: insuranceTravelIndividual.deliveryOfMedicine,
      flightDelay: insuranceTravelIndividual.flghtDelay,
      passportLoss: insuranceTravelIndividual.lossofPassport,
      luggageArrivalDelay: insuranceTravelIndividual.delayinArrival,
      baggageLoss: insuranceTravelIndividual.lossOfBaggage,
      policyDocument: insuranceTravelIndividual.PolicyDocument,
      actualPrice: currentData.actualPrice,
      // meditourPrice: currentData.meditourPrice,
      perYear: currentData.perYear,
      tripType: value,
      countrySelection: insuranceTravelIndividual.CountryName,
    };

    insuranceAddTravel_Individual(params)
      .then((res: any) => {
        handleNavigate();
      })
      .catch((err: any) => {})
      .finally(() => {});

    handleClickNext();
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <form onSubmit={formik.handleSubmit}>
        <div
          className={classNames(
            commonStyles.flx,
            commonStyles.col12,
            commonStyles.mb24
          )}
          style={{ gap: "24px" }}
        >
          <div className={classNames(style.col6)}>
            <InputField
              placeholder="Price "
              id="actualPrice"
              name="actualPrice"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  formik.handleChange(e);
                }
              }}
              value={formik.values.actualPrice}
            />
            {formik.touched.actualPrice && formik.errors.actualPrice ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.actualPrice}
              </div>
            ) : null}
          </div>

          <div className={classNames(style.col6)}>
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
        <div className={commonStyles.flxEnd}>
          <div style={{ width: "210px", marginTop: "24px" }}>
            <PrimaryButton
              children={"Next"}
              colorType={"New_blue"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
