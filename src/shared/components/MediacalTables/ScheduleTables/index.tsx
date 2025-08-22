import * as React from "react";
import styles from "../medicalTables.module.css";
import classNames from "classnames";
import commonstyle from "../../../utils/common.module.css";
import Done from "assets/done.png";
import { PiUploadSimpleFill } from "react-icons/pi";

// Example of a data array that
// you might receive from an API
const data = [
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023 ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023 ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023 ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023  ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023 ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023  ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023 ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023  ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023 ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
  {
    Gender: "Male",
    PatientName: "Bilal Hassan",
    Date: "11 Nov 2023  ",
    Time: " 4:35 PM",
    Sickness: "Magrain",
    Number: "3979473847",
    Age: "25",
  },
];

function ScheduleTable() {
  return (
    <div className={classNames(styles.App)}>
      <table className={classNames(styles.col12, styles.mb50)}>
        <tr className={classNames(styles.ss, commonstyle.fs14)}>
          <th>Gender</th>
          <th>Patient Name</th>
          <th>Date</th>

          <th>Contact Number</th>
          <th>Age</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr className={styles.bordr} key={key}>
              <td>{val.Gender}</td>
              <td>{val.PatientName}</td>
              <td>
                {val.Date}

                {val.Time}
              </td>

              <td>{val.Number}</td>
              <td>{val.Age}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ScheduleTable;
