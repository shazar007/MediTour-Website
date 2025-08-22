import classNames from "classnames";
import React from "react";
import styles from "./styles.module.css";

const LabOrderItems = (props: any) => {
  const { data } = props;
  const onPressItem = (val: any) => {};
  return (
    <div className={classNames(styles.App)}>
      <div className={styles.payment}>
        <div className={styles.headerOuter}>
          <p className={styles.headerclass}>Test Code</p>
          <p className={styles.headerclass}>Test Name</p>
          <p className={styles.headerclass}>Items</p>
          <p className={styles.headerclass}>Actual Price</p>
          <p className={styles.headerclass}>Discounted Price</p>
        </div>
        <div className={styles.tableData}>
          <table
            style={{
              margin: "0px",
            }}
          >
            <tbody className={styles.wapper}>
              {data?.map((val: any, key: number) => {
                return (
                  <tr
                    className={styles.tableRow}
                    key={key}
                    onClick={() => onPressItem(val)}
                  >
                    <td className={styles.w20}>{val?.itemId?.testCode}</td>
                    <td className={styles.w20}>
                      {val?.itemId?.testNameId?.name}
                    </td>
                    <td className={styles.w20}>{val?.quantity}</td>
                    <td className={styles.w20}>{val?.itemId?.price}</td>
                    <td className={styles.w20}>{val?.itemId?.userAmount}</td>
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

export default LabOrderItems;
