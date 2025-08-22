import { useEffect } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../single.module.css";
import { useSelector, useDispatch } from "react-redux";
import CustomSelect from "shared/components/CustomSelect";
import { PrimaryButton } from "shared/components";
import {
  insuranceTravelIndividualMedicalInfoSchema,
  Yes_No,
} from "shared/utils";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";

interface Props {
  handleClickNext: any;
}
export default function MedicalBenefits(props: Partial<Props>) {
  const { t, i18n }: any = useTranslation();
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const dispatch = useDispatch();
  const { handleClickNext } = props;
  const formik: any = useFormik({
    initialValues: {
      medicalExpense: addInsuranceForm?.medicalExpense || "",
      repatriationofMortalRemains:
        addInsuranceForm?.repatriationofMortalRemains || "",
      repatriationInCaseIllness:
        addInsuranceForm?.repatriationInCaseIllness || "",
      returnofDependentChildren:
        addInsuranceForm?.returnofDependentChildren || "",
      deliveryOfMedicine: addInsuranceForm?.deliveryOfMedicine || "",
      emergencyReturnHome: addInsuranceForm?.emergencyReturnHome || "",
    },
    validationSchema: Yup.object(insuranceTravelIndividualMedicalInfoSchema(t)),
    onSubmit: () => {
      handleSubmit();
    },
  });
  const handleValue = (selectedOption: string, val: any) => {
    formik.setFieldValue(val, selectedOption);
  };

  const handleSubmit = () => {
    dispatch(
      setAddInsuranceForm({
        ...addInsuranceForm,
        ...formik.values,
      })
    );
    handleClickNext();
  };

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

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
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleValue}
              options={Yes_No(t)}
              keyValue={"medicalExpense"}
              value={formik?.values?.medicalExpense}
              placeholder={t("accidentalDeath&Disability")}
            />
            {formik.touched.medicalExpense && formik.errors.medicalExpense ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.medicalExpense}
              </div>
            ) : null}
          </div>
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleValue}
              value={formik?.values?.repatriationofMortalRemains}
              keyValue={"repatriationofMortalRemains"}
              options={Yes_No(t)}
              placeholder={t("repatriationMortalRemains")}
            />
            {formik.touched.repatriationofMortalRemains &&
            formik.errors.repatriationofMortalRemains ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.repatriationofMortalRemains}
              </div>
            ) : null}
          </div>{" "}
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleValue}
              keyValue={"repatriationInCaseIllness"}
              options={Yes_No(t)}
              value={formik?.values?.repatriationInCaseIllness}
              placeholder={t("medicalExpenses&Hospitalization")}
            />
            {formik.touched.repatriationInCaseIllness &&
            formik.errors.repatriationInCaseIllness ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.repatriationInCaseIllness}
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
          style={{ gap: "24px" }}
        >
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleValue}
              keyValue={"returnofDependentChildren"}
              value={formik?.values?.returnofDependentChildren}
              placeholder={t("emergencyReurnHomeCoverage")}
              options={Yes_No(t)}
            />
            {formik.touched.returnofDependentChildren &&
            formik.errors.returnofDependentChildren ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.returnofDependentChildren}
              </div>
            ) : null}
          </div>{" "}
          <div className={classNames(style.col4)}>
            <CustomSelect
              onSelect={handleValue}
              keyValue={"deliveryOfMedicine"}
              value={formik?.values?.deliveryOfMedicine}
              options={Yes_No(t)}
              placeholder={t("deliveryOfMedicine")}
            />
            {formik.touched.deliveryOfMedicine &&
            formik.errors.deliveryOfMedicine ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.deliveryOfMedicine}
              </div>
            ) : null}
          </div>
          <div className={classNames(style.col4)}>
            <CustomSelect
              placeholder={t("emergencyReurnHomeCoverage")}
              onSelect={handleValue}
              value={formik?.values?.emergencyReturnHome}
              keyValue={"emergencyReturnHome"}
              options={Yes_No(t)}
            />
            {formik.touched.emergencyReturnHome &&
            formik.errors.emergencyReturnHome ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.emergencyReturnHome}
              </div>
            ) : null}
          </div>
        </div>
        <div className={commonStyles.flxEnd}>
          <div style={{ width: "210px", marginTop: "24px" }}>
            <PrimaryButton
              children={t("next")}
              colorType={"New_blue"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
