import React from "react";
import classNames from "classnames";
import Pstyle from "./prescription.module.css";
import logo from "assets/images/smallLogo.png";

const prescription = () => {
  return (
    <div>
      <button>download </button>
      <div className={Pstyle.container}>
        <div
          className={classNames(Pstyle.row, Pstyle.borderBottom)}
          style={{ paddingBottom: 30 }}
        >
          <div>
            <p
              className={classNames(
                Pstyle.bold,
                Pstyle.noMargin,
                Pstyle.largeText
              )}
            >
              Dr. name
            </p>
            <p className={classNames(Pstyle.noMargin, Pstyle.smallText)}>
              MBBS, MD
            </p>
            <p className={classNames(Pstyle.noMargin, Pstyle.smallText)}>
              PM&DC Reg: 123456
            </p>
          </div>
          <img src={logo} alt="logo" />
        </div>

        <div className={Pstyle.row}>
          <p
            className={classNames(Pstyle.semibold, Pstyle.mediumText)}
            style={{ marginTop: 16 }}
          >
            Patient Name:{" "}
            <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
              Patient
            </span>
          </p>
          <p
            className={classNames(Pstyle.semibold, Pstyle.mediumText)}
            style={{ marginTop: 16 }}
          >
            M.R No:{" "}
            <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
              MR123456
            </span>
          </p>
        </div>

        <div className={Pstyle.row} style={{ alignItems: "center" }}>
          <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
            Date:{" "}
            <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
              08/27/2024
            </span>
          </p>
          <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
            Age:{" "}
            <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
              30 years old
            </span>
          </p>
        </div>

        <div className={Pstyle.row}>
          <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
            Cell:{" "}
            <span className={classNames(Pstyle.regular, Pstyle.smallText)}>
              +123456789
            </span>
          </p>
        </div>

        <p className={classNames(Pstyle.semibold, Pstyle.mediumText)}>
          Address:{" "}
          <span
            className={classNames(Pstyle.regular, Pstyle.smallText)}
            style={{ marginRight: 34 }}
          >
            123 Main St, Cityville
          </span>
        </p>

        <p className={Pstyle.smallText}>Weight (Kg): 70, BP: 120/80 mmHg</p>

        <div
          className={classNames(
            Pstyle.row,
            Pstyle.borderTop,
            Pstyle.borderBottom
          )}
          style={{ marginTop: 16 }}
        >
          <p
            className={classNames(Pstyle.bold, Pstyle.primaryColor)}
            style={{ fontSize: 22 }}
          >
            Symptoms
          </p>
          <p
            className={classNames(Pstyle.bold, Pstyle.primaryColor)}
            style={{ width: "45%", fontSize: 22, whiteSpace: "nowrap" }}
          >
            Clinical Findings
          </p>
        </div>

        <div className={Pstyle.row}>
          <p className={classNames(Pstyle.smallText)} style={{ width: "45%" }}>
            Headache, Fever
          </p>
          <p
            className={classNames(Pstyle.smallText, Pstyle.textLeft)}
            style={{ width: "45%" }}
          >
            High temperature, Body ache
          </p>
        </div>

        <div
          className={classNames(Pstyle.borderBottom, Pstyle.borderTop)}
          style={{ padding: "16px 0" }}
        >
          <p
            className={classNames(Pstyle.semibold, Pstyle.primaryColor)}
            style={{ fontSize: 22 }}
          >
            Laboratory Test
          </p>
          <p className={Pstyle.smallText}>* Blood Test</p>
          <p className={Pstyle.smallText}>* X-ray</p>
        </div>

        <div
          className={classNames(Pstyle.row, Pstyle.borderBottom)}
          style={{ alignItems: "center" }}
        >
          <p
            className={classNames(Pstyle.bold, Pstyle.primaryColor)}
            style={{ width: "34%", fontSize: 22 }}
          >
            Medicine Name
          </p>
          <p
            className={classNames(Pstyle.bold, Pstyle.primaryColor)}
            style={{
              width: "33%",
              textAlign: "center",
              padding: "0 10px",
              fontSize: 22,
            }}
          >
            Dosage
          </p>
          <p
            className={classNames(Pstyle.bold, Pstyle.primaryColor)}
            style={{
              width: "33%",
              textAlign: "center",
              padding: "0 10px",
              fontSize: 22,
            }}
          >
            Duration
          </p>
        </div>

        <div
          className={classNames(Pstyle.row, Pstyle.borderBottom)}
          style={{ alignItems: "center", marginTop: 10 }}
        >
          <p className={classNames(Pstyle.smallText)} style={{ width: "34%" }}>
            1) Paracetamol
          </p>
          <p
            className={classNames(Pstyle.smallText)}
            style={{ width: "33%", textAlign: "center", padding: "0 10px" }}
          >
            500mg
          </p>
          <p
            className={classNames(Pstyle.smallText)}
            style={{ width: "33%", textAlign: "center", padding: "0 10px" }}
          >
            5 days
          </p>
        </div>

        <div
          className={classNames(Pstyle.row, Pstyle.borderBottom)}
          style={{ alignItems: "center", marginTop: 10 }}
        >
          <p className={classNames(Pstyle.smallText)} style={{ width: "34%" }}>
            2) Ibuprofen
          </p>
          <p
            className={classNames(Pstyle.smallText)}
            style={{ width: "33%", textAlign: "center", padding: "0 10px" }}
          >
            200mg
          </p>
          <p
            className={classNames(Pstyle.smallText)}
            style={{ width: "33%", textAlign: "center", padding: "0 10px" }}
          >
            7 days
          </p>
        </div>

        <p className={Pstyle.footerText}>
          For any guidance please contact helpline 111 111 MTG
        </p>
      </div>
    </div>
  );
};

export default prescription;
