import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Notifications } from "shared/components";
import PharmcyDashboard from "pages/Pharmacy/Pharmcydashborad/index";
import Pharmcyorder from "pages/Pharmacy/PharmcyOrder/index";
import PharmcyPayment from "pages/Pharmacy/PharmayPayment/index";
import { Pharmacy_sidebarData } from "shared/utils";
import PrivacyPolicy from "shared/components/PrivacyPolicy";
import Chat from "shared/components/Chat";
import PharOrderDetail from "pages/Pharmacy/PharmcyOrder/OrderDetail";
import Profile from "shared/components/Profile";
import style from "../Pharmacy/PhrmacyRoutes.module.css";
import { Pharmacy_Payments_Details } from "pages";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import { useSelector } from "react-redux";
import PhrRequest from "pages/Pharmacy/Request";
import PhrRequestDetails from "pages/Pharmacy/PhrRequestDetails";
import { useTranslation } from "react-i18next";
import LanguageSelector from "shared/utils/LanguageSelector";
const PharmacyMainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const { systemType, user } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/pharmacy/dashboard");
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Pharmacy_sidebarData(systemType, user)} />
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
          <Route path="pharmacy/dashboard" element={<PharmcyDashboard />} />
          <Route path="pharmacy/orders" element={<Pharmcyorder />} />
          <Route path="pharmacy/orderDetails" element={<PharOrderDetail />} />
          <Route path="pharmacy/payments" element={<PharmcyPayment />} />
          <Route path="pharmacy/requests" element={<PhrRequest />} />
          <Route
            path="pharmacy/requestDetail"
            element={<PhrRequestDetails />}
          />

          <Route
            path="/pharmacy/paymentDetails"
            element={<Pharmacy_Payments_Details />}
          />
          {/* <Route path="pharmacy/setting" element={<PharmacySetting />} /> */}
          <Route path="pharmacy/privacy" element={<PrivacyPolicy />} />
          <Route path="chat/message" element={<Chat />} />
          <Route path="/profile" Component={Profile} />
          <Route
            path={`/pharmacy/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default PharmacyMainRoutes;
