import Footerr from "pages/Home/HomeNavBar/Footer";
import { useNavigate } from "react-router-dom";
import ServiceHighlightCard from "shared/components/ServiceHighlightCard";
import styles from "./styles.module.css";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Nav_SelectionCards = ({ data }: { data?: any }) => {
  const { t }: any = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (name: any) => {
    console.log("🚀 ~ handleNavigate ~ name:", name);
    if (name === t("travelAgency")) {
      navigate("/services/travel");
    } else if (name === t("rentACar")) {
      navigate("/services/rentacar");
    } else if (name === t("ambulance")) {
      navigate("/services/ambulance");
    } else if (name === t("nurses")) {
      navigate("/services/paramedicstaff");
    } else {
      if (name === t("hospital")) {
        navigate("/services/hospital", {
          state: { serviceName: "Hospital" },
        });
      } else {
        navigate("/services/doctor", {
          state: { serviceName: name == "Doctors" ? t("doctor") : name },
        });
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <div>
        <ServiceHeader
          headingBlue={t("howCanWe")}
          headingOrange={t("assistYou")}
          desc_width="70%"
          content={t("howCanWeAssistContent")}
        />
      </div>
      <div style={{ backgroundColor: "#fdfdfd" }}>
        <div className={styles.container}>
          <ServiceHighlightCard data={data} onPress={handleNavigate} />
        </div>
      </div>
      <Footerr />
    </>
  );
};

export default Nav_SelectionCards;
