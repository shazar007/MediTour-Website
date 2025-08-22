import { useNavigate } from "react-router-dom";
import style from "./availabityHospital.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import SearchBar from "shared/components/Searchbar";

export default function hospitalList() {
  const navigate = useNavigate();
  const handleGoToHospital = () => {
    navigate("/doctor/availability/Hospital");
  };

  return (
    <div className={classNames(commonstyles.col12, style.doctorss)}>
      <SearchBar />
      <div className={commonstyles.mr87}>
        <div className={style.outerContainer}>
          <div className={style.flxWrap}>
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
                <p className={classNames(commonstyles.fs16, style.mt16)}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
