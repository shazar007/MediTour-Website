import { useEffect, useState } from "react";
import Footerr from "../../../../Footer";
import classNames from "classnames";
import DoubleButton from "shared/components/Buttons/DoubleButton";
import Ambulance from "../../AmbulanceRequest/Ambulance";
import TravelRequest from "..";
import { getAllFlights, getUserAmbulanceReq } from "shared/services";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import CustomLoader from "shared/components/New_Loader/Loader";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";

const RequestAllow = () => {
  const { t, i18n }: any = useTranslation();
  const [activeTab, setActiveTab] = useState("flight");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (activeTab === "ambulance") {
      getRequestUser();
    } else {
      flightsRequest();
    }
  }, [activeTab]);

  useEffect(() => {}, [i18n.language]);

  const getRequestUser = () => {
    let data = {
      page: 1,
    };
    getUserAmbulanceReq(data)
      .then((res: any) => {
        setData(res.data.userRequests);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const flightsRequest = () => {
    let data = {
      page: 1,
    };
    getAllFlights(data)
      .then((res: any) => {
        setData(res.data.flightRequests || []);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleTabChange = (label: string) => {
    if (label === t("ambulance")) {
      setActiveTab("ambulance");
    } else {
      setActiveTab("flight");
    }
  };
  return (
    <div>
      <div className={classNames(style.maincontainer)}>
        <ServiceHeader
          headingBlue={t("my")}
          headingOrange={t("requests")}
          desc_width="70%"
          content={t("chooseFromAWideRange_")}
        />
        <DoubleButton
          tab1Label={t("flight")}
          tab2Label={t("ambulance")}
          shift={t(activeTab)}
          onTabChange={handleTabChange}
        />
        {loading ? (
          <CustomLoader />
        ) : data && data.length > 0 ? (
          activeTab === "ambulance" ? (
            <Ambulance data={data} />
          ) : (
            <TravelRequest data={data} flightsRequest={flightsRequest} />
          )
        ) : (
          <PhysiotheristsEmpty />
        )}
      </div>
      <Footerr />
    </div>
  );
};

export default RequestAllow;
