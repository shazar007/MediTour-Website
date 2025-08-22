import classNames from "classnames";
import { useLocation } from "react-router-dom";
import style from "./Help.module.css";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";

const DonationCardDetail = () => {
  const { t }: any = useTranslation();
  const location = useLocation();
  const item = location.state?.item;
  return (
    <>
      <ServiceHeader
        headingBlue={t("GivetheGiftofHealing")}
        headingOrange={t("MakesaDifference")}
        content={t("Yourcontributionhelps_")}
        desc_width="80%"
      />
      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <>
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {item?.company?.name}
          </p>
          <div className={classNames(commonstyles.flx, commonstyles.flxCenter)}>
            <div className={style.mainimgconatiner}>
              <img
                src={item.company?.logo}
                alt="Company LOgo"
                className={style.mainimg}
              />
            </div>
          </div>
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {t("address")}
          </p>
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              commonstyles.colorGray
            )}
          >
            {item?.company?.location?.address}
          </p>
          <div className={style.marginTopDonation}></div>
        </>
      </div>

      <Footerr />
    </>
  );
};

export default DonationCardDetail;
