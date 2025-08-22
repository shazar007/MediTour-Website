import InsuranceDashboard from "pages/Insurance/InsuranceDashBoard";
import InsuranceInsurances from "pages/Insurance/InsuranceInsurances";
import HeathMain from "pages/Insurance/InsuranceInsurances/Health";
import HealthMySelfFlow from "pages/Insurance/InsuranceInsurances/Health/Healthflow/HealthMyself";
import TravelMian from "pages/Insurance/InsuranceInsurances/Travel&Tour";
import TravelflowMain from "pages/Insurance/InsuranceInsurances/Travel&Tour/Travelflow";
import FamilyComponent from "pages/Insurance/InsuranceInsurances/Travel&Tour/Travelflow/FamilyComponent";
import InsurancePayment from "pages/Insurance/InsurancePayment";
import PaymentDescritionInsurance from "pages/Insurance/InsurancePayment/PaymentDescritionInsurance";
import InsuranceRequest from "pages/Insurance/InsuranceRequest";
import InsuranceSetting from "pages/Insurance/InsuranceSetting";
import Insuredperson from "pages/Insurance/Insuredperson";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Notifications } from "shared/components";
import Chat from "shared/components/Chat";
import PrivacyPolicy from "shared/components/PrivacyPolicy";
import InsuredpersonDetail from "pages/Insurance/Insuredperson/InsuredpersonDetail";
import MySeflMain from "pages/Insurance/InsuranceInsurances/Health/Healthflow/HealthMyself/MySeflMain";
import MyselfDetail from "pages/Insurance/InsuranceInsurances/Health/Healthflow/HealthMyself/myselfDetail";
import SingleMain from "pages/Insurance/InsuranceInsurances/Travel&Tour/Travelflow/IndividulaComponet/SingleMain";
import RequestDetail from "pages/Insurance/InsuranceRequest/RequestDetail";
import FamilyBasicInfoCovering from "pages/Insurance/InsuranceInsurances/Travel&Tour/Travelflow/FamilyComponent/FamilyBasicInfoLimits";
import { TravelPackageDetails } from "pages";
import style from "./insurance.module.css";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import LanguageSelector from "shared/utils/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Insurance_sidebarData } from "shared/utils";

const InsuranceMainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const { systemType, user } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/insurance/dashboard");
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Insurance_sidebarData(systemType, user, t)} />
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
                  alt="GreenLogo"
                  src={user?.logo}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="insurance/dashboard" element={<InsuranceDashboard />} />
          <Route path="insurance/Category" element={<InsuranceInsurances />} />
          <Route
            path="insuredPerson/Detail"
            element={<InsuredpersonDetail />}
          />
          <Route path="insurance/request" element={<InsuranceRequest />} />
          <Route path="insurance/request/Detail" element={<RequestDetail />} />
          <Route path="insurance/insuredperson" element={<Insuredperson />} />
          <Route path="insurance/payments" element={<InsurancePayment />} />
          <Route
            path="insurance/paymentDetails"
            element={<PaymentDescritionInsurance />}
          />
          <Route path="insurance/setting" element={<InsuranceSetting />} />
          <Route path="insurance/Privacy" element={<PrivacyPolicy />} />
          <Route path="chat/message" element={<Chat />} />
          <Route path="/insurance/Health" element={<HeathMain />} />
          <Route path="/insurance/Travel" element={<TravelMian />} />
          <Route path="/insurance/form/*" element={<HealthMySelfFlow />} />
          <Route path="/insurance/Health/*" element={<MySeflMain />} />
          <Route path="/insurance/Health/Detail/*" element={<MyselfDetail />} />
          <Route
            path="/insurance/TravelingWith/:value"
            element={<TravelflowMain />}
          />

          <Route path="/insurance/TravelingWith/*" element={<SingleMain />} />

          <Route
            path="/insurance/Travel/:value"
            element={<FamilyComponent />}
          />

          <Route
            path="/insurance/Travel/Family/FamilyBasicInfoCovering"
            element={<FamilyBasicInfoCovering />}
          />
          <Route
            path="/insurance/Travel/Family/:value/TravelPackageDetails"
            element={<TravelPackageDetails />}
          />
          <Route
            path={`/insurance/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
        </Routes>
      </div>
    </div>
  );
};
export default InsuranceMainRoutes;
