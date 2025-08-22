import React, { useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField, PrimaryButton, RingLoader } from "shared/components";
import { insuranceAddHealth_Individual } from "shared/services/Insurance";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";
import { insurancePriceSchema_ } from "shared/utils";

export default function MYselfPriceInsurance({ planType }: { planType?: any }) {
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { insuranceMySelfPackage, addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const formik = useFormik({
    initialValues: {
      actualPrice: "",
      perYear: "",
    },
    validationSchema: Yup.object(insurancePriceSchema_(t)),

    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = () => {
    let currentData = formik.values;
    let criteriaKey = planType === "family" ? "yourAgeCriteria" : "ageCriteria";

    setLoading(true);

    let params = {
      [criteriaKey]: {
        startAge: insuranceMySelfPackage.insuranceAgestart,
        endAge: insuranceMySelfPackage.insuranceAgeend,
      },

      ...(planType === "family" && {
        spouseAgeCriteria: {
          startAge: insuranceMySelfPackage.spouseAgeStart,
          endAge: insuranceMySelfPackage.spouseAgeEnd,
        },
        kidsAge: {
          startAge: insuranceMySelfPackage.kidsAgeStart,
          endAge: insuranceMySelfPackage.kidsAgeEnd,
        },
      }),

      hospitalizationLimit: {
        startLimit: insuranceMySelfPackage.hospitalizationStartLimit,
        endLimit: insuranceMySelfPackage.hospitalizationEndLimit,
      },
      gender: insuranceMySelfPackage?.gender,
      packageName: addInsuranceForm.packageName,
      packageLogo: addInsuranceForm.packageLogo,
      hospitalizationPerPerson: addInsuranceForm.hospitalizationPerPerson,
      dailyRoomAndBoardLimit: addInsuranceForm.dailyRoomBoardLimit,
      claimPayoutRatio: addInsuranceForm.claimPayoutRatio,
      hospitals:
        addInsuranceForm.selectedHospitals?.map((h: any) => h.id) || [],
      laboratories:
        addInsuranceForm.selectedLaboratory?.map((l: any) => l.id) || [],
      icuCcuLimits: addInsuranceForm.icu,
      accidentalEmergencyLimits: addInsuranceForm.additionalLimit,
      ambulanceCoverage: addInsuranceForm.ambulanceService,
      ...(planType !== "family" && {
        specializedInvestigationCoverage:
          addInsuranceForm.coverageSpecializedInvestigation,
      }),

      waitingPeriod: addInsuranceForm.weeks,
      ...(planType !== "family" && {
        maternity: addInsuranceForm.maternity,
      }),

      policyDocument: addInsuranceForm.policyDocument,
      claimProcess: addInsuranceForm.claimProcess,
      heading: addInsuranceForm.heading,
      description: addInsuranceForm.description,
      actualPrice: currentData.actualPrice,
      perYear: currentData.perYear,
    };

    insuranceAddHealth_Individual(params, planType)
      .then((res: any) => {
        notifySuccess(t("insuranceAddedSuccessfully"));
        navigate("/insurance/Health");
        dispatch(setAddInsuranceForm({}));
      })
      .catch((err: any) => {
        notifyError(err.response.data?.message);
      })
      .finally(() => setLoading(false));
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
                placeholder={t("perYear")}
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
              disabled={loading}
              children={
                loading ? <RingLoader size={35} color={"#fff"} /> : t("submit")
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
