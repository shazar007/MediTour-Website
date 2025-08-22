import { DoctorLogin } from "pages";
import { Routes, Route } from "react-router-dom";

const AmbulanceLoginAuth = () => {
  return (
    <Routes>
      <Route path="/login" element={<DoctorLogin />} />
    </Routes>
  );
};

export default AmbulanceLoginAuth;
