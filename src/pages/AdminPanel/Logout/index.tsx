import React from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import styles from "./logout.module.css";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { BiFilterAlt } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
export default function Logout() {
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={styles.Navouter}>
        <AdminNavBar labelText="Logout" />
      </div>
      <div className={classNames(styles.mainOuter)}>
        <div className={classNames(styles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <p
              className={classNames(
                commonStyles.fs22,
                styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              Logout
            </p>
            <TbRefresh className={styles.refresh} />
          </div>
          <div className={classNames(commonStyles.flx)}>
            <div className={styles.searchcontainer}>
              <RiSearchLine className={styles.searchicon} />
              <input
                type="search"
                placeholder="Search"
                className={styles.SearchInput}
              />
              <BiFilterAlt className={styles.Filter} />
            </div>
            <NewPagination />
          </div>
        </div>
      </div>
    </div>
  );
}
