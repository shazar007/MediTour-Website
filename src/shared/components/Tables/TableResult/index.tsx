import * as React from "react";
import styles from "./tableresult.module.css";
import Tickmark from "assets/images/GreenTickmark.png";
import commonstyle from "../../../utils/common.module.css";
import classNames from "classnames";
import Downloader from "shared/components/Downloader";
import { useNavigate } from "react-router-dom";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
interface Props {
  order: any;
}
function TableResult(props: Partial<Props>) {
  const { order } = props;
  const navigate = useNavigate();

  const handleGoToOrderDeatil = (id: string) => {
    navigate(`/laboratory/Result/Detail/${id}`);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.payment}>
        {order.length > 0 && (
          <div className={styles.headerOuter}>
            <p className={styles.headerclass}>Order Id</p>

            <p className={styles.headerclass}>Patient Name</p>
            <p className={styles.headerclass}>MR No</p>
            <p className={styles.headerclass}>Date</p>
            <p className={styles.headerclass}>Result</p>
          </div>
        )}
        <div className={styles.tableData}>
          {order.length > 0 ? (
            <table
              style={{
                margin: "0px",
              }}
            >
              <tbody className={styles.wapper}>
                {order.map((val: any, key: any) => {
                  return (
                    <tr className={styles.tableRow} key={key}>
                      <td
                        className={styles.w20}
                        onClick={() => handleGoToOrderDeatil(val._id)}
                      >
                        {val?.orderId}
                      </td>

                      <td
                        className={styles.w20}
                        onClick={() => handleGoToOrderDeatil(val._id)}
                      >
                        {val?.customerName}
                      </td>
                      <td
                        className={styles.w20}
                        onClick={() => handleGoToOrderDeatil(val._id)}
                      >
                        {val?.MR_NO}
                      </td>
                      <td
                        className={styles.w20}
                        onClick={() => handleGoToOrderDeatil(val._id)}
                      >
                        {new Date(val?.createdAt).toLocaleDateString()}
                      </td>
                      <td className={styles.w20}>
                        <Downloader link={val?.results} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <PhysiotheristsEmpty />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableResult;
