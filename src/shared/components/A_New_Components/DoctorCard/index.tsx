import React from "react";
import CardStyless from "./styles.module.css";
import CommonStyles from "shared/utils/common.module.css";
import { IoMdArrowRoundForward } from "react-icons/io";
import Vector from "assets/images/Vector.png";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const DoctorCard = (props: any) => {
const { t, i18n }: any = useTranslation();
const { isRtl } = useDirection()
  const { item, onClick, type, imgSrc, rating } = props;

  //

  let speciality =
    item?.doctorId?.speciality || item?.speciality || item?.doctor?.speciality;
  return (
    <div className={CardStyless.cardWrapper} onClick={() => onClick(item)}>
      <div
        className={
          type == "insurance"
            ? CardStyless.cardImageWrapper1
            : CardStyless.cardImageWrapper
        }
        style={{ backgroundColor: "gray" }}
      >
        <img
          src={
            imgSrc ||
            item?.doctorImage ||
            item?.doctor?.doctorImage ||
            item?.doctorId?.doctorImage ||
            item?.insuranceId?.logo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
          }
          alt={
            item?.name || item?.doctorId?.name || item?.doctor?.name || "Doctor"
          }
          className={
            type == "insurance" ? CardStyless.cardImage1 : CardStyless.cardImage
          }
        />
      </div>
      <div className={CardStyless.cardBody}>
        <div className={`${CommonStyles.flx} ${CommonStyles.flxBetween}`}>
          <div className={`${CommonStyles.flx}`}>
            <div
              className={`${CardStyless.cardName} ${CommonStyles.colorBlue}`}
            >
              {`${
                item?.name ||
                item?.doctorId?.name ||
                item?.doctor?.name ||
                item?.packageName ||
                t("unavailable")
              }`}
            </div>
            <div className={`${CardStyless.cardName1}`}>
              {" "}
              (
              {item?.clinicExperience ||
                item?.doctorId?.clinicExperience ||
                item?.doctor?.clinicExperience 
                })
            </div>
          </div>

          <div>
            <img
              src={Vector}
              alt="Vector icon"
              className={CardStyless.vectorIcon}
            />
          </div>
        </div>
        <div className={`${CommonStyles.flx} ${CardStyless.cardSpecialities}`}>
          {speciality && speciality?.length > 0 ? (
            speciality?.map((s: any, ind: number) => (
              <span key={ind} className={CardStyless.specialityTag}>
                {s}
              </span>
            ))
          ) : (
            <span
              className={CardStyless.specialityPlaceholder}
              style={
                type === "insurance"
                  ? {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }
                  : {}
              }
            >
              {type === "insurance"
                ? item?.description
                : t("specialtyInfoMissing")}
            </span>
          )}
        </div>
        {type === "insurance" ? null : (
          <div className={CardStyless.cardDetails}>
            <div className={CardStyless.cardDetail}>
              {item?.qualifications ||
                item?.doctorId?.qualifications ||
                item?.doctor?.qualifications ||
                t("qualificationsUnavailable")}
            </div>
          </div>
        )}
        
        {type && type == "speciality" && (
          <div className={`${CommonStyles.flx} ${CommonStyles.flxBetween}`}>
            <div>
              <p>{t("packagePrice")}</p>
            </div>
            <div className={CardStyless.cardExperience}>
              {item?.clinicExperience ||
                item?.doctorId?.clinicExperience ||
                t("experienceInfoMissing")}
            </div>
          </div>
        )}

        {(type && type == "speciality") ||

          (type == "insurance" && (
            <div className={`${CommonStyles.flx} ${CommonStyles.flxBetween}`}>
              <div>
                <p>{t("packagePrice")}</p>
              </div>
              <div>
                <p>{item?.totalAmount || item?.actualPrice} PKR</p>
              </div>
            </div>
          ))}

        <div
          style={{ justifyContent: "end" }}
          className={`${CommonStyles.flx} ${CommonStyles.flxBetween}`}
        >

          {/* {rating === false ? null : (
            <RatingStar
              rating={item?.averageRating || item?.doctorId?.averageRating || 2}
            />
          )} */}

          <div className={`${CommonStyles.flx} ${CardStyless.viewMore}`}
          style={isRtl?{
            display:'flex',
            // flexDirection:'row-reverse',
            alignItems:"center",
            gap:'10px',


          }:{}}
          >
            <div className={CardStyless.cardViewMore}>{t("details")}</div>
          <div>
              <IoMdArrowRoundForward className={CardStyless.cardArrowIcon}
            
              style={isRtl?{ transform: "rotate(180deg)"}:{}}
            />
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
