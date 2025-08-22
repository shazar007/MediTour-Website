import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import age from "assets/images/HospitalDashboard/age.png";
import {
  TbActivityHeartbeat,
  TbBrandSugarizer,
  TbRefresh,
} from "react-icons/tb";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getDetailsPatientId } from "shared/services";
import bloodgroup from "assets/images/HospitalDashboard/bloodgroup.png";
import DoctorReferModel from "shared/components/DoctorEmpty/DoctorReferModel";
import jsPDF from "jspdf";
import Pstyle from "../../DoctorTables/patientDetailTable/prescription.module.css";
import commonstyles from "shared/utils/common.module.css";
import { IoClose } from "react-icons/io5";
import logo from "assets/images/smallLogo.png";
import CustomModal from "shared/components/Modal";
import Hospital_Invoice from "./Invoice/indeex";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
import NewPagination2 from "shared/components/A_New_Components/NewPagination2";
import TableNew from "shared/components/A_New_Components/Table_new";
import { RiArrowDropDownLine } from "react-icons/ri";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import RingLoader from "shared/components/RingLoader";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { CiTempHigh } from "react-icons/ci";
import {
  FaFileInvoiceDollar,
  FaHeartPulse,
  FaWeightScale,
} from "react-icons/fa6";
import { BiDonateBlood } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { MdLocalPhone } from "react-icons/md";
import { PiGenderFemale } from "react-icons/pi";
const PatientListData = ({ patientId }: any) => {
  const { t, i18n }: any = useTranslation();
  const { systemType } = useSelector((state: any) => state.root.common);
  const [data, setData] = useState<any>([]);
  const [pateintData, setPatientData] = useState<any>({});
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [show, setShow] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [appointment, setAppointment] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [detailData, setDetaildata] = useState<any>([]);
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  let gender = <PiGenderFemale color="#7d7d7d" />;

  useEffect(() => {
    if (patientId) {
      details(1, "");
      setShow(false);
    }
  }, [patientId]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    details(1, debouncedSearch);
  }, [debouncedSearch]);

  const details = (pageno: any, search: any) => {
    setLoading(true);
    getDetailsPatientId(patientId, search, pageno)
      .then(async (res: any) => {
        await setData(res?.data?.patients?.appointments);
        await setPatientData(res?.data?.patients);
        setLength(res?.data?.pagination?.totalAppointments);
        handleTableData();
      })
      .catch((err: any) => {
        console.log(err, "....xsxsxsx.error");
        setData(err?.data?.patients?.appointments);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const titles = [
    t("appointmentId"),
    <div
      className={style.dropdownWrapper}
      style={{
        cursor: "pointer",
      }}
    >
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
              label={t("selectDate_")}
              format="MM/DD/YYYY"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </LocalizationProvider>
        </div>
      )}
    </div>,

    t("status"),

    <div
      className={style.dropdownWrapper}
      style={{
        cursor: "pointer",
      }}
    >
      <span>{t("appointmentFor")}</span>

      {/* <RiArrowDropDownLine
        size={28}
        className={style.dropdownIcon}
        onClick={() =>
          setOpenDropdown(
            openDropdown === "appointmentFor" ? null : "appointmentFor"
          )
        }
      /> */}

      {openDropdown === "appointmentFor" && (
        <div className={style.dropdownContainerApp}>
          {/* {name?.map((i: any) => (
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
          ))} */}
        </div>
      )}
    </div>,
    t("payments"),
  ];

  useEffect(() => {
    handleTableData();
  }, [data]);

  const handleTableData = () => {
    let tempData: any = [];

    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        //
        console.log(v, "....");
        const date = dayjs(v?.appointmentDateAndTime).format(
          "MM-DD-YYYY h:mm a"
        );
        tempData.push([
          v?.appointmentId,
          date,
          v?.status,
          v?.doctorId?.name,
          v?.isPaidFull ? (
            <span style={{ color: "#00276D", cursor: "pointer" }}>
              {t("paid")}
            </span>
          ) : (
            <span style={{ color: "#B01212", cursor: "pointer" }}>
              {t("unPaid")}
            </span>
          ),
        ]);
      });

      setAppointment(tempData);
    } else {
      setAppointment([]);
    }
  };

  const handleDetail = (id?: any) => {
    setShow(true);
    const filteredDepartment = data?.filter(
      (app: any) => app?.appointmentId === id
    );
    const departmentId =
      filteredDepartment.length > 0 ? filteredDepartment : null;
    setDetaildata(departmentId);
    //
    return {};
  };

  console.log(".....detail Data.....", detailData);

  const handleRefresh = () => {
    setSearch("");
    setPageno(1);
    setCurrentPage(1);
    details(1, "");
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      details(currentPage + 1, search);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      details(currentPage - 1, search);
    }
  };
  // const handleSearch = () => {
  //   setCurrentPage(1);
  //   details(1, search);
  // };
  return (
    <>
      {show ? (
        detailData?.map((i?: any) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              className={style.highContainer}
            >
              <div className={style.rightsidetop}>
                <div className={classNames(style.header, commonstyle.mb16)}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <>
                      {["ur", "ar", "ps"].includes(i18n.language) ? (
                        <IoMdArrowForward
                          size={24}
                          onClick={() => setShow(false)}
                        />
                      ) : (
                        <IoMdArrowBack
                          size={24}
                          onClick={() => setShow(false)}
                        />
                      )}
                    </>{" "}
                    <div className={style.profilemain}>
                      <div>
                        <img
                          src={
                            pateintData?.userImage ||
                            detailData?.userImage ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                          }
                          alt="Doctor"
                          className={style.profileimg}
                        />
                      </div>
                      <div>
                        <p className={style.name}>
                          {pateintData?.name || detailData?.name}
                        </p>
                        <p className={style.id}>
                          {pateintData?.mrNo || detailData?.id}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                    }}
                  >
                    <button className={style.Prescriptionbtn}>
                      {t("testReport")}
                    </button>
                    <button
                      onClick={() =>
                        i?.status === "pending"
                          ? notifyError("Appoitment in progress")
                          : setShowAddProperty(true)
                      }
                      className={style.Prescriptionbtn}
                    >
                      {t("viewPrescription")}
                    </button>
                  </div>
                </div>
                <div
                  className={classNames(
                    style.cardsConatiner,
                    commonstyle.col12
                  )}
                >
                  <div className={classNames(style.card)}>
                    <div>
                      <div
                        className={classNames(
                          commonstyle.flx,
                          commonstyle.flxBetween,
                          commonstyle.flxWrap
                        )}
                        style={{ marginBottom: "8px" }}
                      >
                        <div className={style.cardtitle}>
                          {t("basicInformation")}
                        </div>
                      </div>

                      <InformationCard
                        t={t}
                        items={
                          systemType === "company" || systemType === "hospital"
                            ? detailData
                            : pateintData
                        }
                        name1={t("blood")}
                        name2={t("gender")}
                        name3={t("age")}
                        icon2={gender}
                      />
                    </div>
                  </div>
                  <div className={classNames(style.card)}>
                    <div>
                      <div
                        className={classNames(
                          commonstyle.flx,
                          commonstyle.flxBetween,
                          commonstyle.flxWrap
                        )}
                      >
                        <div className={style.cardtitle}>{t("history")}</div>
                      </div>

                      <TestCard t={t} tests={detailData} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={classNames(style.rightside)}>
                  <Hospital_Invoice data={i} item={detailData} />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px ",
            width: "100%",
            padding: "24px",
            maxWidth: "100%",
          }}
        >
          <div
            className={classNames(
              commonstyles.flx,
              commonstyles.flxBetween,
              commonstyles.flxWrap
            )}
            style={{ marginBottom: "8px" }}
          >
            <div
              className={classNames(commonstyles.flx)}
              style={{ gap: "12px" }}
            >
              <p
                className={classNames(
                  commonstyles.colorBlack,
                  commonstyles.fs14,
                  commonstyles.semiBold
                )}
              >
                {t("appointment")}
              </p>
              {loading ? (
                <div className={style.outerRefresh}>
                  <RingLoader color={"#0D47A1"} size={24} />
                </div>
              ) : (
                <div className={style.outerRefresh}>
                  <TbRefresh
                    color="#7d7d7d"
                    size={24}
                    onClick={handleRefresh}
                  />
                </div>
              )}
              <SearchFilter
                vender={false}
                search={search}
                setSearch={setSearch}
                title={t("search")}
              />
            </div>
            <NewPagination2
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>
          <TableNew
            type={"appoitment"}
            handleGoToDetail={handleDetail}
            titles={titles}
            data={appointment}
            headerWidth="17%"
            itemWidth="17%"
          />
        </div>
      )}

      <CustomModal
        showModal={showAddProperty}
        children={
          <ViewDetail
            t={t}
            detailData={detailData}
            patientDetail={pateintData}
            setShowAddProperty={setShowAddProperty}
          />
        }
      />
    </>
  );
};

export default PatientListData;

export const InformationCard = ({
  t,
  items,
  name1,
  name2,
  name3,
  icon2,
}: any) => {
  function calculateAge(items: any) {
    let checkDate = items?.dateOfBirth || items[0]?.patientId?.dateOfBirth;

    if (!checkDate) return "--";
    const [day, month, year] = checkDate.split("/").map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }
  console.log("...items....", items);
  //
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // gap: "4px ",
        alignContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img
              src={bloodgroup}
              alt="Gender icon"
              style={{
                width: "24px",
                height: "24px",
                objectFit: "contain",
              }}
            />

            <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
              {name1 || ""}
            </p>
          </div>
          <p style={{ fontSize: "14px", color: "#555", marginLeft: "32px" }}>
            {items?.bloodGroup || items[0]?.patientId?.bloodGroup || "--"}
          </p>
        </div>

        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={icon2}
              alt="Blood Group icon"
              style={{ width: "24px", height: "24px", objectFit: "contain" }}
            />
            <span
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
            >
              {name2 || ""}
            </span>
          </div>
          <span style={{ fontSize: "14px", color: "#555", marginLeft: "32px" }}>
            {items?.gender || items[0]?.patientId?.gender || "--"}
          </span>
        </div>
      </div>

      {/* Age */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={age}
              alt="Gender icon"
              style={{ width: "24px", height: "24px", objectFit: "contain" }}
            />
            <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
              {name3 || ""}
            </p>
          </div>
          <p style={{ fontSize: "14px", color: "#555", marginLeft: "32px" }}>
            {items?.vendorId || calculateAge(items) || "--"}
          </p>
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MdLocalPhone
              color="#7d7d7d"
              style={{ width: "24px", height: "24px", objectFit: "contain" }}
            />
            <span
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
            >
              {t("phone")}
            </span>
          </div>
          <span
            style={{
              fontSize: "14px",
              color: "#555",
              marginLeft: "32px",
              objectFit: "contain",
            }}
          >
            {items?.phone ||
              items?.phoneNumber ||
              items[0]?.patientId?.phone ||
              "--"}
          </span>
        </div>
      </div>
    </div>
  );
};

interface TestCardProps {
  tests: {
    testName: string;
    testDate: string;
    labName: string;
    img?: any;
    icon?: any;
  }[];
  t: any;
}

const TestCard: React.FC<TestCardProps> = ({ tests, t }: any) => {
  console.log("🚀 ~ tests:", tests);
  const history = [
    {
      id: 1,
      title: "invoiceId",
      result: tests[0]?.invoiceId?.invoiceNumber || "--",
      // tests?.[0]?.history?.temperature
      //   ? `${tests[0].history.temperature}°F`
      //   : "",
      icon: <FaFileInvoiceDollar size={24} color="#7D7D7D" />,
    },
    {
      id: 2,
      title: "temperature",
      result: tests?.[0]?.history?.temperature
        ? `${tests[0].history.temperature}°F`
        : "",
      icon: <CiTempHigh size={24} color="#7D7D7D" />,
    },
    {
      id: 3,
      title: "bloodPressure",
      result:
        tests?.[0]?.history?.bloodPressure?.diastolicPressure &&
        tests?.[0]?.history?.bloodPressure?.systolicPressure
          ? `${tests[0].history.bloodPressure.systolicPressure}/${tests[0].history.bloodPressure.diastolicPressure} mmHg`
          : "",
      icon: <TbActivityHeartbeat size={24} color="#7D7D7D" />,
    },
    {
      id: 4,
      title: "heartRate",
      result: tests?.[0]?.history?.heartRate
        ? `${tests[0].history.heartRate} bpm`
        : "",
      icon: <FaHeartPulse size={24} color="#7D7D7D" />,
    },
    {
      id: 5,
      title: "sugar",
      result: tests?.[0]?.history?.sugar
        ? `${tests[0].history.sugar} mg/dL`
        : "",
      icon: <BiDonateBlood size={24} color="#7D7D7D" />,
    },
    {
      id: 6,
      title: "weight",
      result: tests?.[0]?.history?.weight
        ? `${tests[0].history.weight} Kg`
        : "",
      icon: <FaWeightScale size={24} color="#7D7D7D" />,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
        marginBottom: "8px",
        marginTop: "8px",
      }}
    >
      {history.map((item: any) => (
        <div
          key={item.id}
          style={{ display: "flex", gap: "8px", alignItems: "center" }}
        >
          {item.icon}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: "500",
                color: "#000",
              }}
            >
              {t(item.title) || ""}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "400",
                color: "#333",
              }}
            >
              {item.result || ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

interface Props {
  detailData?: any;
  setShowAddProperty: any;
  patientDetail: any;
  appointmentId: any;
  t: any;
}

const ViewDetail = (props: Partial<Props>) => {
  const [loading, setLoading] = useState(false);
  const { detailData, setShowAddProperty, appointmentId, patientDetail, t } =
    props;

  const [patientdata, setPatientData] = useState<any>([]);
  const [doctordata, setDoctorData] = useState<any>([]);

  interface Medicine {
    medicineName: string;
    medicineBrand: string;
    medicineStrength: string;
    dosage: string;
  }
  const [medicine, setMedicine] = useState<Medicine[]>([]);
  const [data, setData] = useState<any>([]);
  const [Symptopms, setSymptopms] = useState<any>([]);
  interface Tests {
    testName: string;
  }
  const [test, setTest] = useState<Tests[]>([]);
  const handleclose = () => {
    setShowAddProperty(false);
  };

  let date = dayjs(detailData[0]?.appointmentDateAndTime).format(
    "DD-MM-YYYY hh:mm A"
  );
  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return "--";
    const [day, month, year] = dateOfBirthString.split("/").map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }

  const createPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor("#000000");
    doc.text(`${patientDetail?.appointments[0]?.doctorId?.name}`, 10, 10);
    doc.setFontSize(12);
    doc.text(
      `${patientDetail?.appointments[0]?.doctorId?.qualifications}`,
      10,
      20
    );
    doc.text(
      "PMDC NO: " + `${patientDetail?.appointments[0]?.doctorId?.pmdcNumber}`,
      10,
      26
    );
    const base64Image =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD50RVh0QUxUVGFnAGVsZWdhbnQgbWluaW1hbCBibGFjayBhbmQgeWVsbG93IGJ1c2luZXNzIGNhcmQgdGVtcGxhdGU6srJBAAAAR2lUWHREZXNjcmlwdGlvbgAAAAAAZWxlZ2FudCBtaW5pbWFsIGJsYWNrIGFuZCB5ZWxsb3cgYnVzaW5lc3MgY2FyZCB0ZW1wbGF0ZTi+Ls4AAAMAUExURVCYxrHF2S5coEF9tSVMltB5Uj5LfGW93UyRwTSJkFKcyEKNcmG12DpxrSMxaTZqqEmMvmhNYEKAtk6VxNXZ5fOMWjplmBxubCxZnkiKvVWhzNTi7iJ3c2pvODVWiT55ssfV5mrF4j12sGhymSpWnEV5qK2yx1imz2K42jhurHZ+oQtqR6SBdyhSmuPm7EtZhjddkYqHjqpyN1+y1mzJ5Ky811aHtGKhhkeIvDBgojJkpVWgy5y51zFho0iUuJSnyESDud95SFyt07fL4FekzVplj7q/0BRsWzF6lCp8g+Pr80aHu1ys03KcwzNlpmaGtO7283iSwJ+lvSxHf+4vLZGYtDdsqoakxE+XxVmo0GaBpld2pkuOwOh2PYKWtpBzcRh1XmmTuUuQwVlrlXaGmWjC4EWFurN9afH0+FiTuyg9dHeky12w1TRnp0OBt0dllCNpfma/3keCr0hrqId6gyFcgtFxO6HHtjx0r1CWecjd3E6Tw5myzvm1kzyAqT1snrdkSUuDsYOLq1+z11x7sS1olUqItYxVUXWUqjxsOxVzRjBOhHmFpyuAXLK6zPrt5/rGq3aOuz9woluCqvT4+6Ovx1Rxncuhllqq0fzZx0CPpjY3ZYKewC5Tj0OMsKKHgT5kpI+hvhVLUoyx0i9eoRtjcJ6wz1OixQ5nUUtjjEqEtkVyoTd6oG2PqTVxoF+bw02NuFWexkt7rkuLuEB+sAdoP12rzluQv0B1p1SawEyculiixwRpOD5xqk6Quytxiw9vToq4rEB5rXmrz0mNuVGJvHWrnfR2NzZgnP///1SfyilUm1ur0idPmEWGusjM2kWEuVGax1us0lqp0V2v1Dtzr0B8tF6x1TE+cmS73GO622fB3/Hy9hlqOPq+vfeajdHk3LvWzYG0m/728pK9qqZcSsd+XjFXm16w01Ocx1yr0DZjnv3l2UaAr1WnyJWVqzeAnKLE3lB5dSZejDhzqDt5qztzrs7BxVKWwE+dwFacwUOGswZmOwhrQFJEYv////l75KgAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAlI0lEQVR42tXdDXxU1ZUA8AmBKaCZhGQaQhKSlIEBBpkZaMEAYqIwE5IAkZmdECHBEGgI4yZQRKTCEpkCCiN2DWhZBNEKCEUtKlTUUVi0DQPKAy1p7MaK3ZYsy9LFWlndNmbvx7vv3XvffW8mH7Td09+vSIDM++ecc+99H3PH1HkjoyQLRN5nn32WB/8j60a+lOlGfNO2rGmfvfPOlzWVKPAvKSCGpKx5597PPssq+X8AeRAQampq+vevIYE1CIJiyJCUlPx3npuW9fcL+fS3N0U6kIIOVaNSQOTn59/7Wd7fH8T5u+9HUAzoLwjegiH5CFPydwS5+IutERIdT/dfQweNoSxyUkpL80tfu63k7wLi/J2qwJI1fHAWjnK2trYXLD2FPHBThI/qijQleAxNUSVna8+d++m07X87SMlvt0S00VGhBqMhFo4iS879/LmSvw3k4q0RYWRXcKFiKAqTFCgpBPFO1l8f8un3xYzIidtNJHQtDIWWNMzK+utCHrwpoudIO29ig7cIJaVY0tCQ2k1KtyAX9bIBGmTneTpYjJCiNIqck25SugG569aIsWMgCl5DUwwkAJKaem/bXwHyr1uMHAP5oCwiio4k9bbtNxjy4NaIQQwYKAzFIlN4SQotaYCSxNTX8m4kZPsvIoYBDvq0GroWhUKXlzJ2oZQkJibeu/2GQT7dYuyo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";

    try {
      const imgWidth = 30;
      const imgHeight = 30;

      doc.addImage(base64Image, "PNG", 160, 3, imgWidth, imgHeight);
    } catch (error) {
      console.error("Error adding image:", error);
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#0047ab"); // Blue header color
    doc.text("Prescription", 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#000000");

    // Top Divider Line
    doc.setDrawColor("#0047ab");
    doc.line(10, 36, 200, 36);

    // Patient Information Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information", 10, 44);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#000000");

    // Left Column
    doc.text(`${t("patientName")}: ` + `${patientDetail?.name}`, 10, 54);
    doc.text("Date: " + date, 10, 62);
    doc.text("Cell: " + `${patientDetail?.phone}`, 10, 70);

    doc.text(
      "Weight (Kg): " +
        `${patientDetail?.appointments[0]?.history?.weight || "--"} Kg`,
      10,
      78
    );
    doc.text(
      "BP:" +
        `${" "}${
          patientDetail?.appointments[0]?.history?.bloodPressure
            ?.systolicPressure
        }/ ${
          patientDetail?.appointments[0]?.history?.bloodPressure
            ?.diastolicPressure
        }`,
      10,
      86
    );
    doc.text(
      `${t("diseases")}: ` +
        `${patientDetail?.appointments[0]?.history?.diseases?.join(" ")}`,
      10,
      94
    );
    // Right Column
    doc.text("MR NO: " + `${patientDetail?.mrNo || "--"}`, 120, 54);
    doc.text(
      "Age: " + `${calculateAge(patientDetail?._id?.dateOfBirth) || "--"}`,
      120,
      62
    );
    doc.text(
      `${t("temperature")}: ` +
        `${patientDetail?.appointments[0]?.history?.temperature}`,
      120,
      70
    );
    doc.text(
      `${t("SugarLevel")}: ` +
        `${patientDetail?.appointments[0]?.history?.sugar}`,
      120,
      78
    );
    doc.text(
      `${t("SugarLevel")}: ` +
        `${patientDetail?.appointments[0]?.history?.heartRate}`,
      120,
      86
    );
    // Bottom Divider Line
    doc.setDrawColor("#0047ab");
    doc.line(10, 100, 200, 100);

    // Symptoms and Findings Section

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t("symptomsAndFindings"), 10, 110);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const symptomsText =
      patientDetail?.appointments[0]?.history?.symptoms || "----";
    const symptomsLines = doc.splitTextToSize(symptomsText, 180);
    doc.text(`${t("symptoms")}:`, 10, 120);
    doc.text(symptomsLines, 10, 126);

    // Clinic Findings
    const findingsText =
      patientDetail?.appointments[0]?.history?.description || "------";
    const findingsLines = doc.splitTextToSize(findingsText, 180);
    doc.text(`${t("clinicalFindings")}:`, 10, 136);
    doc.text(findingsLines, 10, 142);

    const lastY = 142 + findingsLines.length * 6;

    // Divider Line
    doc.setDrawColor("#0047ab");
    doc.line(10, lastY + 4, 200, lastY + 4);

    const newLastTestY = lastY + 10;

    // Laboratory Tests Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`${t("laboratoryTest")}`, 10, newLastTestY);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const tests = patientDetail?.appointments[0]?.ePrescription?.test || [];
    tests.forEach((test: any, index: number) => {
      const yPosition = newLastTestY + 10 + index * 8;
      doc.text(`- ${test?.testName}`, 10, yPosition);
    });

    const lastTestY = newLastTestY + 10 + tests.length * 8;
    doc.setDrawColor("#0047ab");
    doc.line(10, lastTestY + 4, 200, lastTestY + 4);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t("medicineInformation"), 10, lastTestY + 14);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Table Headers
    doc.setTextColor("#000000");
    doc.text(t("medicineInformation"), 10, lastTestY + 24);
    doc.text(t("dosage"), 80, lastTestY + 24);
    doc.text(t("duration"), 140, lastTestY + 24);

    doc.setDrawColor("#0047ab");
    doc.line(10, lastTestY + 28, 200, lastTestY + 28);

    const maxWidth = 60;
    patientDetail?.appointments[0]?.ePrescription?.medicines?.forEach(
      (medicine: any, index: number) => {
        const yPosition = lastTestY + 38 + index * 20;

        const splitName = doc.splitTextToSize(
          medicine.medicineName || "----",
          maxWidth
        );
        doc.text(splitName, 10, yPosition);
        doc.text(medicine.dosage || "----", 80, yPosition);
        doc.text(`${medicine.days || "----"} ${t("days")}`, 140, yPosition);
      }
    );

    // Footer Divider
    doc.setDrawColor("#0047ab");
    doc.line(10, lastTestY + 100, 200, lastTestY + 100);

    // Footer Section
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor("#555555");
    doc.text(t("generatedDigitally"), 105, lastTestY + 110, {
      align: "center",
    });
    // Save the PDF
    doc.save("prescription.pdf");
  };

  return (
    <div>
      {loading ? (
        <DoctorReferModel showModal={loading} />
      ) : (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IoClose onClick={handleclose} className={style.close} />
          </div>
          <div className={Pstyle.container}>
            <div
              className={classNames(
                Pstyle.row,
                Pstyle.borderBottom,
                Pstyle.padding16
              )}
            >
              <div>
                <p
                  className={classNames(
                    Pstyle.bold,
                    Pstyle.noMargin,
                    Pstyle.largeText
                  )}
                >
                  {patientDetail?.appointments[0]?.doctorId?.name}
                </p>
                <p className={classNames(Pstyle.noMargin)}>
                  {patientDetail?.appointments[0]?.doctorId?.qualifications}
                </p>
                <p className={classNames(Pstyle.noMargin)}>
                  PM&DC Reg:{" "}
                  {patientDetail?.appointments[0]?.doctorId?.pmdcNumber}
                </p>
              </div>
              <img src={logo} className={Pstyle.logo} alt="Logo" />
            </div>
            <div className={Pstyle.row}>
              <p
                className={classNames(
                  Pstyle.semibold,
                  Pstyle.mediumText,
                  Pstyle.marginTop16
                )}
              >
                {t("patientName")}:{" "}
                <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
                  {patientDetail?.name || patientDetail?._id?.name}
                </span>
              </p>
              <p
                className={classNames(
                  Pstyle.semibold,
                  Pstyle.mediumText,
                  Pstyle.marginTop16
                )}
              >
                M.R No:{" "}
                <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
                  {patientDetail?.mrNo || patientDetail?._id?.mrNo}
                </span>
              </p>
            </div>
            <div className={classNames(Pstyle.row, Pstyle.alignItemsCenter)}>
              <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
                {t("date")}:{" "}
                <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
                  {date}
                </span>
              </p>
              <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
                {t("age")}:{" "}
                <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
                  {calculateAge(patientDetail?._id?.dateOfBirth)}{" "}
                  {t("yearsOld")}
                </span>
              </p>
            </div>
            <div className={classNames(Pstyle.row, Pstyle.alignItemsCenter)}>
              <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
                {t("weight")} (Kg):{" "}
                <span
                  className={classNames(
                    Pstyle.regular,
                    Pstyle.smallText,
                    Pstyle.marginRight34
                  )}
                >
                  {detailData[0]?.history?.weight} Kg
                </span>
              </p>
              <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
                BP:
                <span
                  className={classNames(
                    Pstyle.regular,
                    Pstyle.smallText,
                    Pstyle.marginRight34
                  )}
                >
                  {`${" "}${
                    patientDetail?.appointments[0]?.history?.bloodPressure
                      ?.systolicPressure
                  }/ ${
                    patientDetail?.appointments[0]?.history?.bloodPressure
                      ?.diastolicPressure
                  }`}
                </span>
              </p>
            </div>
            <div className={classNames(Pstyle.row, Pstyle.alignItemsCenter)}>
              <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
                {t("temperature")}:{" "}
                <span
                  className={classNames(
                    Pstyle.regular,
                    Pstyle.smallText,
                    Pstyle.marginRight34
                  )}
                >
                  {patientDetail?.appointments[0]?.history?.temperature} °F
                </span>
              </p>
              <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
                {t("sugar")}:{" "}
                <span
                  className={classNames(
                    Pstyle.regular,
                    Pstyle.smallText,
                    Pstyle.marginRight34
                  )}
                >
                  {patientDetail?.appointments[0]?.history?.sugar} mg/dL
                </span>
              </p>
            </div>
            <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
              {t("heartRate")}:{" "}
              <span
                className={classNames(
                  Pstyle.regular,
                  Pstyle.smallText,
                  Pstyle.marginRight34
                )}
              >
                {patientDetail?.appointments[0]?.history?.heartRate} bpm
              </span>
            </p>
            <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
              {t("diseases")}:{" "}
              <span
                className={classNames(
                  Pstyle.regular,
                  Pstyle.smallText,
                  Pstyle.marginRight34
                )}
              >
                {patientDetail?.appointments[0]?.history?.diseases?.join(" ")}
              </span>
            </p>
            <div
              className={classNames(
                Pstyle.row,
                Pstyle.borderTop,
                Pstyle.borderBottom,
                Pstyle.marginTop16
              )}
            >
              <p
                className={classNames(
                  Pstyle.bold,
                  Pstyle.primaryColor,
                  Pstyle.fontSize22
                )}
              >
                {t("symptoms")}
              </p>
              <p
                className={classNames(
                  Pstyle.bold,
                  Pstyle.primaryColor,
                  Pstyle.fontSize22
                )}
              >
                {t("clinicalFindings")}
              </p>
            </div>
            <div className={Pstyle.row}>
              {patientDetail?.appointments[0]?.history?.symptoms?.map(
                (item: any) => (
                  <p className={classNames(Pstyle.smallText)}>{item}</p>
                )
              )}
              <p className={classNames(Pstyle.smallText, Pstyle.textLeft)}>
                {patientDetail?.appointments[0]?.history?.description}
              </p>
            </div>
            <div
              className={classNames(
                Pstyle.row,
                Pstyle.borderTop,
                Pstyle.borderBottom,
                Pstyle.marginTop16
              )}
            >
              <p
                className={classNames(
                  Pstyle.semibold,
                  Pstyle.primaryColor,
                  Pstyle.fontSize22
                )}
              >
                {t("laboratoryTest")}
              </p>
            </div>
            {patientDetail?.appointments[0]?.ePrescription?.test.map(
              (test: any, index: any) => (
                <div key={index}>
                  <p className={classNames(commonstyles.fs14, style.mt16)}>
                    {test?.testName}
                  </p>
                  {/* <Downloader link={test?.res} /> */}
                </div>
              )
            )}
            <div>
              {/* Header Row */}
              <div
                className={classNames(
                  Pstyle.row,
                  Pstyle.borderBottom,
                  Pstyle.alignItemsCenter
                )}
              >
                <p
                  className={classNames(
                    Pstyle.bold,
                    Pstyle.primaryColor,
                    Pstyle.fontSize22
                  )}
                >
                  {t("medicineName")}
                </p>
                <p
                  className={classNames(
                    Pstyle.bold,
                    Pstyle.primaryColor,
                    Pstyle.textCenterPadding,
                    Pstyle.fontSize22
                  )}
                >
                  {t("dosage")}
                </p>
                <p
                  className={classNames(
                    Pstyle.bold,
                    Pstyle.primaryColor,
                    Pstyle.textCenterPadding,
                    Pstyle.fontSize22
                  )}
                >
                  {t("duration")}
                </p>
              </div>

              {patientDetail?.appointments[0]?.ePrescription?.medicines.map(
                (med: any, index: any) => (
                  <div
                    key={index}
                    className={classNames(
                      Pstyle.row,
                      Pstyle.borderBottom,
                      Pstyle.alignItemsCenter
                    )}
                  >
                    <p className={classNames(Pstyle.smallText)}>
                      {med.medicineName}, {med.medicineBrand},{" "}
                      {med.medicineStrength}
                    </p>
                    <p
                      className={classNames(
                        Pstyle.smallText,
                        Pstyle.textCenterPadding
                      )}
                    >
                      {med.dosage}
                    </p>
                    <p
                      className={classNames(
                        Pstyle.smallText,
                        Pstyle.textCenterPadding
                      )}
                    >
                      {med.days} {t("days")}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
      <div
        style={{
          // border: "2px solid black",
          marginBottom: "-10px",
          display: "flex",
          flexDirection: "row-reverse",
          position: "sticky",
        }}
      >
        <button
          className={classNames(commonstyles.bgBlue, Pstyle.button)}
          onClick={createPDF}
        >
          {t("downloadPrescription")}
        </button>
      </div>
    </div>
  );
};
