import { useEffect } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { PrimaryButton } from "shared/components";
import CustomSelect from "shared/components/CustomSelect";
import {
  insuranceTravelFamilyBenefitsSchema,
  LossofPassport,
  Yes_No,
} from "shared/utils";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";

interface Props {
  handleClickNext: any;
}

export default function FamilyTravelBenefits(props: Partial<Props>) {
  const { t, i18n }: any = useTranslation();
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const dispatch = useDispatch();
  const { handleClickNext } = props;
  const formik: any = useFormik({
    initialValues: {
      tripCancel: addInsuranceForm?.tripCancel || "",
      delayinArrival: addInsuranceForm?.delayinArrival || "",
      flightDelay: addInsuranceForm?.flightDelay || "",
      travelandStay: addInsuranceForm?.travelandStay || "",
      lossofPassport: addInsuranceForm?.travelandStay || "",
      lossOfBaggage: addInsuranceForm?.lossOfBaggage || "",
    },
    validationSchema: Yup.object(insuranceTravelFamilyBenefitsSchema),
    onSubmit: (values) => {
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

  const handleValue = (selectedOption: string, val: any) => {
    formik.setFieldValue(val, selectedOption);
  };

  useEffect(() => {
    formik?.validateForm();
  }, [i18n?.language]);

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
              options={Yes_No(t)}
              keyValue={"tripCancel"}
              placeholder={t("tripCancelation")}
              value={formik?.values?.tripCancel}
              onSelect={handleValue}
            />
            {formik.touched.tripCancel && formik.errors.tripCancel ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.tripCancel}
              </div>
            ) : null}
          </div>

          <div className={classNames(commonStyles.col6)}>
            <CustomSelect
              options={LossofPassport(t)}
              keyValue={"delayinArrival"}
              placeholder={t("delayInTheArrivalLuggage")}
              value={formik?.values?.delayinArrival}
              onSelect={handleValue}
            />
            {formik.touched.delayinArrival && formik.errors.delayinArrival ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.delayinArrival}
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
          <div className={classNames(commonStyles.col6, commonStyles.mr24)}>
            <CustomSelect
              options={Yes_No(t)}
              keyValue={"flightDelay"}
              placeholder={t("flightDelay")}
              value={formik?.values?.flightDelay}
              onSelect={handleValue}
            />
            {formik.touched.flightDelay && formik.errors.flightDelay ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.flightDelay}
              </div>
            ) : null}
          </div>

          <div className={classNames(commonStyles.col6)}>
            <CustomSelect
              options={Yes_No(t)}
              keyValue={"travelandStay"}
              placeholder={t("travelAndStayOverOneFamilyMember")}
              value={formik?.values?.travelandStay}
              onSelect={handleValue}
            />
            {formik.touched.travelandStay && formik.errors.travelandStay ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.travelandStay}
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
          <div className={classNames(commonStyles.col6, commonStyles.mr24)}>
            <CustomSelect
              options={Yes_No(t)}
              keyValue={"lossofPassport"}
              placeholder={t("lossOfPassport")}
              value={formik?.values?.lossofPassport}
              onSelect={handleValue}
            />
            {formik.touched.lossofPassport && formik.errors.lossofPassport ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.lossofPassport}
              </div>
            ) : null}
          </div>

          <div className={classNames(commonStyles.col6)}>
            <CustomSelect
              options={Yes_No(t)}
              keyValue={"lossOfBaggage"}
              placeholder={t("lossOfBaggage")}
              value={formik?.values?.lossOfBaggage}
              onSelect={handleValue}
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
