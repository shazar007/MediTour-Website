import React from "react";
import style from "./Availability.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import SearchBar from "shared/components/Searchbar";
import { useNavigate } from "react-router-dom";

export default function AvailabilityCategory() {
  const navigate = useNavigate(); // Declare once

  const handleGoClinic = () => {
    navigate("/doctor/availability/Clinic");
  };

  const handleGoToInhouse = () => {
    navigate("/doctor/availability/Inhouse");
  };
  const handleGoToVideoConsultancy = () => {
    navigate("/doctor/availability/VideoConsultancy");
  };
  const handleGoToHospital = () => {
    navigate("/doctor/availability/HospitalList");
  };

  return (
    <div className={classNames(commonstyles.col12, style.doctorss)}>
      <SearchBar />
      <div className={commonstyles.mr87}>
        <div className={classNames(style.outerContainer)}>
          <p
            className={classNames(
              commonstyles.fs24,
              commonstyles.semiBold,
              commonstyles.colorBlue
            )}
          >
            Availability category
          </p>
          <div className={style.flxWrap}>
            <div className={style.clinicCard} onClick={handleGoClinic}>
              <div className={style.texts}>
                <p
                  className={classNames(
                    commonstyles.fs20,
                    commonstyles.semiBold
                  )}
                >
                  Clinic
                </p>
                {/* <p className={classNames(commonstyles.fs16, style.mt16)}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard
                </p> */}
              </div>
            </div>
            <div className={style.InhouseCard} onClick={handleGoToInhouse}>
              <div className={style.texts}>
                <p
                  className={classNames(
                    commonstyles.fs20,
                    commonstyles.semiBold
                  )}
                >
                  In-House
                </p>
                {/* <p className={classNames(commonstyles.fs16, style.mt16)}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard
                </p> */}
              </div>
            </div>
            <div className={style.HospitalCard} onClick={handleGoToHospital}>
              <div className={style.texts}>
                <p
                  className={classNames(
                    commonstyles.fs20,
                    commonstyles.semiBold
                  )}
                >
                  Hospital
                </p>
                {/* <p className={classNames(commonstyles.fs16, style.mt16)}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard
                </p> */}
              </div>
            </div>
            <div
              className={style.ConsultancyCard}
              onClick={handleGoToVideoConsultancy}
            >
              <div className={style.texts}>
                <p
                  className={classNames(
                    commonstyles.fs20,
                    commonstyles.semiBold
                  )}
                >
                  Video Consultancy
                </p>
                {/* <p className={classNames(commonstyles.fs16, style.mt16)}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
