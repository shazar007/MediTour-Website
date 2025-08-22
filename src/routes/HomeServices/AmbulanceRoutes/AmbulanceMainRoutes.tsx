import AmbulanceSetting from "pages/HomeServices/AmbulanceServices/AmbulanceSetting";
import AmbulanceDashBoard from "pages/HomeServices/AmbulanceServices/AmbulanceDashBoard";
import AmbulanceDocuments from "pages/HomeServices/AmbulanceServices/AmbulanceDocument";
import AmbulancePayment from "pages/HomeServices/AmbulanceServices/AmbulancePayment";
import AmbulanceRoutes from "pages/HomeServices/AmbulanceServices/OnRoute";
import AmbulanceRequest from "pages/HomeServices/AmbulanceServices/Request";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Notifications } from "shared/components";
import PrivacyPolicy from "shared/components/PrivacyPolicy";
import { Ambulance_sidebarData } from "shared/utils";
import Chat from "shared/components/Chat";
import PaymentDescrition from "pages/Donation/DonationPayment/PaymentDescrition";
import Profile from "shared/components/Profile";
import RequestDetail from "pages/HomeServices/AmbulanceServices/Request/RequestDetail";
import { Ambulance_Payments_Details } from "pages";
import style from "./ambulance.module.css";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageSelector from "shared/utils/LanguageSelector";
import OnRouteDetails from "pages/HomeServices/AmbulanceServices/OnRoute/onRouteDerails";
const AmbulanceMainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const { systemType, user } = useSelector((state: any) => state.root.common);

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/ambulance/dashboard");
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Ambulance_sidebarData(systemType, user)} />
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
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="ambulance/dashboard" element={<AmbulanceDashBoard />} />
          <Route path="ambulance/request" element={<AmbulanceRequest />} />
          <Route path="ambulance/request/Detail" element={<RequestDetail />} />
          <Route path="ambulance/onroutes" element={<AmbulanceRoutes />} />
          <Route
            path="ambulance/onroutes/Details"
            element={<OnRouteDetails />}
          />
          <Route path="ambulance/documents" element={<AmbulanceDocuments />} />
          <Route path="ambulance/payments" element={<AmbulancePayment />} />
          <Route
            path="ambulance/paymentDetails"
            element={<Ambulance_Payments_Details />}
          />
          <Route path="/payment/Description" element={<PaymentDescrition />} />
          <Route path="ambulance/setting" element={<AmbulanceSetting />} />
          <Route path="ambulance/privacy" element={<PrivacyPolicy />} />
          <Route path="chat/message" element={<Chat />} />
          <Route path="/profile" Component={Profile} />
          <Route
            path={`/ambulance/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
        </Routes>
      </div>{" "}
    </div>
  );
};

export default AmbulanceMainRoutes;
