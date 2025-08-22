import { useEffect } from "react";
import style from "./style.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Hotel_sidebarData } from "shared/utils";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import { useSelector } from "react-redux";
import ActivationCard from "shared/components/ActivationCard";
import HotelDashboard from "pages/TravelTourism/Hotels/HotelDashboard";
import HotalPayment from "pages/TravelTourism/Hotels/HotalPayment";
import PaymentDescription from "pages/TravelTourism/Hotels/HotalPayment/PaymentDescription";
import { AddProperty, HotelsBooking, Property } from "pages";
import HotelReserve from "pages/TravelTourism/Hotels/HotelReserve";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import { Notifications } from "shared/components";
import LanguageSelector from "shared/utils/LanguageSelector";
import { useTranslation } from "react-i18next";
const HotelMainAuth = () => {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  const { systemType, user } = useSelector((state: any) => state.root.common);
  useEffect(() => {
    navigate(`/${systemType}/dashboard`);
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Hotel_sidebarData(systemType, t)} />
      </div>
      <div className={style.tabbarCard} style={{ width: "100%" }}>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? style.tabbar1
              : style.tabbar
          }
        >
          <div
            style={{
              marginBottom: "16px",
              gap: "4px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? style.welcomeText2
                  : style.welcomeText
              }
            >
              {t("welcome")}
            </div>
            <div className={style.mainText}>{user?.name}</div>
          </div>
          <div
            className={style.gap32}
            style={{ display: "flex", alignItems: "center" }}
          >
            <LanguageSelector />
            <div
              className={style.gap32}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Notifications />
              <div className={style.greenTourism}>
                <img
                  src={user?.logo}
                  alt="UserLogo"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
        {user?.paidActivation === true ? null : <ActivationCard />}
        <Routes>
          <Route
            path={`/${systemType}/dashboard`}
            element={<HotelDashboard />}
          />
          <Route
            path={`/${systemType}/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
          <Route path="hotel/payments" element={<HotalPayment />} />
          <Route path="hotel/paymentDetails" element={<PaymentDescription />} />
          <Route path="hotel/property" element={<Property />} />
          <Route path="hotel/addProperty" element={<AddProperty />} />
          <Route path="hotel/reserve" element={<HotelReserve />} />
          <Route path="hotel/booking" element={<HotelsBooking />} />
        </Routes>
      </div>
    </div>
  );
};

export default HotelMainAuth;
