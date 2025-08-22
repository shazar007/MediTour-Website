import Nav_SelectionCards from "pages/Services/Nav_SelectionCard/Nav_SelectionCard";
import DonationPayment from "pages/Services/DonationServices/DonationPayment";
import RentaCarBook from "pages/Services/RentaCar/RentaCarBook";
import RentaCarBooking from "pages/Services/RentaCar/RentaCarBooking";
import RentaCarDetail from "pages/Services/RentaCar/RentaCardDetail/RentaCarDetail";
import RentaCarmoreDetail from "pages/Services/RentaCar/RentaCarmoreDetail";
import UserInfo from "pages/Services/RentaCar/UserInfo";
import TravelServices from "pages/Services/TravelAgency";
import TravelBooking from "pages/Services/TravelAgency/TravelBooking";
import TravelDetail from "pages/Services/TravelAgency/TravelDetail";
import { Routes, Route } from "react-router-dom";
import DonationPaymodule from "shared/components/DonationServices/DonationPaymodule";
import Travelbg from "assets/images/travelBbg.png";
import TravelCover from "assets/images/TravelCOverBg.webp";
import TravelIcon from "assets/images/TravelIcon.png";
import Carbg from "assets/images/carBbg.png";
import CarCover from "assets/images/CarCOverBg.webp";
import CarIcon from "assets/images/carrIcons.png";
const Travel_Cards = [
  {
    title: "travelAgency",
    content: "travelAgencyContent",
    color: "#3b58b8e5",
    BgColor: "#ECF0FD",
    icon: TravelIcon,
    coverImg: TravelCover,
    infoBg: Travelbg,
    top: "-100px",
  },

  {
    title: "rentACar",
    content: "rentACarContent",
    color: "#3b58b8e5",
    BgColor: "#ECF0FD",
    icon: CarIcon,
    coverImg: CarCover,
    infoBg: Carbg,
    top: "-100px",
  },
];

const TravelRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TravelServices />} />
      <Route
        path="/Selection"
        element={<Nav_SelectionCards data={Travel_Cards} />}
      />
      <Route path="/TravelDetail" element={<TravelDetail />} />
      <Route path="/TravelBooking" element={<TravelBooking />} />
      <Route path="/Travelpayment" element={<DonationPayment />} />
      <Route path="/RentaCarDetail/:item" element={<RentaCarDetail />} />
      <Route path="/RentaCarmoreDetail" element={<RentaCarmoreDetail />} />
      <Route path="/RentaCarBooking" element={<RentaCarBooking />} />
      <Route path="/DonationPay" element={<DonationPaymodule />} />
      <Route path="/RentaCarBook" element={<RentaCarBook />} />
      <Route path="/UserInfo" element={<UserInfo />} />
      <Route path="/DonationPay" element={<DonationPayment />} />
    </Routes>
  );
};

export default TravelRoutes;
