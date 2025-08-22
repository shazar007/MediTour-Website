import React, { useState, useEffect } from "react";
import styles from "./NoInternetBar.module.css";
import classNames from "classnames";

const NoInternetBar = (props: any) => {
  return (
    <div className={classNames(styles.container)}>
      <span>
        ⚠️ Your computer seems to be offline. Please check your internet and try
        again.
      </span>
      {/* <button
        className={classNames(styles.closeBtn)}
        onClick={() => props.setIsOffline(false)}
      >
        ✕
      </button> */}
    </div>
  );
};

export default NoInternetBar;
