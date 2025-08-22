import { Routes, Route } from "react-router-dom";
import PharmacyService from "pages/Services/Pharmacy/PharmacyService";
import PharmacyCart from "pages/Services/Pharmacy/PharmacyCart";
import PharmacyBooking from "pages/Services/Pharmacy/PharmacyBooking";

const PharmacyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PharmacyService />} />
      <Route path="/PharmacyCart" element={<PharmacyCart />} />
      <Route path="/PharmacyBooking" element={<PharmacyBooking />} />
    </Routes>
  );
};

export default PharmacyRoutes;
