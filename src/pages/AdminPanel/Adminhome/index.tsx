import React from "react";
import AdminNavBar from "../Components/AdminNavBar";
import styles from "./adminhome.module.css";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import AdminHomelinechart from "../Components/Charts/AdminHomelinechart";
import AdminAerachart from "../Components/Charts/adminAerachart";
export default function AdminHome() {
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={styles.Navouter}>
        <AdminNavBar labelText="Overview" />
      </div>
      <div className={classNames(styles.mainOuter)}>
        <div className={classNames(commonStyles.col8)}>
          <AdminHomelinechart />
        </div>
        <div className={classNames(commonStyles.col8, styles.mt32)}>
          <AdminAerachart />
        </div>
      </div>
    </div>
  );
}
