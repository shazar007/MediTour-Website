import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./PaymentBookingComplete.module.css";
import commonStyles from "shared/utils/common.module.css";
import { Checkbox, Radio } from "@mui/material";
import classNames from "classnames";
import dayjs from "dayjs";

interface Props {
  Data: any;
  setType: any;
}
const PaymentBookingCompleteTravel = (props: Partial<Props>) => {
  const { Data, setType } = props;
  const navigate = useNavigate();

  const handleGoToDetailFlight = (val: any, index: any) => {
    navigate("/admin/Payments/PaymentComplete/Detail", {
      state: {
        heading: "Payment Booking Tour",
        type: "Booking",
        Data: val,
      },
    });
  };

  const handleGoToDetailTour = (val: any, index: any) => {
    // const result = Data.map((v: any, i: any) => {
    //   if (i == index) {
    //     return v;
    //   }
    // });
    navigate("/admin/Payments/PaymentComplete/Detail", {
      state: {
        heading: "Payment Booking Tour",
        type: "Booking",
        Data: val,
      },
    });
  };
  const [selectedOption, setSelectedOption] = useState("flight");
  setType(selectedOption);

  return (
    <>
      <div
        className={classNames(commonStyles.col6, Styles.mt24, commonStyles.flx)}
      >
        <div className={classNames(commonStyles.flx, Styles.colorgray)}>
          <Radio
            sx={{
              color: "#0D47A1",
              "&.Mui-checked": {
                color: "#0D47A1",
              },
            }}
            onChange={() => setSelectedOption("flight")}
            checked={selectedOption === "flight"}
          />
          <p
            className={classNames(commonStyles.fs18, commonStyles.medium, {
              [Styles.selectedOption]: selectedOption === "flight",
            })}
          >
            Flights
          </p>
        </div>{" "}
        <div className={classNames(commonStyles.flx, Styles.colorgray)}>
          <Radio
            sx={{
              color: "#0D47A1",
              "&.Mui-checked": {
                color: "#0D47A1",
              },
            }}
            onChange={() => setSelectedOption("tour")}
            checked={selectedOption === "tour"}
          />
          <p
            className={classNames(commonStyles.fs18, commonStyles.medium, {
              [Styles.selectedOption]: selectedOption === "tour",
            })}
          >
            Tours
          </p>
        </div>
      </div>
      {selectedOption === "flight" && (
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <p className={Styles.headerclass}>PAYMENT AT</p>
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
              {Data?.map((val: any, key: any) => {
                const Date = dayjs(val?.createdAt).format(
                  "MM-DD-YYYY,  h:mm a"
                );
                return (
                  <tr
                    className={Styles.tableRow}
                    key={key}
                    onClick={() => handleGoToDetailFlight(val, key)}
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
            </table>
          </div>
        </div>
      )}
      {selectedOption === "tour" && (
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <p className={Styles.headerclass}>PAYMENT AT</p>
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
              {Data?.map((val: any, key: any) => {
                const Date = dayjs(val?.createdAt).format(
                  "MM-DD-YYYY,  h:mm a"
                );
                return (
                  <tr
                    className={Styles.tableRow}
                    key={key}
                    onClick={() => handleGoToDetailTour(val, key)}
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
            </table>
          </div>
        </div>
      )}
    </>
  );
};
export default PaymentBookingCompleteTravel;
