import React, { useRef, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./searchfilter.module.css";
import DatePicker from "react-datepicker";
import { GrPowerReset } from "react-icons/gr";
import "react-datepicker/dist/react-datepicker.css";
import { CustomModal } from "shared/components";
import { FaAngleDown } from "react-icons/fa6";
import { Checkbox } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import { useTranslation } from "react-i18next";

interface SearchFilterProps {
  vender?: boolean;
  checkbox?: boolean;
  search?: string;
  setSearch?: any;
  handleSearch?: any;
  title?: any;
}

export default function SearchFilter({
  vender,
  checkbox,
  search,
  setSearch,
  handleSearch,
  title,
}: SearchFilterProps) {
  const { t, i18n }: any = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showSendModel, setShowSendModel] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [search, setSearch] = useState("");

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleDateClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowDatePicker(false); // Close the date picker after selecting a date
  };

  const handleOpenModel = () => {
    setShowSendModel(true);
  };

  const handleModelClose = () => {
    setShowSendModel(false);
  };
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };

  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input when the icon is clicked
    }
  };

  return (
    <div className={commonStyles.flx}>
      {checkbox && (
        <div style={{ marginLeft: "32px" }}>
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 30 },
            }}
            className={Styles.Checkbox}
          />
        </div>
      )}
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? Styles.searchcontainerlg
            : Styles.searchcontainer
        }
      >
        <input
          ref={inputRef}
          value={search}
          type="search"
          placeholder={title ? title : "Search by MR NO."}
          className={Styles.SearchInput}
          onChange={(event: any) => handleChangeSearch(event)}
        />
        <LuSearch
          className={Styles.SearchIcons}
          style={{
            borderLeft: "1px solid",
            borderColor: "#0000",
            paddingLeft: "10px",
          }}
          onClick={handleIconClick}
        />

        {/* <div className={Styles.Filterouter} onClick={toggleFilters}>
          <BiFilterAlt
            className={showFilters ? Styles.FilterOpen : Styles.Filter}
          />
        </div> */}
        {showFilters && (
          <>
            <div className={Styles.Dateouter}>
              {selectedDate ? (
                <p
                  className={classNames(
                    commonStyles.semiBold,
                    commonStyles.fs14
                  )}
                >
                  {selectedDate.toLocaleDateString()}
                </p>
              ) : (
                <p className={commonStyles.semiBold}>Date</p>
              )}
              <FaAngleDown onClick={handleDateClick} className={Styles.icons} />
              {showDatePicker && (
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                  calendarClassName={classNames(
                    Styles["react-datepicker__month-container"],
                    Styles["react-datepicker__header"],
                    Styles["react-datepicker__day--selected"],
                    Styles["react-datepicker__day-name"],
                    Styles["datepicker__navigation-icon::before"]
                  )}
                />
              )}
            </div>
            {vender && (
              <div className={Styles.Vendorouter}>
                <p
                  className={classNames(
                    commonStyles.semiBold,
                    commonStyles.fs14
                  )}
                >
                  Vendor ID
                </p>
                <FaAngleDown
                  onClick={handleOpenModel}
                  className={Styles.icons}
                />
              </div>
            )}
            <div className={Styles.Resetouter}>
              <GrPowerReset size={24} className={Styles.Reset} />
              <p className={commonStyles.semiBold}>Reset Filter</p>
            </div>
            <CustomModal showModal={showSendModel}>
              <div style={{ width: "420px" }}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
                >
                  Search by Vendor ID
                </p>
                <input
                  placeholder="Search Vendor"
                  className={Styles.venderInput}
                />
                <div style={{ height: "200px" }}>
                  <div className={Styles.venderCard}>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.medium
                      )}
                    >
                      Chagatai Lab
                    </p>
                  </div>
                </div>
                <div className={Styles.border}>
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.medium
                    )}
                  >
                    *You can search multiple Service Provider
                  </p>
                </div>
                <div className={Styles.buttonOuter}>
                  <button
                    className={Styles.buttonApply}
                    onClick={handleModelClose}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </CustomModal>
          </>
        )}
      </div>
    </div>
  );
}
