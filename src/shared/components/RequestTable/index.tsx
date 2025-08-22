import classNames from "classnames";
import React, { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import RingLoader from "../RingLoader";
import { TbRefresh } from "react-icons/tb";
import TableNew from "../A_New_Components/Table_new";
import style from "./request.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import PhysiotheristsEmpty from "../PhsiotheristEmpty";
import { useTranslation } from "react-i18next";
import NewPagination from "../NewPagination/NewPagination";
export const RequestTable = ({
  name,
  selectName,
  setSelectedName,
  loading,
  allHospital,
  totalItems,
  appointment,
  length,
  setSelectedDate,
  selectedDate,
  lab,
  handleGoToDetail,
  setDepart,
  itemWidth,
  headerWidth,
  setType,
  search,
  setSearch,
  headTitle,
}: {
  name?: any;
  selectName?: any;
  setSelectedName?: any;
  loading?: any;
  lab?: any;
  headTitle?: any;
  allHospital?: any;
  totalItems?: any;
  appointment?: any;
  length?: any;
  setSelectedDate?: any;
  selectedDate?: any;
  handleGoToDetail?: any;
  setDepart?: any;
  itemWidth?: any;
  headerWidth?: any;
  setType?: any;
  search?: any;
  setSearch?: any;
}) => {
  const { t }: any = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  console.log("🚀 ~ openDropdown....:", openDropdown);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const titles = [
    t("appointmentId"),
    t("patientName"),
    <div className={style.dropdownWrapper}>
      <span>{t("date&Time")}</span>
      {/* <span>Date & Time</span> */}
      <RiArrowDropDownLine
        size={28}
        className={style.dropdownIcon}
        onClick={() =>
          setOpenDropdown(openDropdown === "dateTime" ? null : "dateTime")
        }
      />
      {openDropdown === "dateTime" && (
        <div className={style.dropdownContainer}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={t("selectDate")}
              format="MM/DD/YYYY"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </LocalizationProvider>
        </div>
      )}
    </div>,
    t("type"),
    t("status"),
    <div className={style.dropdownWrapper}>
      <span>{t("appointmentFor")}</span>
      <RiArrowDropDownLine
        size={28}
        className={style.dropdownIcon}
        onClick={() =>
          setOpenDropdown(
            openDropdown === "appointmentFor" ? null : "appointmentFor"
          )
        }
      />
      {openDropdown === "appointmentFor" && (
        <div className={style.dropdownContainerApp}>
          {name?.map((i: any) => (
            <div
              style={{
                padding: "8px",
                backgroundColor: selectName === i ? "red" : "#fff",
                cursor: "pointer",
                color: selectName === i ? "#fff" : "black",
              }}
              onClick={() => setSelectedName(i)}
            >
              {i}
            </div>
          ))}
        </div>
      )}
    </div>,
    t("settings"),
  ];

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      allHospital(currentPage + 1, search);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      allHospital(currentPage - 1, search);
    }
  };
  const handleRefresh = () => {
    setSearch("");
    if (setDepart) {
      setDepart([]);
    }
    if (setType) {
      setType("");
    }
    setPageno(1);
    setCurrentPage(1);
    if (setSelectedDate) {
      setSelectedDate(null);
    }
    allHospital(1, "");
    if (setSelectedName) {
      setSelectedName("");
    }
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    allHospital(1, search);
  };
  return (
    <div
      className={classNames(commonstyles.mt16)}
      style={{
        backgroundColor: "white",
        borderRadius: "16px ",
        marginTop: "16px",
        // width: "96%",
        padding: "24px",
        // maxWidth: "100%",
      }}
    >
      <div
        className={classNames(
          commonstyles.flx,
          commonstyles.flxBetween,
          commonstyles.flxWrap
        )}
        style={{ marginBottom: "8px" }}
      >
        <div
          className={classNames(commonstyles.flx, style.flxWrap)}
          style={{ gap: "16px" }}
        >
          <p
            className={classNames(
              commonstyles.colorBlack,
              commonstyles.fs14,
              commonstyles.semiBold
            )}
          >
            {headTitle ? headTitle : "Doctors"}
          </p>
          {loading ? (
            <div className={style.outerRefresh}>
              <RingLoader color={"#0E54A3"} size={24} />
            </div>
          ) : (
            <div className={style.outerRefresh}>
              <TbRefresh color={"#7d7d7d"} size={24} onClick={handleRefresh} />{" "}
            </div>
          )}
          <div>
            <SearchFilter
              vender={false}
              search={search}
              title={t("search")}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          </div>
        </div>

        <NewPagination
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
          startItem={(currentPage - 1) * itemsPerPage + 1}
          endItem={Math.min(currentPage * itemsPerPage, totalItems)}
          totalItems={totalItems}
        />
      </div>
      {appointment?.length > 0 ? (
        <TableNew
          titles={lab ? lab : titles}
          data={appointment}
          show={headTitle === "Departments" ? false : true}
          handleGoToDetail={handleGoToDetail}
          headerWidth={headerWidth || "10%"}
          itemWidth={itemWidth || "10%"}
          height="290px"
        />
      ) : (
        <PhysiotheristsEmpty />
      )}
    </div>
  );
};
