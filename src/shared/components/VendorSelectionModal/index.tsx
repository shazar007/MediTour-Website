import React, { useState } from "react";
import styles from "./Physioappointment.module.css";
import commonStyles from "shared/utils/common.module.css";
import { IoClose } from "react-icons/io5";
import DoctorReferModel from "../DoctorEmpty/DoctorReferModel";
import { Avatar, Checkbox } from "@mui/material";
import classNames from "classnames";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NewPagination from "../NewPagination/NewPagination";

interface vProps {
  setShowAddModal: any;
  data?: any;
  goNext?: any;
  goPrev?: any;
  search?: any;
  handleSearch?: any;
  currentPage?: any;
  itemsPerPage?: any;
  length?: any;
  vendorIndex?: number;
  setVendorIndex?: any;
}

const VendorSelectionModal = (props: Partial<vProps>) => {
  const {
    setShowAddModal,
    data,
    goNext,
    goPrev,
    search,
    handleSearch,
    currentPage,
    itemsPerPage,
    length,
    vendorIndex,
    setVendorIndex,
  } = props;

  let loading = false;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };
  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleSelection = (index: any) => {
    setVendorIndex(index);
  };

  return (
    <div style={{ width: "400px" }}>
      <div className={classNames(commonStyles.flxBetween)}>
        <div className={styles.DoctorSearch}>
          <input
            type="Search by Name"
            placeholder="Search"
            value={search}
            onChange={handleInputChange}
          />
        </div>

        <div className={classNames(commonStyles.flx)}>
          <NewPagination
            onNext={goNext}
            onPrevious={goPrev}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, length)}
            totalItems={length}
          />
        </div>
        <IoClose
          className={styles.close}
          onClick={handleCloseModal}
          style={{ position: "absolute", right: 10, top: 10 }}
        />
      </div>

      {loading ? (
        <DoctorReferModel showModal={loading} />
      ) : (
        <div className={styles.loader}>
          {data.map((v: any, ind: number) => {
            return (
              <div>
                <div
                  className={classNames(commonStyles.flx, styles.doctorcard)}
                >
                  <Avatar src={v?.logo} className={styles.avatar} />
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.medium,
                      commonStyles.colorBlue
                    )}
                    style={{ textTransform: "capitalize" }}
                  >
                    {v?.name}
                  </p>

                  <div className={styles.end}>
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={
                        <CheckCircleOutlineIcon style={{ color: "green" }} />
                      }
                      onChange={() => handleSelection(ind)}
                      checked={ind === vendorIndex}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VendorSelectionModal;
