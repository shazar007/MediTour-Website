import React, { useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import logo from "assets/images/HospitalDashboard/sidebarlogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_User, setIsLoggedIn, setObj, setToken } from "shared/redux";
import { genericLogout } from "shared/services";
import { TbLogout } from "react-icons/tb";
import { GetColorCode } from "shared/utils";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";

const SideBar_New = ({
  data,
  setActive,
  activeTab,
}: {
  data?: any;
  setActive?: any;
  activeTab?: any;
}) => {
  const dispatch = useDispatch();
  const { t, i18n }: any = useTranslation();
  const { logoutGeneric } = GetColorCode();
  const { systemType } = useSelector((state: any) => state.root.common);
  const [activeMenuItem, setActiveMenuItem] = useState(
    `${systemType}/dashboard`
  );

  const navigate = useNavigate();
  const handleDataDispatch = (returnUrl: any) => {
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(set_User({}));
    dispatch(setObj(null));
    navigate(returnUrl);
  };
  const location = useLocation();

  const currentPath = location.pathname;
  React.useEffect(() => {
    setActiveMenuItem(location.pathname);
  }, [location.pathname]);

  console.log("🚀 ~ systemType  ~ systemType :", systemType);
  const handleLogoutComapy = () => {
    genericLogout(logoutGeneric)
      .then((res: any) => {
        handleDataDispatch(`${systemType}/login`);
      })
      .catch((err: any) => {
        console.log(err?.response?.data, "...error");
      })
      .finally(() => {});
  };
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    if (systemType === "greentourism") {
      setActive(path);
    }
  };

  const active = systemType === "greentourism" ? activeTab : location.pathname;

  return (
    <div className={style.endApp}>
      <div>
        <div>
          <img src={logo} alt="logo" className={style?.imageContainer} />
          <div>
            {data?.map((i: any) => {
              const isActive =
                i.matchPaths?.some((p: string) => currentPath.startsWith(p)) ||
                currentPath.startsWith(i.path);

              return (
                <div
                  key={i.id}
                  className={classNames(
                    style.tab,
                    isActive ? style.activeTab : style.inactiveTab
                  )}
                  onClick={() => handleMenuItemClick(i.path)}
                >
                  <img
                    src={i.img}
                    className={classNames(
                      style.srcStyle,
                      isActive ? style.activeImg : style.inactiveImg
                    )}
                    alt="inactiveImg"
                  />
                  <div
                    className={classNames(
                      style.text,
                      isActive ? style.activeText : style.inactiveText
                    )}
                  >
                    {t(i.label)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? style.logoutContainer2
            : style.logoutContainer
        }
        onClick={handleLogoutComapy}
      >
        <>
          {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
            <BiLogOut
              size={16}
              className={style.logouticon}
              style={{ color: "#b01212" }}
            />
          ) : (
            <TbLogout
              size={16}
              className={style.logouticon}
              style={{ color: "#b01212" }}
            />
          )}
        </>
        <span className={style.logoutText}>{t("logout")}</span>
      </div>
    </div>
  );
};

export default SideBar_New;
