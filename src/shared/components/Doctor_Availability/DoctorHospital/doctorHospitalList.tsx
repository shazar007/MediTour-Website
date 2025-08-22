import React, { useState, useEffect } from "react";
import style from "./doctorhospital.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import SearchBar from "shared/components/Searchbar";
import { useNavigate } from "react-router-dom";
import Empty from "assets/images/doctorEmpty.png";
import { doctorGetAllHospitals } from "shared/services/DoctorService";
import { LoadingModal } from "shared/components";
import DoctorEmpty from "shared/components/DoctorEmpty";
import { IoArrowBack } from "react-icons/io5";
import CustomLoader from "shared/components/New_Loader/Loader";
export default function DoctorHospitalsList() {
  const [loading, setLoading] = useState(false);
  interface Hospital {
    name: string;
    _id: string;
  }
  const [hospitalarray, setHospitalarray] = useState<Hospital[]>([]);

  const navigate = useNavigate();
  const handleGoHospital = (id: string) => {
    navigate(`/doctor/availability/Hospital/${id}`);
  };
  const handleGoback = () => {
    navigate("/doctor/AvailabilityCategory");
  };
  const fetchAllHospitals = () => {
    setLoading(true);
    doctorGetAllHospitals()
      .then((res: any) => {
        setHospitalarray(res.data.hospitals);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllHospitals();
  }, []);

  return (
    <div className={classNames(commonstyles.col12, style.doctorss)}>
      <SearchBar />{" "}
      <div className={commonstyles.mr87}>
        <div className={style.outerContainer}>
          <div className={commonstyles.flx}>
            <IoArrowBack className={style.back} onClick={handleGoback} />
            <p
              className={classNames(
                commonstyles.fs24,
                commonstyles.semiBold,
                commonstyles.colorBlue
              )}
            >
              Hospital List
            </p>
          </div>
          {loading ? (
            <CustomLoader />
          ) : hospitalarray && hospitalarray.length > 0 ? (
            <div className={style.flxWrap}>
              {hospitalarray.map((hospital, index) => (
                <div
                  key={index}
                  className={style.HospitalCard}
                  onClick={() => handleGoHospital(hospital._id)}
                >
                  <div className={style.texts}>
                    <p
                      className={classNames(
                        commonstyles.fs20,
                        commonstyles.semiBold,
                        style.mt204
                      )}
                    >
                      {hospital.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <DoctorEmpty />
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
