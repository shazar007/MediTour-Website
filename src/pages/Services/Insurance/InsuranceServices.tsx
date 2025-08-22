import React, { useEffect, useState } from "react";
import style from "./Style.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import img1 from "assets/images/travellogoInsurance.png";
import img2 from "assets/images/26233353_7197919 1.webp";
import img3 from "assets/images/travelBGInsurance.png";
import img4 from "assets/images/healthlogoInsurance.png";
import img5 from "assets/images/healthinsurance.png";
import img6 from "assets/images/healthBGInsurance.png";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import ServiceHighlightCard from "shared/components/ServiceHighlightCard";
import InsuranceTravel from "./Insurancetravel/Insurancetravel";
import InsuranceHealth from "./Insurancehealth/InsuranceHealth";

const InsuranceServices: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t }: any = useTranslation();
  const [show, setShow] = useState<any>(null);

  const handleShow = (title: string) => {
    setShow(title);
  };

  const data = [
    {
      title: t("travel"),
      content: t("Forpeaceofmindduringyour"),
      color: "#746CA2",
      icon: img1,
      coverImg: img2,
      infoBg: img3,
      BgColor: "#F3F3F7",
      top: "-70px",
    },
    {
      title: t("health"),
      content: t("Forconvenienthealthcareaccess"),
      color: "#746CA2",
      icon: img4,
      coverImg: img5,
      infoBg: img6,
      BgColor: "#F3F3F7",
      top: "-99px",
      type: "",
    },
  ];

  return (
    <div style={{ backgroundColor: "#fdfdfd" }}>
      <ServiceHeader
        headingBlue={t("HowCanWe")}
        headingOrange={t("AssistYou")}
        content={t("Exploreourcurated")}
        desc_width="80%"
      />

      <div className={style.outerwrapper}>
        {!show && (
          <div>
            <ServiceHighlightCard data={data} onPress={handleShow} />
          </div>
        )}

        {show === t("travel") && (
          <div style={{ width: "100%" }}>
            <InsuranceTravel />
          </div>
        )}
        {show === t("health") && (
          <div style={{ width: "100%" }}>
            <InsuranceHealth />
          </div>
        )}
      </div>

      <Footerr />
    </div>
  );
};
export default InsuranceServices;
