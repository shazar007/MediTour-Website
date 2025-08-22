import React, { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import styles from "./Appointment.module.css";
import Footerr from "../Footer";
import { useNavigate } from "react-router-dom";
import { GetAll_Records, getUpcoming_Doctor } from "shared/services";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import DoubleButton from "shared/components/Buttons/DoubleButton";
import CustomLoader from "shared/components/New_Loader/Loader";
import dayjs from "dayjs";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import classNames from "classnames";

const MyAppointment = React.memo((props) => {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [data, setData] = useState([]);
  const [records, setRecords] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const [pageno, setPageno] = useState(1);
  useEffect(() => {
    document.title = "MediTour Global | About Us";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (activeTab === "upcoming") {
      UpcomingDoctor(1);
    } else {
      RecordDoctor(1);
    }
  }, [activeTab, currentPage]);

  const UpcomingDoctor = (pageNumber: any) => {
    setLoading(true);
    let params = {
      page: pageNumber,
    };
    getUpcoming_Doctor(params)
      .then((res: any) => {
        if (res?.data?.latestAppointments) {
          setData(res?.data?.latestAppointments);
          setTotalItems(res?.data?.totalAppointments);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const RecordDoctor = (pageNumber: any) => {
    let params = {
      page: pageNumber,
    };
    GetAll_Records(params)
      .then((res: any) => {
        setRecords(res?.data?.latestRecords);

        setTotalItems(res?.data?.totalRecords);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoToDetailAppointment = (i: any) => {
    if (activeTab == "upcoming") {
      navigate("/services/Detail", {
        state: { data: i },
      });
    } else {
      navigate("/services/Prescription", {
        state: { id: i?._id },
      });
    }
  };
  let AppointmentData = activeTab === "upcoming" ? data : records;

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (totalItems > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      if (activeTab === "upcoming") {
        UpcomingDoctor(currentPage + 1);
      } else {
        RecordDoctor(currentPage + 1);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      if (activeTab === "upcoming") {
        UpcomingDoctor(currentPage - 1);
      } else {
        RecordDoctor(currentPage - 1);
      }
    }
  };
  return (
    <>
      <div className={styles.maincontainer}>
        <ServiceHeader
          headingBlue={t("my")}
          headingOrange={t("appointments")}
          desc_width="70%"
        />

        <div className={classNames(commonstyles.mb32)}>
          <DoubleButton
            tab1Label={"upcoming"}
            tab2Label={"record"}
            shift={activeTab}
            onTabChange={handleTabChange}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "24px 0 16px 0",
            }}
          >
            {/* <p className={styles.title}>{t("yourAppointments")}</p> */}
            <p></p>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>
          <div
            className={styles.containerAppointment}
            style={{ cursor: "pointer" }}
          >
            {AppointmentData?.length > 0
              ? AppointmentData?.map((appointment: any, index: any) => (
                  <div key={index}>
                    <div
                      className={styles.cardAppointment}
                      onClick={() => handleGoToDetailAppointment(appointment)}
                    >
                      <div
                        className={
                          ["ur", "ar", "ps", "pr"].includes(i18n.language)
                            ? styles.imgContainerlg
                            : styles.imgContainer
                        }
                      >
                        <img
                          alt="doctorImage"
                          src={
                            appointment?.doctorId?.doctorImage ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                          }
                        />
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.contentpart}>
                          <div>
                            <p className={styles.cardtitle}>
                              {" "}
                              {appointment?.doctorId?.name}
                            </p>
                            <p className={styles.PMDC}>PMDC {t("verified")}</p>
                            <p
                              className={styles.Textcard}
                              style={{ lineHeight: "20px" }}
                            >
                              {appointment?.doctorId?.qualifications}
                            </p>
                          </div>
                          <p
                            className={styles.Amount}
                            style={{
                              color:
                                appointment?.isPaidFull === false
                                  ? "#b3261e"
                                  : "#13A89E",
                              fontWeight:
                                appointment?.isPaidFull === false
                                  ? "400"
                                  : "600",
                            }}
                          >
                            {appointment?.isPaidFull === false
                              ? t("pendingAmountMessage")
                              : t("paid")}
                          </p>
                        </div>{" "}
                        <div className={styles.bordercard}></div>
                        <div className={styles.listpart}>
                          <div>
                            <div>
                              <p className={styles.listHeading}>
                                {t("appointmentDate&Time")}
                              </p>
                              <div
                                className={
                                  ["ur", "ar", "ps", "pr"].includes(
                                    i18n.language
                                  )
                                    ? styles.dummmaylg
                                    : styles.dummmay
                                }
                              >
                                <ul>
                                  <li>
                                    <span>
                                      {" "}
                                      {dayjs(
                                        appointment?.appointmentDateAndTime
                                      ).format("DD/MM/YYYY")}
                                    </span>
                                    <span
                                      style={{
                                        color: "#0E54A3",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {" "}
                                      {dayjs(
                                        appointment?.appointmentDateAndTime
                                      ).format("hh:mm A")}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "end",
                              alignItems: "end",
                            }}
                          >
                            <button className={styles.DetailsBtn}>
                              {t("details")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div
            style={{
              display: AppointmentData?.length === 0 ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {!loading && <PhysiotheristsEmpty />}
          </div>
        </div>
        {loading && <CustomLoader />}
      </div>
      <Footerr />
    </>
  );
});

export default MyAppointment;
