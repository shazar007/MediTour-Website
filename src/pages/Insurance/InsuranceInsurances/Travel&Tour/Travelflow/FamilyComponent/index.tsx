import { useState } from "react";
import { CustomStepper } from "shared/components";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import FamilyPrice from "./FamilyPrice";
import FamilyTravelBenefits from "./FamilyTravelBenefits";
import FamilyPolicy from "./FamilyPolicy";
import FamilyBasicInfoCovering from "./FamilyBasicInfoLimits";
import FamilyMedicalBenefits from "./FamilyMedicalBenefits";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalBenefits from "../IndividulaComponet/MedicalBenefits";
import TravelBenefits from "../IndividulaComponet/TravelBenefits";
import { useTranslation } from "react-i18next";
import { steps } from "shared/utils";

const FamilyComponent = () => {
  const { t, i18n }: any = useTranslation();
  const navigate: any = useNavigate();
  const { state }: any = useLocation();
  const [selectedStep, setSelectedStep] = useState(0);
  const type = state?.type;
  const routeReverse = state?.routeReverse;

  const handleClickNext = () =>
    selectedStep < 4 && setSelectedStep((prev) => prev + 1);

  const handleBack = () =>
    selectedStep === 0 ? navigate(-1) : setSelectedStep((prev) => prev - 1);

  const handleNavigate = () => {
    navigate(routeReverse, {
      state: {
        travelType: type,
        routeReverse: routeReverse,
        forceRefetch: true,
      },
    });
  };

  const stepComponents = [
    <FamilyBasicInfoCovering handleClickNext={handleClickNext} />, // step 0

    type === "singleIndividual" ? (
      <MedicalBenefits handleClickNext={handleClickNext} />
    ) : (
      <FamilyMedicalBenefits handleClickNext={handleClickNext} />
    ), // step 1

    type === "singleIndividual" ? (
      <TravelBenefits handleClickNext={handleClickNext} />
    ) : (
      <FamilyTravelBenefits handleClickNext={handleClickNext} />
    ), // step 2

    <FamilyPolicy handleClickNext={handleClickNext} />, // step 3

    <FamilyPrice type={type} handleClickNext={handleNavigate} />, // step 4
  ];

  return (
    <div className={classNames(commonStyles.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonStyles.pl36
            : commonStyles.pr36
        }
      >
        <div className={classNames(commonStyles.flx)}>
          <p
            className={classNames(commonStyles.semiBold, commonStyles.fs24)}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {type === "singleIndividual" || type === "multiIndividual"
              ? t("travelIndividual")
              : t("travelWithFamily")}
          </p>
        </div>
        <div className={classNames(commonStyles.outerContainer)}>
          <div className={classNames(commonStyles.col12, commonStyles.mt24)}>
            <CustomStepper
              steps={steps(t)}
              selectedStep={selectedStep}
              onBack={handleBack}
            />
          </div>

          <div className={classNames(commonStyles.mt24)}>
            {stepComponents[selectedStep]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyComponent;
