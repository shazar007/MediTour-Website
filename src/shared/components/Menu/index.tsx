import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import commonstyle from "shared/utils/common.module.css";
import { Avatar } from "@mui/material";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { AiOutlineLogout } from "react-icons/ai";

import {
  labLogout,
  pharmaceutical_Logout,
  pharmacyLogout,
} from "shared/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoggedIn,
  setLab,
  setPharmacy,
  setToken,
  setDonation,
  setTravelAgency,
  setRentCar,
  setHotel,
  setAmbulance,
  setParamedic,
  setInsurance,
  setRenderFlag,
  setrenderpharmacyOrderFlag,
  setPharmacyRenderFlag,
  setrenderpharmacyMedicineFlag,
  setrenderLabOrderFlag,
  setrenderLabdashboardFlag,
  setAmbulanceDashboardrenderFlag,
  setAmbulanceRequestFlag,
  setAmbulanceOnrouteRenderFlag,
  setAmbulanceAmbulancerenderFlag,
  setPeramedicPatientHistoryFlag,
  setPeramedicAppointmentFlag,
  setPeramedicRequestsFlag,
  setPeramedicdashboardrenderFlag,
  setCriterionRenderFlag,
  set_User,
  setDoctorPatientHistory,
  setDoctorPatientLength,
  setFcmToken,
} from "shared/redux";
import { useNavigate } from "react-router-dom";
import { doctorLogout } from "shared/services/DoctorService";
import { hospitalLogout } from "shared/services/HospitalService";
import { donationLogout } from "shared/services/Donation";
import { travelAgencyLogout } from "shared/services/TravelAgency";
import { rentCarLogout } from "shared/services/RentaCar";
import { hotelLogout } from "shared/services/Hotel";
import { ambulanceLogout } from "shared/services/Ambulance";
import { paraLogout } from "shared/services/Paramedic";
import { insuranceLogout } from "shared/services/Insurance";
import classNames from "classnames";
import LinearProgressWithLabel from "../LinearProgressWithLabel";
import styles from "./menu.module.css";
import CustomLoader from "../New_Loader/Loader";
interface Props {}
export default function Menu(props: Partial<Props>) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleProfile = () => {
    navigate(`/${systemType}/doctorProfile`);
  };
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { systemType, user } = useSelector((state: any) => state.root.common);
  let logo =
    systemType === "laboratory"
      ? user?.logo
      : systemType === "pharmacy"
      ? user?.logo
      : systemType === "doctor"
      ? user?.doctorImage
      : systemType === "hospital"
      ? user?.logo
      : systemType === "donation"
      ? user?.logo
      : systemType === "travelagency"
      ? user?.logo
      : systemType === "rentacar"
      ? user?.logo
      : systemType === "hotel"
      ? user?.logo
      : systemType === "ambulance"
      ? user?.logo
      : systemType === "physiotherapist"
      ? user?.doctorImage
      : systemType === "nutritionist"
      ? user?.doctorImage
      : systemType === "paramedic"
      ? user?.logo
      : systemType === "psychologist"
      ? user?.doctorImage
      : systemType === "pharmaceutical"
      ? user?.logo
      : systemType === "insurance"
      ? user?.logo
      : "";

  let name =
    systemType === "laboratory"
      ? user?.name
      : systemType === "pharmacy"
      ? user?.name
      : systemType === "doctor"
      ? user?.name
      : systemType === "hospital"
      ? user?.name
      : systemType === "donation"
      ? user?.name
      : systemType === "travelagency"
      ? user?.name
      : systemType === "rentacar"
      ? user?.name
      : systemType === "hotel"
      ? user?.name
      : systemType === "ambulance"
      ? user?.name
      : systemType === "physiotherapist"
      ? user?.name
      : systemType === "nutritionist"
      ? user?.name
      : systemType === "paramedic"
      ? user?.name
      : systemType === "psychologist"
      ? user?.name
      : systemType === "insurance"
      ? user?.name
      : systemType === "pharmaceutical"
      ? user?.name
      : "Unknown";

  let qualifications = systemType === "doctor" ? user?.qualifications : "";

  let profilePercentage =
    systemType === "laboratory"
      ? user?.profilePercentage
      : systemType === "pharmacy"
      ? user?.profilePercentage
      : systemType === "doctor"
      ? user?.profilePercentage
      : systemType === "hospital"
      ? user?.profilePercentage
      : systemType === "donation"
      ? user?.profilePercentage
      : systemType === "travelagency"
      ? user?.profilePercentage
      : systemType === "rentcar"
      ? user?.profilePercentage
      : systemType === "hotel"
      ? user?.profilePercentage
      : systemType === "ambulance"
      ? user?.profilePercentage
      : systemType === "physiotherapist"
      ? user?.profilePercentage
      : systemType === "nutritionist"
      ? user?.profilePercentage
      : systemType === "paramedic"
      ? user?.profilePercentage
      : systemType === "psychologist"
      ? user?.profilePercentage
      : systemType === "insurance";

  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen((prevOpen: any) => !prevOpen);
  };

  const navigate = useNavigate();

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleDataDispatch = (returnUrl: any) => {
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(set_User({}));
    dispatch(setFcmToken(null));
    dispatch(setDoctorPatientHistory([]));
    dispatch(setDoctorPatientLength(0));
    navigate(returnUrl);
  };

  const handleLabLogout = () => {
    setLoading(true);
    labLogout()
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setLab({}));
          dispatch(setRenderFlag(true));
          dispatch(setrenderLabdashboardFlag(true));
          dispatch(setFcmToken(null));
          dispatch(setRenderFlag(true));
          dispatch(setrenderLabOrderFlag(true));
          navigate("/laboratory/login");
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePharmacyLogout = () => {
    setLoading(true);

    pharmacyLogout()
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          dispatch(setToken(null));
          // dispatch(setSystemType("lab"));
          dispatch(setIsLoggedIn(false));
          dispatch(setPharmacy({}));
          dispatch(setFcmToken(null));
          dispatch(setPharmacyRenderFlag(true));
          dispatch(setrenderpharmacyOrderFlag(true));
          dispatch(setrenderpharmacyMedicineFlag(true));
          navigate("/pharmacy/login");
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handlePharmaceuticalLogout = (returnUrl: any) => {
    setLoading(true);
    pharmaceutical_Logout()
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          handleDataDispatch(returnUrl);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDoctorLogout = (returnUrl: any) => {
    setLoading(true);
    doctorLogout()
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          handleDataDispatch(returnUrl);
        }
      })
      .catch((err: any) => {})
      .finally();
  };
  const handleHospitalLogout = () => {
    hospitalLogout()
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          handleDataDispatch(`/${systemType}/login`);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDonationLogout = () => {
    setLoading(true);
    donationLogout()
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setCriterionRenderFlag(true));
          dispatch(setDonation({}));
          dispatch(setFcmToken(null));

          navigate("/donation/login");
        }
      })
      .catch((err: any) => {
        if (err.response && err.response.status === 401) {
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setCriterionRenderFlag(true));
          dispatch(setDonation({}));
          dispatch(setFcmToken(null));
          navigate("/donation/login");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTravelAgencyLogout = async () => {
    setLoading(true);
    try {
      const res = await travelAgencyLogout();

      if (res.status === 200 && res.statusText === "OK") {
        dispatch(setToken(null));
        dispatch(setIsLoggedIn(false));
        dispatch(setTravelAgency({}));
        dispatch(setFcmToken(null));
        localStorage.clear();
        sessionStorage.clear();
        navigate("/travelagency/login");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        dispatch(setToken(null));
        dispatch(setIsLoggedIn(false));
        dispatch(setTravelAgency({}));
        dispatch(setFcmToken(null));
        navigate("/travelagency/login");
      } else {
        console.error("Error during logout:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRentCarLogout = () => {
    setLoading(true);
    rentCarLogout()
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setRentCar({}));
          dispatch(setFcmToken(null));
          navigate("/rentacar/login");
        }
      })
      .catch((err: any) => {
        if (err.response && err.response.status === 401) {
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setFcmToken(null));
          dispatch(setRentCar({}));

          navigate("/rentacar/login");
        } else {
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleHotelLogout = () => {
    setLoading(true);
    hotelLogout()
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setHotel({}));
          dispatch(setFcmToken(null));
          navigate("/hotel/login");
        }
      })
      .catch((err: any) => {
        if (err.response && err.response.status === 401) {
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setHotel({}));

          navigate("/hotel/login");
        } else {
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAmbulanceLogout = async () => {
    setLoading(true);
    try {
      const res = await ambulanceLogout();

      if (res.status === 200 && res.statusText === "OK") {
        dispatch(setToken(null));
        dispatch(setAmbulanceDashboardrenderFlag(true));
        dispatch(setAmbulanceOnrouteRenderFlag(true));
        dispatch(setAmbulanceRequestFlag(true));
        dispatch(setAmbulanceAmbulancerenderFlag(true));
        dispatch(setIsLoggedIn(false));
        dispatch(setAmbulance({}));
        dispatch(setFcmToken(null));

        localStorage.clear();
        sessionStorage.clear();

        navigate("/ambulance/login");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        dispatch(setToken(null));
        dispatch(setIsLoggedIn(false));
        navigate("/ambulance/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInsuranceLogout = () => {
    setLoading(true);
    insuranceLogout()
      .then((res: any) => {
        if (res.status == "200" && res.statusText == "OK") {
          dispatch(setToken(null));
          // dispatch(setSystemType("lab"));
          dispatch(setIsLoggedIn(false));
          dispatch(setInsurance({}));
          dispatch(setFcmToken(null));
          navigate("/insurance/login");
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const onLogoutClick = (event: Event | React.SyntheticEvent) => {
    if (systemType === "laboratory") {
      handleLabLogout();
    }
    if (systemType === "pharmacy") {
      handlePharmacyLogout();
    }

    if (systemType === "pharmaceutical") {
      handlePharmaceuticalLogout(`/${systemType}/login`);
    }

    if (
      systemType === "doctor" ||
      systemType === "physiotherapist" ||
      systemType === "nutritionist" ||
      systemType === "psychologist" ||
      systemType === "paramedic"
    ) {
      handleDoctorLogout(`/${systemType}/login`);
    }

    if (systemType === "hospital") {
      handleHospitalLogout();
    }

    if (systemType === "donation") {
      handleDonationLogout();
    }

    if (systemType === "travelagency") {
      handleTravelAgencyLogout();
    }

    if (systemType === "rentacar") {
      handleRentCarLogout();
    }
    if (systemType === "hotel") {
      handleHotelLogout();
    }
    if (systemType === "ambulance") {
      handleAmbulanceLogout();
    }

    if (systemType === "insurance") {
      handleInsuranceLogout();
    }
    handleClose(event);
  };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar alt="Remy Sharp" src={logo} onClick={() => {}} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{
            "& .MuiPaper-root": {
              width: "400px",
              borderRadius: "8px",
              // color: "#00276d",
              // position: "absolute",
              inset: "0px auto auto -345px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              paddingTop: "20px",
              paddingBottom: "40px",

              "@media (max-width: 480px)": {
                width: "100%",
                // position: "absolute",
                inset: "0px auto auto -345px",
                paddingTop: "10px",
                paddingBottom: "20px",
              },
            },
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    {/* Always show section */}
                    <div
                      style={{
                        display: "flex",
                        backgroundColor: "#f5f5f5",
                        padding: "16px",
                      }}
                    >
                      <Avatar
                        style={{
                          marginRight: "24px",
                          height: "64px",
                          width: "64px",
                        }}
                        src={logo}
                      />
                      <div>
                        <p
                          className={classNames(
                            commonstyle.semiBold,
                            commonstyle.fs24
                          )}
                        >
                          {name}
                        </p>
                        <p
                          style={{ color: "gray" }}
                          className={classNames(
                            commonstyle.medium,
                            commonstyle.fs14
                          )}
                        >
                          {qualifications}
                        </p>
                      </div>
                    </div>

                    {/* on doctor show*/}
                    {(systemType === "doctor" ||
                      systemType === "physiotherapist" ||
                      systemType === "nutritionist" ||
                      systemType === "psychologist") && (
                      <>
                        <div style={{ padding: "20px" }}>
                          <div>
                            <LinearProgressWithLabel
                              value={profilePercentage || 0}
                            />
                          </div>
                          <p
                            style={{
                              color: "#FF7631",
                              marginTop: 4,
                              width: "320px",
                            }}
                            className={classNames(
                              commonstyle.regular,
                              commonstyle.fs12
                            )}
                          >
                            {profilePercentage === 100
                              ? ""
                              : "Complete Your Profile for better business"}
                          </p>
                        </div>

                        <div
                          style={{
                            border: "1px solid",
                            borderColor: "#f5f5f5",
                          }}
                        />

                        <div
                          style={{ paddingTop: "20px", paddingBottom: "20px" }}
                        >
                          <div
                            className={classNames(
                              commonstyle.flx,
                              styles.menuItem
                            )}
                            onClick={handleProfile}
                          >
                            <HiOutlineUserCircle
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "16px",
                              }}
                            />
                            <p className={commonstyle.fs18}>Your Profile</p>
                          </div>
                        </div>

                        <div
                          style={{
                            border: "1px solid",
                            borderColor: "#f5f5f5",
                          }}
                        />
                      </>
                    )}

                    {/* Always display the Logout section */}
                    <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                      <div
                        className={classNames(commonstyle.flx, styles.menuItem)}
                        onClick={onLogoutClick}
                      >
                        <AiOutlineLogout
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "16px",
                          }}
                        />
                        <p className={commonstyle.fs18}>Logout</p>
                      </div>
                    </div>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%", // Ensures it spans the full width
              height: "100vh", // Ensures it spans the full height
              backgroundColor: "rgba(0, 0, 0, 0.8)", // Optional: semi-transparent overlay
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999, // Ensures it appears above other elements
            }}
          >
            <CustomLoader />
          </div>
        )}
      </div>
    </Stack>
  );
}
