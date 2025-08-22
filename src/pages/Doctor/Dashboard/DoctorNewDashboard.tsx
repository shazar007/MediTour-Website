import styles from "./DoctorNewDashboard.module.css";
import vendorImageMain from "../../../assets/images/DoctorVendorImage.png";

import "react-calendar/dist/Calendar.css";
import CustomCalendar from "./Calender";
import DailyImageRead from "../../../assets/images/DailyReadImage.png";
import StatisticsGraph from "./StaticsGraph";
import UploadImageUpload from "../../../assets/images/UploadImageDoctor.png";
import ImageDoctorVendor from "../../../assets/images/ImagePatientDoctorVendor.png";

const DoctorNewDashboard = () => {
  const appointments = [
    {
      id: 1,
      name: "John Doe",
      date: "2024-11-22",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2024-11-23",
      time: "11:30 AM",
    },
    {
      id: 3,
      name: "Michael Lee",
      date: "2024-11-24",
      time: "1:00 PM",
    },
  ];

  const topAppointments = [
    {
      id: 1,
      name: "Alice Johnson",
      date: "2024-11-20",
      time: "9:00 AM",
    },
    {
      id: 2,
      name: "Bob Brown",
      date: "2024-11-21",
      time: "10:30 AM",
    },
    {
      id: 3,
      name: "Eve White",
      date: "2024-11-22",
      time: "12:00 PM",
    },
    {
      id: 4,
      name: "Charlie Green",
      date: "2024-11-23",
      time: "2:30 PM",
    },
    {
      id: 5,
      name: "Sophia Blue",
      date: "2024-11-24",
      time: "3:00 PM",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.welcomeContainer}>
        <h1>
          <span className={styles.welcome}>Welcome</span>{" "}
          <span className={styles.doctorName}>Dr Ram!</span>
        </h1>
      </div>
      <div className={styles.AllContentcontainer}>
        <div className={styles.appointmentContainer}>
          <div className={styles.upcomingAppointmentsHeader}>
            <h1 className={styles.headingAppointment}>Upcoming appointments</h1>
            <div className={styles.whiteBox}>50</div>
          </div>

          <div className={styles.appointmentList}>
            {appointments.map((appointment) => (
              <div key={appointment.id} className={styles.appointmentItem}>
                <div className={styles.appointmentDetails}>
                  <div className={styles.appointmentCircle}>
                    {appointment.name.charAt(0)}{" "}
                  </div>
                  <div className={styles.appointmentText}>
                    <h2>{appointment.name}</h2>
                    <p>
                      {appointment.date}{" "}
                      <span className={styles.separator}>|</span>{" "}
                      {appointment.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.imageContainer}>
            <img
              src={vendorImageMain}
              alt="Image"
              className={styles.largeImage}
            />
          </div>
        </div>

        {/* Second container for top 5 appointments */}
        <div className={styles.newContainer}>
          <div className={styles.newHeader}>
            <h2 className={styles.appointmentHeading}>Top 5 Appointments</h2>
            <span className={styles.viewMore}>View More</span>
          </div>
          <div className={styles.newData}>
            {topAppointments.map((appointment) => (
              <div key={appointment.id} className={styles.newAppointment}>
                <div className={styles.appointmentCircle}>
                  {appointment.name.charAt(0)}{" "}
                </div>
                <div className={styles.newAppointmentText}>
                  <h3>{appointment.name}</h3>
                  <p>
                    {appointment.date} | {appointment.time}
                  </p>
                </div>
                <div className={styles.verticalDotsContainer}>
                  <div className={styles.verticalDots}></div>
                  <div className={styles.verticalDots}></div>
                  <div className={styles.verticalDots}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.secondAllContainer}>
        <div className={styles.calendarContainer}>
          <div className={styles.calendarHeader}></div>
          <h3 className={styles.calendarHeading}>Calendar</h3>
          <CustomCalendar />
        </div>

        <div className={styles.dailyReadContainer}>
          <h3 className={styles.dailyReadHeading}>Daily Read</h3>
          <p className={styles.dailyReadText}>
            New rules in the dose of medicines to be consumed.
          </p>
          <div className={styles.dailyReadImageContainer}>
            <img
              src={DailyImageRead}
              alt="Daily Read Image"
              className={styles.dailyReadImage}
            />
          </div>
        </div>
        <div>
          <div className={styles.statisticWidth}>
            <StatisticsGraph />
          </div>
        </div>
      </div>
      <div className={styles.thirdContainer}>
        <div className={styles.dailyUpdatesContainer}>
          <div className={styles.allDataSpace}>
            <h3 className={styles.updatesHeading}>Updates</h3>
            <button className={styles.viewAllButton}>View All</button>
          </div>
          <div className={styles.dataContainerNew}>
            <div className={styles.circle}>J</div>
            <div className={styles.betweenGap}>
              <div className={styles.newAppointmentText}>
                <h3>Montly doctor’s meet</h3>
                <p>2024-11-22 | 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dailyUpdatesContainerImage}>
          <div className={styles.imageUploadStyle}>
            <img
              src={UploadImageUpload}
              alt="Upload"
              className={styles.uploadImage}
            />
          </div>
        </div>
        <div className={styles.gradientContainerPatient}>
          <div className={styles.patientInfo}>
            <div className={styles.newPatient}>
              <h3>New Patients</h3>
              <div className={styles.whiteBox}>50</div>
            </div>
            <div className={styles.repeatPatient}>
              <h3>Repeat Patients</h3>
              <div className={styles.whiteBox}>50</div>
            </div>
          </div>
          <div className={styles.horizontalContainers}>
            <div className={styles.horizontalBox}>
              <div className={styles.textContainer}>51%</div>
              <img
                src={ImageDoctorVendor}
                alt="Image"
                className={styles.imageContainerDoctorVendor}
              />
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.horizontalBox}>
              <div className={styles.textContainer}>51%</div>
              <img
                src={ImageDoctorVendor}
                alt="Image"
                className={styles.imageContainerDoctorVendor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorNewDashboard;
