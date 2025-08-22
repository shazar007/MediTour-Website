import { Routes, Route } from "react-router-dom";
import HospitalDepartments from "pages/Services/HospitalServices/HospitalDepartments";
import HospitalDetail from "pages/Services/HospitalServices/HospitalDetail";
import { MainHospitalCard } from "shared/components";

const HospitalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainHospitalCard serviceName={"Hospital"} />} />

      <Route path="/HospitalDetail/:id" element={<HospitalDetail />} />

      <Route
        path="/HospitalDetail/:id/HospitalDepartments"
        element={<HospitalDepartments />}
      />
    </Routes>
  );
};

export default HospitalRoutes;
