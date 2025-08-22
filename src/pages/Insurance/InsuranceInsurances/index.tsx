import React from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./InsuranceAA.module.css";
import Health from "assets/images/Health Insurance.png";
import Travel from "assets/images/Travel Insurance 2.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InsuranceInsurances: React.FC = () => {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();

  const handleGoToHealth = () => {
    navigate("/insurance/Health");
  };

  const handleGoToTravel = () => {
    navigate("/insurance/Travel");
  };

  return (
    <div className={classNames(commonstyles.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        {" "}
        <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
          {t("insurancePlan")}
        </p>
        <div className={commonstyles.outerContainer}>
          <div className={commonstyles.flx} style={{ gap: "24px" }}>
            <div className={style.healthCard} onClick={handleGoToHealth}>
              <p
                className={classNames(
                  commonstyles.fs20,
                  commonstyles.semiBold,
                  commonstyles.colorBlue
                )}
              >
                {t("health")}
              </p>
              <div className={style.textcontainer}>
                <p className={classNames(commonstyles.fs16, style.textdata)}>
                  {t("healthDes_")}
                </p>
              </div>
              <div className={style.healthimgconatiner}>
                <img src={Health} className={style.healthImg} alt="Health" />
              </div>
            </div>

            <div className={style.healthCard} onClick={handleGoToTravel}>
              <p
                className={classNames(
                  commonstyles.fs20,
                  commonstyles.semiBold,
                  commonstyles.colorBlue
                )}
              >
                {t("travel")}
              </p>
              <div className={style.textcontainer}>
                <p className={classNames(commonstyles.fs16, style.textdata)}>
                  {t("travelDes_")}
                </p>
              </div>
              <div className={style.healthimgconatiner}>
                <img src={Travel} className={style.healthImg} alt="Travel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceInsurances;
