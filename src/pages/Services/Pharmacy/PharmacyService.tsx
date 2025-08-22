import Footerr from "pages/Home/HomeNavBar/Footer";
import { useTranslation } from "react-i18next";
import PharmacyCards from "shared/PharmacyServices/PhamaycyCards";
import ServiceHeader from "shared/components/ServicesHeaders";

const PharmacyService = () => {

const {t} : any = useTranslation()

  return (
    <div>
      <ServiceHeader
        headingBlue={t("getYourMedications")}
        headingOrange={t("delivered")}
        desc_width="90%"
        content={t("welcomeToOur_")}
        Mirroreffect={true}
      />{" "}
      <PharmacyCards />
      <Footerr />
    </div>
  );
};

export default PharmacyService;
