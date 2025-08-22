import DoctorAppoinmentPay from "pages/Services/DoctarServices/DoctorAppoinment";
import DoctorDetails from "pages/Services/DoctarServices/DoctorDetails";
import Nav_SelectionCards from "pages/Services/Nav_SelectionCard/Nav_SelectionCard";
import { Routes, Route } from "react-router-dom";
import Doctorbg from "assets/images/Group4567890098.png";
import DoctorCover from "assets/images/etactics-inc-2qiXVelOgyw-unsplash copy 1.webp";
import DoctorIcon from "assets/images/DoctorIconselection.png";

import Nursesbg from "assets/images/Group 1597883599 (1).png";
import NursesCover from "assets/images/NursesCoverd.webp";
import NursesIcon from "assets/images/NursesIvonss.png";

import Physiobg from "assets/images/PhysioBGG.png";
import PhysioCover from "assets/images/PhysioCOverd.webp";
import PhysioIcon from "assets/images/PhysioIconss.png";

import Psychobg from "assets/images/PsychoBBG.png";
import PsychoCover from "assets/images/PsychoCOverd.webp";
import PsychoIcon from "assets/images/PsychoIcoons.png";

import Nutritbg from "assets/images/NutritBGG.png";
import NutritCover from "assets/images/NutritCover.webp";
import NutritIcon from "assets/images/NutritIcon.png";

import Ambulancebg from "assets/images/AmbulanceBGG.png";
import AmbulanceCover from "assets/images/AmbulanceCoverrd.webp";
import AmbulanceIcon from "assets/images/AmbulanceIcons.png";
const HomeService_Cards = [
  {
    title: "doctor",
    content: "HS_DoctorContent",
    color: "#13a89e",
    icon: DoctorIcon,
    infoBg: Doctorbg,
    coverImg: DoctorCover,
    top: "-140px",
  },
  {
    title: "nurses",
    content: "HS_NursesContent",
    color: "#E5A200",

    top: "-95px",
    BgColor: "#FCF2DA",
    coverImg: NursesCover,
    icon: NursesIcon,
    infoBg: Nursesbg,
  },
  {
    title: "physiotherapist",
    content: "HS_PhysiotherapistContent",
    color: "#A2968E",
    top: "-95px",
    BgColor: "#EFE8DE",
    coverImg: PhysioCover,
    icon: PhysioIcon,
    infoBg: Physiobg,
  },

  {
    title: "psychologist",
    content: "HS_PsychologistContent",
    color: "#DE987C",
    top: "-77px",
    BgColor: "#F9E8E1",
    coverImg: PsychoCover,
    icon: PsychoIcon,
    infoBg: Psychobg,
  },
  {
    title: "nutritionist",
    content: "HS_NutritionistContent",
    color: "#BCC3A0",
    top: "-95px",
    BgColor: "#F6FAE6",
    coverImg: NutritCover,
    icon: NutritIcon,
    infoBg: Nutritbg,
  },
  {
    title: "ambulance",
    content: "HS_AmbulanceContent",
    color: "#FF7979",
    top: "-90px",
    BgColor: "#FDE7E7",
    coverImg: AmbulanceCover,
    icon: AmbulanceIcon,
    infoBg: Ambulancebg,
  },
];

const HomeServicesRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Nav_SelectionCards data={HomeService_Cards} />}
      />
      <Route path="/DoctorDetail" element={<DoctorDetails />} />
      <Route
        path="/DoctorAppoinmentPay/:id"
        element={<DoctorAppoinmentPay />}
      />
    </Routes>
  );
};

export default HomeServicesRoutes;
