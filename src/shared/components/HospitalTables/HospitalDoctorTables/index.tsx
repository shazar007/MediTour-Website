import * as React from "react";
import styles from "./HospitalDocTable.module.css";
import commonstyle from "../../../utils/common.module.css";
import classNames from "classnames";
import Upload from "../../../../assets/upload.png";
import Done from "../../../../assets/done.png";
import { PiUploadSimpleFill } from "react-icons/pi";
interface Props {
  data: any;
}
function HospitalDoctorTable(props: Partial<Props>) {
  const { data } = props;

  return (
    <div className={classNames(styles.App)}>
      <div className={styles.payment}>
        <div className={styles.headerOuter}>
          <p className={styles.headerclass}>Doctor ID</p>
          <p className={styles.headerclass}>Doctor Name</p>
          <p className={styles.headerclass}>speciality</p>
          <p className={styles.headerclass}>Qualification </p>
          <p className={styles.headerclass}>Experience</p>
        </div>
        <div className={styles.tableData}>
          <table
            style={{
              margin: "0px",
            }}
          >
            <tbody className={styles.wapper}>
              {data.map((val: any, key: any) => {
                return (
                  <tr className={styles.tableRow} key={key}>
                    <td className={styles.w20}>{val.vendorId}</td>

                    <td
                      className={classNames(styles.truncatedText, styles.w20)}
                      title={val.name}
                    >
                      {String(val.speciality).length > 15
                        ? `${String(val.name).slice(0, 15)}...`
                        : String(val.name)}
                    </td>

                    <td
                      className={classNames(styles.truncatedText, styles.w20)}
                      title={val.speciality}
                    >
                      {String(val.speciality).length > 15
                        ? `${String(val.speciality).slice(0, 15)}...`
                        : String(val.speciality)}
                    </td>
                    <td
                      className={classNames(styles.truncatedText, styles.w20)}
                      title={val.qualifications}
                    >
                      {String(val.speciality).length > 15
                        ? `${String(val.qualifications).slice(0, 15)}...`
                        : String(val.qualifications)}
                    </td>

                    <td className={styles.w20}>{val.clinicExperience}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HospitalDoctorTable;
