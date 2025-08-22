import { useState, useEffect } from "react";
import style from "./phyhospital.module.css";
import styles from "../PhyAvailability.module.css";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { RingLoader } from "shared/components";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import commomstyles from "shared/utils/common.module.css";
import { TbRefresh } from "react-icons/tb";
import { useSelector } from "react-redux";
import { doctorGetAllHospitals } from "shared/services/DoctorService";
import { FaHospitalSymbol } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function DoctorHospitalAvailability() {
  const { t, i18n }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  interface Hospital {
    name: string;
    _id: string;
  }
  const [hospitalarray, setHospitalarray] = useState<Hospital[]>([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { systemType } = useSelector((state: any) => state.root.common);

  const handleGoHospital = (id: any, name: any) => {
    let type = "hospital";

    navigate(`/${systemType}/availability/${type}/detail`, {
      state: {
        availabilityType: type,
        availabilityTitle: name,
        hospitalId: id,
      },
    });
  };
  const fetchAllHospitals = () => {
    setLoading(true);
    doctorGetAllHospitals()
      .then((res) => {
        setHospitalarray(res.data.hospitals);
      })
      .catch((err) => { })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllHospitals();
  }, []);

  return (
    <div className={classNames(commomstyles.col12, style.doctorss)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commomstyles.pl36
            : commomstyles.pr36
        }
      >
        <div className={style.outerContainer}>
          <div className={commomstyles.flx} style={{ gap: "16px" }}>
            <p className={classNames(commomstyles.fs24, commomstyles.semiBold)}>
              {t("availability")} {state.availabilityTitle}
            </p>
            {loading ? (
              <div style={{ marginLeft: "16px" }}>
                <RingLoader color={"#0D47A1"} size={24} />
              </div>
            ) : (
              <TbRefresh
                className={style.Refresh}
                onClick={fetchAllHospitals}
              />
            )}
          </div>
          {hospitalarray && hospitalarray.length > 0 ? (
            <div className={style.flxWrap}>
              {hospitalarray.map((hospital: any, index: any) => (
                <div
                  key={index}
                  className={styles.cardContainer}
                  onClick={() => handleGoHospital(hospital._id, hospital.name)}
                >
                  <div className={styles.cardIconContainer}>
                    <FaHospitalSymbol className={styles.cardIcon} />
                  </div>

                  <div className={styles.textContainer}>
                    <p
                      className={classNames(
                        commomstyles.fs28,
                        commomstyles.semiBold,
                        styles.cardHeading
                      )}
                    >
                      {hospital.name}
                    </p>
                    <p
                      className={classNames(
                        commomstyles.fs16,
                        commomstyles.medium,
                        styles.cardSubHeading,
                        commomstyles.mt16
                      )}
                    >
                      {t("addAvailabilityForThisHospital")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>{!loading && <PhysiotheristsEmpty />}</div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
