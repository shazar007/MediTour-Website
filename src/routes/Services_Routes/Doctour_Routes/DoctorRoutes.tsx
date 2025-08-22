import DoctorServices from "pages/Services/DoctarServices";
import DoctorAppoinmentPay from "pages/Services/DoctarServices/DoctorAppoinment";
import DoctorDetails from "pages/Services/DoctarServices/DoctorDetails";
import Nav_SelectionCards from "pages/Services/Nav_SelectionCard/Nav_SelectionCard";
import { Routes, Route } from "react-router-dom";
import DoctorIcon from "assets/images/DoctorIconselection.png";
import HospitalIcon from "assets/images/hospitalIconselection.png";
import DoctorCover from "assets/images/etactics-inc-2qiXVelOgyw-unsplash copy 1.webp";
import HospitalCover from "assets/images/6631734499226eaa1afc891b_25 copy 1.webp";
import Hospitalbg from "assets/images/Group 1597883599.png";
import Doctorbg from "assets/images/Group4567890098.png";
const Doc_Cards = [
  {
    color: "#13a89e",
    title: "doctors",
    content: "doctorSelectionContent",
    icon: DoctorIcon,
    infoBg: Doctorbg,
    top: "-140px",
    coverImg: DoctorCover,
  },

  {
    title: "hospital",
    content: "hospitalSelectionContent",
    color: "#13a89e",
    icon: HospitalIcon,
    top: "-95px",
    infoBg: Hospitalbg,
    coverImg: HospitalCover,
  },
];

const DoctorRoutes = () => {
  return (
    <div style={{ backgroundColor: "#fdfdfd" }}>
      <Routes>
        <Route path="/" element={<DoctorServices />} />
        <Route
          path="/doctor-services/:serviceName"
          element={<DoctorServices />}
        />
        <Route path="/DoctorDetail" element={<DoctorDetails />} />
        <Route
          path="/Selection"
          element={<Nav_SelectionCards data={Doc_Cards} />}
        />

        <Route
          path="/DoctorAppoinmentPay/:id"
          element={<DoctorAppoinmentPay />}
        />
      </Routes>
    </div>
  );
};

export default DoctorRoutes;
