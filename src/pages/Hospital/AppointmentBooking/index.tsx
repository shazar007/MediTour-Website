import { useEffect, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import { CustomModal, RequestTable, RingLoader } from "shared/components";
import {
  deleteAppointment,
  getBookingAppointment,
  getHospitalAppointment,
} from "shared/services";
import dayjs from "dayjs";
import { MdDelete, MdOutlineFileDownloadDone } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";

dayjs.extend(utc);
dayjs.extend(timezone);
const HospitalAppointmentBooking = () => {
  const { t }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [todayDate, setTodayDate] = useState<any>(null);
  const [name, setName] = useState<any>([]);
  const [length, setLength] = useState(0);
  const [todayLoading, setTodayLoading] = useState(false);
  const [todayName, setTodayName] = useState<any>([]);
  const [lengthToday, setTodayLength] = useState(0);
  const [appointment, setAppointment] = useState<any>();
  const [todayAppointment, settodayAppointment] = useState<any>();
  const [selectName, setSelectedName] = useState("");
  const [selectedTodayName, setSelectedTodayName] = useState("");
  const [openDelete, setDeleteModal] = useState(false);
  const [ringerLoader, setRingloader] = useState(false);
  const [itemValue, setItem] = useState<any>("");
  const [search, setSearch] = useState("");
  const [searchRequest, setSearchRequest] = useState("");
  const totalItems = length;
  const navigate = useNavigate();
  const totalTodayItems = lengthToday;
  const date = selectedDate ? dayjs(selectedDate.$d).format("YYYY-MM-DD") : "";

  const handleGoToDetail = (item: any) => {
    navigate("/DetailBooking", { state: item });
  };
  const [debouncedSearch, setDebouncedSearch] = useState(searchRequest);
  const [debouncedSearch2, setDebouncedSearch2] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchRequest);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchRequest]);

  useEffect(() => {
    allAppintment(1, debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch2(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    allTodayAppointment(1, debouncedSearch2);
  }, [debouncedSearch2]);

  const allAppintment = (pageno: number, keyWord: any) => {
    setLoading(true);
    getBookingAppointment(pageno, date, selectName, keyWord)
      .then((res: any) => {
        handleTableData(res?.data?.appointments);
        setName(res?.data?.doctorNames);
        setLength(res?.data?.totalAppoints);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTableData = (data: any) => {
    let tempData: any = [];
    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        const date = dayjs
          .utc(v?.appointmentDateAndTime)
          .tz("Asia/Karachi")
          .format("MM-DD-YYYY h:mm a");
        tempData.push([
          v?.appointmentId,
          v?.patientId?.name,
          v?.appointmentDateAndTime ? date : "",
          v?.appointmentType,
          v?.status,
          v?.doctorInfo?.name,
          <div
            className={style.dropdownWrapper}
            style={{ gap: "16px", display: "flex", cursor: "pointer" }}
          >
            <CiEdit
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
              onClick={() => handleGoToDetail(v)}
            />
          </div>,
        ]);
      });

      setAppointment(tempData);
    } else {
      setAppointment([]);
    }
  };

  useEffect(() => {
    allAppintment(1, "");
  }, [selectedDate, selectName]);

  useEffect(() => {
    allTodayAppointment(1, "");
  }, [todayDate, selectedTodayName]);

  const today = todayDate ? dayjs(todayDate.$d).format("YYYY-MM-DD") : "";

  const allTodayAppointment = (pageno: number, keyword: any) => {
    setTodayLoading(true);
    getHospitalAppointment(
      pageno,
      today,
      selectedTodayName ? selectedTodayName : keyword
    )
      .then((res: any) => {
        handleTodayPayment(res?.data?.Appointments);
        setTodayName(res?.data?.doctorNames);
        setTodayLength(res?.data?.totalAppoints);
      })
      .catch((err: any) => {})
      .finally(() => {
        setTodayLoading(false);
      });
  };

  const handleTodayPayment = (data: any) => {
    let tempData: any = [];
    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        const date = dayjs
          .utc(v?.appointmentDateAndTime)
          .tz("Asia/Karachi")
          .format("MM-DD-YYYY h:mm a");
        tempData.push([
          v?.appointmentId,
          v?.patientInfo?.name,
          v?.appointmentDateAndTime ? date : "",
          v?.appointmentType,
          v?.status,
          v?.doctorInfo?.name,
          v?.status === "completed" ? (
            <MdOutlineFileDownloadDone size={24} color="green" />
          ) : (
            <div
              className={style.dropdownWrapper}
              style={{ gap: "8px", cursor: "pointer" }}
            >
              {/* <FiEdit3 size={24} /> */}
              <CiEdit
                style={{ width: "24px", height: "24px" }}
                onClick={() => navigate("/appointment/detail", { state: v })}
              />
              <MdDelete size={24} color="red" onClick={() => handleDelete(v)} />
            </div>
          ),
        ]);
      });

      settodayAppointment(tempData);
    } else {
      settodayAppointment([]);
    }
  };

  const handleDelete = (v: any) => {
    setDeleteModal(true);
    setItem(v?._id);
  };

  const appointmentDelete = () => {
    setRingloader(true);
    deleteAppointment(itemValue, "appointment")
      .then(() => {
        setDeleteModal(false);
        toast.success("Appointment Deleted SuccessFully");
        allTodayAppointment(1, "");
      })
      .catch(() => {})
      .finally(() => {
        setRingloader(false);
      });
  };

  return (
    <div>
      <div className={classNames(style.container)}>
        <div>
          <div className={classNames(commonstyles.mb24)}>
            <p className={style.heading}>{t("appointmentRequests")}</p>
          </div>
          <RequestTable
            appointment={appointment}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            loading={loading}
            name={name}
            headTitle={t("appointments")}
            length={length}
            search={searchRequest}
            setSearch={setSearchRequest}
            setDepart={setAppointment}
            setSelectedName={setSelectedName}
            allHospital={allAppintment}
            totalItems={totalItems}
          />
        </div>

        <div>
          <div className={classNames(commonstyles.mb24)}>
            <p className={classNames(style.heading, commonstyles.mt24)}>
              {t("allAppointments")}
            </p>
          </div>
        </div>
        <div>
          <RequestTable
            appointment={todayAppointment}
            selectedDate={todayDate}
            setSelectedDate={setTodayDate}
            loading={todayLoading}
            name={todayName}
            length={lengthToday}
            headTitle={t("appointments")}
            setDepart={settodayAppointment}
            setSelectedName={setSelectedTodayName}
            allHospital={allTodayAppointment}
            totalItems={totalTodayItems}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <CustomModal showModal={openDelete}>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {t("AreYouSureDeleteAndSendAppointment")} <br />{" "}
            {t("backToMediTour")}
          </div>
          <div className={style?.modalButtons}>
            <button
              onClick={() => setDeleteModal(false)}
              className={style?.buttonCancel}
            >
              {t("cancel")}
            </button>
            <button
              onClick={appointmentDelete}
              className={style?.buttonProceed}
            >
              {ringerLoader ? <RingLoader /> : t("proceed")}
            </button>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default HospitalAppointmentBooking;
