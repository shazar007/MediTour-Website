import * as React from "react";
import tablepay from "./travelDashBoardTable.module.css";
import commonstyle from "../../../utils/common.module.css";
import classNames from "classnames";
import { PiDownloadSimpleBold } from "react-icons/pi";
import ImgPicker from "shared/components/Img-picker";
const data = [
  {
    patientId: "RI694JF4",
    patientname: "Bilal Hassan",
    servicename: "Video Consultancy",
    paymentid: "IF045J45E",
    paymentamount: "432646/-",
    receipt: <ImgPicker />,
  },
  {
    patientId: "RI694JF4",
    patientname: "Bilal Hassan",
    servicename: "Video Consultancy",
    paymentid: "IF045J45E",
    paymentamount: "432646/-",
    receipt: <ImgPicker />,
  },
  {
    patientId: "RI694JF4",
    patientname: "Bilal Hassan",
    servicename: "Video Consultancy",
    paymentid: "IF045J45E",
    paymentamount: "432646/-",
    receipt: <ImgPicker />,
  },
  {
    patientId: "RI694JF4",
    patientname: "Bilal Hassan",
    servicename: "Video Consultancy",
    paymentid: "IF045J45E",
    paymentamount: "432646/-",
    receipt: <ImgPicker />,
  },
  {
    patientId: "RI694JF4",
    patientname: "Bilal Hassan",
    servicename: "Video Consultancy",
    paymentid: "IF045J45E",
    paymentamount: "432646/-",
    receipt: <ImgPicker />,
  },
];

function TravelDashTable() {
  return (
    <div className={classNames(tablepay.App)}>
      <table className={classNames(tablepay.col12, tablepay.mb50)}>
        <tr className={classNames(tablepay.ss, commonstyle.fs14)}>
          <th>Patient ID</th>
          <th>Patient Name</th>
          <th>Service Name</th>
          <th>Payment id</th>
          <th>Payment amount</th>
          <th>Receipt</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr className={tablepay.bordr} key={key}>
              <td>{val.patientId}</td>
              <td>{val.patientname}</td>
              <td>{val.servicename}</td>
              <td>{val.paymentid}</td>
              <td>{val.paymentamount}</td>
              <td>{val.receipt}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default TravelDashTable;
