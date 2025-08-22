import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Notifications } from "shared/components";
import {
  Dashboard,
  Tests,
  Orders,
  Results,
  Payments,
  LaborteryProfile,
} from "pages/Laboratory";
import { Lab_sidebarData } from "shared/utils";
import Setting from "pages/Laboratory/LabSetting";
import PrivacyPolicy from "shared/components/PrivacyPolicy";
import Chat from "shared/components/Chat";
import TestDetail from "pages/Laboratory/Tests/TestDetails";
import OrderDetail from "pages/Laboratory/Orders/OrderDetail";
import Profile from "shared/components/Profile";
import ResultDetail from "pages/Laboratory/Results/resultDetails";
import { AddTest, Laboratory_Payments_Details } from "pages";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import { useSelector } from "react-redux";
import style from "./labRoute.module.css";
import Branches from "pages/Laboratory/Branches";
import { useTranslation } from "react-i18next";
import LanguageSelector from "shared/utils/LanguageSelector";

const LaboratoryMainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const { systemType, user } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/laboratory/dashboard");
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Lab_sidebarData(systemType, user, t)} />
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
                  alt="greenUserLogo"
                  src={user?.logo}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/laboratory/dashboard" Component={Dashboard} />
          <Route path="/laboratory/branches" Component={Branches} />
          <Route path="/laboratory/tests" Component={Tests} />
          <Route path="/laboratory/addTest" Component={AddTest} />
          <Route path="/testDetail/:id" Component={TestDetail} />
          <Route path="/laboratory/orders" Component={Orders} />
          <Route path="/laboratory/order/Detail/:id" Component={OrderDetail} />
          <Route path="/laboratory/results" Component={Results} />
          <Route
            path="/laboratory/result/Detail/:id"
            Component={ResultDetail}
          />
          <Route path="/laboratory/payments" Component={Payments} />
          <Route
            path="laboratory/LaborteryProfile"
            Component={LaborteryProfile}
          />
          <Route
            path="laboratory/paymentDetails"
            Component={Laboratory_Payments_Details}
          />
          <Route path="laboratory/setting" Component={Setting} />
          <Route path="laboratory/policy" Component={PrivacyPolicy} />
          <Route path="chat/message" Component={Chat} />
          <Route path="/profile" Component={Profile} />
          <Route
            path={`/laboratory/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
        </Routes>
      </div>{" "}
    </div>
  );
};

export default LaboratoryMainRoutes;
