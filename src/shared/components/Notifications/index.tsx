import React, { useEffect, useState, useRef } from "react";
import searchBar from "./search.module.css";
import commomstyle from "../../utils/common.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { notify } from "shared/services";
import medilogo from "assets/images/logoMeditour.png";
import { IoMdNotifications } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { BiSolidBell } from "react-icons/bi";
import { useDirection } from "shared/utils/DirectionContext";
function Notifications() {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationdata, setNotification] = useState<any>([]);
  const handleToggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const { user, systemType } = useSelector((state: any) => state.root.common);
  const notificationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    getNotifications();
  }, [isNotificationOpen]);
  const getNotifications = () => {
    notify(user?._id)
      .then((res: any) => {
        setNotification(res?.data?.notifications);
      })
      .catch((error: any) => {
        console.log(error, "..err");
      })
      .finally(() => {});
  };

  return (
    <div className={searchBar.sticky}>
      <div onClick={handleToggleNotification}>
        <div className={classNames(searchBar.col12, searchBar.flxend)}>
          {systemType == "user" ? (
            <>
              <BiSolidBell
                size={24}
                style={{
                  cursor: "pointer",
                  position: "relative",
                }}
                color="#7D7D7D"
              />
              {notificationdata.length > 0 && (
                <GoDotFill className={searchBar.notificationDotUser} />
              )}
            </>
          ) : (
            <div
              className={searchBar.notification}
              onClick={handleToggleNotification}
            >
              <IoMdNotifications size={20} color="#fff" />
              {notificationdata.length > 0 && (
                <GoDotFill className={searchBar.notificationDot} />
              )}
            </div>
          )}

          {isNotificationOpen && (
            <div
              className={
                isRtl ? searchBar.RtlnotificationTab : searchBar.notificationTab
              }
              ref={notificationRef}
            >
              <div className={searchBar.notificationBar}>
                <p className={searchBar.notificationtext}>
                  {t("notification")}
                </p>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                ></div>
                {notificationdata.length > 0 ? (
                  notificationdata.map((n: any) => (
                    <div className={searchBar.notificationcard} key={n.id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0px 16px",
                        }}
                      >
                        <div
                          className={classNames(
                            commomstyle.col1,
                            searchBar.Avatar
                          )}
                        >
                          <img
                            src={medilogo}
                            alt="medilogo"
                            className={searchBar.Round}
                          />
                        </div>
                        <div
                          className={classNames(
                            commomstyle.col9,
                            searchBar.mr16
                          )}
                        >
                          <p className={classNames(searchBar.message)}>
                            {n?.message}
                          </p>
                          <p
                            className={searchBar.notificationtime}
                            style={
                              isRtl
                                ? {
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                  }
                                : {}
                            }
                          >
                            {n?.updatedAt
                              ? new Date(n.updatedAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div
                        className={commomstyle.col2}
                        style={{
                          marginTop: "1.9%",
                        }}
                      >
                        <GoDotFill className={searchBar.dot} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={searchBar.emptynotyification}>
                    <p
                      className={classNames(searchBar.emptymessage)}
                      style={{ margin: "auto " }}
                    >
                      {t("noNotifications")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
