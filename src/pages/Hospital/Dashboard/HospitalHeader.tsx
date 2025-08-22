import React, { useState, useEffect } from "react";
import classNames from "classnames";
import bell from "assets/images/bell.png";
import commonstyles from "shared/utils/common.module.css";

import style from "./hospitalDashboard.module.css";
import SearchbarNew from "shared/components/A_New_Components/Searchbar_New";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const HospitalHeader: React.FC<{
  title?: string;
  hospital?: string;
  branch?: string;
  notification?: boolean;
  profile?: any;
  setMobileMenuClick?: (value: boolean) => void;
  placeholder?: string;
  mobileMenuClick?: boolean;
  onSearch?: (value: string) => void;
  filter?: boolean;
  searchBar?: boolean;
}> = ({
  title,
  hospital,
  branch,
  notification,
  profile,
  setMobileMenuClick,
  placeholder = "Search for products...",
  onSearch,
  mobileMenuClick,
  filter = false,
  searchBar = false,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const { systemType } = useSelector((state: any) => state.root.common);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleProfileClick = () => {
    if (setMobileMenuClick) setMobileMenuClick(!mobileMenuClick);
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className={classNames(style.header)}>
      <div>
        {title && <p className={classNames(style.title)}>{title}</p>}
        <div className={classNames(commonstyles.flx)}>
          {hospital && (
            <p className={classNames(style.hosptalname)}>{hospital}</p>
          )}
          {branch && <p className={classNames(style.title)}>({branch})</p>}
        </div>
      </div>

      {systemType === "company" ? null : (
        <div className={classNames(style.headerright)}>
          {searchBar && (
            <div>
              <SearchbarNew
                placeholder={placeholder}
                onSearch={onSearch}
                filter={filter}
              />
            </div>
          )}

          {notification && (
            <div className={classNames(style.notification)}>
              <img
                src={bell}
                alt="Notification icon"
                className={classNames(style.bell)}
              />
            </div>
          )}

          <div onClick={handleProfileClick}>
            {profile ? (
              <img
                src={profile}
                alt="Profile"
                className={classNames(style.Avatar)}
              />
            ) : (
              <Avatar className={classNames(style.Avatar)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalHeader;
