import { useEffect } from "react";
import classNames from "classnames";
import style from "./ourServices.module.css";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "../Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocation } from "shared/redux";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { SERVICES } from "shared/utils/mainHeaderQuery";
import { useTranslation } from "react-i18next";
const OurServices = () => {
  useEffect(() => {
    document.title = "MediTour Global | Services";
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = [
    { name: "Doctor", style: style.Doctor },
    { name: "Hospital", style: style.Hospital },
    { name: "Laboratory", style: style.lab },
    { name: "Pharmacy", style: style.phrmacy },
    { name: "Physiotherapist", style: style.Physiotherapist },
    { name: "Nutritionist", style: style.Nutritionist },
    { name: "Paramedic Staff", style: style.Paramedic },
    { name: "Psychologist", style: style.Psychologist },
    { name: "Travel Agency", style: style.travel },
    { name: "Hotel", style: style.hotel },
    { name: "Ambulance", style: style.Amblance },
    { name: "RentACar", style: style.RentAcar },
    { name: "Donation", style: style.Donation },
    { name: "Insurance", style: style.Insurance },
  ];
  const handleNavigate = (name: string) => {
    switch (name) {
      case "Ambulance":
        navigate("/services/ambulance");
        break;

      case "Donation":
        navigate("/services/donation");
        break;

      case "RentACar":
        navigate("/services/rentacar");
        break;

      case "Pharmacy":
        navigate("/services/pharmacy");
        break;
      case "Hotel":
        navigate("/services/hotel");
        break;
      case "Laboratory":
        navigate("/services/laboratory");
        break;
      case "Paramedic Staff":
        navigate("/services/paramedicstaff");
        break;
      case "Travel Agency":
        navigate("/services/travel");
        break;
      case "Insurance":
        navigate("/services/insurance");
        break;
      default:
        navigate("/services/doctor", { state: { serviceName: name } });
        break;
    }
  };
  useEffect(() => {
    if (navigator?.geolocation) {
      navigator?.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setLocation({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
              error: null,
            })
          );
        },
        (error) => {
          dispatch(
            setLocation({
              latitude: null,
              longitude: null,
              error: error.message,
            })
          );
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);
  const { t }: any = useTranslation();

  return (
    <div>
      <NavBreadCrumbs {...SERVICES(t)} />
      <div className={style.container}>
        <div className={style.flexBetween}>
          {services.map((service, index) => (
            <div
              key={index}
              className={classNames(style.ServicesCards, service.style)}
              onClick={() => handleNavigate(service.name)}
            >
              <p
                style={{ marginTop: "auto" }}
                className={classNames(commonstyles.fs24, commonstyles.medium)}
              >
                {service.name}
              </p>
            </div>
          ))}
          <div className={classNames(style.empty)}></div>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default OurServices;
