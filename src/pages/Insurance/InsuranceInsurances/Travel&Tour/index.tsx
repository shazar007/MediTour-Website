import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./Travel.module.css";
import { useNavigate } from "react-router-dom";
import Single from "assets/images/single.png";
import Multi from "assets/images/multi.png";
import { useTranslation } from "react-i18next";

export default function TravelMian() {
  const navigate = useNavigate(); // Declare once
  const { t, i18n }: any = useTranslation();

  const handleGoNext = (value: any) => {
    navigate(`/insurance/TravelingWith/${value}`);
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
        <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
          {t("travel")}
        </p>

        <div className={commonstyles.outerContainer}>
          <div className={commonstyles.flx} style={{ gap: "24px" }}>
            <div
              className={style.myselfcard}
              onClick={() => handleGoNext("singleTrip")}
            >
              <p
                className={classNames(
                  commonstyles.fs20,
                  commonstyles.semiBold,
                  commonstyles.colorBlue
                )}
              >
                {t("singleTrip")}
              </p>
              <div className={classNames(style.textcontainer)}>
                <p className={classNames(commonstyles.fs16, style.textdata)}>
                  {t("singleTripCon_")}
                </p>
              </div>
              <img
                src={Single}
                alt="InsuranceSingle"
                className={style.healtImgss}
              />
            </div>
            <div
              className={style.myselfcard}
              onClick={() => handleGoNext("multipleTrips")}
            >
              <p
                className={classNames(
                  commonstyles.fs20,
                  commonstyles.semiBold,
                  commonstyles.colorBlue
                )}
              >
                {t("multiTravel")}
              </p>
              <div className={classNames(style.textcontainer)}>
                <p className={classNames(commonstyles.fs16, style.textdata)}>
                  {t("multiTravelCon_")}
                </p>
              </div>
              <img
                src={Multi}
                alt="InsuranceMulti"
                className={style.familyImg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
