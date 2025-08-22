import styles from "./wrapper.module.css";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

const Wrapper = (props: any) => {
  const { children } = props;
  const location = useLocation();
  const path = location.pathname;

  let bgImageUrl =
    path === "/"
      ? ""
      : path.includes("laboratory/login")
      ? styles.bgColorGradient
      : path.includes("laboratory/signup")
      ? styles.bgColorGradient
      : path.includes("laboratory/forgot-password")
      ? styles.bgColorGradient
      : path.includes("pharmacy/login")
      ? styles.bgColorGradient
      : path.includes("pharmacy/signup")
      ? styles.bgColorGradient
      : path.includes("pharmacy/forgot-password")
      ? styles.bgColorGradient
      : path.includes("donation/login")
      ? styles.bgColorGradient
      : path.includes("donation/signup")
      ? styles.bgColorGradient
      : path.includes("donation/forgot-password")
      ? styles.bgColorGradient
      : path.includes("Insurance/login")
      ? styles.bgColorGradient
      : path.includes("Insurance/signup")
      ? styles.bgColorGradient
      : path.includes("Insurance/forgot-password")
      ? styles.bgColorGradient
      : path.includes("homeservices/doctors/login")
      ? styles.doctorBgUrl
      : path.includes("homeservices/doctors/signup")
      ? styles.bgColorGradient
      : path.includes("homeservices/doctors/forgot-password")
      ? styles.bgColorGradient
      : path.includes("ambulance/login")
      ? styles.bgColorGradient
      : path.includes("homeservices/ambulanceservices/signup")
      ? styles.bgColorGradient
      : path.includes("homeservices/ambulanceservices/forgot-password")
      ? styles.AmbulanceBgUrl
      : path.includes("homeservices/physiotherapist/login")
      ? styles.bgColorGradient
      : path.includes("homeservices/physiotherapist/signup")
      ? styles.bgColorGradient
      : path.includes("homeservices/physiotherapist/forgot-password")
      ? styles.bgColorGradient
      : path.includes("homeservices/nutritionist/login")
      ? styles.bgColorGradient
      : path.includes("homeservices/nutritionist/signup")
      ? styles.bgColorGradient
      : path.includes("homeservices/nutritionist/forgot-password")
      ? styles.bgColorGradient
      : path.includes("homeservices/paramedicstaff/login")
      ? styles.bgColorGradient
      : path.includes("homeservices/paramedicstaff/signup")
      ? styles.PeramedicBgBgUrl2
      : path.includes("homeservices/paramedicstaff/forgot-password")
      ? styles.bgColorGradient
      : path.includes("homeservices/psychologist/login")
      ? styles.bgColorGradient
      : path.includes("homeservices/psychologist/signup")
      ? styles.bgColorGradient
      : path.includes("homeservices/psychologist/forgot-password")
      ? styles.bgColorGradient
      : path.includes("medicalservices/doctor/login")
      ? styles.bgColorGradient
      : path.includes("/medicalservices/doctor/signup")
      ? styles.bgColorGradient
      : path.includes("/medicalservices/doctor/forgot-password")
      ? styles.bgColorGradient
      : path.includes("medicalservices/hospital/login")
      ? styles.bgColorGradient
      : path.includes("medicalservices/hospital/signup")
      ? styles.bgColorGradient
      : path.includes("medicalservices/hospital/forgot-password")
      ? styles.bgColorGradient
      : path.includes("traveltourism/hotel/login")
      ? styles.bgColorGradient
      : path.includes("traveltourism/hotel/signup")
      ? styles.bgColorGradient
      : path.includes("traveltourism/hotel//signup")
      ? styles.bgColorGradient
      : path.includes("rentCar/login")
      ? styles.bgColorGradient
      : path.includes("traveltourism/rentAcar/signup")
      ? styles.bgColorGradient
      : path.includes("traveltourism/rentAcar/forgot-password")
      ? styles.bgColorGradient
      : path.includes("travelagency/login")
      ? styles.bgColorGradient
      : path.includes("traveltourism/travelAgency/signup")
      ? styles.bgColorGradient
      : path.includes("traveltourism/travelAgency/forgot-password")
      ? styles.bgColorGradient
      : "";
  return (
    <div>
      <div className={classNames(styles.bgimg, bgImageUrl)}>{children}</div>
    </div>
  );
};

export default Wrapper;
