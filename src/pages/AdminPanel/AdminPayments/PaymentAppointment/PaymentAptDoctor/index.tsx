import classNames from "classnames";
import Styles from "./paymentAptDoctor.module.css";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";

interface Props {
  Data: any;
}
const PaymentAptDoctor = (props: Partial<Props>) => {
  const { Data } = props;
  const navigate = useNavigate();
  const handleGoToDetail = (index: any) => {
    const result = Data.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });

    navigate("/admin/Payments/PaymentAppointment/DoctorDetails", {
      state: result[0],
    });
  };

  return (
    <div className={Styles.payment}>
      <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
        <td className={Styles.headerclassCheck}></td>
        <p className={Styles.headerclass}>SUBMITTED AT</p>
        <p className={Styles.headerclass}>ID</p>
        <p className={Styles.headerclass}>MR NO.</p>
        <p className={Styles.headerclass}>PATIENT NAME</p>
        <p className={Styles.headerclass}>DOCTOR NAME</p>
        <p className={Styles.headerclass}>APPOINTMENT TYPE</p>{" "}
        <p className={Styles.headerclass}>TOTAL PAYMENT</p>
        <p className={Styles.headerclass}>STATUS</p>
      </div>
      <div className={Styles.tableData}>
        <table
          style={{
            margin: "0px",
            borderCollapse: "separate",
            borderSpacing: "0 4px",
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          <tbody className={Styles.wapper}>
            {Data.map((val: any, key: any) => {
              const Date = dayjs(val?.createdAt).format("MM-DD-YYYY,  h:mm a");
              return (
                <tr
                  className={Styles.tableRow}
                  key={key}
                  onClick={() => handleGoToDetail(key)}
                >
                  <td
                    className={Styles.w5}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Checkbox
                      sx={{
                        padding: "0px",
                        "&.Mui-checked": {
                          color: "#0D47A1",
                        },
                      }}
                    />
                  </td>
                  <td className={Styles.w20}>{Date}</td>
                  <td className={Styles.w20}>{val?.doctorId?.venderId}</td>
                  <td className={Styles.w20}>{val?.patientId?.mrNo}</td>
                  <td className={Styles.w20}>{val?.patientId?.name}</td>
                  <td className={Styles.w20}>{val?.doctorId?.name}</td>{" "}
                  <td className={Styles.w20}>{val?.appointmentType}</td>
                  <td className={Styles.w20}>{val?.amount}</td>
                  <td className={Styles.w20}>
                    <p
                      className={classNames(Styles.statusComp, {
                        [Styles.statusPendingText]:
                          val?.status.toLowerCase() === "pending",
                      })}
                    >
                      {val?.status}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PaymentAptDoctor;
