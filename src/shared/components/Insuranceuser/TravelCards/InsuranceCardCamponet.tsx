import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import style from "./Card.module.css"; // Adjust the path as necessary
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import { IoMdArrowForward } from "react-icons/io";

interface CardProps {
  title: string;
  price: string;
  description: string;
  imgSrc: string;
  handleDetailsClick:any;
}

const InsuranceCardComponent: React.FC<CardProps> = ({
  title,
  price,
  description,
  imgSrc,
  handleDetailsClick,
}) => {
  const navigate = useNavigate();



  return (
    <div className={style.card}>
      <div className={classNames(commonstyle.flx)}>
        <div className={style.imgcontainer}>
          <img src={imgSrc} alt={title} className={style.treeimg} />
        </div>
        <div className={style.textContainer}>
          <p
            className={classNames(
              commonstyle.colorBlue,
              commonstyle.fs24,
              commonstyle.semiBold
            )}
          >
            {title}
          </p>
          <p
            className={classNames(
              commonstyle.colorBlue,
              commonstyle.fs16,
              commonstyle.semiBold
            )}
          >
            {price}
          </p>
          <p className={classNames(commonstyle.colorGray, commonstyle.fs16)}>
            {description}
          </p>


          <div
            className={classNames(commonstyle.flx, commonstyle.flxEnd)}
            onClick={handleDetailsClick}
          >
            <span>
              <Link to="#" className={style.cardViewMore}>
                Details
              </Link>
            </span>
            <span className={style.cardArrow}>
              <IoMdArrowForward />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCardComponent;
