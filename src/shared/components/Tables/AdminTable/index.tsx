import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";

const AdminTable = (props: any) => {
  const { titles, data, handleGoToDetail, headerWidth, itemWidth } = props;

  return (
    <div className={styles.payment}>
      <div className={classNames(styles.headerOuter, commonStyles.bold)}>
        {titles?.map((val: any, index: any) => (
          <p className={styles.headerclass} style={{ width: headerWidth }}>
            {val?.title}
          </p>
        ))}
      </div>
      <div className={styles.tableData}>
        <table
          style={{
            margin: "0px",
            borderCollapse: "separate",
            borderSpacing: "0 4px",
          }}
        >
          <tbody className={styles.wapper}>
            {data?.map((rowData: any, rowIndex: any) => {
              return (
                <tr
                  className={styles.row}
                  key={rowIndex}
                  onClick={() => handleGoToDetail(rowIndex)}
                >
                  {rowData?.map((cellData: any, cellIndex: any) => (
                    <td
                      key={cellIndex}
                      className={styles.w20}
                      style={{ width: itemWidth }}
                    >
                      {cellData}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;

// Orders
// <p
//                         className={classNames(Styles.statusComp, {
//                           [Styles.statusProcessingText]:
//                             val.status === "inProcess",
//                           [Styles.statusPendingText]: val.status === "pending",
//                         })}
//                       >
//                         {val.status}
//                       </p>
