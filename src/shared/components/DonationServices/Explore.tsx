import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FaGraduationCap } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import style from "./ExploreCard.module.css";

const Explore = ({ companyData }: { companyData?: any }) => {
  const [activeCardId, setActiveCardId] = useState<number | null>(1);
  const navigate = useNavigate();

  const handleCardClick = (items: any) => {
    navigate(`/services/donation/DonationEdu`, { state: { items } });
  };
  console.log("🚀 ~ Explore ~ companyData:", companyData);
  return (
    <div className={style.cardContainer}>
      {companyData.map((item: any) => {
        return (
          <>
            <div className={style.card}>
              <div className={style.iconimgConatiner}>
                <img
                  alt="profileDonation"
                  className={style.iconimg}
                  src={
                    item?.criteriaDetails?.[0]?.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                  }
                  onClick={() => handleCardClick(item)}
                />
              </div>
              <div className={style.body}>
                <div className={style.title}>{item.criteriaName}</div>

                <p className={style.description}>
                  {item?.criteriaDetails?.[0]?.description}
                </p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Explore;
