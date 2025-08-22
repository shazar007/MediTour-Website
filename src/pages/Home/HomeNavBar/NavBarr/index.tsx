import { useEffect, useRef, useState } from "react";
import styles from "./navBarr.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Logo from "assets/images/whitelogonew.png";
import { Avatar } from "@mui/material";
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setSystemType, set_User } from "shared/redux";
import { logoutAll } from "shared/services/UserService";
import { MenuData, onOpenMenuData, TopMenuList } from "shared/utils";
import CustomLoader from "shared/components/New_Loader/Loader";
import { Notifications } from "shared/components";
import LanguageSelector from "shared/utils/LanguageSelector";
import { useTranslation } from "react-i18next";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useDirection } from "shared/utils/DirectionContext";

const NavBarr = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultPath =
    TopMenuList.find((item) => item.active === location.pathname)?.active ||
    "/";
  const [selectedPath, setSelectedPath] = useState(defaultPath);

  const dropdownRef = useRef<any>(null);
  const { cart, isLoggedIn, user } = useSelector(
    (state: any) => state.root.common
  );
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAll();
      dispatch(set_User(null));
      dispatch(setIsLoggedIn(false));
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (item: any) => {
    if (item.title === "logout") {
      handleLogout();
    } else {
      navigate(item.screen);
    }
  };

  const onClickLogin = () => {
    dispatch(setSystemType("user"));
    navigate("/user/login");
  };
  const handleonHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className={styles.navouter}>
        <div className={styles.navContainer}>
          <div
            style={{ cursor: "pointer" }}
            className={styles.logoContainer}
            onClick={handleonHome}
          >
            <img src={Logo} className={styles.logo} alt="Logo" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              position: "relative",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <ul className={classNames(commonstyles.flx, styles.NavBar)}>
              {TopMenuList.map((item) => (
                <li
                  key={item.active}
                  onClick={() => {
                    setSelectedPath(item.active);
                    navigate(item.active);
                  }}
                  className={classNames(commonstyles.semiBold, {
                    [styles.activeLink]: selectedPath === item.active,
                  })}
                >
                  {t(item.title)}
                </li>
              ))}
            </ul>

            {isLoggedIn ? (
              <div
                style={
                  isRtl
                    ? {
                        gap: "15px",
                        display: "flex",
                        justifyContent: "center",
                      }
                    : { gap: "15px", display: "flex", justifyContent: "center" }
                }
              >
                <div
                  className={styles.cartContainer}
                  style={{ cursor: "pointer", border: "none" }}
                >
                  <LanguageSelector />
                </div>

                <div
                  onClick={() => navigate("/services/pharmacy/PharmacyCart")}
                  className={styles.cartContainer}
                >
                  <PiShoppingCartSimpleFill
                    size={25}
                    style={{
                      marginTop: "7px",
                      display: "flex",
                      alignItems: "center",
                      alignSelf: "center",
                      cursor: "pointer",
                    }}
                    color="#7D7D7D"
                  />
                  {cart?.length > 0 && (
                    <span className={styles.cart}>{cart.length}</span>
                  )}
                </div>

                <div
                  className={styles.cartContainer}
                  style={{ position: "relative" }}
                >
                  <Notifications />
                </div>
                <div
                  className={styles.profile}
                  ref={dropdownRef}
                  onClick={toggleDropdown}
                >
                  <p
                    className={styles.user_name}
                    style={{
                      ...(i18n.language === "ur" && { marginBottom: "6px" }),
                      ...(isRtl && {
                        display: "flex",
                        flexDirection: "row-reverse",
                      }),
                    }}
                  >
                    {user?.name}
                  </p>
                  <Avatar
                    style={{ height: 30, width: 30 }}
                    src={user?.userImage}
                  />
                  {isDropdownOpen && (
                    <ul
                      className={classNames(
                        styles.dropdownMenu,
                        isRtl ? styles.dropdownLeft : styles.dropdownRight
                      )}
                    >
                      <div className={styles.dropdownlogoContainer}>
                        <img src={Logo} className={styles.logo} alt="Logo" />
                      </div>

                      {MenuData.map((item) => (
                        <MenuItem
                          key={t(item.title)}
                          icon={item.icon}
                          text={t(item.title)}
                          onClick={() => handleClick(item)}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className={commonstyles.flx} style={{ gap: "15px" }}>
                {location.pathname === "/" ||
                location.pathname === "/aboutUs" ||
                location.pathname === "/ourServices" ||
                location.pathname === "/treatment" ||
                location.pathname === "/patientGuide" ||
                location.pathname === "/contactUs" ? (
                  <LanguageSelector />
                ) : null}

                <p
                  onClick={() => navigate("/joinVender")}
                  className={classNames(styles.join, {
                    [styles.joinactive]: location.pathname === "/joinVender",
                  })}
                >
                  {t("joinAsProvider")}
                </p>

                <div className={styles.login_button} onClick={onClickLogin}>
                  <p>{t("login")}</p>
                </div>
              </div>
            )}

            <FaBars className={styles.barbtn} onClick={toggleMenu} />
          </div>
          {isMenuOpen && (
            <div className={styles.mobileMenu}>
              <div className={styles.menuHeader}>
                <div className={styles.logoContainer}>
                  <img
                    src={Logo}
                    className={styles.Headerlogo}
                    alt="Logo"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <IoClose
                  className={styles.Headerclose}
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
              <div
                className={styles.menuContent}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {onOpenMenuData(t).map((item) => (
                  <Link
                    key={item.title}
                    to={item.title === t("logout") ? "#" : item.to}
                    className={styles.menulist}
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (item.title === t("logout")) {
                        handleLogout();
                      } else {
                        navigate(item.to);
                      }
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {loading && <CustomLoader />}
    </>
  );
};

export default NavBarr;

const MenuItem = ({ icon: Icon, text, onClick }: any) => (
  <li onClick={onClick} className={styles.menuItem}>
    <Icon className={styles.menuIcon} />
    <p>{text}</p>
  </li>
);
