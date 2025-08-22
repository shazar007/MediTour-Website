import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingStarProps {
  rating: number | string;
  maxStars?: number;
}

const RatingStar: React.FC<RatingStarProps> = ({ rating, maxStars = 5 }) => {
  const numericRating =
    typeof rating === "string" ? parseFloat(rating) : rating;

  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(numericRating)) {
      stars.push(<FaStar key={i} style={{ color: "#ffc107" }} />);
    } else if (i === Math.ceil(numericRating) && numericRating % 1 !== 0) {
      stars.push(<FaStarHalfAlt key={i} style={{ color: "#ffc107" }} />);
    } else {
      stars.push(<FaRegStar key={i} style={{ color: "#e4e5e9" }} />);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>{stars}</div>
      <span style={{ marginLeft: "15px", fontSize: "16px", color: "#1E5DA3" }}>
        {numericRating}
      </span>
    </div>
  );
};

export default RatingStar;
