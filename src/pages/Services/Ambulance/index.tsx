import React, { useEffect } from "react";
import classNames from "classnames";
import style from "./Ambulance.module.css";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import LocationInput from "shared/components/LocationInput";
import { Ambulance_Flow } from "shared/services";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RingLoader } from "shared/components";
import toast from "react-hot-toast";
import submit from "assets/images/submitted.png";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useDirection } from "shared/utils/DirectionContext";

const AmbulanceServices = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  const { state }: any = useLocation();
  const [location, setLocation] = React.useState<any>(state?.location || "");
  const [dropLocation, setDropLocation] = React.useState<any>(
    state?.dropLocation || ""
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [err, setErr] = React.useState("");
  const [err2, setErr2] = React.useState("");
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { isLoggedIn } = useSelector((state: any) => state?.root?.common);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const savedPickupLocation = localStorage.getItem("pickupLocation");
    const savedDropLocation = localStorage.getItem("dropLocation");
    if (savedPickupLocation) {
      setLocation(JSON.parse(savedPickupLocation));
    }
    if (savedDropLocation) {
      setDropLocation(JSON.parse(savedDropLocation));
    }
  }, []);

  const handleLocationChange = (newLocation: string) => {
    setErr("");
    setLocation(newLocation);
  };

  const handleDropLocationChange = (newLocation: string) => {
    setErr2("");
    setDropLocation(newLocation);
  };

  const navigate = useNavigate();

  const handleShowMore = () => {
    setHasSubmitted(true);

    if (!location) {
      setErr(t("selectPickupLocation"));
    }
    if (!dropLocation) {
      setErr2(t("selectDropofLocation"));
    }

    if (!location || !dropLocation) {
      return;
    }

    if (isLoggedIn) {
      pushAmbulance();
    } else {
      navigate("/user/login", {
        state: {
          state: { location: location, dropLocation: dropLocation },
          loginFrom: "ambulance",
        },
        replace: true,
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const pushAmbulance = () => {
    setLoading(true);
    const data = {
      pickUp: {
        lng: location.lng,
        lat: location.lat,
        address: location?.label,
        city: location.city,
      },
      dropOff: {
        lng: dropLocation.lng,
        lat: dropLocation.lat,
        address: dropLocation?.label,
        city: dropLocation.city,
      },
    };

    Ambulance_Flow(data)
      .then(() => {
        setIsModalOpen(true);
        setLocation(null);
        setDropLocation(null);
        localStorage.removeItem("pickupLocation");
        localStorage.removeItem("dropLocation");
      })
      .catch((err: any) => {
        setLocation(null);
        setDropLocation(null);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className={classNames(style.container)}>
        <ServiceHeader
          headingBlue={t("rapidResponse,ExpertCareOur")}
          headingOrange={t("ambulanceServices")}
          content={t("ambulnceHeaderContent")}
        />
        <div className={classNames(style.location)}>
          <div
            className={classNames(
              commonstyles.col5,
              commonstyles.colmd12,
              commonstyles.colsm12
            )}
          >
            <LocationInput
              placeholder={t("pickupLocation")}
              setData={handleLocationChange}
              defaultValue={location}
              type={"box"}
              border="0.5px solid #E4E4E4"
              borderRadius="12px"
              height="56px"
            />
            {hasSubmitted && <div className={classNames(style.err)}>{err}</div>}
          </div>
          <div
            className={classNames(
              commonstyles.col5,
              commonstyles.colmd12,
              commonstyles.colsm12
            )}
          >
            <LocationInput
              placeholder={t("dropOffLocation")}
              setData={handleDropLocationChange}
              defaultValue={dropLocation}
              type={"box"}
              border="0.5px solid #E4E4E4"
              borderRadius="12px"
              height="56px"
            />
            {hasSubmitted && (
              <div className={classNames(style.err)}>{err2}</div>
            )}
          </div>
        </div>

        <div className={style.btnContainer}>
          <button
            onClick={!loading ? handleShowMore : undefined}
            className={style.requestbtn}
            disabled={loading}
          >
            {loading ? <RingLoader size={20} color={"#fff"} /> : t("request")}
          </button>
        </div>
      </div>

      {/* Modal */}
      <div
        className={classNames(style.modalOverlay, {
          [style.open]: isModalOpen,
        })}
        onClick={handleCloseModal}
      >
        <div
          className={classNames(style.modalContent, commonstyles.colorBlue)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.imgContainer}>
            <img src={submit} alt="amb Submit" className={style.img} />
          </div>
          <div>
            <p style={isRtl ? { lineHeight: "50px" } : {}}>
              {t("yourRequestHas_")} <br /> {t("successfully")}!
            </p>
            <p
              style={
                isRtl
                  ? { lineHeight: "50px", fontSize: "32px" }
                  : { fontSize: "32px" }
              }
            >
              {t("weWillNotify_")}
            </p>
          </div>
        </div>
      </div>

      <Footerr />
    </>
  );
};

export default AmbulanceServices;
