import React, { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import img from "assets/images/HospitalService.png";
import CardStyless from "../DoctarServices/Cards.module.css";
import classNames from "classnames";
import CommonStyless from "shared/utils/common.module.css";
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";
import Vector from "assets/images/Vector.png";
import { Link, useNavigate } from "react-router-dom";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import RatingStar from "shared/RatingStar";

interface CardData {
  id: number;
  name: string;
  vector: string; //img
  time: string;
  location: string;
  rating: string;
}

const cardData: CardData[] = [
  {
    id: 0,
    name: "Jinnah Hospital",
    vector: Vector,
    time: "24/7",
    location: "Johar Town, Lahore",
    rating: "4.5",
  },
  {
    id: 1,
    name: "Jerome Bell",
    vector: Vector,
    time: "24/7",
    location: "Johar Town, Lahore",
    rating: "4.7",
  },
  {
    id: 2,
    name: "Jerome Bell",
    vector: Vector,
    time: "24/7",
    location: "Johar Town, Lahore...",
    rating: "4.8",
  },
  {
    id: 3,
    name: "Leslie Alexander",
    vector: Vector,
    time: "24/7",
    location: "Johar Town, Lahore...",
    rating: "4.9",
  },
];
interface MyComponentProps {
  serviceName: any;
}
const HospitalCards: React.FC<MyComponentProps> = ({ serviceName }) => {
  const [visibleCards, setVisibleCards] = useState<number>(2);
  const navigate = useNavigate();

  const handleShowMore = () => {
    setVisibleCards((prevCount) => prevCount + 2);
  };

  const handleViewMoreClick = (id: number) => {
    navigate(`/services/hospital/HospitalDetail/${id}`);
  };

  return (
    <div className={classNames(CommonStyless.container, CommonStyless.mt32)}>
      <div style={{ backgroundColor: "FDFDFD" }}>
        <div
          className={classNames(
            CommonStyless.flx,
            CommonStyless.flxWrap,
            CommonStyless.flxBetween
          )}
        >
          <div className={classNames(CommonStyless.flx)}></div>
          <div className={CardStyless.searchBarContainer}>
            <MdOutlineYoutubeSearchedFor className={CardStyless.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              className={CardStyless.searchInput}
            />
          </div>
        </div>
        <div className={classNames(CommonStyless.mb28, CommonStyless.mt28)}>
          <div className={CardStyless.cardContainer}>
            {cardData.slice(0, visibleCards).map((card) => (
              <div key={card.id} className={CardStyless.cardWrapper}>
                <div className={CardStyless.cardImageWrapper}>
                  <img
                    src={img}
                    alt="card img"
                    className={CardStyless.cardImage}
                  />
                </div>

                <div className={CardStyless.cardBody}>
                  <div
                    className={classNames(
                      CommonStyless.flx,
                      CommonStyless.flxBetween
                    )}
                  >
                    <div
                      className={classNames(
                        CardStyless.cardName,
                        CommonStyless.colorBlue
                      )}
                    >
                      {card.name}
                    </div>
                    <div>
                      <img
                        src={card.vector}
                        alt="Vector icon"
                        className={CardStyless.vectorIcon}
                      />
                    </div>
                  </div>
                  <div className={CardStyless.cardtime}>
                    <span className={CardStyless.timeIcon}>
                      <IoTimeOutline />
                    </span>
                    <span className={CardStyless.cardDetails}>{card.time}</span>
                  </div>

                  <div className={CardStyless.cardtime}>
                    <span className={CardStyless.timeIcon}>
                      <IoLocationOutline />
                    </span>
                    <span>{card.location}</span>
                  </div>
                  <div className={CardStyless.cardFooter}>
                    <RatingStar rating={card.rating} />
                    <span
                      className={classNames(
                        CommonStyless.flx,
                        CardStyless.viewMore
                      )}
                      onClick={() => handleViewMoreClick(card.id)}
                    >
                      <Link to="#" className={CardStyless.cardViewMore}>
                        View more
                      </Link>
                      <span className={CardStyless.cardArrow}>
                        <IoMdArrowForward />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCards < cardData.length && (
            <div className={CardStyless.showMoreContainer}>
              <button
                onClick={handleShowMore}
                className={CardStyless.showMoreButton}
              >
                Load More
                <span className={CardStyless.icon}>
                  <IoMdArrowForward />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalCards;
