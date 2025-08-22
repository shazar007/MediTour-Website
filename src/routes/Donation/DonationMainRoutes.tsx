import DonationDashBoard from "pages/Donation/DonationDashBoard";
import DonationPayment from "pages/Donation/DonationPayment";
import DonationSetting from "pages/Donation/DonationSetting";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Notifications } from "shared/components";
import PrivacyPolicy from "shared/components/PrivacyPolicy";
import { Donation_sidebarData } from "shared/utils";
import Donors from "pages/Donation/Donors";
import PaymentDescrition from "pages/Donation/DonationPayment/PaymentDescrition";
import Chat from "shared/components/Chat";
import DonationDetail from "pages/Donation/Donationpackages/DonationDetail";
import DonorDetail from "pages/Donation/Donors/DonorDetail";
import DonationCategories from "pages/Donation/Donationpackages/DonationCateorige";
import DonationCruteria from "pages/Donation/DonationCriteria";
import CriteriaDetail from "pages/Donation/DonationCriteria/CriteriaDetail";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import LanguageSelector from "shared/utils/LanguageSelector";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import { useSelector } from "react-redux";
import style from "./donation.module.css";
import { useTranslation } from "react-i18next";
const DonationMainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/donation/dashboard");
  }, []);
  const { systemType, user } = useSelector((state: any) => state.root.common);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Donation_sidebarData(systemType, user, t)} />
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
                  alt="user_logo"
                  src={user?.logo}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/donation/dashboard" element={<DonationDashBoard />} />
          <Route path="/donation/criteria" element={<DonationCruteria />} />
          <Route
            path="/donation/criteria/Detail/:id"
            element={<CriteriaDetail />}
          />
          <Route path="/donation/packages" element={<DonationCategories />} />
          <Route
            path="/donation/packagesDetails/:id"
            element={<DonationDetail />}
          />
          <Route path="/donation/donors" element={<Donors />} />
          <Route path="/donorDetail/:id" element={<DonorDetail />} />
          <Route path="/donation/payment" element={<DonationPayment />} />
          <Route
            path="/donation/paymentDetails"
            element={<PaymentDescrition />}
          />
          <Route path="/donation/setting" element={<DonationSetting />} />
          <Route path="/donation/Privacy" element={<PrivacyPolicy />} />
          <Route path="chat/message" element={<Chat />} />
          <Route
            path={`/donation/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
        </Routes>
      </div>{" "}
    </div>
  );
};

export default DonationMainRoutes;
