import { useEffect } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import CustomSelect from "shared/components/CustomSelect";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { PrimaryButton } from "shared/components";
import { insuranceTravelFamilyMedicalInfoSchema, Yes_No } from "shared/utils";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";

interface Props {
  handleClickNext: any;
}
export default function FamilyMedicalBenefits(props: Partial<Props>) {
  const { t, i18n }: any = useTranslation();
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const dispatch = useDispatch();
  const { handleClickNext } = props;
  const formik: any = useFormik({
    initialValues: {
      accidentalDisability: addInsuranceForm?.accidentalDisability || "",
      repatriationofMortalRemains:
        addInsuranceForm?.repatriationofMortalRemains || "",
      expensesHospitalization: addInsuranceForm?.expensesHospitalization || "",
      emergencyReturnHome: addInsuranceForm?.emergencyReturnHome || "",
    },
    validationSchema: Yup.object(insuranceTravelFamilyMedicalInfoSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSelect = (selectedOption: string, val: any) => {
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
            commonStyles.mb32
          )}
        >
          <div className={classNames(commonStyles.col6, commonStyles.mr24)}>
            <CustomSelect
              keyValue={"accidentalDisability"}
              onSelect={handleSelect}
              value={formik?.values?.accidentalDisability}
              options={Yes_No(t)}
              placeholder={t("accidentalDeath&Disability")}
            />
            {formik.touched.accidentalDisability &&
            formik.errors.accidentalDisability ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.accidentalDisability}
              </div>
            ) : null}
          </div>

          <div className={classNames(commonStyles.col6)}>
            <CustomSelect
              keyValue={"repatriationofMortalRemains"}
              onSelect={handleSelect}
              value={formik?.values?.repatriationofMortalRemains}
              options={Yes_No(t)}
              placeholder={t("repatriationMortalRemains")}
            />
            {formik.touched.repatriationofMortalRemains &&
            formik.errors.repatriationofMortalRemains ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.repatriationofMortalRemains}
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
          <div className={classNames(commonStyles.col6, commonStyles.mr24)}>
            <CustomSelect
              keyValue={"expensesHospitalization"}
              onSelect={handleSelect}
              value={formik?.values?.expensesHospitalization}
              options={Yes_No(t)}
              placeholder={t("medicalExpenses&Hospitalization")}
            />
            {formik.touched.expensesHospitalization &&
            formik.errors.expensesHospitalization ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.expensesHospitalization}
              </div>
            ) : null}
          </div>

          <div className={classNames(commonStyles.col6)}>
            <CustomSelect
              keyValue={"emergencyReturnHome"}
              onSelect={handleSelect}
              value={formik?.values?.emergencyReturnHome}
              placeholder={t("emergencyReurnHomeCoverage")}
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
