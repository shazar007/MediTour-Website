import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./faqs.module.css";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "../Footer";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
export default function FAQpage() {
  const { t }: any = useTranslation();
  useEffect(() => {
    document.title = "MediTour Global | FAQ's";
    window.scrollTo(0, 0);
  });
  const [selected, setSelected] = useState("PATIENTS");

  const handleSelect = (text: any) => {
    setSelected(text);
  };
  return (
    <div>
      <ServiceHeader
        headingBlue={t("frequently")}
        headingOrange={t("askedQuestion")}
      />

      <div className={styles.container}>
        <div>
          <div className={styles.flexText}>
            <p
              style={{ cursor: "pointer" }}
              className={
                selected === "PATIENTS" ? styles.underline : styles.HeaderSelect
              }
              onClick={() => handleSelect("PATIENTS")}
            >
              {t("patients").toUpperCase()}
            </p>
            <p
              style={{ cursor: "pointer" }}
              className={
                selected === "PROVIDER" ? styles.underline : styles.HeaderSelect
              }
              onClick={() => handleSelect("PROVIDER")}
            >
              {t("provider").toUpperCase()}
            </p>
          </div>
          <div>
            {selected === "PATIENTS" && (
              <div>
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead1")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon1")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead2")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon2")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead3")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon3")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {" "}
                    {t("patientsHead4")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon4")}
                    <br /> <strong>{t("accessControl")}: </strong>{" "}
                    {t("accessControlCont")}
                    <br /> <strong>{t("confidentialityAgreements")}: </strong>
                    {t("confidentialityAgreementsCont")} <br />{" "}
                    <strong>{t("regularTraining")}: </strong>
                    {t("regularTrainingCont")} <br />{" "}
                    <strong> {t("riskAssessments")}: </strong>
                    {t("riskAssessmentsCont")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead5")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {/* {t("patientsCon5")} */}
                    <br />
                    {t("patientCon5_1")} <br />{" "}
                    <strong>{t("personalizedAssistance")}:</strong>{" "}
                    {t("personalizedAssistanceCont")}
                    <br /> <strong>{t("preOperativePreparation")}:</strong>{" "}
                    {t("preOperativePreparationCont")} <br />{" "}
                    <strong>{t("travelArrangements")}:</strong>{" "}
                    {t("travelArrangementsCont")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead6")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon6")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead7")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon7")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead8")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon8")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead9")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon9")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead10")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon10")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead11")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon11")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead12")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon12")}
                  </p>
                </div>
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead13")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon13")}
                  </p>
                </div>
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead14")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon14")}
                  </p>
                </div>
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead15")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon15")}
                  </p>
                </div>
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead16")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon16")}
                  </p>
                </div>
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("patientsHead17")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("patientsCon17")}
                  </p>
                </div>
              </div>
            )}
            {selected === "PROVIDER" && (
              <div>
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("providerHead1")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("providerCon1")}
                  </p>
                </div>
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("providerHead2")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("providerCon2")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("providerHead3")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("providerCon3")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("providerHead4")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("providerCon4")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("providerHead5")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("providerCon5")}:
                    <br /> <strong> {t("qualityStandards")}:</strong>{" "}
                    {t("qualityStandardsCon")}
                    <br /> <strong> {t("englishLanguageProficiency")}:</strong>
                    {t("englishLanguageProficiencyCon")} <br />{" "}
                    <strong> {t("experienceAndExpertise")}:</strong>
                    {t("experienceAndExpertiseCon")}
                    <br /> <strong>{t("availability")}: </strong>{" "}
                    {t("availabilityCon")}
                    <br /> <strong>{t("customerServiceSkills")}: </strong>
                    {t("customerServiceSkillsCon")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("providerHead6")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("providerCon6")}
                    <br /> <strong>{t("increasedVisibility")}: </strong>{" "}
                    {t("increasedVisibilityCon")} <br />{" "}
                    <strong>{t("costSavings")}:</strong>
                    {t("costSavingsCon")} <br />{" "}
                    <strong> {t("personalizedAssistance")}:</strong>
                    {t("personalizedAssistanceCon")}
                    <br /> <strong>{t("qualityAssurance")}:</strong>{" "}
                    {t("qualityAssuranceCon")} <br />{" "}
                    <strong> {t("competitiveAdvantage")}:</strong>{" "}
                    {t("competitiveAdvantageCon")}
                    <br /> <strong> {t("increasedRevenue")}: </strong>{" "}
                    {t("increasedRevenueCon")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("providerHead7")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("providerCon7")}: <br />{" "}
                    <strong>{t("partneringWith")}:</strong>{" "}
                    {t("partneringWithCon")} <br />{" "}
                    <strong>{t("screeningOf")}:</strong> {t("screeningOfCon")}{" "}
                    <br /> <strong>{t("patientFeedback")}:</strong>{" "}
                    {t("patientFeedbackCon")}
                    <br /> <strong>{t("onGoingMonitoring")}:</strong>{" "}
                    {t("onGoingMonitoringCon")}
                    <br /> <strong>{t("qualityAssuranceTeam")}:</strong>
                    {t("qualityAssuranceTeamCon")}
                    <br /> <strong>{t("complianceWith")}:</strong>
                    {t("complianceWithCon")}
                    <br /> <strong> {t("professionalismAndEthics")}:</strong>
                    {t("professionalismAndEthicsCon")}
                  </p>
                </div>{" "}
                <div className={classNames(styles.mt40)}>
                  <p
                    className={classNames(
                      styles.fs28,
                      commonstyles.semiBold,
                      styles.colorBlue
                    )}
                  >
                    {t("providerHead8")}
                  </p>{" "}
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      styles.textcolor,
                      styles.mt8
                    )}
                  >
                    {t("providerCon8")}
                    <br />
                    {t("providerCon8_1")}
                    <br />
                    {t("providerCon8_2")}
                    <br />
                    {t("providerCon8_3")}
                  </p>
                </div>{" "}
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>

      <Footerr />
    </div>
  );
}
