import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import styles from "./appointment.module.css";
import { RingLoader } from "shared/components";
import { LuCalendarDays } from "react-icons/lu";
import Avatar from "@mui/material/Avatar";

import { TbRefresh } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa6";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { hospitalgetAppointments } from "shared/services/HospitalService";
import dayjs from "dayjs";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";

const Hospital_Appointments = () => {
  const { t, i18n }: any = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState<any>([]);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 10;

  const [loading, setLoading] = useState(false);

  const fetchAllAppointments = (pagenum: number) => {
    setLoading(true);
    hospitalgetAppointments(pagenum)
      .then((res: any) => {
        setAppointments(res?.data?.Appointments);

        setTotalItems(res?.data?.totalAppoints);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchAllAppointments(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    fetchAllAppointments(currentPage - 1);
  };

  useEffect(() => {
    setLoading(true);
    fetchAllAppointments(currentPage);
  }, []);

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <>
        <div>
          <div className={styles.outerContainer}>
            <div>
              <div
                className={classNames(
                  commonstyles.flxBetween,
                  commonstyles.flxWrap,
                  commonstyles.mb32
                )}
              >
                <div className={commonstyles.flx} style={{ gap: "16px" }}>
                  <p
                    className={classNames(
                      commonstyles.fs24,
                      commonstyles.semiBold,
                      commonstyles.colorBlue
                    )}
                  >
                    Appointment
                  </p>
                  {loading ? (
                    <div className={styles.outerRefresh}>
                      <RingLoader color={"#0E54A3"} size={24} />
                    </div>
                  ) : (
                    <div className={styles.outerRefresh}>
                      <TbRefresh color="#7d7d7d" size={24} />
                    </div>
                  )}
                </div>
                <NewPagination
                  onNext={handleNextPage}
                  onPrevious={handlePreviousPage}
                  startItem={(currentPage - 1) * itemsPerPage + 1}
                  endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                  totalItems={totalItems}
                />
              </div>
              {appointments && appointments?.length > 0 ? (
                <div className={styles.payment}>
                  <div className={styles.headerOuter}>
                    <p className={styles.headerclassStart}>Patient Name</p>
                    <p className={styles.headerclass}>Doctor Name</p>
                    <p className={styles.headerclass}>Time</p>
                    <p className={styles.headerclass}>Date</p>
                    <p className={styles.headerclass}>Type</p>
                    <p className={styles.headerclass}>Status</p>
                  </div>
                  <div className={styles.tableData}>
                    <table style={{ margin: "0%" }}>
                      <tbody className={styles.wapper}>
                        {appointments?.map((apt: any, index: any) => (
                          <tr className={styles.tableRow} key={index}>
                            <td className={classNames(styles.w20)}>
                              <div className={styles.flxStart}>
                                <Avatar
                                  className={classNames(
                                    styles.aavaatr,
                                    styles.displaynone
                                  )}
                                  src={apt.patientId?.userImage}
                                />
                                <p>{apt.patientId?.name}</p>
                              </div>
                            </td>
                            <td className={styles.w20}>
                              <div className={styles.flxCenter}>
                                {/* <MdPhone className={styles.iconss} /> */}
                                <Avatar
                                  className={classNames(
                                    styles.aavaatr,
                                    styles.displaynone
                                  )}
                                  src={apt.doctorId?.doctorImage}
                                />
                                <p>{apt.doctorId?.name}</p>
                              </div>
                            </td>
                            <td className={styles.w20}>
                              <div className={styles.flxCenter}>
                                <FaRegClock
                                  className={classNames(
                                    styles.iconss,
                                    styles.displaynone
                                  )}
                                />
                                <p>
                                  {new Date(
                                    apt.appointmentDateAndTime
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </td>
                            <td className={styles.w20}>
                              <div className={styles.flxCenter}>
                                <LuCalendarDays
                                  className={classNames(
                                    styles.iconss,
                                    styles.displaynone
                                  )}
                                />
                                <p>
                                  {dayjs(apt.appointmentDateAndTime).format(
                                    "MM-DD-YYYY"
                                  )}
                                </p>
                              </div>
                            </td>
                            <td
                              className={styles.w20}
                              style={{ textTransform: "capitalize" }}
                            >
                              {apt.appointmentType}
                            </td>
                            <td className={styles.w20}>
                              <div className={commonstyles.flxCenter}>
                                {apt?.status}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div>{!loading && <PhysiotheristsEmpty />}</div>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Hospital_Appointments;
