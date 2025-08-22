import React, { useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./percentage.module.css";
import { PrimaryButton } from "shared/components";
import { Style } from "@mui/icons-material";
export default function Percentage() {
  const fields = [
    "Doctor",
    "Hospital",
    "Ambulance",
    "Hotels",
    "Travel Agency",
    "Rent a Car",
    "Insurance",
    "Donation",
  ];
  const midIndex = Math.ceil(fields.length / 2);
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Percentage" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flx)}>
          <div className={Styles.leftColumn}>
            {fields.slice(0, midIndex).map((field, index) => (
              <div
                key={index}
                className={classNames(
                  commonStyles.flx,
                  commonStyles.flxBetween,
                  index > 0 ? Styles.mt18 : ""
                )}
              >
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.medium,
                    Styles.textcolor,
                    Styles.textwidth
                  )}
                >
                  {field}:
                </p>
                <div className={Styles.inputFlx}>
                  <input
                    className={Styles.Inputs}
                    defaultValue="0"
                    type="number"
                  />
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.medium,
                      Styles.textcolor
                    )}
                  >
                    %
                  </p>
                </div>
                <div className={Styles.BtnWidth}>
                  <PrimaryButton children={"Save"} colorType={"blue"} />
                </div>
              </div>
            ))}
          </div>

          <div className={Styles.rightColumn}>
            {fields.slice(midIndex).map((field, index) => (
              <div
                key={index}
                className={classNames(
                  commonStyles.flx,
                  commonStyles.flxBetween,
                  index > 0 ? Styles.mt18 : ""
                )}
              >
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.medium,
                    Styles.textcolor,
                    Styles.textwidth
                  )}
                >
                  {field}:
                </p>
                <div className={Styles.inputFlx}>
                  <input
                    className={Styles.Inputs}
                    defaultValue="0"
                    type="number"
                  />
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.medium,
                      Styles.textcolor
                    )}
                  >
                    %
                  </p>
                </div>
                <div className={Styles.BtnWidth}>
                  <PrimaryButton children={"Save"} colorType={"blue"} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
