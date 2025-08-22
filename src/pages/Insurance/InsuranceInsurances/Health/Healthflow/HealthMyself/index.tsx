import { useState } from "react";
import { CustomStepper } from "shared/components";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import MYselfBasicInfoLimits from "./BasicInfo&Limits";
import MYselfHospitalInsurance from "./HospitalInsurance";
import MYselfPriceInsurance from "./Price";
import { useLocation, useNavigate } from "react-router-dom";
import MYselfBenefitsPolices from "./Benefits & Polices";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Healthsteps } from "shared/utils";

const HealthMySelfFlow = () => {
  const { t, i18n }: any = useTranslation();
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const [selectedHospitalIds, setSelectedHospitalIds] = useState<string[]>(
    addInsuranceForm?.selectedHospitals?.map((h: any) => h.id) || []
  );

  const [selectedHospitalNames, setSelectedHospitalNames] = useState<string[]>(
    addInsuranceForm?.selectedHospitals?.map((h: any) => h.name) || []
  );

  const [selectedLaboratoryIds, setSelectedLaboratoryIds] = useState<string[]>(
    addInsuranceForm?.selectedLaboratory?.map((h: any) => h.id) || []
  );

  const [selectedLaboratoryNames, setSelectedLaboratoryNames] = useState<
    string[]
  >(addInsuranceForm?.selectedLaboratory?.map((h: any) => h.name) || []);

  const [selectedStep, setSelectedStep] = useState(0);
  const handleClickNext = () =>
    selectedStep < 4 && setSelectedStep((prev) => prev + 1);
  const handleBack = () =>
    selectedStep === 0 ? navigate(-1) : setSelectedStep((prev) => prev - 1);

  const planType = state?.type;

  const stepComponents = [
    <MYselfBasicInfoLimits
      planType={planType}
      handleClickNext={handleClickNext}
    />,
    <MYselfHospitalInsurance
      stateKey="selectedHospitals"
      selectedIds={selectedHospitalIds}
      selectedNames={selectedHospitalNames}
      setSelectedIds={setSelectedHospitalIds}
      setSelectedNames={setSelectedHospitalNames}
      handleClickNext={handleClickNext}
    />,
    <MYselfHospitalInsurance
      stateKey="selectedLaboratory"
      selectedIds={selectedLaboratoryIds}
      selectedNames={selectedLaboratoryNames}
      setSelectedIds={setSelectedLaboratoryIds}
      setSelectedNames={setSelectedLaboratoryNames}
      handleClickNext={handleClickNext}
    />,
    <MYselfBenefitsPolices
      planType={planType}
      handleClickNext={handleClickNext}
    />,
    <MYselfPriceInsurance planType={planType} />,
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
        <div
          className={classNames(
            commonStyles.flx,
            commonStyles.col12,
            commonStyles.colsm10,
            commonStyles.colmd10
          )}
        >
          <p className={classNames(commonStyles.fs24, commonStyles.semiBold)}>
            {t("health")} / {t(planType)}
          </p>
        </div>
        <div className={classNames(commonStyles.outerContainer)}>
          <div className={classNames(commonStyles.mt24)}>
            <CustomStepper
              steps={Healthsteps(t)}
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

export default HealthMySelfFlow;
