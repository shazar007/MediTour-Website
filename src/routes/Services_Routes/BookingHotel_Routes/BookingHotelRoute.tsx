import MyBookingHotel from "pages/Home/HomeNavBar/NavBarr/BookingMenu/BookingHotel";
import { Routes, Route } from "react-router-dom";

const MyBookingHotelRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MyBookingHotel />} />
    </Routes>
  );
};

export default MyBookingHotelRoutes;
