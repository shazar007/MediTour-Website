import React, { useEffect, useState, useMemo } from "react";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import styles from "./style.module.css";
import TravelCards from "./TravelCards";
import Footerr from "pages/Home/HomeNavBar/Footer";
import TravelFlight from "./TravelFlight";
import { AddRemovedFev, getUpcomingTours } from "shared/services";
import { useDispatch } from "react-redux";
import { set_User } from "shared/redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import NewPagination from "shared/components/NewPagination/NewPagination";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import DoubleButton from "shared/components/Buttons/DoubleButton";
import { useDirection } from "shared/utils/DirectionContext";

type TabKey = "tour" | "flight";
type ApiResponse = any;
type FavouriteParams = {
  type: TabKey;
  itemId: string | number;
};

const TravelServices: React.FC = () => {
  const dispatch: any = useDispatch();
  const { t }: any = useTranslation();
  const { isRtl }: any = useDirection();

  const [activeTabKey, setActiveTabKey] = useState<TabKey>("tour");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const storedKey =
      (localStorage.getItem("selectedTabKey") as TabKey) || "tour";
    setActiveTabKey(storedKey);
  }, []);

  const handleTabClick = (key: TabKey) => {
    setActiveTabKey(key);
    localStorage.setItem("selectedTabKey", key);
  };

  const { data, isLoading }: any = useQuery<ApiResponse>({
    queryKey: ["Branches", currentPage],
    queryFn: () => getUpcomingTours(currentPage),
    placeholderData: true, // ✅ React Query v5: no flicker when page changes
    staleTime: 5 * 60 * 1000,
  });

  const data2 = data?.data?.upcomingSchedules;

  const handleFavourite = (id: string | number) => {
    const params: FavouriteParams = {
      type: activeTabKey,
      itemId: id,
    };

    AddRemovedFev(params)
      .then((res: any) => {
        dispatch(set_User(res?.data?.user));
        notifySuccess(res?.data?.message);
      })
      .catch(() => {});
  };

  const handleNextPage = () => {
    if (data?.data?.nextPage) {
      setCurrentPage(data.data.nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (data?.data?.previousPage) {
      setCurrentPage(data.data.previousPage);
    }
  };

  useEffect(() => {
    if (data?.data?.totalItems && totalItems === 0) {
      setTotalItems(data.data.totalItems);
    }
  }, [data, totalItems]);

  const tourHeaderContent = useMemo(
    () =>
      isRtl ? (
        <ServiceHeader
          headingBlue={t("meditourTravelWith")}
          headingOrange="Meditour"
          content={t("embarkOnTransformative")}
          Mirroreffect={true}
        />
      ) : (
        <ServiceHeader
          headingBlue={t("meditourTravelWith")}
          headingOrange={t("purpose")}
          content={t("embarkOnTransformative")}
          Mirroreffect={true}
        />
      ),
    [isRtl, t]
  );

  const flightHeaderContent = useMemo(
    () =>
      isRtl ? (
        <ServiceHeader
          headingBlue={t("meditourFlyWith")}
          headingOrange="Meditour"
          desc_width="70%"
          content={t("discoverANewWay_")}
          Mirroreffect={true}
        />
      ) : (
        <ServiceHeader
          headingBlue={t("meditourFlyWith")}
          headingOrange={t("purpose")}
          desc_width="70%"
          content={t("discoverANewWay_")}
          Mirroreffect={true}
        />
      ),
    [isRtl, t]
  );

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      {activeTabKey === "tour" ? tourHeaderContent : flightHeaderContent}

      <div>
        <div className={classNames(styles.container, commonstyle.mb32)}>
          <DoubleButton
            tab1Label={t("tour")}
            tab2Label={t("flight")}
            shift={activeTabKey === "tour" ? t("tour") : t("flight")}
            onTabChange={(tabLabel: any) => {
              const key = tabLabel === t("tour") ? "tour" : "flight";
              handleTabClick(key);
            }}
          />

          {activeTabKey === "tour" ? (
            <TravelCards
              data={data2}
              handlefavourite={handleFavourite}
              activeTab={activeTabKey}
              renderPagination={
                <NewPagination
                  onNext={handleNextPage}
                  onPrevious={handlePreviousPage}
                  startItem={(currentPage - 1) * itemsPerPage + 1}
                  endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                  totalItems={totalItems}
                />
              }
            />
          ) : (
            <TravelFlight />
          )}
        </div>
      </div>

      {isLoading && <CustomLoader />}
      <Footerr />
    </div>
  );
};

export default TravelServices;
