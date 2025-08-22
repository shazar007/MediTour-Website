import ParamedicStaff from "pages/Services/ParamedicStaff";
import { Routes, Route } from "react-router-dom";

const ParamedicStaffRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ParamedicStaff />} />
    </Routes>
  );
};

export default ParamedicStaffRoute;
