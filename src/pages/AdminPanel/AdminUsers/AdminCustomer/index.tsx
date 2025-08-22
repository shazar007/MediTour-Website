import React from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./AdCustomer.module.css";
import { useNavigate } from "react-router-dom";
interface Props {
  Data?: any;
}
const AdminCustomer = (props: Partial<Props>) => {
  const { Data } = props;

  const navigate = useNavigate();
  const handleGoToDetail = (index: any) => {
    navigate("/admin/Users/Customer/Details", { state: Data[index] });
  };
  return (
    <div className={classNames(Styles.mainOuter)}>
      <div>
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <p className={Styles.headerclass}>Mr ID.</p>
            <p className={Styles.headerclass}>NAME</p>
            <p className={Styles.headerclass}>EMAIL</p>
            <p className={Styles.headerclass}>PHONE NUMBER</p>
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
                {Data?.map((val: any, rowIndex: any) => {
                  return (
                    <tr
                      className={Styles.tableRow}
                      key={rowIndex}
                      onClick={() => handleGoToDetail(rowIndex)}
                    >
                      <td className={Styles.w20}>{val?.mrNo}</td>
                      <td className={Styles.w20}>{val?.name}</td>
                      <td className={Styles.w20}>{val?.email}</td>
                      <td className={Styles.w20}>{val?.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminCustomer;
