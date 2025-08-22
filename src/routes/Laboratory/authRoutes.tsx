import { Routes, Route } from "react-router-dom";
import {
  DoctorForgetPassword,
  DoctorLogin,
  DoctorSignup,
  DoctorUpdatePassword,
} from "pages";
import ResetPassword from "pages/Home/Userlogin/ResetPassword";

const LaboratoryAuthRoutes = (props: any) => {
  return (
    <Routes>
      <Route path="/login" element={<DoctorLogin />} />
      <Route path="/signup" element={<DoctorSignup />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<DoctorForgetPassword />} />
      <Route path="/update-password" element={<DoctorUpdatePassword />} />
    </Routes>
  );
};

export default LaboratoryAuthRoutes;
