import { useState } from "react";
import { ArrowBack, CustomStepper, PrimaryButton } from "shared/components";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import labMainStyles from "../../../mainInsurance.module.css";
import SearchBar from "shared/components/Searchbar";
import Policy from "../../Travel&Tour/Travelflow/IndividulaComponet/Policy";
import { useNavigate } from "react-router-dom";
import BasicInfoLimits from "./HealthMyself/BasicInfo&Limits";
import HospitalInsurance from "./HealthMyself/HospitalInsurance";
import LabInsurance from "./HealthMyself/LabInsurance";
import PriceInsurance from "./HealthMyself/Price";

const steps = [
  {
    id: "1",
    lable: "Basic Info & Limites",
  },
  {
    id: "2",
    lable: "Hospitals",
  },
  {
    id: "3",
    lable: "Labs",
  },
  {
    id: "4",
    lable: "Policy",
  },
  {
    id: "5",
    lable: "Price",
  },
];
const HealthMySelfFlow = () => {
  const navigate = useNavigate(); // Declare once

  const handleGoBack = () => {
    navigate("/insurance/Health");
  };

  const [screenName, setScreenName] = useState("Basic Info & Limites");
  const [selectedStep, setSelectedStep] = useState(0);

  const handleClickNext = () => {
    if (screenName == "Basic Info & Limites") {
      setScreenName("Hospitals");
    }

    if (screenName == "Hospitals") {
      setScreenName("Labs");
    }

    if (screenName == "Labs") {
      setScreenName("Policy");
    }
    if (screenName == "Policy") {
      setScreenName("Price");
    }
    if (selectedStep < 4) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const handleClicKPrev = () => {
    if (screenName === "Basic Info & Limites") {
      handleGoBack(); // Navigate to "/insurance/TravelingWith"
    }
    if (screenName == "Hospitals") {
      setScreenName("Basic Info & Limites");
    }

    if (screenName == "Labs") {
      setScreenName("Hospitals");
    }

    if (screenName == "Policy") {
      setScreenName("Labs");
    }

    if (screenName == "Price") {
      setScreenName("Policy");
    }
    if (selectedStep > 0) {
      setSelectedStep(selectedStep - 1);
    }
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <SearchBar />
      <div className={commonStyles.mr87}>
        <div
          className={classNames(
            commonStyles.flx,
            commonStyles.col12,
            commonStyles.colsm10,
            commonStyles.colmd10,
            commonStyles.mt40
          )}
        >
          <div className={classNames(commonStyles.mr24)}>
            <ArrowBack onClick={handleClicKPrev} />
          </div>
          <p
            className={classNames(
              commonStyles.semiBold,
              commonStyles.fs16,
              labMainStyles.mr203
            )}
          >
            Back
          </p>
          <p
            className={classNames(
              commonStyles.fs20,
              commonStyles.semiBold,
              commonStyles.colorBlue
            )}
          >
            Health / Myself
          </p>
        </div>
        <div
          className={classNames(
            commonStyles.col8,
            commonStyles.colmd10,
            commonStyles.colsm10,
            commonStyles.mt40
          )}
        >
          <CustomStepper steps={steps} selectedStep={selectedStep} />
        </div>
        <div
          className={classNames(
            commonStyles.col12,
            commonStyles.colmd9,
            commonStyles.colsm11,
            commonStyles.mt40
          )}
        >
          {screenName == "Basic Info & Limites" && <BasicInfoLimits />}
          {screenName == "Hospitals" && <HospitalInsurance />}
          {screenName == "Labs" && <LabInsurance />}
          {screenName == "Policy" && <Policy />}
          {screenName == "Price" && <PriceInsurance />}
        </div>
        <div style={{ width: "210px", marginTop: "56px" }}>
          <PrimaryButton
            children={"Next"}
            colorType={"blueOutline"}
            onClick={handleClickNext}
          />
        </div>
      </div>
    </div>
  );
};

export default HealthMySelfFlow;
