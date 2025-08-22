import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./detail.module.css";
import dayjs from "dayjs";
import { CiCalendar } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import TableNew from "shared/components/A_New_Components/Table_new";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { reSecdualIng } from "shared/services";
import toast from "react-hot-toast";
import { CustomModal, RingLoader } from "shared/components";
import classNames from "classnames";
const ReScedual = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { systemType } = useSelector((state: any) => state?.root?.common);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelctedTime] = useState<any>(null);
  const [ringerLoader, setRingloader] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const titles = ["ID", "Name", "Phone", "Email", "Availability"];
  const titles2 = ["ID", "Name", "Phone", "Submitted at", "Type", "Status"];
  const titles3 = [
    "ID",
    "Doctor Name",
    "Patient Name",
    "Appointment Date",
    state?.appointmentDateAndTime ? "Re-Date" : "Select Date",
    state?.appointmentDateAndTime ? "Re-Time" : "Select Time",
    "Payment",
  ];
  console.log(state, ".....state");
  const handleBackClick = () => {
    navigate(`/${systemType}/AppointmentBooking`);
  };

  const tempData = [
    [
      state?.doctorInfo?.vendorId,
      state?.doctorInfo?.name,
      state?.doctorInfo?.phoneNumber,
      state?.doctorInfo?.email,
      "Yes",
    ],
  ];
  const tempData2 = [
    [
      state?.patientInfo?.mrNo,
      state?.patientInfo?.name,
      state?.patientInfo?.phone,
      dayjs(state?.requestRefId?.createdAt).format("MM-DD-YYYY h:mm a"),
      state?.appointmentType,
      state?.status,
    ],
  ];
  const tempData3 = [
    [
      state?.appointmentId,
      state?.doctorInfo?.name,
      state?.patientInfo?.name,
      state?.appointmentDateAndTime
        ? dayjs(state?.appointmentDateAndTime).format("MM-DD-YYYY h:mm a")
        : "No Date&Time",
      <div
        className={style.dropdownWrapper}
        style={{
          cursor: "pointer",
        }}
      >
        <CiCalendar size={16} />
        <div
          onClick={() =>
            setOpenDropdown(openDropdown === "dateTime" ? null : "dateTime")
          }
        >
          {selectedDate ? selectedDate.format("MM/DD/YYYY") : "Select"}
        </div>
        {openDropdown === "dateTime" && (
          <div className={style.dropdownContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Select Date"
                format="MM/DD/YYYY"
                value={selectedDate}
                onChange={(newDate) => {
                  setSelectedDate(newDate);
                  setOpenDropdown(null);
                }}
              />
            </LocalizationProvider>
          </div>
        )}
      </div>,
      <div
        className={style.dropdownWrapper}
        style={{
          cursor: "pointer",
        }}
      >
        <IoTimeOutline size={16} />
        <div
          onClick={() =>
            setOpenDropdown(openDropdown === "TimePicker" ? null : "TimePicker")
          }
        >
          {selectedTime ? selectedTime.format("hh:mm A") : "Select"}
        </div>
        {openDropdown === "TimePicker" && (
          <div className={style.dropdownContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopTimePicker
                label="Select Time"
                value={selectedTime}
                onChange={(newDate) => {
                  setSelctedTime(newDate);
                  setOpenDropdown(null);
                }}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </LocalizationProvider>
          </div>
        )}
      </div>,
      state?.isPaidFull === true ? "Paid" : "Partial",
    ],
  ];
  const sendRequest = () => {
    setRingloader(true);
    const datetime = dayjs(selectedDate)
      .hour(dayjs(selectedTime)?.hour())
      .minute(dayjs(selectedTime)?.minute())
      .tz("Asia/Karachi")
      .format("YYYY-MM-DDTHH:mm:ss.SSS");
    const params = {
      appointmentId: state?._id,
      newDoctorId: state?.doctorInfo?._id,
      newDateAndTime: datetime,
    };
    reSecdualIng(params)
      .then((res: any) => {
        setShowModel(false);
        navigate(`/${systemType}/AppointmentBooking`);
      })
      .catch((err: any) => {
        console.log(err, ".....err");
      })
      .finally(() => {
        setRingloader(false);
      });
  };
  const handleConfirm = () => {
    if (!selectedDate && !selectedTime) {
      toast.error("Please select both date and time!");
      return;
    }
    setShowModel(true);
  };
  return (
    <div className={classNames(style.maincontainer)}>
      <div className={style.container}>
        <div className={style.backButton} onClick={handleBackClick}>
          <IoMdArrowBack size={24} />
        </div>
        <div className={style.heading}>Appointment Details</div>
      </div>
      <div className={style.card}>
        <div className={style.cardTitle}>Doctor</div>
        <TableNew
          titles={titles}
          data={tempData}
          headerWidth="24.5%"
          itemWidth="24.5%"
        />
      </div>
      <div className={style.card}>
        <div className={style.cardTitle}>Patient</div>
        <TableNew
          titles={titles2}
          data={tempData2}
          headerWidth="18.7%"
          itemWidth="18.7%"
        />
      </div>
      <div className={style.card}>
        <div className={style.cardTitle}>Create Appointment....</div>
        <TableNew
          titles={titles3}
          data={tempData3}
          headerWidth="17%"
          itemWidth="17%"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "48px",
        }}
      >
        <button
          children={"Reschedule Appointment"}
          className={style.blue}
          onClick={handleConfirm}
        />
      </div>
      <CustomModal showModal={showModel}>
        <div className={style.modalContent}>
          <div className={style.modalText}>
            Proceed with the selected date and time.
          </div>

          <div className={style?.modalButtons}>
            <button
              onClick={() => setShowModel(false)}
              className={style?.buttonCancel}
            >
              Cancel
            </button>
            <button onClick={sendRequest} className={style?.buttonProceed}>
              {ringerLoader ? <RingLoader /> : "Proceed"}
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ReScedual;
