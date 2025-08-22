import { DoctorLogin } from "pages";
import { Routes, Route } from "react-router-dom";

const HotelLoginAuthRoute = (props: any) => {
  return (
    <Routes>
      <Route path="/login" element={<DoctorLogin />} />
    </Routes>
  );
};

export default HotelLoginAuthRoute;
