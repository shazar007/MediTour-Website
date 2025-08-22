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
import { confirmDateAndTime } from "shared/services";
import { CustomModal, RingLoader } from "shared/components";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";

const DetailBooking = () => {
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { systemType } = useSelector((state: any) => state?.root?.common);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelctedTime] = useState<any>(null);
  const [showModel, setShowModel] = useState(false);
  const [ringerLoader, setRingerLoader] = useState(false);
  const [status, setStatus] = useState("");
  const titles = [
    t("id"),
    t("_name"),
    t("phone"),
    t("email"),
    t("availability"),
  ];
  const titles2 = [
    t("id"),
    t("_name"),
    t("phone"),
    t("submittedAt"),
    t("type"),
    t("status"),
  ];
  const titles3 = [
    t("id"),
    t("doctorName"),
    t("patientName"),
    t("appointmentDate"),
    state?.appointmentDateAndTime ? t("reDate") : t("selectDate"),
    state?.appointmentDateAndTime ? t("reTime") : t("selectTime"),
    t("payment"),
  ];

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
      state?.patientId?.mrNo,
      state?.patientId?.name,
      state?.patientId?.phone,
      dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a"),
      state?.appointmentType,
      state?.status,
    ],
  ];
  const tempData3 = [
    [
      state?.appointmentId,
      state?.doctorInfo?.name,
      state?.patientId?.name,
      state?.appointmentDateAndTime
        ? dayjs(state?.appointmentDateAndTime).format("MM-DD-YYYY h:mm a")
        : "No Date&Time",
      <div className={style.dropdownWrapper}>
        <CiCalendar size={16} />
        <div
          onClick={() =>
            setOpenDropdown(openDropdown === "dateTime" ? null : "dateTime")
          }
        >
          {selectedDate ? selectedDate.format("MM/DD/YYYY") : t("select")}
        </div>
        {openDropdown === "dateTime" && (
          <div className={style.dropdownContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={t("selectDate_")}
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
      <div className={style.dropdownWrapper}>
        <IoTimeOutline size={16} />
        <div
          onClick={() =>
            setOpenDropdown(openDropdown === "TimePicker" ? null : "TimePicker")
          }
        >
          {selectedTime ? selectedTime.format("hh:mm A") : t("select")}
        </div>
        {openDropdown === "TimePicker" && (
          <div className={style.dropdownContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopTimePicker
                label={t("selectTime_")}
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
    let datetime: any;
    if (selectedDate && selectedTime) {
      datetime =
        status === "confirm" &&
        dayjs(selectedDate)
          .hour(dayjs(selectedTime)?.hour())
          .minute(dayjs(selectedTime)?.minute())
          .tz("Asia/Karachi")
          .format("YYYY-MM-DDTHH:mm:ss.SSS");
    }
    setRingerLoader(true);
    let params = {
      appointmentRequestId: state?._id,
      confirmationStatus: status,
      ...(selectedDate &&
        selectedTime && {
          appointmentDateAndTime: datetime,
        }),
    };
    confirmDateAndTime(params)
      .then((res: any) => {
        console.log(res, "/........");
        setShowModel(false);
        navigate(`/${systemType}/AppointmentBooking`);
      })
      .catch((err: any) => {
        console.log(err, ".....err");
      })
      .finally(() => {
        setRingerLoader(false);
      });
  };
  const handleConfirm = (type: any) => {
    if (type === "cancel") {
      setShowModel(true);
      setStatus(type);
      return;
    }
    if (!state?.appointmentDateAndTime) {
      if (!selectedDate || !selectedTime) {
        notifyError(t("pleaseSelectDateAndTime"));
        return;
      }
    }
    if ((selectedDate && !selectedTime) || (!selectedDate && selectedTime)) {
      notifyError(t("pleaseSelectBothDateAndTime"));
      return;
    }
    setShowModel(true);
    setStatus(type);
  };

  return (
    <div className={classNames(style.maincontainer)}>
      <div className={style.container}>
        <div className={style.backButton} onClick={handleBackClick}>
          <IoMdArrowBack size={24} />
        </div>
        <div className={style.heading}>{t("requestDetails")}</div>
      </div>
      <div className={style.card}>
        <div className={style.cardTitle}>{t("doctor")}</div>
        <TableNew
          titles={titles}
          data={tempData}
          headerWidth="24.5%"
          itemWidth="24.5%"
        />
      </div>
      <div className={style.card}>
        <div className={style.cardTitle}>{t("patient")}</div>
        <TableNew
          titles={titles2}
          data={tempData2}
          headerWidth="20%"
          itemWidth="20%"
        />
      </div>
      <div className={style.card}>
        <div className={style.cardTitle}>{t("createAppointment")}</div>
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
          justifyContent: "space-between",
          // marginRight: "20px",
          marginTop: "48px",
        }}
      >
        <button
          children={t("cancelAppointment")}
          className={style.admin}
          onClick={() => handleConfirm("cancel")}
        />
        <button
          children={t("confirmAppointment")}
          className={style.blue}
          onClick={() => handleConfirm("confirm")}
        />
      </div>
      <CustomModal showModal={showModel}>
        <div className={style.modalContent}>
          {status === "confirm" ? (
            <div className={style.modalText}>
              {selectedDate && selectedTime ? (
                `${t("confirmAppointment")} ?`
              ) : (
                <>
                  {t("proceedWithPreDefined_")} <br />
                  {t("date&Time")}?
                </>
              )}
            </div>
          ) : (
            <div className={style.modalText}>
              {t("AreYouSureYouWantToCancel")}
              <br />
              Meditour?
            </div>
          )}
          <div className={style?.modalButtons}>
            <button
              onClick={() => setShowModel(false)}
              className={style?.buttonCancel}
            >
              {t("cancel")}
            </button>
            <button onClick={sendRequest} className={style?.buttonProceed}>
              {ringerLoader ? <RingLoader /> : t("proceed")}
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default DetailBooking;
