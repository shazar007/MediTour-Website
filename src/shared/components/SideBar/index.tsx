import React, { useEffect, useRef, useState } from "react";
import sidebar from "./sidebar.module.css";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { FaUserXmark } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "assets/images/m-logo.png";
import { FiMenu } from "react-icons/fi";
interface Props {
  menuItem: any;
}

const Sidebar = (props: Partial<Props>) => {
  const { menuItem } = props;
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { systemType } = useSelector((state: any) => state.root.common);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  let currentPath = location.pathname;

  let updatedPath = currentPath.startsWith("/")
    ? currentPath.slice(1)
    : currentPath;

  const [activeMenuItem, setActiveMenuItem] = useState(updatedPath);

  const handleMenuItemClick = (path: string) => {
    setActiveMenuItem(path);
  };
  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={sidebar.container}>
      <div className={classNames(sidebar.sidebar)} ref={sidebarRef}>
        <div className={sidebar.centerlogo}>
          <img src={logo} alt="sidebarLogo" className={sidebar.logo} />
          <FiMenu className={sidebar.menu} onClick={toggleSidebarVisibility} />
        </div>
        <div className={sidebar.conatiner}>
          {menuItem.map((item: any, index: any) => {
            return (
              <NavLink
                to={item.path}
                key={index}
                className={classNames(sidebar.link, {
                  [sidebar.active]: updatedPath === item.path,
                })}
                onClick={() => handleMenuItemClick(item.path)}
              >
                <div className={classNames(sidebar.icon)}>{item.icon}</div>
                <div className={sidebar.sidebarNames}>
                  <div
                    className={classNames(sidebar.fs10, commonStyles.semiBold)}
                  >
                    {item.name}
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
        {isSidebarVisible && (
          <div
            style={{
              position: "absolute",
              zIndex: "1",
              backgroundColor: "white",
              padding: "16px 0 0spx 0",
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            {menuItem.map((item: any, index: any) => (
              <NavLink
                to={item.path}
                key={index}
                className={classNames(sidebar.link2, {
                  [sidebar.active2]: updatedPath === item.path,
                })}
                onClick={() => handleMenuItemClick(item.path)}
              >
                <div className={classNames(sidebar.icons2)}>{item.icon}</div>
                <div className={sidebar.sidebarNames}>
                  <div
                    className={classNames(
                      commonStyles.fs10,
                      commonStyles.semiBold
                    )}
                  >
                    {item.name}
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
