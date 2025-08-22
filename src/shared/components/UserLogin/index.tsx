import React from "react";
import classNames from "classnames";
import PasswordInput from "../PasswordInput";
import PrimaryButton from "../PrimaryButton";
import Checkbox from "@mui/material/Checkbox";
import styles from "./userlogin.module.css";
import commonStyles from "../../utils/common.module.css";
import CustomInput from "../Input";

interface UserLoginmodalProps {
  isVisible: boolean;
  onClose: () => void;
}

const UserLoginmodal: React.FC<UserLoginmodalProps> = ({
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.UserLoginmodal}>
      <div className={classNames(styles.conatiner)}>
        <div className={styles.mainconatiner}>
          <div className={classNames(styles.marginTop100)}>
            <p
              className={classNames(
                commonStyles.fs24,
                commonStyles.semiBold,
                commonStyles.colorBlue
              )}
            >
              Login
            </p>
          </div>
          <p className={classNames(commonStyles.fs16, commonStyles.colorBlue)}>
            Login to access at MediTour
          </p>
          <form>
            <CustomInput
              placeholder="Enter Your Email"
              id="email"
              name="email"
              type="text"
            />

            <PasswordInput
              placeholder="Enter Your Password"
              id="password"
              name="password"
            />

            <div></div>
            <div className={classNames(commonStyles.mb40, styles.check)}>
              <div
                className={classNames(commonStyles.colorBlue)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Checkbox />
                <p>Remember me</p>
              </div>
              <a
                className={classNames(
                  commonStyles.colorOrange,
                  commonStyles.fs14,
                  commonStyles.flxEnd,
                  styles.cursor
                )}
              >
                Forgot Password
              </a>
            </div>
            <div className={classNames(commonStyles.mb16)}>
              <PrimaryButton children={"Login"} colorType={"blue"} />
            </div>
            <div className={commonStyles.register}>
              <span>
                New to this platform?
                <span style={{ color: "#007bff" }}>
                  <a
                    href="#"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Register
                  </a>
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginmodal;
