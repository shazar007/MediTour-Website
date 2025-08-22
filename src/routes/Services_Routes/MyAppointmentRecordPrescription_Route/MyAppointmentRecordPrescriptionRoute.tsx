import MyAppointmentPrescription from "pages/Home/HomeNavBar/NavBarr/MyAppointmentPrescription";
import { Routes, Route } from "react-router-dom";

const MyAppointmentPrescriptionRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MyAppointmentPrescription />} />
    </Routes>
  );
};

export default MyAppointmentPrescriptionRoute;
