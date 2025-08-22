import { useEffect } from "react";
import style from "./vender.module.css";
import { useNavigate } from "react-router-dom";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setSystemType } from "shared/redux";
import { Vendor_cards } from "shared/utils";
import Footerr from "../Footer";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";
const Vender = () => {
  const { t, i18n }: any = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "MediTour Global | Vendors";
    window.scrollTo(0, 0);
  });
  const navigate = useNavigate();
  const handleNavigation = (type: string | null, route: string | null) => {
    if (!type || !route) {
      console.error("Invalid type or route");
      return;
    }
    dispatch(setSystemType(type));
    navigate(route);
  };
  return (
    <div>
      <ServiceHeader
        headingBlue={t("joinOurCommunity")}
        headingOrange={t("trustedPartners")}
        desc_width="75%"
        content={t("trustedPartnersContent")}
      />
      <div className={classNames(commonstyles.container)}>
        <div className={classNames(style.cardcontainer)}>
          {Vendor_cards.map((card) => (
            <div
              key={card.id}
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? style.CardOuterlang
                  : style.CardOuter
              }
              onClick={() => handleNavigation(card.type, card.route)}
            >
              <div
                className={style.ImgeContainer}
                style={{ backgroundColor: card.color }}
              >
                <img src={card.img} className={style.cardimage} />
              </div>
              <div
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? style.ContentContainerlang
                    : style.ContentContainer
                }
              >
                <p className={style.numbers}>{card.no}</p>
                <div>
                  <p className={style.title}>{t(card.name)}</p>
                  <p
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? style.content22
                        : style.content
                    }
                  >
                    {t(card.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default Vender;
