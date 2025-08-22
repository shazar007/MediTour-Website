import MyAppointmentDetail from "pages/Home/HomeNavBar/NavBarr/MyAppointmentDetail";
import { Routes, Route } from "react-router-dom";

const MyAppointmentDetailRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MyAppointmentDetail />} />
    </Routes>
  );
};

export default MyAppointmentDetailRoute;
