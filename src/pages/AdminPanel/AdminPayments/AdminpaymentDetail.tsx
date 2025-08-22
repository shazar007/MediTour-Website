import React from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import styles from "./adminPayment.module.css";
export default function AdminpaymentDetail() {
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={styles.Navouter}>
        <AdminNavBar labelText="Request" />
      </div>
      <div className={classNames(styles.mainOuter)}>
        <p
          className={classNames(
            commonStyles.fs22,
            styles.primarycolor,
            commonStyles.semiBold
          )}
        >
          Patient Request Details
        </p>
      </div>
    </div>
  );
}
