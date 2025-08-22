import React, { useEffect, useState, useRef } from "react";
import searchBar from "./search.module.css";
import commomstyle from "../../utils/common.module.css";
import classNames from "classnames";
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import Menu from "../Menu";
import ActivationCard from "../ActivationCard";
import commonstyles from "shared/utils/common.module.css";
import { notify } from "shared/services";
import medilogo from "assets/images/logoMeditour.png";
function SearchBar(props: any) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationdata, setNotification] = useState<any>([]);
  const handleToggleNotification = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };
  const { user } = useSelector((state: any) => state.root.common);
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
      <div>
        <div className={classNames(searchBar.col12, searchBar.flxend)}>
          <div className={searchBar.yellow}>
            <IoNotifications
              className={classNames(searchBar.mesg)}
              onClick={handleToggleNotification}
            />
          </div>
          <div className={classNames(searchBar.flx, searchBar.mr87)}>
            <Menu />
          </div>
          {isNotificationOpen && (
            <div className={searchBar.notificationTab} ref={notificationRef}>
              {notificationdata.length > 0 ? (
                notificationdata.map((n: any) => (
                  <div className={searchBar.notificationcard} key={n.id}>
                    <div
                      className={classNames(commomstyle.col2, searchBar.Avatar)}
                    >
                      {/* <img src={medilogo} className={searchBar.Round} /> */}
                    </div>
                    <div
                      className={classNames(commomstyle.col8, searchBar.mr16)}
                    >
                      {/* <p
                        className={classNames(
                          commomstyle.fs16,
                          commomstyle.semiBold
                        )}
                      >
                        {n?.message}
                      </p> */}
                    </div>
                    <div className={commomstyle.col2}>
                      <GoDotFill className={searchBar.dot} />
                      <p>
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
                ))
              ) : (
                <div className={searchBar.emptynotyification}>
                  <p
                    className={classNames(
                      commomstyle.fs16,
                      commomstyle.semiBold,
                      commomstyle.colorBlue
                    )}
                    style={{ margin: "auto " }}
                  >
                    No Notifications
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {user?.paidActivation === true ? null : (
        <div className={commonstyles.mr87}>
          <ActivationCard />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
