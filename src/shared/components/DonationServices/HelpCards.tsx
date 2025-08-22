import React from "react";
import style from "./Helpcards.module.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HelpCards = ({ cardsData }: { cardsData?: any }) => {
  const {t} : any = useTranslation()
  const navigate = useNavigate();
  const onCardClick = (item: any) => {
    navigate(`/services/donation/DonationCardDetail`, { state: { item } });
  };
  return (
    <>
      <div className={classNames(style.cardContainer)}>
        {cardsData.map((item: any) => {
          return (
            <div className={style.card} onClick={() => onCardClick(item)}>
              <div className={style.cardimgConatiner}>
                <img
                  src={
                    item?.company?.logo ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                  }
                  alt="Card Image"
                  className={style.cardImage}
                />
              </div>

              <div className={style.cardContent}>
                {/* <div className={style.logoAndTitle}> */}
                {/* <img src={item?.company?.logo||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU'} alt="Logo" className={style.logoImage} /> */}
                <h3 className={style.title}>{item?.company?.name}</h3>
                {/* </div> */}
                <div className={style.subtitleRow}>
                  <div className={style.donnerImageContainer}>
                    <img
                      src={
                        item?.donors[0]?.userId?.userImage ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                      }
                      alt="Donner"
                      className={style.donnerImage}
                    />
                  </div>
                  <p className={style.subtitle}>
                    {item.userCount} {t("peopleDonated")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HelpCards;
