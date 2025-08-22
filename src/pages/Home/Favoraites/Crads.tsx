import React from "react";
import style from "./index.module.css";
import commonstyle from "shared/utils/common.module.css";
import { FaHeart } from "react-icons/fa6";
import RatingStar from "shared/RatingStar";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

interface CardProps {
  title: string;
  subtitle: string;
  details: string;
  rating?: number;
  imgSrc: string;
  type?: any;
  onPressCard?: any;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  details,
  rating,
  imgSrc,
  type,
  onPressCard,
}) => {
  return (
    <div className={style.cardWrapper}>
      <div className={style.cardBody} onClick={onPressCard}>
        <div
          className={`${style.imgContainer} ${commonstyle.col3} ${commonstyle.colsm3}`}
        >
          <img src={imgSrc} alt={title} className={style.cardImg} />
        </div>

        <div
          className={`${style.textContainer} ${commonstyle.col9} ${commonstyle.colsm9}`}
        >
          <div className={`${commonstyle.flx} ${commonstyle.flxBetween}`}>
            <p
              className={`${commonstyle.colorBlue} ${commonstyle.fs24} ${commonstyle.semiBold}`}
            >
              {title}
            </p>
            <FaHeart className={style.hearticon} />
          </div>

          <div className={commonstyle.flx}>
            {type === "hospitals" ||
              type === "laboratory" ||
              (type === "rent a car" && <IoMdTime className={style.icons} />)}
            <p className={style.subtitle}>{subtitle}</p>
          </div>

          <div className={commonstyle.flx}>
            {type === "hospitals" ||
              type === "laboratory" ||
              (type === "rent a car" && (
                <IoLocationOutline className={style.icons} />
              ))}
            <p className={style.details}>{details}</p>
          </div>

          <div className={`${commonstyle.flx} ${style.footer}`}>
            {rating && <RatingStar rating={rating} />}
            {rating && <span style={{ marginLeft: "10px" }}>{rating}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
