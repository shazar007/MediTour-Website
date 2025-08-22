import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Details.module.css";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import { IoMdArrowForward } from "react-icons/io";
import { getInsuranceDetails } from "shared/services";
import InsuranceGeneric from "shared/components/InsuranceGeneric";
import { useSelector } from "react-redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useDirection } from "shared/utils/DirectionContext";
import Footerr from "pages/Home/HomeNavBar/Footer";
const InsuranceDetails = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const location = useLocation();
  const { formType, item, passengerType, selectedPlan } = location.state || {};
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state: any) => state.root.common);
  useEffect(() => {
    get_Insurance();
  }, []);
  const get_Insurance = () => {
    setLoading(true);
    let params: any = {
      insuranceId: item?._id,
      type:
        formType === "health"
          ? selectedPlan?.toLowerCase()
          : passengerType?.toLowerCase(),
    };

    getInsuranceDetails(params)
      .then((res: any) => {
        setData(res.data.insurance);
      })
      .catch((err: any) => { })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoTo = () => {
    if (isLoggedIn) {
      navigate("/services/insurance/Insurancepay", {
        state: { data, selectedPlan, passengerType, formType },
      });
    } else {
      navigate("/user/login");
    }
  };

  return (
    <>
      <ServiceHeader
        headingBlue={t("HowCanWe")}
        headingOrange={t("AssistYou")}
        content={t("Exploreourcurated")}
        desc_width="80%"
      />
      <div className={classNames(commonstyle.container, commonstyle.mb32)}>
        <p
          className={classNames(
            commonstyle.colorBlue,
            commonstyle.fs24,
            commonstyle.semiBold
          )}
          style={{ marginBottom: "16PX" }}
        >
          {item?.packageName}
        </p>

        {formType === "travel" ? (
          <InsuranceGeneric
            data={data}
            value1={t("medicalCover")}
            labl1={data?.medicalCover}
            value3={t("coverUpto")}
            lable3={data?.coveringUpto}
            tab1={t("medicalBenefits")}
            tab3={t("policyDocuments")}
            tab2={t("travelBenefits")}
            m1={t("accidentalDeath&Disability")}
            m1Value={data?.adndCoverage}
            m2={t("medicalExpenses&Hospitalization")}
            m2Value={data?.medExpensesHospitalizationCoverage}
            m3={t("repatriationMortalRemains")}
            m3Value={data?.repatriationCoverage}
            m4={t("emergenciesReturnHome")}
            m4Value={data?.emergencyReturnHomeCoverage}
          />
        ) : (
          <InsuranceGeneric
            data={data}
            value1={t("hospitalizationCover")}
            labl1={`${data?.hospitalizationLimit?.startLimit}-${data?.hospitalizationLimit?.endLimit}`}
            value3={t("claimPayoutRatio")}
            lable3={data?.claimPayoutRatio}
            value5={t("dailyRoom&BoardLimit")}
            lable5={data?.dailyRoomAndBoardLimit}
            tab1={t("medicalBenifits")}
            tab2={t("policyDocuments")}
            tab3={t("claimProcess")}
            m1={"ICU / CCU"}
            m1Value={data?.icuCcuLimits}
            m2={t("coverageOfSpecializedInvestigation")}
            m2Value={data?.ambulanceCoverage}
            m3={t("ambulanceServicesCoverage")}
            m3Value={data?.ambulanceCoverage}
            m4={t("additionalLimitsAccidentalEmergencies")}
            showtab
            m4Value={data?.accidentalEmergencyLimits}
            tab4={t("moreFeatures")}
          />
        )}
        <div>
          <div className={style.showMoreContainer}>
            <div
              className={classNames(commonstyle.flx)}
              style={{ margin: "0 10px" }}
            >
              <p
                className={classNames(
                  commonstyle.colorBlue,
                  commonstyle.fs32,
                  commonstyle.semiBold
                )}
              >
                {t("price")} {data?.actualPrice}
              </p>
            </div>
            <div
              className={classNames(commonstyle.flx)}
              style={{ margin: "10px 10px 32px 0" }}
            >
              <button onClick={handleGoTo} className={style.showMoreButton}>
                {t("buy")}
                <span
                  className={style.icon}
                  style={
                    isRtl
                      ? {
                        transform: "rotate(180deg)",
                      }
                      : undefined
                  }
                >
                  <IoMdArrowForward />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && <CustomLoader />}
      <Footerr />
    </>
  );
};

export default InsuranceDetails;
