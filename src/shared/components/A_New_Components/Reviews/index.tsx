import React from "react";
import style from "./style.module.css";
import thumbsup from "assets/images/Hotel/thumbsup.png";
import { FaRegStar, FaStar } from "react-icons/fa";

interface NewReviewsProps {
  ratingstar: number;
  comment: string;
  name: string;
}

const NewReviews: React.FC<NewReviewsProps> = ({
  ratingstar,
  comment,
  name,
}) => {
  const totalStars = 5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(ratingstar)) {
        stars.push(
          <FaStar key={i} style={{ color: "#FFC107", fontSize: "18px" }} />
        );
      } else if (i - ratingstar < 1) {
        stars.push(
          <FaStar key={i} style={{ color: "#FFC10780", fontSize: "18px" }} />
        ); // Half fill logic if needed later
      } else {
        stars.push(
          <FaRegStar key={i} style={{ color: "#FFC107", fontSize: "18px" }} />
        );
      }
    }
    return stars;
  };

  return (
    <div className={style.CardConatiner}>
      <div className={style.tumnimgContainer}>
        <img src={thumbsup} alt="thumbsup" className={style.tumnimg} />
      </div>
      <div className={style.commentConatiner}>
        <p className={style.comment}>{comment}</p>
      </div>
      <div className={style.starrow}>{renderStars()}</div>
      <div className={style.namecontainer}>
        <p className={style.name}>{name}</p>
      </div>
    </div>
  );
};

export default NewReviews;
