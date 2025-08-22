import InsuranceCards from "pages/Services/Insurance/InsuranceCards";
import InsuranceServices from "pages/Services/Insurance/InsuranceServices";

import { Routes, Route } from "react-router-dom";
import InsuranceDetails from "pages/Services/Insurance/InsuranceDetails";
import InsuranceBookingDetail from "pages/Home/HomeNavBar/NavBarr/BookingMenu/InsuranceBookingDetail";
import InsuranceTravelDetail from "pages/Services/Insurance/Insurancetravel/insurancetravelDetails";
import InsuranceHealthDetail from "pages/Services/Insurance/Insurancehealth/InsurancehealthDetails";
import InsuranceBooking from "pages/Services/Insurance/InsuranceBooking";

const InsuranceRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InsuranceServices />} />
      <Route path="/InsuranceCards" element={<InsuranceCards />} />
      <Route path="/InsuranceDetails" element={<InsuranceDetails />} />
      <Route
        path="/insuranceHealthDetail"
        element={<InsuranceHealthDetail />}
      />
      <Route
        path="/insuranceTravelDetails"
        element={<InsuranceTravelDetail />}
      />
      <Route
        path="/insuranceBookingDetail"
        element={<InsuranceBookingDetail />}
      />{" "}
      <Route path="/InsuranceBooking" element={<InsuranceBooking />} />
    </Routes>
  );
};

export default InsuranceRoutes;
