import * as React from "react";
import styles from "./HospitalPatient.module.css";
import commonstyle from "../../../utils/common.module.css";
import classNames from "classnames";
import { PiUploadSimpleFill } from "react-icons/pi";
import { Navigate, useNavigate } from "react-router-dom";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";

interface Props {
  patientHistory: any;
}

function HospitalPatientTable(props: Partial<Props>) {
  const { patientHistory } = props;
  const navigate = useNavigate();
  const handleGoToDetail = (id: string) => {
    navigate(`/patientsDetails/${id}`);
  };
  return (
    <div className={classNames(styles.App)}>
      {patientHistory?.length > 0 ? (
        <div className={styles.payment}>
          <div className={styles.headerOuter}>
            <p className={styles.headerclass}>Patient ID</p>
            <p className={styles.headerclass}>Patient Name</p>
            <p className={styles.headerclass}>Appointment Details</p>
          </div>
          <div className={styles.tableData}>
            <table
              style={{
                margin: "0px",
              }}
            >
              <tbody className={styles.wapper}>
                {patientHistory?.map((val: any, key: any) => {
                  return (
                    <tr
                      className={styles.tableRow}
                      key={key}
                      onClick={() => handleGoToDetail(val?._id)}
                    >
                      <td
                        className={styles.w20}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {val?.mrNo}
                      </td>
                      <td
                        className={styles.w20}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {val?.name}
                      </td>
                      <td
                        className={classNames(
                          styles.w20,
                          styles.cursor,
                          styles.blue
                        )}
                      >
                        <p>View Details</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <PhysiotheristsEmpty />
        </div>
      )}
    </div>
  );
}

export default HospitalPatientTable;
