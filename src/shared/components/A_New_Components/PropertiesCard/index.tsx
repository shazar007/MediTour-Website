import React from "react";
import style from "./propertiescard.module.css";
import Price from "assets/images/tdesign_money.png";
import Check from "assets/images/icon-park-outline_check-in.png";
import Guest from "assets/images/ic_round-people (2).png";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";

const PropertiesCard = ({ data }: any) => {
  const featureList = [
    "Services",
    "Restaurant",
    "Internet",
    "Parking",
    "Outdoor",
    "Activities",
  ];
  const matchedFeatures = data?.features?.map((item: any) => item.name) || [];
  console.log("🚀 ~ matchedFeatures ~ data:", matchedFeatures);
  return (
    <div className={style.CardConatiner}>
      <div className={style.mainFlx}>
        <div className={style.ImgContainer}>
          <img
            src={
              data?.propertyphotos?.[0] ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
            }
            className={style.ImgStyle}
          />
        </div>
        <div className={style.cardBody}>
          <div className={style.w30}>
            <div>
              <p className={style.heading}>{data?.propertyName}</p>
              <p style={{ marginTop: "6px" }} className={style.subheading}>
                {data?.location?.city}
              </p>
              <div className={style.flx}>
                <img src={Guest} alt="Guest" className={style.icon} />
                <p className={style.icontext}>
                  {" "}
                  {data?.noOfGuests} Guest Maximum
                </p>
              </div>
              <div className={style.flx}>
                <img src={Check} alt="Check" className={style.icon} />
                <p className={style.icontext}>
                  Check-in after {data?.checkInTime}
                </p>
              </div>
              <div className={style.flx}>
                <img src={Price} alt="Price" className={style.icon} />
                <p className={style.icontext}>Rs. {data?.propertyRent}</p>
              </div>{" "}
            </div>
            <div>
              <p className={style.no}>{data?.propertyCount} Properties</p>
              <p className={style.value}>Total</p>
            </div>
          </div>
          <div
            style={{ border: "0.25px solid #7d7d7d", height: "176px" }}
          ></div>
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className={style.heading}>Featuring</p>
            </div>
            <div className={style.FeatureWrap}>
              {featureList.map((feature, index) => (
                <div
                  key={index}
                  className={`${style.FeatureCard} ${
                    matchedFeatures.includes(feature) ? style.Highlighted : ""
                  }`}
                >
                  <p>{feature}</p>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className={style.mt16}>
                <div className={style.flx}>
                  <MdLocalPhone color="#7d7d7d" />
                  <p className={style.icontext}>{data?.contactNumber}</p>
                </div>

                <div className={style.flx}>
                  <MdLocationOn color="#7d7d7d" className={style.icon} />
                  <p className={style.icontext}>{data?.location?.address}</p>
                </div>
              </div>
              {/* <button className={style.Edit}>Edit</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertiesCard;
