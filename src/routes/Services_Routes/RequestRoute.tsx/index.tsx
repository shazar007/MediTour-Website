import BookingPayments from "pages/Home/HomeNavBar/NavBarr/Rewquest/AmbulanceRequest/BookingPayments";
import RequestAllow from "pages/Home/HomeNavBar/NavBarr/Rewquest/TravelandTour/Request/request";
import TravelAccept from "pages/Home/HomeNavBar/NavBarr/Rewquest/TravelandTour/TravelAccept";
import TravelDetail from "pages/Home/HomeNavBar/NavBarr/Rewquest/TravelandTour/TravelDetail";
import Travelinfo from "pages/Home/HomeNavBar/NavBarr/Rewquest/TravelandTour/Travelinfo";
import { Routes, Route } from "react-router-dom";

const MyRequestRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<RequestAllow />} />
      <Route path="/BookingPayments" element={<BookingPayments />} />
      <Route path="/TravellDetail" element={<TravelDetail />} />
      <Route path="/TravelAccept" element={<TravelAccept />} />
      <Route path="/Travelinfo" element={<Travelinfo />} />
    </Routes>
  );
};

export default MyRequestRoute;
