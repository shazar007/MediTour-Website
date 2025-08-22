import React, { useEffect, useState } from "react";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import style from "./index.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import Cards from "./Crads";
import { fvt_All } from "shared/services";
import { useNavigate } from "react-router-dom";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { FAVOURITES } from "shared/utils/mainHeaderQuery";
import CustomLoader from "shared/components/New_Loader/Loader";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const Favorites: React.FC = () => {
  const { t }: any = useTranslation();

  const [activeTab, setActiveTab] = useState<string>("Doctor");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let addS =
    activeTab === "Doctor" || activeTab === "Hospital" || activeTab === "Hotel"
      ? `${activeTab?.toLowerCase() + "s"}`
      : activeTab?.toLowerCase();

  useEffect(() => {
    getALL_Favourite();
  }, [activeTab]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const getALL_Favourite = () => {
    setLoading(true);
    const params = {
      favType: activeTab === "Travel Agency" ? "tour" : addS,
      page: 1,
    };

    fvt_All(params)
      .then((res: any) => {
        setData(res?.data?.favourites);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const handlePress = (card: any) => {
    let item = card?.item;
    if (card?.type === "doctor") {
      navigate(`/services/doctor/DoctorDetail`, {
        state: { serviceName: card?.type, doc: item },
      });
    } else if (card?.type === "hospitals") {
      navigate(`/services/hospital/HospitalDetail/${card?.item?._id}`, {
        state: { serviceName: "Hospital" },
      });
    } else if (card?.type == "laboratory") {
      navigate(`/services/laboratory/LabortoryDetail`, {
        state: { serviceName: "Lab", id: card?.item?._id },
      });
    } else if (card?.type == "rent a car") {
      navigate(`/services/rentacar/RentaCarDetail`, { state: { item: item } });
    } else if (card?.type === "tour") {
      navigate("/services/travel/TravelDetail", { state: { item: item } });
    } else if (card?.type === "donation") {
      navigate(`/services/donation/DonationPackeg`, { state: { items: item } });
    }
  };

  return (
    <div>
      <NavBreadCrumbs {...FAVOURITES(t)} />
      <div className={classNames(commonstyle.container)}>
        <div
          className={classNames(
            style.tabContainer,
            commonstyle.flx,
            commonstyle.col6,
            commonstyle.colsm12
          )}
        >
          {[
            "Doctor",
            "Hospital",
            "Laboratory",
            "Rent a Car",
            "Travel Agency",
            "Donation",
          ].map((tab) => (
            <button
              key={tab}
              className={classNames(
                style.tab,
                activeTab === tab && style.activeTab
              )}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={style.cardContainer}>
          {loading ? (
            <CustomLoader />
          ) : data.length > 0 ? (
            data?.map((card: any, index: any) => {
              return (
                <Cards
                  key={index}
                  onPressCard={() => handlePress(card)}
                  title={
                    card?.item?.name ||
                    card?.item?.packageName ||
                    card?.item?.donationTitle
                  }
                  type={card?.type}
                  subtitle={
                    card?.item?.speciality?.join(", ") ||
                    card?.type == "rent a car"
                      ? dayjs(card?.item).format("DD-MM-YYYY, h:mm a")
                      : card?.type == "tour"
                      ? `${dayjs(card?.item?.departDate).format(
                          "DD-MM-YYYY, h:mm a"
                        )} - ${dayjs(card?.item?.returnDate).format(
                          "DD-MM-YYYY, h:mm a"
                        )}`
                      : card?.type !== "donation"
                      ? `${card?.item?.openTime} - ${card?.item?.closeTime}`
                      : card?.item?.description
                  }
                  details={
                    card?.item?.qualifications ||
                    card?.item?.location?.address ||
                    card?.item?.packageDuration
                  }
                  rating={card?.rating}
                  imgSrc={
                    card?.item?.doctorImage ||
                    card?.item?.logo ||
                    (card?.item?.images && card?.item?.images[0])
                  }
                />
              );
            })
          ) : (
            <div
              className={classNames(commonstyle.flx, commonstyle.flxCenter)}
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div className={classNames(commonstyle.flx)}>
                <PhysiotheristsEmpty />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default Favorites;
