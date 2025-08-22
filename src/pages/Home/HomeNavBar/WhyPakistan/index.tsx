import style from "./style.module.css";
import { CardComponent, Cultural } from "shared/components";
import Footerr from "../Footer";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const WhyPakistan = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const { state } = useLocation();

  return (
    <div>
      <div className={style.scroolContentView}>
        <span className={style.MainHeading}>
          {t("medicalHealthTourismIn")}{" "}
          <span className={style.paklistan}>{state?.title} </span>
        </span>
        <div className={style.headingText}>{t(state?.details?.h1)}</div>
        <p
          className={style.subText}
          style={isRtl ? { lineHeight: "35px" } : {}}
        >
          {t(state?.details?.h2)}
        </p>
      </div>
      <div className={style.marginCard}>
        {state?.details?.topCards?.map((i: any) => (
          <Cardlayout i={i} t={t} />
        ))}
      </div>
      <CardComponent title={state?.title} img={state?.details?.Eco} />
      {state?.details?.culturaldata?.map((item: any) => (
        <Cultural data={item} title={state?.title} />
      ))}
      <div className={style.footerWrapper}>
        <Footerr />
      </div>
    </div>
  );
};

export default WhyPakistan;

const Cardlayout = ({ i, t }: any) => {
  const { isRtl } = useDirection();

  return (
    <div className={style.cardLayout}>
      <img src={i?.img} alt="whyPakistan" className={style.c1} />
      <p className={style.customText}>{t(i?.title)}</p>
      <p
        className={style.customTextpara}
        style={isRtl ? { lineHeight: "35px" } : {}}
      >
        {t(i?.subtitle)}
      </p>
    </div>
  );
};
