import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Notifications, SideBar } from "shared/components";
import { Travel_sidebarData } from "shared/utils";
import PrivacyPolicy from "shared/components/PrivacyPolicy";
import TravelSetting from "pages/TravelTourism/Travel agency/TravelSetting";
import TravelDashBoard from "pages/TravelTourism/Travel agency/TravelDashBoard";
import TravelPayment from "pages/TravelTourism/Travel agency/TravelPayment";
import Booking from "pages/TravelTourism/Travel agency/Booking/index";
import PaymentDescritionTravel from "pages/TravelTourism/Travel agency/TravelPayment/PaymentDescritionTravel";
import Chat from "shared/components/Chat";
import TourPakages from "pages/TravelTourism/Travel agency/TravelFlight/Tour";
import TourPakageDetail from "pages/TravelTourism/Travel agency/TravelFlight/Tour/TourDetail";
import TicketDetail from "pages/TravelTourism/Travel agency/Booking/BookingTickets/TicketDetail";
import TourDetail from "pages/TravelTourism/Travel agency/Booking/BookingTour/TourDetail";
import TicketRequest from "pages/TravelTourism/Travel agency/TicketRequest";
import TicketRequestDetail from "pages/TravelTourism/Travel agency/TicketRequest/TicketRequestDetail";
import AddFlight from "pages/TravelTourism/Travel agency/TicketRequest/BidTicketFormTravel";
import BidsDetail from "pages/TravelTourism/Travel agency/TicketRequest/BidsDetail";
import TravelTicketShare from "pages/TravelTourism/Travel agency/TicketRequest/TravelTicketshare";
import { BookingDetailsFlight, TravelAgencyProfile } from "pages";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import style from "./travelagency.module.css";
import { useSelector } from "react-redux";
import AddTour from "pages/TravelTourism/Travel agency/TravelFlight/Tour/AddTour";
import Addbit from "pages/TravelTourism/Travel agency/TicketRequest/addbit";
import LanguageSelector from "shared/utils/LanguageSelector";
import { useTranslation } from "react-i18next";
const TravelAgencyMainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const { systemType, user } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/travelAgency/dashboard");
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Travel_sidebarData(systemType, user)} />
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
          <Route path="travelAgency/dashboard" element={<TravelDashBoard />} />
          <Route path="/travelAgency/tourPakages" element={<TourPakages />} />
          <Route path="/travelAgency/addTour" element={<AddTour />} />
          <Route
            path="/travelAgency/tourPakagesDetail/:id"
            element={<TourPakageDetail />}
          />
          <Route path="/travelAgency/addbit" element={<Addbit />} />
          <Route
            path="travelAgency/ticketRequests"
            element={<TicketRequest />}
          />
          <Route
            path="travelAgency/ticketRequests/Detail"
            element={<TicketRequestDetail />}
          />
          <Route
            path="travelAgency/ticketRequests/BidsDetail"
            element={<BidsDetail />}
          />
          <Route
            path="travelAgency/ticketRequests/TravelTicketshare"
            element={<TravelTicketShare />}
          />

          <Route path="travelAgency/booking" element={<Booking />} />
          <Route
            path="travelAgency/booking/bookingDetailsFlight"
            element={<BookingDetailsFlight />}
          />
          <Route
            path="/travelAgency/Booking/TicketDetail/:id"
            element={<TicketDetail />}
          />
          <Route
            path="/travelAgency/Booking/TourDetail/:id"
            element={<TourDetail />}
          />
          <Route path="/travelAgency/payments" element={<TravelPayment />} />
          <Route
            path="travelAgency/paymentDetails"
            element={<PaymentDescritionTravel />}
          />
          <Route path="travelAgency/setting" element={<TravelSetting />} />
          <Route path="travelAgency/privacy" element={<PrivacyPolicy />} />
          <Route path="/flights/Bid" element={<AddFlight />} />
          <Route path="chat/message" element={<Chat />} />
          <Route
            path="travelAgency/profile"
            element={<TravelAgencyProfile />}
          />
          <Route
            path={`/travelAgency/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
        </Routes>
      </div>{" "}
    </div>
  );
};

export default TravelAgencyMainRoutes;
