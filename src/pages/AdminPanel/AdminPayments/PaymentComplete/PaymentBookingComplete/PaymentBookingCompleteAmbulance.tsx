import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./PaymentBookingComplete.module.css";

import commonStyles from "shared/utils/common.module.css";
import { Checkbox } from "@mui/material";
import classNames from "classnames";
interface Props {
  Data: any;
}
const PaymentBookingCompleteAmbulance = (props: Partial<Props>) => {
  const { Data } = props;

  const navigate = useNavigate();

  const handleGoToDetailTABLE = (val: any, index: any) => {
    navigate("/admin/Payments/PaymentComplete/Detail", {
      state: {
        heading: "Payment Booking Ambulance",
        type: "Booking",
        Data: val,
      },
    });
  };
  return (
    <div className={Styles.payment}>
      <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
        <p className={Styles.headerclass}>SUBMITTED AT</p>
        <p className={Styles.headerclass}>PAYMENT ID</p>
        <p className={Styles.headerclass}>VENDOR ID</p>
        <p className={Styles.headerclass}>VENDOR NAME</p>
        <p className={Styles.headerclass}>TOTAL BOOKING</p>{" "}
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
          {" "}
          <tbody className={Styles.wapper}>
            {Data?.map((val: any, key: any) => {
              return (
                <tr
                  className={Styles.tableRow}
                  key={key}
                  onClick={() => handleGoToDetailTABLE(val, key)}
                >
                  <td className={Styles.w20}>{val?.paymentId}</td>
                  <td className={Styles.w20}>{val?.paymentId}</td>
                  <td className={Styles.w20}>{val?.paymentId}</td>
                  <td className={Styles.w20}>{val?.paymentId}</td>
                  <td className={Styles.w20}>{val?.paymentId}</td>{" "}
                  <td className={Styles.w20}>{val?.paymentId}</td>{" "}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PaymentBookingCompleteAmbulance;
