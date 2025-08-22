import { useEffect } from "react";
import RentaCards from "./RentaCards";
import Footerr from "pages/Home/HomeNavBar/Footer";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";

const RentaCarService = () => {
  const { t }: any = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ backgroundColor: "#FDFDFD" }}>
      <ServiceHeader
        headingBlue={t("chooseARentalCarService_")}
        headingOrange={t("yourSafeJourney")}
        content={t("weUnderstandThatReliable_")}
        desc_width="80%"
        Mirroreffect={true}
      />

      <RentaCards />
      <Footerr />
    </div>
  );
};

export default RentaCarService;
