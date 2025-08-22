import React, { useState } from "react";
import "./styles.css";
import { Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
const NewTermCondition = ({ formik }: any) => {
  const { t }: any = useTranslation();

  const handleCheckboxChange = (method: any) => {
    const currentMethods = formik.values.paymentMethods;
    const newMethods = currentMethods.includes(method)
      ? currentMethods.filter((m: any) => m !== method)
      : [...currentMethods, method];
    formik.setFieldValue("paymentMethods", newMethods);
  };

  const handleSelectorChange = (option: any) => {
    formik.setFieldValue("cancellationWindow", option);
  };
  const paymentArray = [
    { title: "All", value: "all" },
    { title: "Cash", value: "cash" },
    { title: "Online Payments", value: "online" },
    { title: "Credit/debit cards", value: "credit/debit" },
  ];

  return (
    <>
      <p className="Heading">{t("termsAndCondition")}</p>
      <p className="subheading">{t("agreementToTerms")?.toUpperCase()}</p>

      <p className="title">1. {t("ageRequirement")}</p>
      <p className="subTitle">{t("ageRequirementCon")}</p>

      <p className="title">2. {t("reservationConfirmation")}:</p>
      <p className="subTitle">{t("reservationConfirmationCon")}</p>

      <p className="title">3. {t("paymentMethods")}:</p>
      <p className="subTitle">{t("paymentMethodsCon")}</p>
      <div className="checkbox-group">
        {paymentArray.map((method: any, index: any) => (
          <div key={index} className={"checkedbox"}>
            <Checkbox
              checked={formik.values.paymentMethods.includes(method?.value)}
              onChange={() => handleCheckboxChange(method?.value)}
              className={"radioMark"}
            />
            <p className={"textSelected"}>{method?.title}</p>
          </div>
        ))}
      </div>
      {formik.errors.paymentMethods && formik.touched.paymentMethods && (
        <p className="error-text">{formik.errors.paymentMethods}</p>
      )}
      <p className="title">4. {t("cancellationWindow")}:</p>
      <p className="subTitle">{t("cancellationWindowCon")}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="selector-container">
          {["24hr", "36hr", "48hr"].map((option) => (
            <button
              key={option}
              className={`selector-button ${
                formik.values.cancellationWindow === option ? "selected" : ""
              }`}
              onClick={() => handleSelectorChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formik.errors.cancellationWindow &&
        formik.touched.cancellationWindow && (
          <p className="error-text">{formik.errors.cancellationWindow}</p>
        )}

      <p className="title">5. {t("hotelPolicies")}</p>
      <p className="subTitle">1. {t("hotelPoliciesCon_1")}</p>
      <p className="subTitle">2. {t("hotelPoliciesCon_2")}</p>
      <p className="subTitle">3. {t("hotelPoliciesCon_3")}</p>
      <p className="subTitle">4. {t("hotelPoliciesCon_4")}</p>
      <p className="subTitle">5. {t("hotelPoliciesCon_5")}</p>

      <div className="important-note">
        <p className="title">{t("importantThingsToknow")}</p>
        <p className="subTitle">{t("importantThingsToknowCon")} </p>
      </div>
      {/* <p className="agreement">
        By clicking finish, you agree to meditour <a href="#">Terms of use</a> &{" "}
        <a href="#">privacy policy</a>.
      </p> */}
    </>
  );
};

export default NewTermCondition;
