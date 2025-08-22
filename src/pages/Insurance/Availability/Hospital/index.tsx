import { useState } from "react";
import style from "./availabityHospital.module.css";
import commonStyles from "shared/utils/common.module.css";
import commomstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import SearchBar from "shared/components/Searchbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import {
  CustomInput,
  CustomModal,
  CustomStepper,
  PrimaryButton,
} from "shared/components";
import { FaEdit } from "react-icons/fa";
import CustomSelect from "shared/components/CustomSelect";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import { IoClose } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

const Day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const steps = [
  {
    id: "1",
    lable: "Availability",
  },
  {
    id: "2",
    lable: "Price",
  },
];

export default function HospitalAvailability() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className={classNames(commomstyles.col12)}>
      <SearchBar />
      <div className={commomstyles.mr87}>
        <div className={classNames(commomstyles.outerContainer)}>
          <div className={style.Outermargin}>
            <Accordion className={style.DropdOWn}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "#00276d" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "600" }}>
                  <p className={classNames(commomstyles.fs16)}> Sunday</p>
                </Typography>
              </AccordionSummary>
              <div className={style.borderTOP}></div>
              <AccordionDetails>
                <Typography>
                  <div>
                    <div className={style.editbox}>
                      <div className={commomstyles.flx}>
                        <FaEdit className={style.Faedit} />
                        <p>Edit</p>
                      </div>
                    </div>
                    <div
                      className={classNames(
                        commonStyles.flxBetween,
                        commomstyles.col10,
                        commomstyles.mb28
                      )}
                    >
                      <div className={commomstyles.col5}>
                        <CustomInput />
                      </div>
                      <div className={commomstyles.col5}>
                        <CustomInput />
                      </div>
                    </div>
                    <div
                      className={classNames(
                        commonStyles.flxBetween,
                        commomstyles.col10,
                        commomstyles.mb28
                      )}
                    >
                      <div className={commomstyles.col5}>
                        <CustomInput />
                      </div>
                      <div className={commomstyles.col5}>
                        <CustomInput />
                      </div>
                    </div>
                    <div
                      className={classNames(
                        commonStyles.flxBetween,
                        commomstyles.col10
                      )}
                    >
                      <div className={commomstyles.col5}>
                        <CustomInput />
                      </div>
                      <div className={commomstyles.col5}>
                        <CustomInput />
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div
              className={classNames(commomstyles.mt56, commomstyles.BtnWidth)}
            >
              <PrimaryButton
                children={"Add"}
                colorType={"blue"}
                onClick={() => {
                  setShowAddModal(true);
                }}
              />
            </div>
            <CustomModal
              showModal={showAddModal}
              children={
                <HospitalAvailabModel setShowAddModal={setShowAddModal} />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const HospitalAvailabModel = (props: any) => {
  const { setShowAddModal } = props;
  const handleCloseModal = () => {
    setShowAddModal(false);
  };
  const [screenName, setScreenName] = useState("Availability");
  const [selectedStep, setSelectedStep] = useState(0);

  const handleClickNext = () => {
    if (screenName == "Availability") {
      setScreenName("Price");
    }
    if (selectedStep < 1) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const handleClicKPrev = () => {
    if (screenName == "Price") {
      setScreenName("Availability");
    }

    if (selectedStep > 0) {
      setSelectedStep(selectedStep - 1);
    }
  };

  return (
    <div style={{ width: "500px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IoArrowBack className={style.Back} onClick={handleClicKPrev} />
        <IoClose className={style.close} onClick={handleCloseModal} />
      </div>
      <div>
        <div className={classNames(commonStyles.col10)}>
          <CustomStepper steps={steps} selectedStep={selectedStep} />
        </div>
        <div className={classNames(commonStyles.col12)}>
          {screenName == "Availability" && <Availability />}
          {screenName == "Price" && <Price />}
        </div>
        <div className={classNames(commonStyles.mt56, commonStyles.BtnWidth)}>
          <PrimaryButton
            children={"Next"}
            colorType={"blue"}
            onClick={handleClickNext}
          />
        </div>
      </div>
    </div>
  );
};

const Availability = () => {
  const handleGoBack = () => {};
  const handleSelect = (selectedOption: string) => {};
  return (
    <div>
      <CustomSelect options={Day} onSelect={handleSelect} />
      <div className={classNames(commonStyles.flxBetween, style.mt16)}>
        <div style={{ width: "220px" }}>
          <CustomInput placeholder="From" />
        </div>
        <div style={{ width: "220px" }}>
          <CustomTimePicker placeholder="To" setData={handleGoBack} />
        </div>
      </div>
    </div>
  );
};
const Price = () => {
  return (
    <div>
      <div className={commonStyles.flxBetween}>
        <div className={commonStyles.col5}>
          <CustomInput placeholder="Actual Price" />
        </div>
        <div className={commonStyles.col5}>
          <CustomInput placeholder="Price For MediTour" />
        </div>
      </div>
    </div>
  );
};
