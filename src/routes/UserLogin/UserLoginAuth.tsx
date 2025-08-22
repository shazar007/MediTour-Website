import { Routes, Route } from "react-router-dom";
import UserLogin from "pages/Home/Userlogin";
import Register_Form from "pages/Home/Userlogin/Register_Form";
import Email_Verify from "pages/Home/Userlogin/Email_Verify";
import ResetPassword from "pages/Home/Userlogin/ResetPassword";
import SignupLogin from "pages/Home/Userlogin/SignUplogin";
import { DoctorForgetPassword, DoctorUpdatePassword } from "pages";

const UserAuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/Email_Verify" element={<Email_Verify />} />
      <Route path="/signup" element={<SignupLogin />} />

      <Route path="/Register_Form" element={<Register_Form />} />
      <Route path="/forgot-password" element={<DoctorForgetPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/update-password" element={<DoctorUpdatePassword />} />
    </Routes>
  );
};

export default UserAuthRoutes;
