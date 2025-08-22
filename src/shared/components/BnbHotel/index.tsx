import React from "react";
import hstyle from "./styles.module.css";
import classNames from "classnames";
import { HiOutlineLocationMarker } from "react-icons/hi";
import commonstyles from "shared/utils/common.module.css";

import { IoMdArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { common } from "@mui/material/colors";
import RatingStar from "shared/RatingStar";
const BnbHotel = ({
  CarImage,
  name,
  location,
  price,
  cancel,
  handledetails,
  cross,
  Click,
}: {
  CarImage?: any;
  name?: any;
  location?: any;
  price?: any;
  cross?: any;
  cancel?: any;
  Click?: any;
  handledetails?: any;
}) => {
  return (
    <div>
      <div className={classNames(hstyle.cardWrapper)}>
        {cross && (
          <div
            className={classNames(commonstyles.flx, commonstyles.flxEnd)}
            style={{ marginTop: "24px" }}
          >
            <IoCloseSharp
              onClick={Click}
              style={{
                cursor: "pointer",
                color: "red",
              }}
            />
          </div>
        )}
        <div className={classNames(hstyle.cardContainer)}>
          <div className={classNames(hstyle.cardImageWrapper)}>
            <img
              src={CarImage}
              alt="CarImage"
              className={classNames(hstyle.cardImage)}
            />
          </div>
          <div className={classNames(hstyle.cardDetails)}>
            <div
              className={classNames(commonstyles.flx, commonstyles.flxBetween)}
            >
              <p
                className={classNames(
                  commonstyles.colorBlue,
                  commonstyles.fs24,
                  commonstyles.semiBold
                )}
              >
                {name}
              </p>
              <FaRegHeart
                className={classNames(
                  commonstyles.colorBlue,
                  commonstyles.fs16
                )}
              />
            </div>
            <RatingStar rating={3} />
            <span>
              <div className={classNames(commonstyles.flx)}>
                <span>
                  <HiOutlineLocationMarker
                    style={{
                      margin: "0 10px",
                      fontSize: "16px",
                      color: "blue",
                    }}
                  />
                </span>

                <p
                  className={classNames(
                    commonstyles.colorBlue,
                    commonstyles.fs16
                  )}
                  style={{
                    textAlign: "start",
                    maxHeight: "50px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                  }}
                >
                  {location}
                </p>
              </div>
            </span>

            <div
              className={classNames(commonstyles.flx, commonstyles.flxBetween)}
            >
              <div
                className={classNames(
                  commonstyles.flx,
                  commonstyles.flxBetween
                )}
                style={{ width: "100%" }}
              >
                <p
                  className={classNames(
                    commonstyles.colorBlue,
                    commonstyles.fs15
                  )}
                >
                  Started Price: <strong>{price}</strong>
                </p>
                <div
                  className={classNames(
                    commonstyles.flx,
                    commonstyles.flxCenter
                  )}
                >
                  <FaRegCheckCircle
                    className={classNames(
                      commonstyles.fs16,
                      commonstyles.semiBold
                    )}
                    style={{ color: "#006838" }}
                  />
                  <span style={{ color: "#006838", marginLeft: "5px" }}>
                    {cancel}
                  </span>
                </div>
              </div>
            </div>
            <div className={hstyle.cardshowMoreContainer}>
              <button className={hstyle.showMoreButton} onClick={handledetails}>
                See Availability
                <span className={hstyle.icon}>
                  <IoMdArrowForward />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BnbHotel;
