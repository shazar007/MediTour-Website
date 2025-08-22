import React, { useState, useEffect } from "react";
import style from "./Availability.module.css";
import classNames from "classnames";
import VideoConsultancy from "./videoConsultancy";
import Onsite from "./onsite";
import commonstyles from "shared/utils/common.module.css";
import SearchBar from "shared/components/Searchbar";
import InHouse from "./Inhouse";

function Doctor_Availability() {
  const [selectedOption, setSelectedOption] = useState<string>("clinic");
  const [activeComponent, setActiveComponent] = useState<string>("Onsite");

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "clinic") {
      setActiveComponent("Onsite");
    } else {
      setActiveComponent("InHouse");
    }
  };
  const selectedStyle = {
    borderBottom: "2px solid #00276d",
  };

  return (
    <div className={classNames(commonstyles.col12, style.doctorss)}>
      <SearchBar />
      <div className={commonstyles.mr87}>
        <div className={style.outerContainer}>
          <div className={style.clinic}>
            <p
              className={classNames(style.mr16, style.cursor)}
              style={activeComponent === "Onsite" ? selectedStyle : {}}
              onClick={() => setActiveComponent("Onsite")}
            >
              Onsite
            </p>
            <p
              className={classNames(style.ml16, style.cursor)}
              style={
                activeComponent === "VideoConsultancy" ? selectedStyle : {}
              }
              onClick={() => setActiveComponent("VideoConsultancy")}
            >
              Video Consultancy
            </p>
          </div>
          {activeComponent === "Onsite" && <Onsite />}
          {activeComponent === "VideoConsultancy" && <VideoConsultancy />}
        </div>

        <div>
          <div className={style.Inhouse}>
            <p
              style={activeComponent === "InHouse" ? selectedStyle : {}}
              onClick={() => setActiveComponent("InHouse")}
            >
              In-House
            </p>
          </div>

          {activeComponent === "InHouse" && <InHouse />}
        </div>
      </div>
    </div>
  );
}

export default Doctor_Availability;
