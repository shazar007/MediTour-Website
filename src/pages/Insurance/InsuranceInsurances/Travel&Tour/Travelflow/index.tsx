import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./travelflow.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Single from "assets/images/individual.png";
import Family from "assets/images/travelFamily.png";
import { useTranslation } from "react-i18next";

export default function TravelflowMain() {
  const navigate = useNavigate(); // Declare once
  const { t }: any = useTranslation();
  const { value } = useParams();
  const { state } = useLocation();

  const handleGoIndividual = (title: any) => {
    const handleType = value === "singleTrip" ? "single" : "multi";

    const handleRoute = `/insurance/TravelingWith/${value}/${handleType}${title}`;

    navigate(handleRoute, {
      state: {
        travelType: state?.travelType || `${handleType}${title}`,
        routeReverse: state?.routeReverse || handleRoute,
      },
    });
  };

  return (
    <div className={classNames(commonstyles.col12)}>
      {" "}
      <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
        {t("travel")}
      </p>
      <div className={commonstyles.outerContainer}>
        <div className={commonstyles.flx} style={{ gap: "24px" }}>
          <div
            className={style.travelcards}
            onClick={() => handleGoIndividual("Individual")}
          >
            <p
              className={classNames(
                commonstyles.fs20,
                commonstyles.bold,
                commonstyles.colorBlue
              )}
            >
              {t("individual")}
            </p>
            <div className={style.textconatiner}>
              <p className={classNames(commonstyles.fs16, style.textarea)}>
                {t("individualCon_")}
              </p>
            </div>

            <img src={Single} alt="individual" className={style.SingleTravel} />
          </div>
          <div
            className={style.travelcards}
            onClick={() => handleGoIndividual("Family")}
          >
            <p
              className={classNames(
                commonstyles.fs20,
                commonstyles.bold,
                commonstyles.colorBlue
              )}
            >
              {t("family")}
            </p>
            <div className={style.textconatiner}>
              <p className={classNames(commonstyles.fs16, style.textarea)}>
                {t("familyCon_")}
              </p>
            </div>
            <img src={Family} alt="Family" className={style.familyTravel} />
          </div>
        </div>
      </div>
    </div>
  );
}
