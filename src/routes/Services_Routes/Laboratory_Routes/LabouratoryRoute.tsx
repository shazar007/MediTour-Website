import DonationPayment from "pages/Services/DonationServices/DonationPayment";
import LabBookingPayment from "pages/Services/Laboratories/LabBookingPayment";
import LaboratoriesServices from "pages/Services/Laboratories/LaboratoriesServices";
import LabortoryDetail from "pages/Services/Laboratories/LabortoryDetail";
import { Routes, Route } from "react-router-dom";

const LaboratoriesRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LaboratoriesServices />} />
      <Route path="/LabortoryDetail" element={<LabortoryDetail />} />
      <Route path="/LabBookingPayment" element={<LabBookingPayment />} />

      <Route path="/DonationPayment" element={<DonationPayment />} />
    </Routes>
  );
};

export default LaboratoriesRoute;
