import React, { useState } from "react";
import classNames from "classnames";
import CommonStyless from "shared/utils/common.module.css";
import CardStyless from "../../../pages/Services/DoctarServices/Cards.module.css";
import detailStyle from "../../../pages/Services/DoctarServices/Deatil.module.css";
import { IoMdArrowForward } from "react-icons/io";

interface Review {
  userName?: string;
  timeAgo?: string;
  date?: string;
  review?: string;
  ratings?: any;
}

const ReviewComponent = (props?: any) => {
  const { ratings, name } = props;
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 3);
  };

  return (
    <div>
      <div className={classNames(detailStyle.conatiner)}>
        <div className={classNames(CommonStyless.flx, CommonStyless.flxEvenly)}>
          <p
            className={classNames(
              detailStyle.reviews,
              CommonStyless.semiBold,
              CommonStyless.fs28
            )}
          >
            All Reviews About {name}
          </p>
          {/* <span className={classNames(CardStyless.cardRating)}>
            * <span className={classNames(detailStyle.reviews)}>199</span>
          </span> */}
        </div>
      </div>

      <div
        className={classNames(
          detailStyle.reviewcardContainer,
          CommonStyless.flx,
          CommonStyless.flxBetween
        )}
      >
        {ratings?.slice(0, visibleCards).map((review: any, index: any) => (
          <div key={index} className={classNames(detailStyle.reviewcard)}>
            <div className={classNames(detailStyle.cardHeader)}>
              <div
                className={classNames(
                  CommonStyless.flx,
                  CommonStyless.flxBetween
                )}
              >
                <span
                  className={classNames(
                    CommonStyless.fs14,
                    CommonStyless.semiBold
                  )}
                >
                  {review?.userName}
                </span>
                <span className={classNames(detailStyle.icon)}>
                  {review?.timeAgo}
                </span>
              </div>
            </div>
            <span className={classNames(detailStyle.title)}>
              {review.review}
            </span>
            <div className={classNames(detailStyle.cardDate)}>
              <span>{review.date}</span>
            </div>
            <div className={classNames(detailStyle.cardBody)}>
              <p>{review.review}</p>
            </div>
          </div>
        ))}
        {ratings?.length > visibleCards && (
          <div className={CardStyless.showMoreContainer}>
            <button
              onClick={handleShowMore}
              className={CardStyless.showMoreButton}
            >
              Show More
              <span className={CardStyless.icon}>
                <IoMdArrowForward />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
