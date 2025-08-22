import classNames from "classnames";
import SearchBar from "shared/components/Searchbar";
import commonstyles from "shared/utils/common.module.css";
import Style from "./ambulanceDocuments.module.css";

export default function AmbulanceDocuments() {
  return (
    <div className={classNames(commonstyles.col12)}>
      <SearchBar />
      <div className={classNames(commonstyles.mr87, commonstyles.colorBlue)}>
        <div className={Style.outerContainer}>
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            AmbulanceDocuments
          </p>
        </div>
      </div>
    </div>
  );
}
