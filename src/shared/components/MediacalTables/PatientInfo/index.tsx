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
    MrNo: "KNR4203",
    PatientName: "DFDFDF",
    Gender: "Male",
    Number: "3979473847",
    Age: "47",
  },

  {
    MrNo: "KNR4203",
    PatientName: "FADEF",
    Gender: "Male",
    Number: "3979473847",
    Age: "22",
  },

  {
    MrNo: "KNR4203",
    PatientName: "FREQF",
    Gender: "Male",
    Number: "3979473847",
    Age: "16",
  },
  {
    MrNo: "KNR4203",
    PatientName: "EQVERQT",
    Gender: "Male",
    Number: "3979473847",
    Age: "25",
  },
  {
    MrNo: "KNR4203",
    PatientName: "Bilal Hassan",
    Gender: "Male",
    Number: "3979473847",
    Age: "34",
  },
];

function PatientTable() {
  return (
    <div className={classNames(styles.App)}>
      <table className={classNames(styles.col12, styles.mb50)}>
        <tr className={classNames(styles.ss, commonstyle.fs14)}>
          <th>Mr.No</th>
          <th>Patient Name</th>
          <th>Gender</th>
          <th>Contact Number</th>
          <th>Age</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr className={styles.bordr} key={key}>
              <td>{val.MrNo}</td>
              <td>{val.PatientName}</td>
              <td>{val.Gender}</td>
              <td>{val.Number}</td>
              <td>{val.Age}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default PatientTable;
