import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./adminNav.module.css";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { Avatar } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { BiFilterAlt } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { adminLogout } from "shared/services";
import { setIsLoggedIn, setRenderFlag, setToken, setUser } from "shared/redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  labelText?: string;
}

const AdminNavBar = (props: Partial<Props>) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };
  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };
  const closeNotification = () => {
    setIsNotificationOpen(false);
  };
  const handleLogout = () => {
    setIsProfileOpen(false);
    adminLogout()
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          dispatch(setToken(null));
          dispatch(setUser(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setRenderFlag(true));

          navigate("/admin/login");
        }
      })
      .catch((err: any) => {})
      .finally();
  };

  const { labelText } = props;
  return (
    <div className={classNames(styles.sticky)}>
      <div className={classNames(styles.flxBetween)}>
        <p
          className={classNames(
            commonStyles.fs24,
            styles.primarycolor,
            commonStyles.semiBold
          )}
        >
          {labelText}
        </p>
        <div className={classNames(commonStyles.flx)}>
          <div>
            {/* <div
              className={styles.notificationContainer}
              onClick={toggleNotification}
            >
              <IoNotificationsOutline className={styles.notificationicon} />
            </div> */}
            {isNotificationOpen && (
              <div className={styles.notificationTab}>
                <div className={styles.notificationcard}>
                  <div className={classNames(commonStyles.col2, styles.Avatar)}>
                    <Avatar />
                  </div>
                  <div className={classNames(commonStyles.col8, styles.mr16)}>
                    <p
                      className={classNames(
                        commonStyles.fs16,
                        commonStyles.semiBold
                      )}
                    >
                      Bilal Hassan
                    </p>
                    <p className={classNames(commonStyles.fs14, styles.mt8)}>
                      Payment orders
                    </p>
                  </div>
                  <div className={commonStyles.col2}>
                    <GoDotFill className={styles.dot} />
                    <p
                      className={classNames(commonStyles.fs12)}
                      style={{ textAlign: "end" }}
                    >
                      {" "}
                      5 min
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Avatar
            onClick={toggleProfile}
            sx={{
              height: "50px",
              width: "50px",
              marginRight: "40px",
              cursor: "pointer",
            }}
          />
          {isProfileOpen && (
            <div className={styles.ProfileTab}>
              <div className={styles.profileitem} onClick={closeProfile}>
                <LuUser2 className={styles.itemicon} />
                <p>Profile</p>
              </div>
              <div className={styles.profileitem} onClick={handleLogout}>
                <MdLogout className={styles.itemicon} />
                <p>Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminNavBar;
