import { useEffect } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./single.module.css";
import { Avatar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { insuranceGETNDIVIDUALTRAVEL } from "shared/services/Insurance";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";

export default function SingleMain() {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  const { state }: any = useLocation();
  const type = state?.travelType;
  const routeReverse = state?.routeReverse;

  const params = {
    type: type,
    tripType:
      type === "singleIndividual" || type === "singleFamily"
        ? "singleTrip"
        : "multipleTrips",
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["travel/Individual_Family", params],
    queryFn: () => insuranceGETNDIVIDUALTRAVEL(params),
    staleTime: 5 * 60 * 1000,
  });

  const myData = data?.data?.insurances;

  useEffect(() => {
    if (state?.forceRefetch) {
      refetch();
    }
  }, [state?.forceRefetch]);

  const handleGoAddData = () => {
    navigate(`/insurance/Travel/FillForm`, {
      state: {
        type: type,
        routeReverse: routeReverse,
      },
    });
  };

  const handleGoToMyselfDetail = (item: any) => {
    navigate("/insurance/Travel/Family/${value}/TravelPackageDetails", {
      state: { item: item, type },
    });
  };

  if (isLoading) {
    return <CustomLoader />;
  }

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
        <div className={commonstyles.flxBetween}>
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {t("travel")}
          </p>

          <button className={style.AddBtn} onClick={handleGoAddData}>
            + {t("add")}{" "}
          </button>
        </div>
        <div className={commonstyles.outerContainer}>
          <div className={style.flxWrap} style={{ gap: "24px" }}>
            {myData?.map((item: any) => (
              <div
                className={style.myselfIncCard}
                onClick={() => handleGoToMyselfDetail(item)}
              >
                <Avatar src={item?.packageLogo} className={style.profile} />
                <p
                  className={classNames(
                    commonstyles.fs20,
                    commonstyles.semiBold
                  )}
                >
                  {item?.packageName}
                </p>
                <p className={classNames(commonstyles.fs15, style.mt16)}>
                  {item?.packageDescription}
                </p>
                <p
                  className={classNames(
                    commonstyles.fs15,
                    style.mt8,
                    commonstyles.semiBold
                  )}
                  style={{ color: "#7d7d7d" }}
                >
                  75k - 2Lac
                </p>
                <p
                  className={classNames(
                    commonstyles.fs15,
                    style.mt16,
                    commonstyles.semiBold
                  )}
                >
                  {item?.tripType}
                </p>
                <p
                  className={classNames(
                    commonstyles.fs15,
                    style.mt8,
                    commonstyles.semiBold
                  )}
                >
                  80%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
