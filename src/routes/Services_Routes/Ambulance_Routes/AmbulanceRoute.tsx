import AmbulanceServices from "pages/Services/Ambulance";
import { Routes, Route } from "react-router-dom";

const AmbulanceRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AmbulanceServices />} />
    </Routes>
  );
};

export default AmbulanceRoute;
