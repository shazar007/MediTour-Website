import { useState } from "react";
import SearchBar from "shared/components/Searchbar";
import style from "../nutritionistAvailability.module.css";
import commonStyles from "shared/utils/common.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  doctorVideoConsultAvailability,
  doctorVideoConsultPrice,
} from "shared/utils";
import {
  ArrowBack,
  CustomInput,
  CustomModal,
  CustomStepper,
} from "shared/components";
import { PrimaryButton } from "shared/components";
import commomstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import CustomSelect from "shared/components/CustomSelect";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { FaEdit } from "react-icons/fa";

interface Onsite {
  setShowAddModal: any;
}

const Day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
const InHouse = (props: Partial<Onsite>) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className={classNames(commomstyles.col12, style.doctorss)}>
      <SearchBar />
      <div className={commomstyles.mr87}>
        <div className={style.outerContainer}>
          <div style={{ margin: "60px", marginLeft: "110px" }}>
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
              className={classNames(commomstyles.mt56, commonStyles.BtnWidth)}
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
              children={<AddDoctor setShowAddModal={setShowAddModal} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default InHouse;

const AddDoctor = (props: any) => {
  const { setShowAddModal } = props;
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
  const handleCloseModal = () => {
    setShowAddModal(false);
  };
  return (
    <>
      <div className={commomstyles.flx}>
        <div className={commomstyles.flx} style={{ width: "97%" }}>
          <ArrowBack onClick={handleClicKPrev} />
          <p className={classNames(commomstyles.semiBold, commomstyles.fs16)}>
            Previous
          </p>
        </div>
        <div className={style.end}>
          <button className={style.close} onClick={handleCloseModal}>
            &#10006;
          </button>
        </div>
      </div>
      <div>
        <CustomStepper steps={steps} selectedStep={selectedStep} />
      </div>
      <div>
        {screenName == "Availability" && (
          <Availability handleClickNext={handleClickNext} />
        )}
        {screenName == "Price" && <Price handleClickNext={handleClickNext} />}
      </div>

      <div></div>
    </>
  );
};
interface Props {
  handleClickNext: any;
}
const Availability = (props: Partial<Props>) => {
  const { handleClickNext } = props;
  const formik = useFormik({
    initialValues: {
      videoConsultDay: "",
    },
    validationSchema: Yup.object(doctorVideoConsultAvailability),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = async () => {
    handleClickNext();
  };

  const handleSelect = (selectedOption: string) => {
    formik.setFieldValue("videoConsultDay", selectedOption);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ width: "504px" }}>
          <CustomSelect
            options={Day}
            placeholder="Day"
            onSelect={handleSelect}
          />
          {formik.touched.videoConsultDay && formik.errors.videoConsultDay ? (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors.videoConsultDay}
            </div>
          ) : null}
        </div>
        <div className={classNames(commonStyles.flxBetween, style.mt16)}>
          <div style={{ width: "220px" }}>
            <CustomInput placeholder="From" />
          </div>
          <div style={{ width: "220px" }}>
            <CustomTimePicker placeholder="To" setData={handleSelect} />
          </div>
        </div>
        <div style={{ width: "210px", margin: "56px 0 0 0" }}>
          <PrimaryButton
            children={"Next Step"}
            type="submit"
            colorType={"blue"}
          />
        </div>
      </form>
    </div>
  );
};
interface Props {
  handleClickNext: any;
}
const Price = (props: Partial<Props>) => {
  const { handleClickNext } = props;
  const formik = useFormik({
    initialValues: {
      videoConsultActualPrice: "",
      videoConsultMeditourPrice: "",
    },
    validationSchema: Yup.object(doctorVideoConsultPrice),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = async () => {
    handleClickNext();
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={commomstyles.flx}>
          <div style={{ width: "210px", marginRight: "82px" }}>
            <CustomInput
              placeholder="Actual Price"
              id="videoConsultActualPrice"
              name="videoConsultActualPrice"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.videoConsultActualPrice}
            />

            {formik.touched.videoConsultActualPrice &&
            formik.errors.videoConsultActualPrice ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.videoConsultActualPrice}
              </div>
            ) : null}
          </div>
          <div style={{ width: "210px" }}>
            <CustomInput
              placeholder="Price For MediTour"
              id="videoConsultMeditourPrice"
              name="videoConsultMeditourPrice"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.videoConsultMeditourPrice}
            />

            {formik.touched.videoConsultMeditourPrice &&
            formik.errors.videoConsultMeditourPrice ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.videoConsultMeditourPrice}
              </div>
            ) : null}
          </div>
        </div>
        <div style={{ width: "210px", margin: "56px 0 0 0" }}>
          <PrimaryButton
            children={"Next Step"}
            type="submit"
            colorType={"green"}
          />
        </div>
      </form>
    </div>
  );
};
