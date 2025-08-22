import { DoctorLogin } from "pages";
import { Routes, Route } from "react-router-dom";

const RentACarLoginAuth = () => {
  return (
    <Routes>
      <Route path="/login" element={<DoctorLogin />} />
    </Routes>
  );
};

export default RentACarLoginAuth;
