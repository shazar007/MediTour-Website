import React, { useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import styles from "./AdVender.module.css";
import { useNavigate } from "react-router-dom";
import { getUsers } from "shared/services";
import { useDispatch } from "react-redux";
import { set_Fetch } from "shared/redux";

export default function AdminVender() {
  const navigate = useNavigate();
  const handleGoNext = (type: any) => {
    navigate("/admin/Users/Laboratories", { state: type });;
  };

  return (
    <div className={styles.flx}>
      <div
        className={styles.PharmacyCard}
        onClick={() => handleGoNext("Pharmacy")}
      >
        <p
          className={classNames(
            commonStyles.fs22,
            commonStyles.semiBold,
            styles.mtauto
          )}
        >
          Pharmacies
        </p>
      </div>
      <div
        className={styles.LabCard}
        onClick={() => handleGoNext("Laboratory")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Laboratories
        </p>
      </div>
      <div
        className={styles.DoctorCard}
        onClick={() => handleGoNext("Doctors")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Doctors
        </p>
      </div>
      <div
        className={styles.HospitalCard}
        onClick={() => handleGoNext("Hospital")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Hospitals
        </p>
      </div>
      <div
        className={styles.TravelCard}
        onClick={() => handleGoNext("Travel Agency")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Travel Agency
        </p>
      </div>
      <div
        className={styles.RentCard}
        onClick={() => handleGoNext("Rent A Car")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Rent a car
        </p>
      </div>
      <div
        className={styles.PropertiesCard}
        onClick={() => handleGoNext("Hotels")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Properties
        </p>
      </div>
      <div
        className={styles.DonationCard}
        onClick={() => handleGoNext("Donations")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Donation
        </p>
      </div>
      <div
        className={styles.InsuranceCard}
        onClick={() => handleGoNext("Insurance")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Insurance
        </p>
      </div>{" "}
      <div
        className={styles.AmbulanceCard}
        onClick={() => handleGoNext("Ambulance")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Ambulance
        </p>
      </div>
      <div
        className={styles.PharmaceuticalCard}
        onClick={() => handleGoNext("Pharmaceutical")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Pharmaceutical
        </p>
      </div>
      <div
        className={styles.ParamedicCard}
        onClick={() => handleGoNext("Paramedic")}
      >
        <p className={classNames(commonStyles.fs22, commonStyles.semiBold)}>
          Paramedic
        </p>
      </div>
    </div>
  );
}
