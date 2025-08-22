import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./hospitalDashboard.module.css";
import dricon from "assets/images/HospitalDashboard/drIcon.png";
import staffIcon from "assets/images/HospitalDashboard/staffIcon.png";
import PatientIcon from "assets/images/HospitalDashboard/PatientIcon.png";
import pharmIcon from "assets/images/HospitalDashboard/pharmIcon.png";
import Labicon from "assets/images/HospitalDashboard/Labicon.png";
import TableNew from "shared/components/A_New_Components/Table_new";
import { getCountDasheboard, getHospitalAppointment } from "shared/services";
import dayjs from "dayjs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";
import NewPagination from "shared/components/NewPagination/NewPagination";
const Hospital_Dashboard = () => {
  const { t }: any = useTranslation();
  const [data, setData] = useState<any>({});
  const [appointment, setAppointment] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [name, setName] = useState<any>([]);
  const [length, setLength] = useState(0);
  const navigate = useNavigate();
  const [selectName, setSelectedName] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const { systemType, user } = useSelector((state: any) => state.root.common);
  const itemsPerPage = 10;
  const totalItems = length;
  const count = [
    { img: dricon, title: t("doctor"), count: data?.totalDoctors ?? 0 },
    { img: staffIcon, title: t("staff"), count: 0 },
    { img: PatientIcon, title: t("patient"), count: data?.totalPatients ?? 0 },
    { img: pharmIcon, title: t("pharmacy"), count: data?.totalPharmacies ?? 0 },
    { img: Labicon, title: t("laboratories"), count: data?.totalLabs ?? 0 },
  ];

  const date = selectedDate ? dayjs(selectedDate.$d).format("YYYY-MM-DD") : "";
  const titles = [
    t("appointmentId"),
    t("patientName"),
    <div className={style.dropdownWrapper}>
      <span>{t("date&Time")}</span>
      <RiArrowDropDownLine
        size={28}
        className={style.dropdownIcon}
        onClick={() =>
          setOpenDropdown(openDropdown === "dateTime" ? null : "dateTime")
        }
      />
      {openDropdown === "dateTime" && (
        <div className={style.dropdownContainer}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={t("selectDate")}
              format="MM/DD/YYYY"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </LocalizationProvider>
        </div>
      )}
    </div>,
    t("type"),
    t("status"),
    <div className={style.dropdownWrapper}>
      <span>{t("appointmentFor")}</span>
      <RiArrowDropDownLine
        size={28}
        className={style.dropdownIcon}
        onClick={() =>
          setOpenDropdown(
            openDropdown === "appointmentFor" ? null : "appointmentFor"
          )
        }
      />
      {openDropdown === "appointmentFor" && (
        <div className={style.dropdownContainerApp}>
          {name?.map((i: any) => (
            <div
              style={{
                padding: "8px",
                backgroundColor: selectName === i ? "red" : "#fff",
                cursor: "pointer",
                color: selectName === i ? "#fff" : "black",
              }}
              onClick={() => setSelectedName(i)}
            >
              {i}
            </div>
          ))}
        </div>
      )}
    </div>,
    t("settings"),
  ];
  const handleTableData = (data: any) => {
    let tempData: any = [];

    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        const date = dayjs(v?.appointmentDateAndTime).format(
          "MM-DD-YYYY h:mm a"
        );
        tempData.push([
          v?.appointmentId,
          v?.patientInfo?.name,
          v?.appointmentDateAndTime ? date : "",
          v?.appointmentType,
          v?.status,
          v?.doctorInfo?.name,
          <div
            className={style.dropdownWrapper}
            style={{ gap: "8px", cursor: "pointer" }}
          >
            <FiEdit3
              size={24}
              onClick={() => navigate(`/${systemType}/AppointmentBooking`)}
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
    fetchCount();
  }, [selectedDate, selectName]);

  const fetchCount = () => {
    getCountDasheboard()
      .then((res: any) => {
        setData(res?.data);
      })
      .catch((err: any) => {});
  };

  const allHospital = (pageno: number) => {
    getHospitalAppointment(pageno, date, selectName)
      .then((res: any) => {
        handleTableData(res?.data?.Appointments);
        setName(res?.data?.doctorNames);
        setLength(res?.data?.totalAppoints);
      })
      .catch((err: any) => {
        //
      })
      .finally(() => {});
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      allHospital(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      allHospital(currentPage - 1);
    }
  };

  return (
    <>
      <div>
        <div className={classNames(style.cardcontainer, commonstyles.mb16)}>
          {count.map((item: any, index: any) => (
            <HospitalCard key={index} {...item} />
          ))}
        </div>
        <div className={classNames(commonstyles.mt16, style.tablecontainer)}>
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className={classNames(commonstyles.flx, commonstyles.flxWrap)}>
              <p
                className={classNames(
                  commonstyles.colorBlack,
                  commonstyles.fs14,
                  commonstyles.semiBold
                )}
              >
                {t("appointment")}
              </p>
            </div>
            <div>
              <NewPagination
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
                startItem={(currentPage - 1) * itemsPerPage + 1}
                endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                totalItems={totalItems}
              />
            </div>
          </div>

          <div className={style.tableScrollContainer}>
            {appointment?.length > 0 ? (
              <TableNew
                titles={titles}
                data={appointment}
                headerWidth="17%"
                itemWidth="17%"
                show
              />
            ) : (
              <PhysiotheristsEmpty />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Hospital_Dashboard;

type HospitalCardProps = {
  title: any;
  count: any;
  img: any;
};

export const HospitalCard = ({ title, count, img }: HospitalCardProps) => {
  return (
    <div className={classNames(style.card)}>
      <div className={style.carddata}>
        <img src={img} alt={title} className={classNames(style.cardImage)} />
        <div className={style.cardtextdata}>
          <p className={classNames(style.cardCount)}>{count}</p>
          <p className={classNames(style.cardtitle)}>{title}</p>
        </div>
      </div>
    </div>
  );
};
