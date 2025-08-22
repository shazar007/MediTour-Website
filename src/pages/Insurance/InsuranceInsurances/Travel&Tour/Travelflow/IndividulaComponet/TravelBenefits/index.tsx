import { useEffect } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { PrimaryButton } from "shared/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../single.module.css";
import { useSelector, useDispatch } from "react-redux";
import CustomSelect from "shared/components/CustomSelect";
import { insuranceTravelIndividualBenefitsSchema, Yes_No } from "shared/utils";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";

interface Props {
  handleClickNext: any;
}
export default function TravelBenefits(props: Partial<Props>) {
  const { t, i18n }: any = useTranslation();
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );
  const dispatch = useDispatch();
  const { handleClickNext } = props;
  const formik: any = useFormik({
    initialValues: {
      flghtDelay: addInsuranceForm?.flghtDelay || "",
      lossofPassport: addInsuranceForm?.lossofPassport || "",
      delayinArrival: addInsuranceForm?.delayinArrival || "",
      lossOfBaggage: addInsuranceForm?.lossOfBaggage || "",
    },
    validationSchema: Yup.object(insuranceTravelIndividualBenefitsSchema(t)),
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

  const handleSelect = (selectedOption: string, val: any) => {
    formik.setFieldValue(val, selectedOption);
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
          <div className={classNames(style.col6)}>
            <CustomSelect
              keyValue={"flghtDelay"}
              onSelect={handleSelect}
              placeholder={t("flightDelay")}
              value={formik?.values?.flghtDelay}
              options={Yes_No(t)}
            />
            {formik.touched.flghtDelay && formik.errors.flghtDelay ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.flghtDelay}
              </div>
            ) : null}
          </div>{" "}
          <div className={classNames(style.col6)}>
            <CustomSelect
              keyValue={"lossofPassport"}
              onSelect={handleSelect}
              placeholder={t("lossOfPassport")}
              value={formik?.values?.lossofPassport}
              options={Yes_No(t)}
            />
            {formik.touched.lossofPassport && formik.errors.lossofPassport ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.lossofPassport}
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
          <div className={classNames(style.col6)}>
            <CustomSelect
              keyValue={"delayinArrival"}
              onSelect={handleSelect}
              placeholder={t("delayInTheArrivalLuggage")}
              value={formik?.values?.delayinArrival}
              options={Yes_No(t)}
            />
            {formik.touched.delayinArrival && formik.errors.delayinArrival ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.delayinArrival}
              </div>
            ) : null}
          </div>{" "}
          <div className={classNames(style.col6)}>
            <CustomSelect
              keyValue={"lossOfBaggage"}
              onSelect={handleSelect}
              placeholder={t("lossOfBaggage")}
              value={formik?.values?.lossOfBaggage}
              options={Yes_No(t)}
            />
            {formik.touched.lossOfBaggage && formik.errors.lossOfBaggage ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.lossOfBaggage}
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
