import React, { useEffect } from "react";
import { useState } from "react";
import style from "../Availability.module.css";
import commonStyles from "shared/utils/common.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  DoctorAddOnsiteAvailability,
  DoctorGetAvailibility,
} from "shared/services/DoctorService";
import {
  doctorAvailibilityPrice,
  doctorInhouseAvailability,
} from "shared/utils";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Empty from "assets/images/doctorEmpty.png";
import { FaEdit } from "react-icons/fa";
import {
  ArrowBack,
  CustomInput,
  CustomModal,
  CustomStepper,
  LoadingModal,
} from "shared/components";

import { PrimaryButton } from "shared/components";
import commomstyles from "shared/utils/common.module.css";
import { Typography } from "@mui/material";
import classNames from "classnames";
import CustomSelect from "shared/components/CustomSelect";
import CustomTimepicker from "shared/components/TimePicker";
import SearchBar from "shared/components/Searchbar";
import { MdDelete } from "react-icons/md";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import { TbRefresh } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";
import DoctorEmpty from "shared/components/DoctorEmpty";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CustomLoader from "shared/components/New_Loader/Loader";

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
interface InHouse {
  setShowAddModal: any;
}

const Day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
interface Price {
  actualPrice?: number;
  meditourPrice?: number;
}
const InHouse = (props: Partial<InHouse>) => {
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  const [selectedDeleteDay, setSelectedDeleteDay] = useState<number>(0);
  const [delModal, setDelmodal] = useState(false);
  const [isMode, setIsMode] = useState("");
  const [frontdata, setFrontdata] = useState([]);
  const [price, setPrice] = useState<Price>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState<{
    dayOfWeek: number;
    periods: Array<{ startTime: string; endTime: string; _id: string }>;
  } | null>(null);

  const [availabilityData, setAvailabilityData] = useState<
    Array<{
      dayOfWeek: number;
      periods: Array<{ startTime: string; endTime: string; _id: string }>;
    }>
  >([]);
  const [loading, setLoading] = useState(false);
  const handleDaySelect = (dayData: {
    dayOfWeek: number;
    periods: Array<{ startTime: string; endTime: string; _id: string }>;
  }) => {
    setSelectedDayData(dayData);
  };

  const onDeleteSlot = (dayOfWeek: any, slotId: any) => {
    const updatedAvailabilityData = availabilityData
      .map((dayData) => {
        if (dayData.dayOfWeek === dayOfWeek) {
          const updatedPeriods = dayData.periods.filter(
            (period) => period._id !== slotId
          );
          if (updatedPeriods.length === 0) {
            return null;
          } else {
            return {
              ...dayData,
              periods: updatedPeriods,
            };
          }
        }
        return dayData;
      })
      .filter((dayData) => dayData !== null);

    setAvailabilityData(
      updatedAvailabilityData.filter(
        (
          dayData
        ): dayData is {
          dayOfWeek: number;
          periods: Array<{ startTime: string; endTime: string; _id: string }>;
        } => dayData !== null
      )
    );

    let paramss = {
      type: "in-house",
      availability: updatedAvailabilityData,
      price: {
        actualPrice: price.actualPrice,
        meditourPrice: price.meditourPrice,
      },
    };

    setLoading(true);
    DoctorAddOnsiteAvailability(paramss)
      .then((res: any) => {
        setShowAddModal(false);
        FetchAvailibility();
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setSelectedPeriodId("");
        setDelmodal(false);
      });
  };

  const FetchAvailibility = () => {
    setLoading(true);
    DoctorGetAvailibility()
      .then((res: any) => {
        if (res?.status === 200) {
          setPrice(res.data?.availability[0]?.inHouseAvailability?.price);
          const apiPhysicalAvailability =
            res.data?.availability[0]?.inHouseAvailability?.availability || [];

          setFrontdata(apiPhysicalAvailability);
          const transformedData = apiPhysicalAvailability.map(
            (dayAvailability: any) => ({
              dayOfWeek: dayAvailability.dayOfWeek,
              periods: dayAvailability.periods.map((timeSlot: any) => ({
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime,
                _id: timeSlot._id,
              })),
            })
          );
          transformedData.sort((a: any, b: any) => a.dayOfWeek - b.dayOfWeek);
          setAvailabilityData(transformedData);
        }
      })
      .catch((err: any) => {
        console.error("Error in API call:", err?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    FetchAvailibility();
  }, []);

  const navigate = useNavigate();

  const handleGoback = () => {
    navigate("/doctor/AvailabilityCategory");
  };
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <div className={classNames(commomstyles.col12)}>
            <SearchBar />
            <div className={commomstyles.mr87}>
              <div className={style.outerContainer}>
                <div className={commomstyles.flx}>
                  <IoArrowBack className={style.back} onClick={handleGoback} />
                  <p
                    className={classNames(
                      style.fs24,
                      commomstyles.semiBold,
                      commonStyles.colorBlue
                    )}
                  >
                    Availablitiy In House
                  </p>
                  <div className={style.outerRefresh}>
                    <TbRefresh
                      className={style.RefreshIcon}
                      onClick={() => FetchAvailibility()}
                    />
                  </div>{" "}
                  <div className={style.outerRefresh}>
                    <BiSolidMessageSquareAdd
                      className={style.RefreshIcon}
                      onClick={() => {
                        setShowAddModal(true);
                        setIsMode("add");
                      }}
                    />
                  </div>
                </div>

                <CustomModal showModal={delModal}>
                  <div style={{ width: "300px" }}>
                    <p
                      className={classNames(
                        commomstyles.fs14,
                        commomstyles.semiBold,
                        commonStyles.colorBlue
                      )}
                    >
                      Are you sure to Delete current Availibility
                    </p>
                    <div className={commonStyles.flxBetween}>
                      <div className={style.btnwidth}>
                        <PrimaryButton
                          children={"Cancel"}
                          colorType={"blue"}
                          onClick={() => setDelmodal(false)}
                        />{" "}
                      </div>
                      <div className={style.btnwidth}>
                        <PrimaryButton
                          children={"Delete"}
                          colorType={"Red"}
                          onClick={() => {
                            onDeleteSlot(selectedDeleteDay, selectedPeriodId);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CustomModal>
                <div className={commomstyles.mt56}>
                  {availabilityData.length > 0 ? (
                    availabilityData.map((dayData) => (
                      <div>
                        <Accordion
                          key={dayData.dayOfWeek}
                          className={style.dropdown}
                          onClick={() => handleDaySelect(dayData)}
                          style={{ marginBottom: "8px" }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "#00276d" }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography style={{ fontWeight: "600" }}>
                              <p className={classNames(commomstyles.fs16)}>
                                {getDayName(dayData.dayOfWeek)}
                              </p>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              {dayData.periods.map((period) => (
                                <div
                                  key={period._id}
                                  style={{ marginBottom: "16px" }}
                                  className={style.gap32}
                                >
                                  <div className={style.borderbttom}>
                                    <p>{`From: ${period.startTime}`}</p>
                                  </div>
                                  <div className={style.borderbttom}>
                                    <p>{`To: ${period.endTime}`}</p>
                                  </div>
                                  <div className={classNames(commomstyles.flx)}>
                                    <div
                                      className={classNames(style.editbox)}
                                      onClick={() => {
                                        setShowAddModal(true);
                                        setIsMode("edit");
                                      }}
                                    >
                                      <FaEdit className={style.Faedit} />
                                      <p>Edit</p>
                                    </div>
                                    <div
                                      className={style.deletebtn}
                                      onClick={() => {
                                        setSelectedPeriodId(period._id);
                                        setSelectedDeleteDay(dayData.dayOfWeek);
                                        setDelmodal(true);
                                      }}
                                    >
                                      <MdDelete />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className={style.gap32}>
                                <div className={style.borderbttom}>
                                  <p>{price?.actualPrice} PKR</p>
                                </div>
                                <div className={style.borderbttom}>
                                  <p>{price?.meditourPrice}</p>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ))
                  ) : (
                    <div>
                      <div>
                        <DoctorEmpty />
                        {/* <div
                          style={{
                            width: "210px",
                            display: "flex",
                            margin: "auto",
                          }}
                        >
                          <PrimaryButton
                            children={"Add"}
                            colorType={"MedicalService"}
                            onClick={() => {
                              setShowAddModal(true);
                              setIsMode("add");
                            }}
                          />
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
                <CustomModal
                  showModal={showAddModal}
                  children={
                    <AddAvailibilityModal
                      mode={isMode}
                      setShowAddModal={setShowAddModal}
                      selectedDayData={selectedDayData}
                      frontdata={frontdata}
                      price={price}
                      FetchAvailibility={FetchAvailibility}
                    />
                  }
                />
                {/* {availabilityData.length > 0 && (
                  <div
                    style={{
                      width: "210px",
                      margin: "56px 112px",
                    }}
                  >
                    <PrimaryButton
                      children={"Add"}
                      colorType={"MedicalService"}
                      onClick={() => {
                        setShowAddModal(true);
                        setIsMode("add");
                      }}
                    />
                  </div>
                )} */}
              </div>{" "}
            </div>
          </div>
          <CustomModal
            showModal={showAddModal}
            children={
              <AddAvailibilityModal
                setShowAddModal={setShowAddModal}
                mode={isMode}
                selectedDayData={selectedDayData}
                frontdata={frontdata}
                price={price}
                FetchAvailibility={FetchAvailibility}
              />
            }
          />
        </>
      )}
    </>
  );
};
export default InHouse;

const getDayName = (dayOfWeek: number) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayOfWeek];
};

const AddAvailibilityModal = (props: any) => {
  const [loading, setLoading] = useState(false);
  const {
    setShowAddModal,
    mode,
    selectedDayData,
    frontdata,
    price,
    FetchAvailibility,
  } = props;

  const [screenName, setScreenName] = useState("Availability");
  const [selectedStep, setSelectedStep] = useState(0);
  const [addData, setAddData] = useState({});

  interface FrontDataItem {
    dayOfWeek: number;
    periods: any[];
    _id: string;
  }

  const modifiedFrontdata: FrontDataItem[] = frontdata.map(
    (obj: FrontDataItem) => {
      const { _id, ...rest } = obj;
      return rest;
    }
  );

  const handleClickNext = () => {
    if (screenName === "Availability") {
      setScreenName("Price");
    }

    if (selectedStep < 3) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const handleClicKPrev = () => {
    if (screenName === "Price") {
      setScreenName("Availability");
    }

    if (selectedStep > 0) {
      setSelectedStep(selectedStep - 1);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return loading ? (
    <CustomLoader />
  ) : (
    <Typography
      id="modal-modal-description"
      sx={{ textAlign: "center", color: "#001F57" }}
    >
      <div className={commomstyles.flx}>
        {/* <div className={commomstyles.flx} style={{ width: "97%" }}>
          <IoArrowBack className={style.back} onClick={handleClicKPrev} />
          <p className={classNames(commomstyles.semiBold, commomstyles.fs16)}>
            Previous
          </p>
        </div> */}
        <div style={{ marginLeft: "auto" }}>
          <button className={style.close} onClick={handleCloseModal}>
            &#10006;
          </button>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <CustomStepper steps={steps} selectedStep={selectedStep} />
      </div>
      <div>
        {screenName === "Availability" && (
          <Availability
            handleClickNext={handleClickNext}
            setAddData={setAddData}
            selectedDayData={selectedDayData}
            mode={mode}
          />
        )}
        {screenName === "Price" && (
          <Price
            addData={addData}
            setShowAddModal={setShowAddModal}
            modifiedFrontdata={modifiedFrontdata}
            price={price}
            mode={mode}
            FetchAvailibility={props.FetchAvailibility}
          />
        )}
      </div>
    </Typography>
  );
};

interface AvailabilityProps {
  setAddData: any;
  handleClickNext: any;
  setShowAddModal: any;
  mode?: any;
  selectedDayData?: {
    dayOfWeek: number;
    periods: Array<{
      startTime: string;
      endTime: string;
      _id: string;
    }>;
  } | null;
}

const Availability = (props: Partial<AvailabilityProps>) => {
  const Day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [loading, setLoading] = useState(false);
  const { handleClickNext, selectedDayData, mode, setAddData } = props;
  const [error, setError] = React.useState("");
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);
  //

  //
  const formik = useFormik({
    initialValues: {
      onsiteDay: selectedDay || "",
      morningfrom: "",
      morningto: "",
      eveningfrom: "",
      eveningto: "",
    },
    validationSchema: Yup.object(doctorInhouseAvailability),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  useEffect(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (mode === "add") {
      formik.setFieldValue("onsiteDay", "");
      formik.setFieldValue("morningfrom", "");
      formik.setFieldValue("morningto", "");
      formik.setFieldValue("eveningfrom", "");
      formik.setFieldValue("eveningto", "");
    } else {
      if (selectedDayData) {
        const { dayOfWeek, periods } = selectedDayData;

        if (dayOfWeek >= 0 && dayOfWeek < daysOfWeek.length) {
          const DDD = daysOfWeek[dayOfWeek];
          formik.setFieldValue("onsiteDay", DDD);
        }

        if (periods && periods.length >= 1) {
          formik.setFieldValue("morningfrom", periods[0]?.startTime);
          formik.setFieldValue("morningto", periods[0]?.endTime);

          if (periods.length > 1) {
            formik.setFieldValue("eveningfrom", "00:00");
            formik.setFieldValue("eveningto", "00:00");
          } else {
            formik.setFieldValue("eveningfrom", periods[1]?.startTime);
            formik.setFieldValue("eveningto", periods[1]?.endTime);
          }
        }
      }
    }
  }, [mode]);

  const handleMorningFrom = (newTime: any) => {
    formik.setFieldValue("morningfrom", newTime);
  };
  const handleMorningTo = (newTime: any) => {
    formik.setFieldValue("morningto", newTime);
  };

  const handleEveningFrom = (newTime: any) => {
    const eveningShift = selectedDayData?.periods[1];
    const selectedTime = newTime
      ? newTime.toString()
      : eveningShift
      ? eveningShift.startTime
      : "00:00";
    formik.setFieldValue("eveningfrom", selectedTime);
  };

  const handleEveningTo = (newTime: any) => {
    const eveningShift = selectedDayData?.periods[1];
    const selectedTime = newTime
      ? newTime.toString()
      : eveningShift
      ? eveningShift.endTime
      : "00:00";
    formik.setFieldValue("eveningto", selectedTime);
  };

  const handleSelect = (selectedOption: string) => {
    const dayToSelect = selectedOption;
    formik.setFieldValue("onsiteDay", dayToSelect);
  };

  const handleSubmit = async () => {
    const currentdata = formik.values;
    setLoading(true);

    let params: {
      availability: {
        dayOfWeek: number;
        periods: ({ startTime: string; endTime: string } | null)[];
      }[];
    } = {
      availability: [
        {
          dayOfWeek: Day.findIndex((day) => day === currentdata.onsiteDay),
          periods: [],
        },
      ],
    };

    // Add morning slot if both start and end times are provided
    if (currentdata.morningfrom && currentdata.morningto) {
      params.availability[0].periods.push({
        startTime: currentdata.morningfrom,
        endTime: currentdata.morningto,
      });
    }

    // Add evening slot if both start and end times are provided
    if (currentdata.eveningfrom && currentdata.eveningto) {
      params.availability[0].periods.push({
        startTime: currentdata.eveningfrom,
        endTime: currentdata.eveningto,
      });
    }

    if (params.availability[0].periods.length === 0) {
      setError("Please select a time.");
      setLoading(false);
    } else {
      handleClickNext();

      setAddData(params);
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={style.modelWidth}>
        <div style={{ width: "504px", marginTop: "24px" }}>
          <CustomSelect
            options={Day}
            placeholder="Day"
            onSelect={handleSelect || selectedDay}
            value={formik.values.onsiteDay}
            isEditing={mode === "edit"}
          />

          {formik.touched.onsiteDay && formik.errors.onsiteDay ? (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors.onsiteDay}
            </div>
          ) : null}
        </div>

        <div className={style.modelflx} style={{ marginTop: "16px" }}>
          <div style={{ width: "210px", marginRight: "82px" }}>
            <CustomTimePicker
              placeholder={
                mode === "add"
                  ? "Morning Shift Start"
                  : selectedDayData?.periods[0]?.startTime ||
                    "Morning Shift Start"
              }
              setData={handleMorningFrom}
              onTimeChange={handleMorningFrom}
              defaultValue={
                formik.values.morningfrom ||
                selectedDayData?.periods[0]?.startTime
              }
            />

            {formik.touched.morningfrom && formik.errors.morningfrom ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.morningfrom}
              </div>
            ) : null}
          </div>
          <div style={{ width: "210px" }}>
            <CustomTimePicker
              placeholder={
                mode === "add"
                  ? "Morning Shift End"
                  : selectedDayData?.periods[0]?.endTime || "Morning Shift End"
              }
              setData={handleMorningTo}
              onTimeChange={handleMorningTo}
              defaultValue={
                formik.values.morningto || selectedDayData?.periods[0]?.endTime
              }
            />

            {formik.touched.morningto && formik.errors.morningto ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.morningto}
              </div>
            ) : null}
          </div>
        </div>

        <div className={style.modelflx} style={{ marginTop: "16px" }}>
          <div style={{ width: "210px", marginRight: "82px" }}>
            <CustomTimePicker
              placeholder={
                mode === "add"
                  ? "Evening Shift Start"
                  : selectedDayData?.periods[1]?.startTime ||
                    "Evening Shift Start"
              }
              setData={handleEveningFrom}
              onTimeChange={handleEveningFrom}
              defaultValue={
                formik.values.eveningfrom ||
                selectedDayData?.periods[1]?.startTime ||
                "00:00"
              }
            />

            {formik.touched.eveningfrom && formik.errors.eveningfrom ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.eveningfrom}
              </div>
            ) : null}
          </div>
          <div style={{ width: "210px" }}>
            <CustomTimePicker
              placeholder={
                mode === "add"
                  ? "Evening Shift endTime"
                  : selectedDayData?.periods[1]?.endTime || "Evening Shift End"
              }
              setData={handleEveningTo}
              onTimeChange={handleEveningTo}
              defaultValue={
                formik.values.eveningto ||
                selectedDayData?.periods[1]?.endTime ||
                "00:00"
              }
            />

            {formik.touched.eveningto && formik.errors.eveningto ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.eveningto}
              </div>
            ) : null}
          </div>
        </div>
        <div style={{ width: "210px", margin: "56px 0 0 0" }}>
          <PrimaryButton
            children={
              mode === "edit" ? "Update Availability" : "Add Availability"
            }
            type="submit"
            colorType={"MedicalService"}
          />
        </div>
        {error && <div className={classNames(style.error)}>*{error}</div>}
      </form>
    </div>
  );
};
interface ExistingType {
  dayOfWeek: number;
  periods: Array<any>;
}

interface AddType {
  dayOfWeek: number;
  periods: Array<any>;
}
const Price = (props: any) => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);
  const {
    addData,
    setShowAddModal,
    modifiedFrontdata,
    price,
    mode,
    FetchAvailibility,
  } = props;

  const newAvailability = addData.availability.filter((add: AddType) => {
    return !modifiedFrontdata.some(
      (existing: ExistingType) => existing.dayOfWeek === add.dayOfWeek
    );
  });

  // Merge the existing availability with the new availability
  const mergedArray = modifiedFrontdata.concat(newAvailability);

  const formik = useFormik({
    initialValues: {
      actualPrice: "",
      priceforMeditour: "",
    },
    validationSchema: Yup.object(doctorAvailibilityPrice),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = async () => {
    const currentData = formik.values;
    const existingDayIndex = modifiedFrontdata.findIndex(
      (existingDay: any) =>
        existingDay.dayOfWeek === addData.availability[0].dayOfWeek
    );

    // If the day exists, overwrite its availability
    if (existingDayIndex !== -1) {
      modifiedFrontdata[existingDayIndex].periods =
        addData.availability[0].periods;
    } else {
      // If the day doesn't exist, add it along with its availability
      modifiedFrontdata.push(addData.availability[0]);
    }

    let paramss = {
      type: "in-house",
      availability: modifiedFrontdata,
      price: {
        actualPrice: currentData.actualPrice,
        meditourPrice: currentData.priceforMeditour,
      },
    };

    if (
      paramss.availability &&
      paramss.availability.length > 0 &&
      paramss.availability.every(
        (item: any) => item.periods !== undefined && item.periods.length > 0
      )
    ) {
      setLoading(true);
      DoctorAddOnsiteAvailability(paramss)
        .then((res: any) => {
          setShowAddModal(false);
          FetchAvailibility();
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Please Select Time");
    }
  };

  useEffect(() => {
    if (mode === "add") {
      formik.setFieldValue("actualPrice", "");
      formik.setFieldValue("priceforMeditour", "");
    } else if (price) {
      formik.setFieldValue("actualPrice", price?.actualPrice);
      formik.setFieldValue("priceforMeditour", price?.meditourPrice);
    }
  }, [mode]);
  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ marginTop: "56px" }} className={style.modelflx}>
            <div style={{ width: "213px" }}>
              <CustomInput
                placeholder="Price"
                id="actualPrice"
                name="actualPrice"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.actualPrice}
              />

              {formik.touched.actualPrice &&
                formik.errors.actualPrice &&
                typeof formik.errors.actualPrice === "string" && (
                  <span className={classNames(commonStyles.error)}>
                    *{formik.errors.actualPrice}
                  </span>
                )}
            </div>
            <div style={{ width: "213px", marginLeft: "83px" }}>
              <CustomInput
                placeholder="MediTour Price"
                id="priceforMeditour"
                name="priceforMeditour"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.priceforMeditour}
              />

              {formik.touched.priceforMeditour &&
                formik.errors.priceforMeditour &&
                typeof formik.errors.priceforMeditour === "string" && (
                  <span className={classNames(commonStyles.error)}>
                    *{formik.errors.priceforMeditour}
                  </span>
                )}
            </div>
          </div>
          <div style={{ marginTop: "56px", width: "210px" }}>
            <PrimaryButton
              children="Save"
              type="submit"
              colorType={"MedicalService"}
            />
          </div>
          {error && <div className={classNames(style.error)}>*{error}</div>}
        </form>
      </div>
    </>
  );
};
