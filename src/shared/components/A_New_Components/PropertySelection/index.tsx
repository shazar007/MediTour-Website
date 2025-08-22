import React, { useState } from "react";
import styles from "./PropertySelection.module.css";
import { Radio } from "@mui/material";
import GoogleMapComponent from "../SearchLocation";
import p1 from "assets/images/p1.png";
import p2 from "assets/images/p2.png";
import p3 from "assets/images/p3.png";
import p4 from "assets/images/p4.png";
import p5 from "assets/images/p5.png";
import p6 from "assets/images/p6.png";
import p7 from "assets/images/p7.png";
import p8 from "assets/images/p8.png";
import p9 from "assets/images/p9.png";
import { useTranslation } from "react-i18next";

const PropertySelection = ({ formik }: any) => {
  const { t, i18n }: any = useTranslation();
  const data = [
    { img: p1, label: "House", value: "house" },
    { img: p2, label: "Rooms", value: "rooms" },
    { img: p3, label: "Guest House", value: "guest house" },
    { img: p4, label: "Camp", value: "camp" },
    { img: p5, label: "Container", value: "container" },
    { img: p6, label: "POD", value: "POD" },
    { img: p8, label: "Tree House", value: "tree house" },
    { img: p9, label: "Suite", value: "suite" },
    { img: p7, label: "Farm House", value: "farm house" },
  ];
  const typedata = [
    { id: 1, title: "Attached" },
    { id: 2, title: "Dedicated" },
    { id: 3, title: "Shared" },
  ];
  return (
    <>
      <h2 className={styles.heading}>{t("whichOfThesBestDescribe_")}</h2>
      <div className={styles.selectProperty}>
        <div className={styles.selectText}>{t("selectProperty")}</div>
        <div className={styles.propertyGrid}>
          {data.map((label: any, index) => (
            <div
              key={index}
              className={
                formik?.values?.property === label?.value
                  ? styles.selectedTab
                  : styles.propertyItem
              }
              onClick={() => formik.setFieldValue("property", label?.value)}
            >
              <img
                src={label?.img}
                className={styles.propertyIcon}
                style={{
                  filter:
                    formik?.values?.property === label?.value
                      ? "invert(1) brightness(2)"
                      : "none",
                }}
                alt="LABEL"
              />
              <span
                className={styles.propertyLabel}
                style={{
                  color:
                    formik?.values?.property === label?.value
                      ? "#fff"
                      : "#7d7d7d",
                }}
              >
                {label?.label}
              </span>
            </div>
          ))}
        </div>
        {formik.errors.property && formik.touched.property && (
          <div className={styles.error}>{formik.errors.property}</div>
        )}
      </div>

      <div className={styles.infoSection}>
        <div className={styles.inputStyle}>
          <p className={styles.selectText}>{t("propertyInfo")}</p>
          <div>
            <input
              placeholder={t("propertyName")}
              className={styles.input}
              value={formik?.values?.propertyName}
              onChange={formik?.handleChange("propertyName")}
            />
            {formik.errors.propertyName && formik.touched.propertyName && (
              <div className={styles.error}>{formik.errors.propertyName}</div>
            )}
          </div>
          <div>
            <input
              placeholder={t("contactNUmber")}
              className={styles.input}
              value={formik?.values?.contactNumber}
              onChange={formik?.handleChange("contactNumber")}
            />
            {formik.errors.contactNumber && formik.touched.contactNumber && (
              <div className={styles.error}>{formik.errors.contactNumber}</div>
            )}
          </div>
          {formik?.values?.property !== "suite" &&
            formik?.values?.property !== "rooms" && (
              <>
                <div>
                  <input
                    placeholder={t("address")}
                    className={styles.input}
                    value={formik?.values?.address}
                    onChange={formik?.handleChange("address")}
                    readOnly
                  />
                  {formik.errors.address && formik.touched.address && (
                    <div className={styles.error}>{formik.errors.address}</div>
                  )}
                </div>
                <div>
                  <input
                    placeholder={t("city")}
                    className={styles.input}
                    value={formik?.values?.city}
                    onChange={formik?.handleChange("city")}
                  />
                  {formik.errors.city && formik.touched.city && (
                    <div className={styles.error}>{formik.errors.city}</div>
                  )}
                </div>
                <div>
                  <p className={styles.pin}>{t("isThePinInTheRightSpot")}</p>
                  <GoogleMapComponent setFieldValue={formik.setFieldValue} />
                </div>
              </>
            )}
        </div>

        <div className={styles.secoundColumn}>
          <p className={styles.propertyLabel}>{t("howManyPeopeleStay")}</p>
          <Incriment
            title={t("beds")}
            value={formik?.values?.numberOfBeds}
            setFieldValue={formik.setFieldValue}
            fieldName="numberOfBeds"
            error={formik.errors.numberOfBeds}
            errorTouch={formik.touched.numberOfBeds}
          />
          <Incriment
            title={t("guests")}
            value={formik?.values?.noOfGuests}
            setFieldValue={formik.setFieldValue}
            fieldName="noOfGuests"
            error={formik.errors.noOfGuests}
            errorTouch={formik.touched.noOfGuests}
          />
          <Incriment
            title={t("bathrooms")}
            value={formik?.values?.bathroomscount}
            setFieldValue={formik.setFieldValue}
            fieldName="bathroomscount"
            error={formik.errors.bathroomscount}
            errorTouch={formik.touched.bathroomscount}
          />
          <div>
            {typedata?.map((i: any) => (
              <div
                key={i.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginTop: "8px",
                }}
              >
                <Radio
                  checked={formik?.values?.bathroomstype === i?.title}
                  onChange={() =>
                    formik?.setFieldValue("bathroomstype", i?.title)
                  }
                  className={styles.radioMark}
                />
                <p className={styles.propertyLabel}>{i?.title}</p>
              </div>
            ))}
            {formik.errors.bathroomstype && formik.touched.bathroomstype && (
              <div className={styles.error}>{formik.errors.bathroomstype}</div>
            )}
          </div>
          <div>
            <textarea
              placeholder={t("someDetailsAboutProperty")}
              className={styles.textArea}
              value={formik?.values?.propertyDetails}
              onChange={formik?.handleChange("propertyDetails")}
              aria-multiline
            ></textarea>
            {formik.errors.propertyDetails &&
              formik.touched.propertyDetails && (
                <div className={styles.error}>
                  {formik.errors.propertyDetails}
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
const Incriment = ({
  title,
  value,
  setFieldValue,
  fieldName,
  error,
  errorTouch,
}: any) => {
  const isDisabled = value === 1;
  const { t, i18n }: any = useTranslation();
  return (
    <div>
      <div className={styles.counterRow}>
        <span className={styles.propertyLabel}>{title}</span>
        <div className={styles.counterControls}>
          <button
            className={`${styles.minus} ${isDisabled ? styles.disabled : ""}`}
            onClick={() => setFieldValue(fieldName, Math.max(1, value - 1))}
          >
            -
          </button>
          <p
            className={
              ["ur"].includes(i18n.language)
                ? styles.propertyLabellang
                : styles.propertyLabel
            }
          >
            {value}
          </p>
          <button
            className={styles.minus}
            onClick={() => setFieldValue(fieldName, value + 1)}
          >
            +
          </button>
        </div>
      </div>
      {error && errorTouch && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default PropertySelection;
