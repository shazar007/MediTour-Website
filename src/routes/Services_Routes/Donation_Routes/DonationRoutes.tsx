import DonationServices from "pages/Services/DonationServices";
import DonationCardDetail from "pages/Services/DonationServices/DonationCardDetail";
import DonationEdu from "pages/Services/DonationServices/DonationEdu";
import DonationPackeg from "pages/Services/DonationServices/DonationPackege";
import DonationPayment from "pages/Services/DonationServices/DonationPayment";
import { Routes, Route } from "react-router-dom";

const DonationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DonationServices />} />
      <Route path="/DonationEdu" element={<DonationEdu />} />
      <Route path="/DonationPackeg" element={<DonationPackeg />} />
      <Route path="/DonationPayment" element={<DonationPayment />} />
      <Route path="/DonationCardDetail" element={<DonationCardDetail />} />
    </Routes>
  );
};

export default DonationRoutes;
