import MyBookingHotelDetail from "pages/Home/HomeNavBar/NavBarr/BookingMenu/BookingHotelDetail";
import { Routes, Route } from "react-router-dom";

const MyBookingHotelDetailRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MyBookingHotelDetail />} />
    </Routes>
  );
};

export default MyBookingHotelDetailRoute;
