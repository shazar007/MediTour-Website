import style from "./PhyAvailability.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { getAvailability } from "shared/services/DoctorService";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function DoctorAvailability() {
  const { t, i18n }: any = useTranslation();
  const { data } = useQuery({
    queryKey: ["Availability"],
    queryFn: () => getAvailability(),
    staleTime: 5 * 60 * 1000,
  });

  let Availability = data?.data?.availability;
  const navigate = useNavigate();
  const { systemType } = useSelector((state: any) => state.root.common);

  interface CardData {
    heading: string;
    price: any;
    availabe: any;
    dayOfWeek: any;
    startTime: any;
    endTime: any;
  }
  const cardData: CardData[] = [
    {
      heading: "clinic",
      price: Availability?.[0]?.clinicAvailability?.price?.actualPrice,
      availabe: Availability?.[0]?.clinicAvailability?.availability,
      dayOfWeek: Availability?.[0]?.clinicAvailability?.availability,
      startTime: Availability?.[0]?.clinicAvailability?.availability,
      endTime: Availability?.[0]?.clinicAvailability?.availability,
    },

    {
      heading: "inHouse",
      price: Availability?.[0]?.inHouseAvailability?.price?.actualPrice,
      availabe: Availability?.[0]?.inHouseAvailability?.availability,
      dayOfWeek: Availability?.[0]?.inHouseAvailability?.availability,
      startTime: Availability?.[0]?.inHouseAvailability?.availability,
      endTime: Availability?.[0]?.inHouseAvailability?.availability,
    },
    {
      heading: "hospital",
      price: Availability?.[0]?.inHouseAvailability?.price?.actualPrice,
      availabe: Availability?.[0]?.inHouseAvailability?.availability,
      dayOfWeek: Availability?.[0]?.clinicAvailability?.availability,
      startTime: Availability?.[0]?.clinicAvailability?.availability,
      endTime: Availability?.[0]?.clinicAvailability?.availability,
    },
    {
      heading: "video_Consultancy",
      price: Availability?.[0]?.videoAvailability?.price?.actualPrice,
      availabe: Availability?.[0]?.videoAvailability?.availability,
      dayOfWeek: Availability?.[0]?.videoAvailability?.availability,
      startTime: Availability?.[0]?.videoAvailability?.availability,
      endTime: Availability?.[0]?.videoAvailability?.availability,
    },
  ];
  const handleGoToDetail = (type: any) => {
    let availabilityType =
      type === "clinic"
        ? "clinic"
        : type === "inHouse"
          ? "in-house"
          : type === "hospital"
            ? "hospital"
            : type === "video_Consultancy"
              ? "video"
              : "";

    let availabilityTitle =
      type === "clinic"
        ? "Clinic"
        : type === "inHouse"
          ? "in-house"
          : type === "hospital"
            ? "Hospital"
            : type === "videoConsultancy"
              ? "video"
              : "";

    navigate(`/${systemType}/availability/${type}`, {
      state: {
        availabilityType: availabilityType,
        availabilityTitle: availabilityTitle,
      },
    });
  };

  return (
    <div className={classNames(commonstyles.col12, style.doctorss)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        <div>
          <div className={classNames(commonstyles.flx)}>
            <p
              className={classNames(
                commonstyles.fs24,
                commonstyles.semiBold,
                commonstyles.mb24
              )}
            >
              {t("availabilityCategory")}
            </p>
          </div>
          <div className={style.cardWrapper}>
            {cardData.map((card) => (
              <div
                key={card.heading}
                className={style.cardContainer}
                onClick={() => handleGoToDetail(card.heading)}
              >
                <div className={style.cardHeader}>
                  <p className={classNames(style.cardHeading)}>
                    {t(card.heading)}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <FiEdit3 className={style.Icon} />
                    <p className={style.price}>Rs {card?.price}</p>
                  </div>
                </div>
                <p className={style.title}>
                  {t(card.heading)} {t("timing")}
                </p>

                <div className={style.timingCardWrapper}>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day, index) => (
                    <div className={style.timingCard} key={day}>
                      <p title={card.availabe?.[index] || "No Data"}>{day}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorAvailability;
