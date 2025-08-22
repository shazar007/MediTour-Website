import HotelAvability from "pages/Services/HotelServices/HotelAvability";
import HotelNewBooking from "pages/Services/HotelServices/HotelBooking";
import HotelDetail from "pages/Services/HotelServices/HotelDetail/HotelDetailitems";
import HotelProperty from "pages/Services/HotelServices/HotelProperty";
import HotelServic from "pages/Services/HotelServices/HotelServic/HotelServic";
import { Routes, Route } from "react-router-dom";

const HotelRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HotelServic />} />

      <Route path="/HotelDetails" element={<HotelDetail />} />
      <Route path="/HotelProperty" element={<HotelProperty />} />

      <Route path="/HotelAvability" element={<HotelAvability />} />
      <Route path="/HotelBooking" element={<HotelNewBooking />} />
    </Routes>
  );
};

export default HotelRoutes;
