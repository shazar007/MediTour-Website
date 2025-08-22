import React, { useEffect, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import { useFormik } from "formik";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { InputField, PrimaryButton, RingLoader } from "shared/components";
import style from "../travelFamily.module.css";
import { insuranceADDFAMILYTRAVEL } from "shared/services/Insurance";
import * as Yup from "yup";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";
import { insuranceTravelPriceSchema } from "shared/utils";

interface Props {
  handleClickNext: any;
  type: any;
}

export default function FamilyPrice(props: Partial<Props>) {
  const { t, i18n }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const { type, handleClickNext } = props;

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      actualPrice: "",
      perYear: "",
    },
    validationSchema: Yup.object(insuranceTravelPriceSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = () => {
    setLoading(true);
    let currentData = formik.values;
    let params = {
      packageName: addInsuranceForm.packageName,
      packageLogo: addInsuranceForm.packageLogo,
      packageDescription: addInsuranceForm.packageDescription,
      medicalCover: addInsuranceForm.medicalCover,
      coveringUpto: addInsuranceForm.coveringUpTo,
      packageCategory: addInsuranceForm.packageCategory,
      repatriationCoverage: addInsuranceForm.repatriationofMortalRemains,
      medExpensesHospitalizationCoverage:
        addInsuranceForm.expensesHospitalization,
      emergencyReturnHomeCoverage: addInsuranceForm.emergencyReturnHome,
      luggageArrivalDelay: addInsuranceForm.delayinArrival,
      flightDelay: addInsuranceForm.flightDelay,
      passportLoss: addInsuranceForm.lossofPassport,
      baggageLoss: addInsuranceForm.lossOfBaggage,
      policyDocument: addInsuranceForm.PolicyDocument,
      actualPrice: currentData.actualPrice,
      perYear: currentData.perYear,
      countrySelection: addInsuranceForm.CountryName,

      ...(type === "singleIndividual" && {
        returnOfDependentChildrenCoverage:
          addInsuranceForm?.returnofDependentChildren || "",
        repatriationIllnessInjuryCoverage:
          addInsuranceForm?.repatriationInCaseIllness || "",
        medicineDeliveryCoverage: addInsuranceForm?.deliveryOfMedicine || "",
      }),

      ...(type === "singleFamily" && {
        adndCoverage: addInsuranceForm.accidentalDisability,
        tripCancellation: addInsuranceForm.tripCancel,
        travelStayOverOneFamMember: addInsuranceForm.travelandStay,
      }),

      tripType:
        type === "singleIndividual" || type === "singleFamily"
          ? "singleTrip"
          : "multipleTrips",
    };

    insuranceADDFAMILYTRAVEL(params, type)
      .then((res: any) => {
        notifySuccess(t("insuranceAddedSuccessfully"));
        dispatch(setAddInsuranceForm({}));
        handleClickNext();
      })
      .catch((err: any) => {
        console.log("🚀 ~ handleSubmit ~ err:", err?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
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
            <InputField
              placeholder={t("price")}
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
              placeholder={t("perYear")}
              id="perYear"
              name="perYear"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  formik.handleChange(e);
                }
              }}
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
              disabled={loading}
              children={
                loading ? <RingLoader color={"#fff"} size={34} /> : t("next")
              }
              colorType={"New_blue"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
