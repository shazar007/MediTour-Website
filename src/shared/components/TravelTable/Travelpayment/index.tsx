import * as React from "react";
import tablepay from "./Travelpayment.module.css";
import commonstyle from "../../../utils/common.module.css";
import classNames from "classnames";
import { PiDownloadSimpleBold } from "react-icons/pi";
import ImgPicker from "shared/components/Img-picker";
import { Navigate, useNavigate } from "react-router-dom";
import Downloader from "shared/components/Downloader";
const data = [
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Business Class",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Business Class",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Business Class",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },

  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Business Class",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Economy",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Economy",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Business Class",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Economy",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },

  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Economy",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Business Class",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Economy",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
  {
    PaymentID: "RI694JF4",
    CustomerID: "Bilal Hassan",
    PayDate: "12 Jan 2022",
    FlightNo: "IF045J45E",
    class: "Economy",
    paymentamount: "432646/-",
    receipt: <Downloader />,
  },
];

function Travelpayment() {
  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate("/payment/Description");
  };
  return (
    <div className={classNames(tablepay.App)}>
      <div className={tablepay.payment}>
        <div className={tablepay.headerOuter}>
          <p className={tablepay.headerclass}>Payment ID</p>
          <p className={tablepay.headerclass}>Customer ID</p>
          <p className={tablepay.headerclass}>Payment Date</p>
          <p className={tablepay.headerclass}>Flight No</p>
          <p className={tablepay.headerclass}>Class</p>
          <p className={tablepay.headerclass}>Payment Amount</p>
          <p className={tablepay.headerclass}>Payment Amount</p>
        </div>
        <div className={tablepay.tableData}>
          <table
            style={{
              margin: "0px",
              // borderCollapse: "separate",
              // borderSpacing: "0 10px",
            }}
          >
            <tbody className={tablepay.wapper}>
              {data.map((val, key) => {
                return (
                  <tr
                    className={tablepay.tableRow}
                    key={key}
                    onClick={handleGoToDetail}
                  >
                    <td className={tablepay.w20}>{val.PaymentID}</td>
                    <td className={tablepay.w20}>{val.CustomerID}</td>
                    <td className={tablepay.w20}>{val.PayDate}</td>
                    <td className={tablepay.w20}>{val.FlightNo}</td>
                    <td className={tablepay.w20}>{val.class}</td>
                    <td className={tablepay.w20}>{val.paymentamount}</td>
                    <td className={tablepay.w20}>{val.receipt}</td>
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

export default Travelpayment;
