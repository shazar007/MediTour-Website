import { useEffect } from "react";
import Footerr from "../Footer";
import styles from "./PrivacyPolicies.module.css";
import PrivactPolicy2 from "shared/components/PrivacyPolicy/PrivactPolicy";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";

export default function PrivactPolicys() {
  const { t }: any = useTranslation();

  useEffect(() => {
    document.title = "MediTour Global | Privacy&Policies";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ServiceHeader
        headingBlue={t("privacy")}
        headingOrange={t("policy")}
        desc_width="60%"
        content={t("privacyPolicyDesc")}
      />
      <div className={styles.container}>
        <PrivactPolicy2 />
      </div>
      <Footerr />
    </div>
  );
}
