import React from "react";
import classNames from "classnames";
import SearchBar from "shared/components/Searchbar";
import commonstyles from "shared/utils/common.module.css";
export default function Documents() {
  return (
    <div className={classNames(commonstyles.col12)}>
      <div className={commonstyles.mr87}>
        <div>
          <h1>Documents</h1>
        </div>
      </div>
    </div>
  );
}
