import { useState } from "react";
import img from "assets/images/travelcard.png";
import img2 from "assets/images/hotelCard.jpg";

import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import style from "./CardStyle.module.css";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";

const cardData = [
  {
    id: "1",
    title: "Malam Jabba Tour",
    location: "Pakistan",
    imgSrc: img,
  },
  {
    id: "2",
    title: "Kaghan Valley Tour",
    location: "Pakistan",
    imgSrc: img2,
  },
  {
    id: "3",
    title: "Hunza Valley Tour",
    location: "Pakistan",
    imgSrc: img,
  },
  {
    id: "4",
    title: "Swat Valley Tour",
    location: "Pakistan",
    imgSrc: img2,
  },
  {
    id: "5",
    title: "Fairy Meadows Tour",
    location: "Pakistan",
    imgSrc: img,
  },
  {
    id: "6",
    title: "Skardu Tour",
    location: "Pakistan",
    imgSrc: img2,
  },
];

const Upcoming = () => {
  const [likedItemId, setLikedItemId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleHeartClick = (id: string) => {
    setLikedItemId((prev) => (prev === id ? null : id));
  };

  const handleNext = () => {
    if (currentIndex < cardData.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <div className={classNames()}>
        <div className={classNames(commonstyle.flx, commonstyle.flxBetween)}>
          <p
            className={classNames(
              commonstyle.colorBlue,
              commonstyle.fs24,
              commonstyle.semiBold
            )}
          >
            Upcoming Schedule
          </p>
          <div className={style.circleContainer}>
            <div className={classNames(style.circle)} onClick={handlePrev}>
              <IoIosArrowBack className={commonstyle.colorBlue} />
            </div>
            <div className={classNames(style.circle)} onClick={handleNext}>
              <IoIosArrowForward className={commonstyle.colorBlue} />
            </div>
          </div>
        </div>

        <div className={classNames(commonstyle.flx, commonstyle.flxWrap)}>
          {cardData.slice(currentIndex, currentIndex + 4).map((card) => (
            <div
              key={card.id}
              className={classNames(style.card, style.roundedBackground)}
            >
              <div className={style.imgContainer}>
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  className={style.cardImage}
                />
                <div
                  className={style.heartIconContainer}
                  onClick={() => handleHeartClick(card.id)}
                >
                  {likedItemId === card.id ? (
                    <FaHeart className={style.heartIcon} />
                  ) : (
                    <FaRegHeart className={style.heartIcon} />
                  )}
                </div>
              </div>
              <div className={classNames(style.textcontainer)}>
                <p
                  className={classNames(
                    commonstyle.colorBlue,
                    commonstyle.fs16,
                    commonstyle.semiBold
                  )}
                >
                  {card.title}
                </p>
                <div>
                  <div
                    className={classNames(
                      commonstyle.flx,
                      commonstyle.flxBetween
                    )}
                  >
                    <div
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      <IoLocationSharp
                        className={classNames(
                          commonstyle.colorGray,
                          commonstyle.fs16,
                          commonstyle.semiBold
                        )}
                      />
                      {card.location}
                    </div>
                    <div className={classNames(style.circle)}>
                      <IoIosArrowForward className={commonstyle.colorBlue} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
