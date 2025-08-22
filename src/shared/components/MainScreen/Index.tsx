import React from "react";
import classNames from "classnames";
import style from "../../../pages/Services/DoctarServices/Doctor.module.css";
import commonstyles from "shared/utils/common.module.css";
import { IoIosArrowForward } from "react-icons/io";
import NavBarr from "pages/Home/HomeNavBar/NavBarr";

interface MainHeaderProps {
  mainHeading: string;
  breadcrumb: string[];
}

const MainHeader: React.FC<MainHeaderProps> = ({ mainHeading, breadcrumb }) => {
  return (
    <div className={style.navIMG}>
      <NavBarr />
      <p
        className={classNames(
          commonstyles.fs48,
          commonstyles.semiBold,
          style.mianheading
        )}
      >
        {mainHeading}
      </p>
      <div className={style.title}>
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <p
              className={classNames(
                commonstyles.fs16,
                commonstyles.semiBold,
                index === breadcrumb.length - 1
                  ? style.mianheading
                  : style.mianheading22 // Apply style.mianheading to the last breadcrumb
              )}
            >
              {item}
            </p>
            {index < breadcrumb.length - 1 && (
              <IoIosArrowForward
                className={classNames(commonstyles.fs16, style.mianheading)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MainHeader;
