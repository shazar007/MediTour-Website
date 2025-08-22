import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import style from "./pharmaceutical.module.css";
import { Pharmaceutical_sidebarData } from "shared/utils";
import { Pharmaceutical_Dashboard } from "pages";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import { useSelector } from "react-redux";
import { Notifications } from "shared/components";
import { useTranslation } from "react-i18next";
import LanguageSelector from "shared/utils/LanguageSelector";
const Pharmaceutical_MainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const { systemType, user } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/pharmaceutical/dashboard");
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Pharmaceutical_sidebarData(systemType, user)} />
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
                  alt="UserLogo"
                  src={user?.logo}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route
            path="/pharmaceutical/dashboard"
            element={<Pharmaceutical_Dashboard />}
          />
          <Route
            path={`/pharmaceutical/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pharmaceutical_MainRoutes;
