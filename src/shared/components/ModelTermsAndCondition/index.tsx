import React from "react";
import styles from "./ModelTermsAndCondition.module.css";
import logo from "../../../assets/images/smallLogo.png";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const TermsAndConditions: React.FC = () => {
    const { t, i18n }: any = useTranslation();
    const { isRtl } = useDirection();

  const scopeOfServicesList = [
    t("scopeOfServicesCon1_"),
    t("scopeOfServicesCon2_"),
    t("scopeOfServicesCon3_"),
    t("scopeOfServicesCon4_"),
    t("scopeOfServicesCon5_"),
  ];

  const agreementPoints = [
    { title: t("engagement"), content: t("engagement_Con") },
    { title: t("performanceObligations"), content: t("performanceObligations_Con") },
    { title: t("serviceScheduling"), content: t("serviceScheduling_Con") },
    { title: t("licensingRequirements"), content: t("licensingRequirements_Con") },
    { title: t("serviceStandards"), content: t("serviceStandards_Con") },
    { title: t("reportingAndDocumentation"), content: t("reportingAndDocumentation_Con") },
    { title: t("confidentiality"), content: t("confidentiality_Con") },
    { title: t("indemnification"), content: t("indemnification_Con") },
    { title: t("termination"), content: t("termination_Con") },
    { title: t("legalCompliance"), content: t("legalCompliance_Con") },
    { title: t("validityAndEnforceability"), content: t("validityAndEnforceability_Con") },
    { title: t("entireAgreement"), content: t("entireAgreement_Con") },
    { title: t("teermAndRenewal"), content: t("teermAndRenewal_Con") },
    { title: t("disputeResolution"), content: t("disputeResolution_Con") },
    { title: t("serviceCharges"), content: t("serviceCharges_Con") },
  ];

  return (
    <div className={styles.termsContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="The TMG Private Limited Logo" className={styles.logo} />
      </div>

      <h1 className={styles.heading}>{t("termsAndCondition")}</h1>
      <h2 className={styles.companyName}>TMG PRIVATE LIMITED</h2>

      <p className={styles.paragraph} style={isRtl?{lineHeight:'34px'}:undefined}>{t("termsAndConditionDesc_")}</p>

      <h3 className={styles.subheading}>1. {t("scopeOfServices")}</h3>
      <p className={styles.paragraph} style={isRtl?{lineHeight:'34px'}:undefined}>{t("scopeOfServicesDesc_")}</p>
      <ol className={styles.list}>
        {scopeOfServicesList.map((item, idx) => (
          <li key={idx} style={isRtl?{textAlign:'right',textAlignLast:'right',lineHeight:'34px'}:{}}>{item}</li>
        ))}
      </ol>

      <h3 className={styles.subheading}>2. {t("acknoeledgementAndDisclaimer")}</h3>
      <p className={styles.paragraph} style={isRtl?{lineHeight:'34px'}:undefined}>
        {t("ackAndDes_Con1")}{" "}
        <span className={styles.highlight}>{t("scopeOfServices").toLowerCase()}</span>{" "}
        {t("ackAndDes_Con2")}
      </p>
      <p className={styles.paragraph} style={isRtl?{lineHeight:'34px'}:undefined}>{t("ackAndDes_Con3")}</p>

      <h3 className={styles.subheading}>{t("nowThereFore_")}:</h3>
      <ul className={styles.list}>
        {agreementPoints.map((point, idx) => (
          <li key={idx} style={isRtl?{textAlign:'right',textAlignLast:'right',lineHeight:'34px'}:{}}>
            <strong>{point.title}:</strong> {point.content}
          </li>
        ))}
      </ul>

      <h3 className={styles.subheading}>{t("acceptance")}</h3>
      <p className={styles.paragraph} style={isRtl?{lineHeight:'34px'}:undefined}>{t("acceptance_Con")}</p>

      <h3 className={styles.footer}>THE MEDITOUR PRIVATE LIMITED</h3>
      <p className={styles.contactInfo} style={isRtl?{lineHeight:'34px'}:undefined}>{t("ifYouHaveAnyQuery")}</p>
    </div>
  );
};

export default TermsAndConditions;
