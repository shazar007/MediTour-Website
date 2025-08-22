import { useState } from "react";
import Calendar from "react-calendar";
import styles from "./Calender.module.css";
const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        value={date}
        onChange={handleDateChange}
        className={styles.reactCalendar}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            if (date.toDateString() === new Date().toDateString()) {
              return styles.todayTile;
            }
            if (date.getDay() === 0 || date.getDay() === 6) {
              return styles.weekendTile;
            }
            if (date.getDate() === 1) {
              return styles.firstDayOfMonth;
            }
          }
          return "";
        }}
      />
    </div>
  );
};

export default CustomCalendar;
