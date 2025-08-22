import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Notifications } from "shared/components";
import { RentACar_sidebarData } from "shared/utils";
import style from "./RentACar.module.css";
import PrivacyPolicy from "shared/components/PrivacyPolicy";
import VehicleDetail from "pages/TravelTourism/Rent a Car/VehicleDetail";
import RentAcarDashBoard from "pages/TravelTourism/Rent a Car/RentAcarDashBoard";
import RentAcarOrder from "pages/TravelTourism/Rent a Car/RentAcarOrder";
import RentAcarPayment from "pages/TravelTourism/Rent a Car/RentAcarPayment";
import RentAcarSetting from "pages/TravelTourism/Rent a Car/RentAcarSetting";
import VehicleDescription from "pages/TravelTourism/Rent a Car/VehicleDetail/VehicleDescription";
import Chat from "shared/components/Chat";
import RentAcarRequest from "pages/TravelTourism/Rent a Car/Request";
import CustomerDescription from "pages/TravelTourism/Rent a Car/RentAcarOrder/CustomerDetailDes";
import { RentACar_Payments_Details } from "pages";
import RentAcarHistory from "pages/TravelTourism/Rent a Car/History";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import { useSelector } from "react-redux";
import RentACarHistoryDetail from "pages/TravelTourism/Rent a Car/History/RentaCarHistoryDetail";
import { useTranslation } from "react-i18next";
import LanguageSelector from "shared/utils/LanguageSelector";

const RentACarMainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const { systemType, user } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/rentacar/dashboard");
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={RentACar_sidebarData(systemType, user)} />
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

        <Routes>
          <Route path="rentacar/dashboard" element={<RentAcarDashBoard />} />
          <Route path="rentacar/vehicleDetail" element={<VehicleDetail />} />
          <Route
            path="rentacar/vehicleDescription"
            element={<VehicleDescription />}
          />
          <Route path="rentacar/requests" element={<RentAcarRequest />} />
          <Route path="rentacar/orders" element={<RentAcarOrder />} />
          <Route
            path="rentacar/orderDetails"
            element={<CustomerDescription />}
          />
          <Route path="rentacar/history" element={<RentAcarHistory />} />
          <Route
            path="rentacar/history/details"
            element={<RentACarHistoryDetail />}
          />
          <Route path="rentacar/payments" element={<RentAcarPayment />} />
          <Route
            path="rentacar/paymentDetails"
            element={<RentACar_Payments_Details />}
          />
          <Route path="rentacar/setting" element={<RentAcarSetting />} />
          <Route path="rentacar/privacy" element={<PrivacyPolicy />} />
          <Route path="chat/message" element={<Chat />} />
          <Route
            path={`/rentacar/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
        </Routes>
      </div>{" "}
    </div>
  );
};

export default RentACarMainRoutes;
