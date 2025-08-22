import React from "react";
import styles from "./ModelTermsAndCondition.module.css";
import logo from "../../../assets/images/smallLogo.png";
import { useTranslation } from "react-i18next";

const UserAgreement: React.FC = () => {
  const { t, i18n }: any = useTranslation();
  return (
    <div className={styles.termsContainer}>
      <div className={styles.logoContainer}>
        <img
          src={logo} // Replace with your logo path
          alt="The TMG Private Limited Logo"
          className={styles.logo}
        />
      </div>
      <h1 className={styles.heading}>{t("termsAndCondition")}</h1>
      <h2 className={styles.companyName}>TMG PRIVATE LIMITED</h2>
      <p className={styles.paragraph}>{t("termsAndConditionDesc_")}</p>
      <h3 className={styles.subheading}>1. {t("scopeOfServices")}</h3>
      <p className={styles.paragraph}>{t("scopeOfServicesDesc_")}:</p>
      <ol className={styles.list}>
        <li>{t("scopeOfServicesCon1_")}</li>
        <li>{t("scopeOfServicesCon2_")}</li>
        <li>{t("scopeOfServicesCon3_")}</li>
        <li>{t("scopeOfServicesCon4_")}</li>
        <li>{t("scopeOfServicesCon5_")}</li>
      </ol>
      <h3 className={styles.subheading}>
        2. {t("acknoeledgementAndDisclaimer")}
      </h3>
      <p className={styles.paragraph}>
        {t("ackAndDes_Con1")}{" "}
        <span className={styles.highlight}>
          {t("scopeOfServices").toLowerCase()}
        </span>{" "}
        {t("ackAndDes_Con2")}
      </p>
      <p className={styles.paragraph}>{t("ackAndDes_Con3")}</p>
      <h3 className={styles.subheading}>{t("nowThereFore_")}:</h3>
      <ul
        className={styles.list}
        style={{
          margin: "0 20px",
        }}
      >
        <li>
          <strong>{t("engagement")}:</strong> {t("engagement_Con")}
        </li>
        <li>
          <strong>{t("performanceObligations")}:</strong>{" "}
          {t("performanceObligations_Con")}
        </li>
        <li>
          <strong>{t("serviceScheduling")}:</strong>{" "}
          {t("serviceScheduling_Con")}
        </li>
        <li>
          <strong>{t("licensingRequirements")}:</strong>{" "}
          {t("licensingRequirements_Con")}
        </li>
        <li>
          <strong>{t("serviceStandards")}:</strong> {t("serviceStandards_Con")}
        </li>
        <li>
          <strong>{t("compensationAndBilling")}:</strong>{" "}
          {t("compensationAndBilling_Con")}
        </li>
        <li>
          <strong>{t("reportingAndDocumentation")}:</strong>{" "}
          {t("reportingAndDocumentation_Con")}
        </li>
        <li>
          <strong>{t("confidentiality")}:</strong> {t("confidentiality_Con")}
        </li>
        <li>
          <strong>{t("indemnification")}:</strong> {t("indemnification_Con")}
        </li>
        <li>
          <strong>{t("termination")}:</strong> {t("termination_Con")}
        </li>
        <li>
          <strong>{t("legalCompliance")}:</strong> {t("legalCompliance_Con")}
        </li>
        <li>
          <strong>{t("validityAndEnforceability")}:</strong>{" "}
          {t("validityAndEnforceability_Con")}
        </li>
        <li>
          <strong>{t("entireAgreement")}:</strong> {t("entireAgreement_Con")}
        </li>
        <li>
          <strong>{t("teermAndRenewal")}:</strong> {t("teermAndRenewal_Con")}
        </li>
        <li>
          <strong>{t("disputeResolution")}:</strong>{" "}
          {t("disputeResolution_Con")}
        </li>
      </ul>
      <h3 className={styles.subheading}>{t("acceptance")}</h3>
      <p className={styles.paragraph}>{t("acceptance_Con")}</p>

      <h3 className={styles.footer}>THE MEDITOUR PRIVATE LIMITED</h3>
      <p className={styles.contactInfo}>{t("ifYouHaveAnyQuery")}</p>
    </div>
  );
};

export default UserAgreement;
