import MyAppointment from "pages/Home/HomeNavBar/NavBarr/MyAppointment";
import { Routes, Route } from "react-router-dom";

const MyAppointmentRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MyAppointment />} />
    </Routes>
  );
};

export default MyAppointmentRoute;
