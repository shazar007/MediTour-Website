import React from "react";
import style from "./DonationStyle.module.css";
// import donnerimg from "assets/images/donner.png";
import donnerimg from "assets/images/Donation 1.png";
import { useTranslation } from "react-i18next";

const DonnersCards = ({ donorData }: { donorData?: any }) => {
  const { t, i18n }: any = useTranslation();
  return (
    <div className={style.cardGrid}>
      {donorData.map((item: any) => (
        <div className={style.card}>
          <img
            src={
              item?.userId?.userImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
            }
            alt="donnerimg"
            className={
              ["ur", "ar", "ps", "pr"].includes(i18n.language)
                ? style.imageur
                : style.image
            }
          />
          <div className={style.textContainer}>
            <span className={style.name}>{item?.donorName}</span>
            <div className={style.textRow}>
              <span className={style.subtitle}>{item.donationPurpose}</span>
              <span className={style.amount}>
                {item.paidByUserAmount
                  ? `${
                      item?.gatewayName === "stripe"
                        ? `$${(
                            item.paidByUserAmount.toFixed(2) -
                            item?.processingFee
                          ).toFixed(2)}`
                        : `PKR ${item.paidByUserAmount}`
                    }`
                  : "not"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonnersCards;
