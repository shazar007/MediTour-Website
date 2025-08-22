import classNames from "classnames";
import style from "./Hospital.module.css";

import commonstyles from "shared/utils/common.module.css";
import { IoIosArrowForward } from "react-icons/io";
import Footerr from "pages/Home/HomeNavBar/Footer";
const HospitalServices = () => {
  return (
    <div>
      <div>
        <div className={style.navIMG}>
          <p
            className={classNames(
              commonstyles.fs48,
              commonstyles.semiBold,
              style.mianheading
            )}
          >
            Hospital
          </p>
          <div className={style.title}>
            <p
              className={classNames(
                commonstyles.fs16,
                commonstyles.semiBold,
                style.mianheading22
              )}
            >
              Home
            </p>
            <IoIosArrowForward
              className={classNames(commonstyles.fs16, style.mianheading)}
            />
            <p
              className={classNames(
                commonstyles.fs16,
                commonstyles.semiBold,
                style.mianheading22
              )}
            >
              Services
            </p>
            <IoIosArrowForward
              className={classNames(commonstyles.fs16, style.mianheading)}
            />
            <p
              className={classNames(
                commonstyles.fs16,
                commonstyles.semiBold,
                style.mianheading
              )}
            >
              Hospital
            </p>
          </div>
          <Footerr />
        </div>
      </div>
    </div>
  );
};

export default HospitalServices;
