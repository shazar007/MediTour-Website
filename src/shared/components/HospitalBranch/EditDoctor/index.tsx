import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import style from "./style.module.css";
import commonstyle from "shared/utils/common.module.css";
import { LocalizationProvider, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IoTimeOutline } from "react-icons/io5";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { avaialBility, availPrice } from "shared/services";
import toast from "react-hot-toast";
import { TbMoodEmpty } from "react-icons/tb";
import { TextField } from "@mui/material";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Card from "./Cards";
import { IoIosVideocam } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaClinicMedical } from "react-icons/fa";
import { FaHospital, FaHouseChimneyWindow } from "react-icons/fa6";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import CustomLoader from "shared/components/New_Loader/Loader";
import RingLoader from "shared/components/RingLoader";
import DeleteModal from "shared/components/DeleteModal";
import { useTranslation } from "react-i18next";
const HospitalEditDr = ({
  item,
  setEdirmodel,
  hitApi,
}: {
  item?: any;
  setEdirmodel?: any;
  hitApi?: any;
}) => {
  const { t }: any = useTranslation();
  const { systemType } = useSelector((state: any) => state.root.common);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [slot, setSlot] = useState<any>(null);
  const [value, setValue] = useState("");
  const [delModal, setDelModal] = useState(false);
  const [delType, setDelType] = useState("");
  const [availabilityData, setAvailabilityData] = useState<any>([]);
  const video_Availability = item?.availability?.[0]?.videoAvailability;
  const clinic_Availability = item?.availability?.[0]?.clinicAvailability;
  const inHouse_Availablity = item?.availability?.[0]?.inHouseAvailability;
  const hospital_Availablity = item?.availability?.[0]?.hospitalAvailability;
  const availableHospitals = hospital_Availablity?.filter(
    (hospital: any) => hospital.availability.length > 0
  );
  const handleTimePicker = () => {
    setIsTimePickerVisible(true);
  };
  const getDayName = (dayOfWeek: number) => {
    const days = [
      t("monday"),
      t("tuesday"),
      t("wednesday"),
      t("thursday"),
      t("friday"),
      t("saturday"),
      t("sunday"),
    ];
    return days[dayOfWeek];
  };

  useEffect(() => {
    const firstAvailableSlot =
      item?.hospitalAvailability?.[0]?.availability?.[0];
    if (firstAvailableSlot) {
      setSlot(firstAvailableSlot);
    }
    item?.hospitalAvailability?.map((i: any) => {
      setAvailabilityData(i?.availability);
    });
  }, [item]);
  const handlePrice = () => {
    let params = {
      price: value,
      doctorId: item?._id,
    };
    availPrice(params)
      .then((res: any) => {
        notifySuccess(t("priceAddSuccessfully"));
        hitApi();
        setEdirmodel(false);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const dayOfWeek = slot?.dayOfWeek;
  const handleDelete = () => {
    let availability_clone = JSON.parse(JSON.stringify(availabilityData));
    let index = availability_clone.findIndex(
      (dayData: any) => dayData.dayOfWeek === dayOfWeek
    );

    if (index > -1) {
      if (
        availability_clone[index]?.morning &&
        availability_clone[index]?.evening
      ) {
        delete availability_clone[index][delType];
      } else {
        availability_clone.splice(index, 1);
      }
    }
    const params = {
      doctorId: item?._id,
      availability: availability_clone,
    };
    avaialBility(params)
      .then((res: any) => {
        notifySuccess("deleteSuccessfully");
        hitApi("");
        setEdirmodel(false);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  return (
    <>
      <div className={classNames(style.modal)}>
        <div className={classNames(style.modalContent)}>
          <div className={style.innercontainer}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                backgroundColor: "#fff",
                // padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "16px",
              }}
            >
              <div className={style.drimgconatiner}>
                <img
                  src={
                    item?.doctorImage ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                  }
                  alt="EditDoctor"
                  className={style.drimg}
                />
              </div>

              <div
                style={{
                  width: "35%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <p className={style.drname}>{item?.name}</p>

                  <div className={style.featureconatiner}>
                    <p className={style.feature}>{t("featuredDoctor")}</p>
                  </div>
                </div>
                <p className={style.pmdc}>
                  {item?.hasPMDCNumber == true ? t("pmdcVerified") : null}
                </p>
                <div>
                  <p className={style.qualification}>{item?.qualifications}</p>
                </div>

                <div className={classNames(style.bottom)}>
                  <div>
                    <p className={style.bottomtitle}>
                      {item?.clinicExperience}
                    </p>
                    <p className={style.bottomlabel}>{t("experience")}</p>
                  </div>
                  <div className={style.bottomseprator}> </div>
                  <div>
                    <p
                      className={style.bottomtitle}
                    >{`${item?.satisfiedPatientCount} (${item?.satisfiedPatientPercentage})`}</p>
                    <p className={style.bottomlabel}>{t("satisfiedPatient")}</p>
                  </div>
                </div>
              </div>
            </div>
            {systemType === "company" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    width: "80%",
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
                    textAlign: "center",
                  }}
                >
                  {video_Availability ||
                  (clinic_Availability?.availability?.length > 0 &&
                    clinic_Availability?.price?.actualPrice) ||
                  inHouse_Availablity?.availability?.length > 0 ||
                  (availableHospitals?.length > 0 &&
                    hospital_Availablity?.length > 0) ? (
                    <>
                      {video_Availability && (
                        <Avail_Card
                          t={t}
                          subTitle={t("video")}
                          source={<IoIosVideocam />}
                          data={video_Availability}
                        />
                      )}
                      {clinic_Availability?.availability?.length > 0 &&
                        clinic_Availability?.price?.actualPrice && (
                          <Avail_Card
                            t={t}
                            subTitle={t("clinic")}
                            source={<FaClinicMedical />}
                            data={clinic_Availability}
                          />
                        )}
                      {inHouse_Availablity?.availability?.length > 0 && (
                        <Avail_Card
                          t={t}
                          subTitle={t("inHouse")}
                          source={<FaHouseChimneyWindow />}
                          data={inHouse_Availablity}
                        />
                      )}
                      {availableHospitals?.length > 0 &&
                        hospital_Availablity?.map((item: any) => (
                          <Avail_Card
                            t={t}
                            key={item.hospitalId?.id} // Ensure a unique key for each card
                            subTitle={item?.hospitalId?.name}
                            source={<FaHospital />}
                            data={item}
                          />
                        ))}
                    </>
                  ) : (
                    <p
                      style={{
                        fontSize: "18px",
                        color: "#999",
                        fontWeight: "bold",
                      }}
                    >
                      {t("noAvailabilityFound")}
                    </p>
                  )}
                </div>
              </div>
            )}

            {systemType === "company" ? null : (
              <>
                {item?.hospitalAvailability?.map((i: any) => (
                  <>
                    <div>
                      <p className={classNames(style.drname, commonstyle.mt16)}>
                        {t("appointmentFee")}
                      </p>
                      <hr
                        style={{ backgroundColor: "#7D7D7D", margin: "5px 0" }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        placeholder={i?.price ? i?.price : "Enter Price"}
                        type="number"
                        onChange={(e: any) => setValue(e.target.value)}
                        value={value}
                        style={{
                          padding: "5px 0",
                          fontSize: "16px",
                          borderRadius: "16px",
                          width: "200px",
                          transition: "border-color 0.3s ease",
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "38px",
                            borderRadius: "24px",
                            fontSize: "16px",
                            // padding: "5px 10px",
                            transition: "border-color 0.3s ease",
                          },
                        }}
                      />
                      <button
                        className={classNames(style.savebtn)}
                        onClick={handlePrice}
                      >
                        {t("save")}
                      </button>
                    </div>
                    <div className={classNames(commonstyle.mt16)}>
                      <p className={classNames(style.drname)}>
                        {t("seeAvailability")}
                      </p>
                    </div>
                    <hr
                      style={{ backgroundColor: "#7D7D7D", margin: "5px 0" }}
                    />

                    <div className={classNames(style.daycardcontainer)}>
                      {availabilityData?.map((d: any) => (
                        <div
                          className={style.daycard}
                          style={{
                            backgroundColor: slot === d ? "#0e54a3" : "#fff",
                            color: slot === d ? "#fff" : "#0e54a3",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSlot(d);
                          }}
                        >
                          <p>{getDayName(d?.dayOfWeek)}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ))}

                {slot ? (
                  <>
                    <div
                      className={classNames(
                        commonstyle.mt50,
                        commonstyle.flx,
                        commonstyle.flxBetween
                      )}
                    >
                      <p style={{ fontWeight: "600", fontSize: "14px" }}>
                        {getDayName(slot?.dayOfWeek)}
                      </p>
                    </div>
                    <hr
                      style={{ backgroundColor: "#7D7D7D", margin: "5px 0" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "16px",
                      }}
                    >
                      {slot?.morning && (
                        <MorningEvening
                          t={t}
                          shifName={t("morningShift")}
                          slot={slot?.morning}
                          delShift={() => {
                            setDelType("morning");
                            setDelModal(true);
                          }}
                        />
                      )}
                      {slot?.evening && (
                        <MorningEvening
                          t={t}
                          shifName={t("eveningShift")}
                          slot={slot?.evening}
                          delShift={() => {
                            setDelType("evening");
                            setDelModal(true);
                          }}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <TbMoodEmpty size={40} color="red" />
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#888",
                        marginTop: "8px",
                      }}
                    >
                      {t("noSlotsAvailable")}
                    </p>
                  </div>
                )}
              </>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                margin: "16px 0",
              }}
            >
              {systemType === "company" ? null : (
                <p
                  // className={classNames(style.Addslot)}
                  className={classNames(style.addbtn)}
                  onClick={handleTimePicker}
                  // style={{
                  //   backgroundColor: "#007BFF",
                  //   color: "#fff",
                  //   padding: "10px 20px",
                  //   borderRadius: "8px",
                  //   fontWeight: "600",
                  //   fontSize: "14px",
                  //   cursor: "pointer",
                  //   transition: "all 0.3s ease",
                  //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  //   textAlign: "center",
                  // }}
                  // onMouseOver={(e) =>
                  //   (e.currentTarget.style.backgroundColor = "#0056b3")
                  // }
                  // onMouseOut={(e) =>
                  //   (e.currentTarget.style.backgroundColor = "#007BFF")
                  // }
                >
                  {t("addAvailability")}
                </p>
              )}
              <button
                className={classNames(style.removebtn)}
                onClick={() => setEdirmodel(false)}
              >
                {t("close")}
              </button>
            </div>

            {isTimePickerVisible && (
              <TimeSelector
                t={t}
                item={item}
                slot={slot}
                hitApi={hitApi}
                avaiItem={availabilityData}
                setEdirmodel={setEdirmodel}
                setIsTimePickerVisible={setIsTimePickerVisible}
              />
            )}

            <DeleteModal
              modalVisible={delModal}
              content={t("deleteThisSchedule")}
              handleDelete={handleDelete}
              handleCancel={() => {
                setDelType("");
                setDelModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalEditDr;

const TimeSelector = ({
  t,
  item,
  setIsTimePickerVisible,
  avaiItem,
  hitApi,
  setEdirmodel,
  slot,
}: {
  t?: any;
  item?: any;
  setIsTimePickerVisible?: any;
  avaiItem?: any;
  hitApi?: any;
  setEdirmodel?: any;
  slot?: any;
}) => {
  const [startMorning, setStartMorning] = useState("");
  const [endMorning, setEndMorning] = useState("");
  const [startEvening, setStartEvening] = useState("");
  const [endEvening, setEndEvening] = useState("");
  const [showDay, setShowDay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>("");

  const Day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const addDoctorAvail = () => {
    if (selectedDay === "" || selectedDay === null) {
      notifyError(t("pleaseSelectDay"));
      return;
    }

    let availability: any = [];
    let day = Day.findIndex((day) => {
      return day === selectedDay;
    });
    let availability_clone: any = {};
    let Index: any = -1;

    if (avaiItem) {
      availability_clone = JSON.parse(JSON.stringify(avaiItem));
      availability_clone?.map((item: any, index: any) => {
        if (item.dayOfWeek === day) {
          Index = index;
        }
      });
    }

    let morning = null;
    if (startMorning && endMorning) {
      if (startMorning === endMorning) {
        notifyError(t("startAndMorningTimeNotTobeSame"));
        return;
      }
      morning = {
        startTime: startMorning,
        endTime: endMorning,
      };
    } else if (startMorning || endMorning) {
      notifyError(t("selectBoth"));

      return; // exit if either is missing
    }

    // Validate that start and end evening are set correctly
    let evening = null;
    if (startEvening && endEvening) {
      if (startEvening === endEvening) {
        notifyError(t("startAndEveningTimeNotTobeSame"));
        return; // exit if start and end evening are the same
      }
      evening = {
        startTime: startEvening,
        endTime: endEvening,
      };
    } else if (startEvening || endEvening) {
      notifyError(t("bothstartAndEveningSelected"));
      return;
    }
    if (!morning && !evening) {
      notifyError(t("selectAtleastOneTime"));
      return;
    }

    if (Index !== -1) {
      let clone = JSON.parse(JSON.stringify(availability_clone));
      if (morning) {
        clone[Index].morning = morning;
      }
      if (evening) {
        clone[Index].evening = evening;
      }
      availability = clone;
    } else {
      if (availability_clone) {
        availability = [...availability_clone];
      }

      availability = [
        {
          dayOfWeek: day,
          ...(morning && { morning }),
          ...(evening && { evening }),
        },
        ...availability,
      ];
    }
    let dayExists = avaiItem.some((item: any) => item.dayOfWeek === day);

    if (dayExists) {
      notifyError(t("dayAlreadyInSlot"));
      return;
    }

    const params = {
      doctorId: item?._id,
      availability: availability,
    };
    setLoading(true);

    avaialBility(params)
      .then((res: any) => {
        setIsTimePickerVisible(false);
        toast.success(t("availabilitySuccessfullyAdded"));
        hitApi("");
        setEdirmodel(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classNames(style.modal)}>
      <div className={classNames(style.timemodalContent)}>
        <div className={classNames(style.innercontainer)}>
          <p style={{ color: "#131313", fontSize: "14px", fontWeight: "600" }}>
            {t("addNewSlot")}
          </p>
          <hr style={{ backgroundColor: "#7D7D7D", margin: "5px 0" }} />
          <div
            className={classNames(style.selectDayContainer)}
            onClick={() => setShowDay(!showDay)}
          >
            <p>{selectedDay ? selectedDay : t("selectDay")}</p>
            <RiArrowDropDownLine size={24} />
          </div>
          {showDay && (
            <div className={classNames(style.dropdownContainer)}>
              {Day?.map((d: any) => (
                <div
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    backgroundColor: selectedDay === d ? "#0e54a3" : "#fff",
                    color: selectedDay === d ? "#fff" : "black",
                  }}
                  key={d}
                  onClick={() => {
                    setShowDay(false);
                    setSelectedDay(d);
                  }}
                >
                  <p>{d}</p>
                </div>
              ))}
            </div>
          )}
          <div style={{ margin: "16px 0px" }}>{t("morningShift")}</div>
          <div
            className={classNames(
              commonstyle.mb24,
              commonstyle.flx,
              commonstyle.flxBetween,
              commonstyle.flxwrap
            )}
          >
            <div
              style={{
                width: "40%",
              }}
            >
              {" "}
              <p className={classNames(style.textStyle)}>{t("startTime")}</p>
              <div>
                <SelectionTIme
                  t={t}
                  SetselectTime={setStartMorning}
                  selectTime={startMorning}
                />
              </div>
            </div>
            <div
              style={{
                width: "40%",
              }}
            >
              <p className={classNames(style.textStyle)}> {t("endTime")}</p>
              <SelectionTIme
                t={t}
                SetselectTime={setEndMorning}
                selectTime={endMorning}
              />
            </div>
          </div>
          {t("eveningShift")}
          <div
            className={classNames(
              commonstyle.mb24,
              commonstyle.flx,
              commonstyle.flxBetween
            )}
            style={{ marginTop: "24px" }}
          >
            <div
              style={{
                width: "40%",
              }}
            >
              {" "}
              <p className={classNames(style.textStyle)}>{t("startTime")}</p>
              <div>
                <SelectionTIme
                  t={t}
                  SetselectTime={setStartEvening}
                  selectTime={startEvening}
                />
              </div>
            </div>
            <div
              style={{
                width: "40%",
              }}
            >
              <p className={classNames(style.textStyle)}> {t("endTime")}</p>
              <SelectionTIme
                t={t}
                SetselectTime={setEndEvening}
                selectTime={endEvening}
              />
            </div>
          </div>
          <div
            className={classNames(
              commonstyle.mt56,
              commonstyle.flx,
              commonstyle.flxBetween
            )}
          >
            <button
              className={classNames(style.removebtn)}
              style={{ backgroundColor: "#7D7D7D" }}
              onClick={() => setIsTimePickerVisible(false)}
            >
              {t("cancel")}
            </button>

            <button
              disabled={loading}
              className={classNames(style.savebtn)}
              onClick={addDoctorAvail}
            >
              {loading ? <RingLoader size={30} color={"#fff"} /> : t("save")}
              {/* save */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const SelectionTIme = ({
  t,
  SetselectTime,
  selectTime,
  placeholder,
}: {
  t: any;
  SetselectTime?: any;
  selectTime?: any;
  placeholder?: string;
}) => {
  const handleTimeChange = (newTime: any) => {
    if (newTime) {
      const formattedTime = dayjs(newTime).format("HH:mm");
      SetselectTime && SetselectTime(formattedTime);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={placeholder || t("selectTime")}
        value={selectTime ? dayjs(selectTime, "HH:mm") : null}
        onChange={handleTimeChange}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        components={{
          OpenPickerIcon: IoTimeOutline,
        }}
        sx={{
          width: "100%",
          "& .MuiStack-root": {
            overflow: "visible",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            width: "clamp(140px, 40vw, 130px)",
            height: "30.5",
            borderTop: "none",
            borderRight: "none",
            borderLeft: "none",
            borderRadius: "22.5px",
            border: "1px solid",
            borderColor: "#0E54A3",
            fontStyle: "italic",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Poppins", sans-serif',
          },
          "& .MuiIconButton-root": {
            padding: "0px",
            color: "#00276d",
            right: "10px",
          },
          "& .MuiOutlinedInput-input": {
            height: "10px",
            color: "#00276d",
            fontStyle: "italic",
            fontFamily: '"Poppins", sans-serif',
            fontSize: "11px",
            paddingLeft: "0px",
            textAlign: "center",
          },
          "& .MuiInputLabel-root": {
            fontSize: "11px",
            fontStyle: "italic",
            fontFamily: '"Poppins", sans-serif',
            color: "#00276d",
            position: "absolute",
            fontWeight: "600",
          },

          "& .MuiOutlinedInput-input::placeholder": {
            textAlign: "center",
          },
        }}
      />
    </LocalizationProvider>
  );
};
const MorningEvening = ({
  t,
  slot,
  shifName,
  delShift,
}: {
  t?: any;
  slot?: any;
  shifName?: any;
  delShift?: any;
}) => {
  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "20px 0",
        // fontFamily: "'Roboto', sans-serif",
        color: "#333",
        border: "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "8px",
          gap: "20px",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "#444",
          }}
        >
          {shifName}
        </p>
        <MdOutlineDeleteOutline
          size={24}
          style={{
            color: "#e53935",
            cursor: "pointer",
            transition: "color 0.2s ease",
          }}
          onClick={delShift}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <p style={{ fontSize: "14px", fontWeight: "500", color: "#555" }}>
          {t("startTime")}:
        </p>
        <p style={{ fontSize: "14px", color: "#0288d1", fontWeight: "600" }}>
          {dayjs(slot?.startTime, "HH:mm").format("hh:mm A") || "Not Set"}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "14px", fontWeight: "500", color: "#555" }}>
          {t("endTime")}:
        </p>
        <p style={{ fontSize: "14px", color: "#0288d1", fontWeight: "600" }}>
          {dayjs(slot?.endTime, "HH:mm").format("hh:mm A") || "Not Set"}
        </p>
      </div>
    </div>
  );
};
const Avail_Card = ({ t, data, subTitle, source }: any) => {
  return (
    <div className={classNames(commonstyle.mt24)}>
      <div className={style.flx}>
        <p className={style.dicons}>{source}</p>
        <div
          className={classNames(commonstyle.flx, commonstyle.flxBetween)}
          style={{
            width: "74%",
          }}
        >
          <p className={style.deatiltitle}>{subTitle}</p>
          <p className={style.deatiltitle}>
            {" "}
            {t("fee")}: {data?.price?.actualPrice || 0}/-
          </p>
        </div>
      </div>
      <Card days={data} />
    </div>
  );
};
