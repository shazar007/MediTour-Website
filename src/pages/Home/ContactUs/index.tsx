import { useEffect } from "react";
import classNames from "classnames";
import ContactUs from "../HomeNavBar/ContactUs";
import styles from "./contactUsPage.module.css";
import Footerr from "../HomeNavBar/Footer";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";

export default function ContactUsPage() {
  const { t }: any = useTranslation();
  console.log("find it ")

  useEffect(() => {
    document.title = "MediTour Global | Contact Us";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ServiceHeader
        headingBlue={t("contact")}
        headingOrange={t("_us")}
        content={t("contactUsContent")}
      />

      <div className={classNames(styles.Heading)} style={{ flex: 1 }}>
        <ContactUs />
      </div>

      <Footerr />
    </div>
  );
}
