import * as React from "react";
import tablepay from "./tablepay.module.css";
import classNames from "classnames";
import Downloader from "shared/components/Downloader";

import dayjs from "dayjs";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  onPressItem?: any;
}

const TablePay = (props: Props) => {
  const {t} : any = useTranslation();
  const { data, onPressItem } = props;
  return (
    <div className={classNames(tablepay.App)}>
      <div className={tablepay.payment}>
        <div className={tablepay.headerOuter}>
          <p className={tablepay.headerclass}>{t("paymentId")}</p>
          <p className={tablepay.headerclass}>{t("paymentDate")}</p>
          <p className={tablepay.headerclass}>{t("quantity")}</p>
          <p className={tablepay.headerclass}>{t("receivedAmount")}</p>
        </div>
        <div className={tablepay.tableData}>
          <table
            style={{
              margin: "0px",
            }}
          >
            <tbody className={tablepay.wapper}>
              {data?.map((val: any, key: number) => {
                return (
                  <tr
                    className={tablepay.tableRow}
                    key={key}
                    onClick={() => onPressItem(val)}
                  >
                    <td className={tablepay.w20}>{val?.paymentId}</td>
                    <td className={tablepay.w20}>
                      {dayjs(val?.createdAt).format("MM-DD-YYYY")}
                    </td>
                    <td className={tablepay.w20}>{val?.noOfitems}</td>
                    <td className={tablepay.w20}>{val?.payableAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablePay;
