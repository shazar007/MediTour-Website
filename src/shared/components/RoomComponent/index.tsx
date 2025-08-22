import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import hstyle from "./styles.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
// import astyle from "./styles.module.css";

const RoomComponent = ({
  onClick,
  selectedCard,
  name,
  rooms,
  price,
  value1,
  item,
  dinningRoom,
  size,
  value2,
  breakfast,
  noOfGuestsStay,
  pricePerNight,
  noOfRoomType,
  roomType,
  fromHome,
}: {
  onClick?: any;
  selectedCard?: any;
  name?: any;
  rooms?: any;
  price?: any;
  value1?: any;
  item?: any;
  dinningRoom?: any;
  size?: any;
  value2?: any;
  breakfast?: any;
  noOfGuestsStay?: any;
  pricePerNight?: any;
  noOfRoomType?: any;
  roomType?: any;
  fromHome?: any;
}) => {
  return (
    <div className={hstyle.cardContainer}>
      <div
        style={{
          border: selectedCard === name ? "1px solid blue" : "transparent",
        }}
        className={classNames(hstyle.card)}
      >
        <div className={classNames(commonstyles.flx, commonstyles.flxBetween)}>
          <div>
            <p
              className={classNames(
                commonstyles.fs24,
                commonstyles.colorBlue,
                commonstyles.semiBold
              )}
            >
              {name}
            </p>
            <p
              className={classNames(commonstyles.fs14, commonstyles.colorGray)}
            >
              {value1}
            </p>
            <p
              className={classNames(commonstyles.fs14, commonstyles.colorGray)}
            >
              {value2}
            </p>
            <p
              className={classNames(commonstyles.fs14, commonstyles.colorGray)}
            >
              {noOfGuestsStay}
            </p>

            <p
              className={classNames(commonstyles.fs14, commonstyles.colorGray)}
            >
              {roomType}
            </p>
            <p
              className={classNames(commonstyles.fs14, commonstyles.colorGray)}
            >
              {noOfRoomType}
            </p>
          </div>
          <div className={classNames(commonstyles.mt16)}>
            <p
              className={classNames(commonstyles.fs14, commonstyles.colorGreen)}
            >
              Fecilities
            </p>
            {item?.facilities.map((feature: any, i: any) => (
              <p
                key={i}
                className={classNames(
                  commonstyles.fs14,
                  commonstyles.colorGray
                )}
              >
                {feature}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p
            className={classNames(
              commonstyles.colorGreen,
              commonstyles.fs16,
              commonstyles.semiBold
            )}
          >
            {dinningRoom}
          </p>
        </div>
        <div>
          <p
            className={classNames(
              commonstyles.colorGreen,
              commonstyles.fs16,
              commonstyles.semiBold
            )}
          >
            {size}
          </p>
        </div>
        <div>
          <p
            className={classNames(
              commonstyles.colorGreen,
              commonstyles.fs16,
              commonstyles.semiBold
            )}
          >
            {pricePerNight}
          </p>
        </div>
        {/* <div className={dstyle.iconRow}>
      {icons.map((item, idx) => (
        <div key={idx} className={dstyle.iconCard}>
          <div className={dstyle.iconContainer}>{item.icon}</div>
          <span className={dstyle.iconName}>{item.name}</span>
        </div>
      ))}
    </div> */}
        <div>
          <p
            className={classNames(
              commonstyles.colorOrange,
              commonstyles.fs16,
              commonstyles.semiBold
            )}
          >
            {rooms}
          </p>
        </div>
        <div>
          <p
            className={classNames(
              commonstyles.colorGreen,
              commonstyles.fs16,
              commonstyles.semiBold
            )}
          >
            Price Per Night
          </p>
          <p
            className={classNames(
              commonstyles.colorBlue,
              commonstyles.fs16,
              commonstyles.semiBold
            )}
          >
            {price}
          </p>
        </div>

        <div
          className={hstyle.showMoreContainer}
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            className={hstyle.showMoreContainer}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <button className={hstyle.showMoreButton} onClick={onClick}>
              {fromHome ? "Select" : "Select No. of Rooms"}
              <span className={hstyle.icon}>
                <IoMdArrowForward />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomComponent;
