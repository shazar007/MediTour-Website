import { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import style from "./nutritionistAvailability.module.css";
import classNames from "classnames";
import VideoConsultancy from "./videoConsultancy";
import Onsite from "./onsite";
import commonstyles from "shared/utils/common.module.css";
import SearchBar from "shared/components/Searchbar";
import InHouse from "./InHouse";
function NutritionistAvailability() {
  const [selectedOption, setSelectedOption] = useState("onsite");
  const navigate = useNavigate();

  return (
    <div
      className={classNames(
        commonstyles.col12,
        commonstyles.mr87,
        style.doctorss
      )}
    >
      <SearchBar />
      <nav>
        <Link
          className={classNames(style.navvvlink, {
            [style.selected]: selectedOption === "onsite",
          })}
          to="onsite"
          onClick={() => {
            setSelectedOption("onsite");
            navigate("/onsite");
          }}
        >
          Onsite
        </Link>
        <Link
          className={classNames(style.navvvlink, {
            [style.selected]: selectedOption === "videoConsultancy",
          })}
          to="videoConsultancy"
          onClick={() => {
            setSelectedOption("videoConsultancy");
            navigate("/videoConsultancy");
          }}
        >
          Video Consultancy
        </Link>
        <Link
          className={classNames(style.navvvlink, {
            [style.selected]: selectedOption === "inhouse",
          })}
          to="inhouse"
          onClick={() => {
            setSelectedOption("inhouse");
            navigate("/inhouse");
          }}
        >
          In-House
        </Link>
        <Outlet />
      </nav>

      <Routes>
        <Route path="/onsite" element={<Onsite />} />
        <Route path="/videoConsultancy" element={<VideoConsultancy />} />
        <Route path="/inhouse" element={<InHouse />} />
      </Routes>
    </div>
  );
}

export default NutritionistAvailability;
