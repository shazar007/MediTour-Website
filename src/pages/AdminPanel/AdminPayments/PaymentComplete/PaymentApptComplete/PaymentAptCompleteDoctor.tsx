import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./PaymentAptComplete.module.css";
import commonStyles from "shared/utils/common.module.css";
import { Checkbox } from "@mui/material";
import classNames from "classnames";
import dayjs from "dayjs";
interface Props {
  Data: any;
}
const PaymentAptCompleteDoctor = (props: Partial<Props>) => {
  const { Data } = props;
  const navigate = useNavigate();

  const handleGoToDetailTABLE = (val: any, index: any) => {
    // const result = Data.map((v: any, i: any) => {
    //   if (i == index) {
    //     return v;
    //   }
    // });
    navigate("/admin/Payments/PaymentComplete/Detail", {
      state: {
        heading: "Payment Appointment Doctor",
        type: "Appointment",
        Data: val,
      },
    });
  };
  return (
    <div className={Styles.payment}>
      <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
        <p className={Styles.headerclass}>PAYMENT AT</p>
        <p className={Styles.headerclass}>PAYMENT ID</p>
        <p className={Styles.headerclass}>VENDOR ID</p>
        <p className={Styles.headerclass}>VENDOR NAME</p>
        <p className={Styles.headerclass}>TOTAL APPOINTMENT</p>{" "}
        <p className={Styles.headerclass}>PAID AMOUNT</p>
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
                  onClick={() => handleGoToDetailTABLE(val, key)}
                >
                  <td className={Styles.w20}>{Date}</td>
                  <td className={Styles.w20}>{val?.paymentId}</td>
                  <td className={Styles.w20}>{val?.venderId?.venderId}</td>
                  <td className={Styles.w20}>{val?.vendorId?.name}</td>
                  <td className={Styles.w20}>{val?.noOfitems}</td>{" "}
                  <td className={Styles.w20}>{val?.payableAmount}</td>{" "}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PaymentAptCompleteDoctor;
