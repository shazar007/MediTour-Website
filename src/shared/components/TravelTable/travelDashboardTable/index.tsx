import * as React from "react";
import tablepay from "./travelDashBoardTable.module.css";
import commonstyle from "../../../utils/common.module.css";
import classNames from "classnames";
import { PiDownloadSimpleBold } from "react-icons/pi";
import ImgPicker from "shared/components/Img-picker";
const data = [
  {
    PNR: "RI694JF4",
    PaxName: "Bilal Hassan",
    Date: "Video Consultancy",
    FlightNo: "IF045J45E",
    Amount: "432646/-",
    Status: "One way",
  },
  {
    PNR: "RI694JF4",
    PaxName: "Bilal Hassan",
    Date: "Video Consultancy",
    FlightNo: "IF045J45E",
    Amount: "432646/-",
    Status: "Return",
  },
  {
    PNR: "RI694JF4",
    PaxName: "Bilal Hassan",
    Date: "Video Consultancy",
    FlightNo: "IF045J45E",
    Amount: "432646/-",
    Status: "One way",
  },
  {
    PNR: "RI694JF4",
    PaxName: "Bilal Hassan",
    Date: "Video Consultancy",
    FlightNo: "IF045J45E",
    Amount: "432646/-",
    Status: "Return",
  },
  {
    PNR: "RI694JF4",
    PaxName: "Bilal Hassan",
    Date: "Video Consultancy",
    FlightNo: "IF045J45E",
    Amount: "432646/-",
    Status: "One way",
  },
  {
    PNR: "RI694JF4",
    PaxName: "Bilal Hassan",
    Date: "Video Consultancy",
    FlightNo: "IF045J45E",
    Amount: "432646/-",
    Status: "Return",
  },
  {
    PNR: "RI694JF4",
    PaxName: "Bilal Hassan",
    Date: "Video Consultancy",
    FlightNo: "IF045J45E",
    Amount: "432646/-",
    Status: "One way",
  },
  {
    PNR: "RI694JF4",
    PaxName: "Bilal Hassan",
    Date: "Video Consultancy",
    FlightNo: "IF045J45E",
    Amount: "432646/-",
    Status: "Return",
  },
];

function TravelDashTable() {
  return (
    <div className={classNames(tablepay.App)}>
      <table className={classNames(tablepay.col12, tablepay.mb50)}>
        <tr className={classNames(tablepay.ss, commonstyle.fs14)}>
          <th>PNR</th>
          <th>Pax Name</th>
          <th>Date</th>
          <th>Flight No.</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr className={tablepay.bordr} key={key}>
              <td>{val.PNR}</td>
              <td>{val.PaxName}</td>
              <td>{val.Date}</td>
              <td>{val.FlightNo}</td>
              <td>{val.Amount}</td>
              <td>{val.Status}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default TravelDashTable;
