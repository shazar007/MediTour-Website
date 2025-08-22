import { IoIosArrowForward } from "react-icons/io";
import NavBarr from "pages/Home/HomeNavBar/NavBarr";
import classNames from "classnames";
import style from "../DoctarServices/Doctor.module.css";
import commonstyles from "shared/utils/common.module.css";
import DonationPaymodule from "shared/components/DonationServices/DonationPaymodule";
const DonationPayment = () => {
  return (
    <div>
      <div className={style.navIMG}>
        <NavBarr />
        <p
          className={classNames(
            commonstyles.fs48,
            commonstyles.semiBold,
            style.mianheading
          )}
        >
          Donation
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
            Donation
          </p>
        </div>
      </div>
      <DonationPaymodule />
    </div>
  );
};

export default DonationPayment;
