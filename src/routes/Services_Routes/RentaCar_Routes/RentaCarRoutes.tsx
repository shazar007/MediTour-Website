import { Routes, Route } from "react-router-dom";
import RentaCarBooking from "pages/Services/RentaCar/RentaCarBooking";

import RentaCarDetail from "pages/Services/RentaCar/RentaCardDetail/RentaCarDetail";
import RentaCarmoreDetail from "pages/Services/RentaCar/RentaCarmoreDetail";
import RentaCarService from "pages/Services/RentaCar/RentaCarService";

import DonationPaymodule from "shared/components/DonationServices/DonationPaymodule";
import UserInfo from "pages/Services/RentaCar/UserInfo";
import RentaCarBook from "pages/Services/RentaCar/RentaCarBook";
import DonationPayment from "pages/Services/DonationServices/DonationPayment";

const RentaCarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RentaCarService />} />
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

export default RentaCarRoutes;
