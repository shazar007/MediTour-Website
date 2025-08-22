import React, { useState } from "react";
import sidebar from "./adminsidebar.module.css";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { FaUserXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "assets/images/m-logo.png";
interface Props {
  menuItem: any;
}

const AdminSidebar = (props: Partial<Props>) => {
  const { menuItem } = props;
  const { systemType } = useSelector((state: any) => state.root.common);
  let initial =
    systemType == "doctor"
      ? "doctor/dashboard"
      : systemType == "pharmacy"
      ? "pharmacy/dashboard"
      : systemType == "lab"
      ? "laboratory/dashboard"
      : systemType == "hospital"
      ? "hospital/dashboard"
      : systemType == "admin"
      ? "admin/dashboard"
      : "";
  const [activeMenuItem, setActiveMenuItem] = useState(initial);

  const handleMenuItemClick = (path: string) => {
    setActiveMenuItem(path);
  };

  return (
    <div className={sidebar.container}>
      <div className={sidebar.centerlogo}>
        <img src={logo} alt="logo" className={sidebar.logo} />
        <p>MediTour</p>
      </div>
      <div className={classNames(sidebar.sidebar)}>
        {menuItem.map((item: any, index: any) => (
          <div style={{ display: "flex", marginTop: "16px" }}>
            <div
              className={classNames({
                [sidebar.boccc]: activeMenuItem === item.path,
                [sidebar.block]: activeMenuItem !== item.path,
              })}
              onClick={() => handleMenuItemClick(item.path)}
            ></div>
            <NavLink
              to={item.path}
              key={index}
              className={classNames(sidebar.link, {
                [sidebar.active]: activeMenuItem === item.path,
              })}
              onClick={() => handleMenuItemClick(item.path)}
            >
              <div className={classNames(sidebar.icon)}>{item.icon}</div>
              <div className={sidebar.sidebarNames}>
                <div
                  className={classNames(commonStyles.fs16, commonStyles.medium)}
                >
                  {item.name}
                </div>
              </div>
            </NavLink>
          </div>
        ))}
        <div
          style={{
            marginTop: "100px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default AdminSidebar;
