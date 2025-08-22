import { useEffect } from "react";
import Footerr from "pages/Home/HomeNavBar/Footer";
import LaboratoryCards from "./LaboratoryCards";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";

const LaboratoriesServices = () => {
  const { t }: any = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div>
        <ServiceHeader
          headingBlue={t("affordableLaboratory_")}
          headingOrange={t("comparisonQuality")}
          content={t("fromRoutine_")}
          desc_width="80%"
          Mirroreffect={true}
        />
      </div>
      <LaboratoryCards />
      <Footerr />
    </div>
  );
};

export default LaboratoriesServices;
