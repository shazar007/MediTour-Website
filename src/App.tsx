import React, { useEffect, useMemo, useState, useCallback } from "react";
import "./App.css";
import AppRoutes from "routes";
import logo from "assets/images/smallLogo.png";
import {
  setFcmToken,
  setHomeServiceSelectedRoute,
  setIsLoggedIn,
  setMedicalSelectedRoute,
  setTravelSelectedRoute,
  set_User,
  setmainSelectedRoute,
  store,
} from "shared/redux";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomModal,
  ToastNotification,
  FacebookPixel,
} from "shared/components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NoInternetBar from "shared/components/A_New_Components/NoInternetBar";
import "shared/utils/i18n";
import { I18nextProvider, useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DirectionContext } from "shared/utils/DirectionContext";
import { interceptorConfig } from "shared/utils";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
const clientId =
  "975483364699-puqq3mhr3s9qopv6dov64837lkba0tbh.apps.googleusercontent.com";
const APP_VERSION = "1.0.3";

const fontFamilies: Record<string, string> = {
  en: "Poppins, sans-serif",
  ar: "Amiri, serif",
  ur: "Noto Nastaliq Urdu, serif",
  ps: "Noto Sans Pashto, sans-serif",
  pr: "Noto Sans Arabic, sans-serif",
};

function App() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [logOutFlag, setLogOutFlag] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n }: any = useTranslation();
  const currentLang = i18n.language;

  const isRtl = useMemo(
    () => ["ar", "ur", "ps", "pr"].includes(currentLang),
    [currentLang]
  );

  const { fcmToken } = useSelector((state: any) => state.root.common);

  // Direction + Font updates
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    document.documentElement.style.setProperty(
      "font-family",
      fontFamilies[currentLang] || "Poppins, sans-serif",
      "important"
    );
  }, [currentLang, isRtl]);

  // App version check
  useEffect(() => {
    const checkAppVersion = async () => {
      const storedVersion = localStorage.getItem("APP_VERSION");
      if (storedVersion !== APP_VERSION) {
        // setShowUpdateModal(true);
        handleUpdate();
      }
    };
    checkAppVersion();
  }, []);

  const handleUpdate = () => {
    dispatch(set_User(null));
    dispatch(setIsLoggedIn(false));
    localStorage.clear();
    localStorage.setItem("APP_VERSION", APP_VERSION);
    window.location.replace("/");
  };

  // Push Notification permission + token
  useEffect(() => {
    const requestPermissionAndToken = async () => {
      if (fcmToken) return;

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const token = await getToken(messaging, {
            vapidKey:
              "BIF9ZdobPcwXfIIPSOgr_GCvI60_kchw3CHog3uXNj-RYDlNJFUnEVgW_iip-A6QxyysS8192cJFNT8IpnWoons",
          });
          if (token) {
            store.dispatch(setFcmToken(token));
          }
        } catch (error) {
          console.error("FCM Token Error:", error);
        }
      } else if (permission === "denied") {
        setShowNotificationModal(true);
      }
    };

    requestPermissionAndToken();
  }, [fcmToken]);

  // Handle notifications
  const notify = useCallback(() => {
    if (!notification?.title) return;

    toast(
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          alt="Notification Logo"
          src={logo}
          style={{ height: "32px", width: "32px", marginRight: "16px" }}
        />
        <div>
          <p style={{ fontWeight: "700" }}>{notification.title}</p>
          <p>{notification.body}</p>
        </div>
      </div>
    );
  }, [notification]);

  useEffect(() => {
    notify();
  }, [notification, notify]);

  // Listen for foreground messages
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload: any) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    });

    return () => {
      // unsubscribe does nothing in current Firebase versions, but kept for future support
    };
  }, []);

  // Axios interceptor & offline
  useEffect(() => {
    interceptorConfig(setLogOutFlag, setIsOffline);
  }, []);

  // Handle tab closing
  useEffect(() => {
    const handleTabClosing = () => {
      store.dispatch(setmainSelectedRoute("/"));
      store.dispatch(setMedicalSelectedRoute("doctor/login"));
      store.dispatch(setHomeServiceSelectedRoute("ambulance/login"));
      store.dispatch(setTravelSelectedRoute("hotel/login"));
    };

    window.addEventListener("unload", handleTabClosing);
    return () => window.removeEventListener("unload", handleTabClosing);
  }, []);

  // Allow notifications manually
  const handleAllowNotifications = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BIF9ZdobPcwXfIIPSOgr_GCvI60_kchw3CHog3uXNj-RYDlNJFUnEVgW_iip-A6QxyysS8192cJFNT8IpnWoons",
        });
        if (token) {
          store.dispatch(setFcmToken(token));
          setShowNotificationModal(false);
        }
      } catch (error) {
        console.error("Manual FCM Token Error:", error);
      }
    } else {
      setShowNotificationModal(false);
      notifyError(
        "Please allow notifications manually from your browser settings."
      );
    }
  };

  const queryClient = new QueryClient();

  return (
    <DirectionContext.Provider value={{ isRtl, currentLang }}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <GoogleOAuthProvider clientId={clientId}>
            <FacebookPixel />
            <AppRoutes logOutFlag={logOutFlag} setLogOutFlag={setLogOutFlag} />
            <Toaster />
            <ToastNotification />

            {showNotificationModal && (
              <div className="modal-box">
                <div className="notification-modal">
                  <h3 className="text1">{t("Enable Notifications")}</h3>
                  <p className="text2">{t("Ifyoudliketoreceive__")}</p>
                  <div className="parent-container">
                    <button
                      className="allow-button"
                      onClick={handleAllowNotifications}
                    >
                      {t("allow")}
                    </button>
                    <div
                      className="closebtn"
                      onClick={() => setShowNotificationModal(false)}
                    >
                      {t("close")}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <CustomModal showModal={showUpdateModal}>
              <div className="update-modal">
                <p className="textU_pdate">{t("updateAvailable")}</p>
                <p>{t("newVersionAvailableDesc_")}</p>
                <div className="rowButton">
                  <button
                    className="cancel-button"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    {t("cancel")}
                  </button>
                  <button className="update-button" onClick={handleUpdate}>
                    {t("update")}
                  </button>
                </div>
              </div>
            </CustomModal>

            {/* Offline Bar */}
            {isOffline && <NoInternetBar setIsOffline={setIsOffline} />}
          </GoogleOAuthProvider>
          {showNotificationModal && (
            <div className="modal-box">
              <div className="notification-modal">
                <h3 className="text1">Enable Notifications</h3>
                <p className="text2">
                  If you'd like to receive notifications related to our
                  services, please allow notifications and then log in.
                </p>
                <div className="parent-container">
                  <button
                    className="allow-button"
                    onClick={handleAllowNotifications}
                  >
                    Allow
                  </button>
                  <div
                    className="closebtn"
                    onClick={() => setShowNotificationModal(false)}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          )}
          {isOffline && <NoInternetBar setIsOffline={setIsOffline} />}
        </I18nextProvider>
      </QueryClientProvider>
    </DirectionContext.Provider>
  );
}

export default App;
