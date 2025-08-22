import React from "react";
import style from "./green.module.css";
import { MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { BiSolidPhone } from "react-icons/bi";
import { FaMoneyBillAlt, FaUserFriends } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import CustomizedSwitche from "../SwitchButton";
import { useTranslation } from "react-i18next";
const PropertyCard = ({
  onclickDetail,
  data,
  onStatusChange,
}: {
  onclickDetail?: any;
  data?: any;
  onStatusChange?: any;
}) => {
  const { t, i18n }: any = useTranslation();
  return (
    <div className={style.card}>
      <div className={style.spaceBetween}>
        <div className={style.firstcolumn}>
          {/* Image Container */}
          <div className={style.imageContainer}>
            <img
              src={
                data?.propertyphotos?.[0] ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
              }
              className={style.cardimg}
              alt="dferer2"
            />
          </div>

          {/* Card Content */}
          <div className={style.cardContent}>
            <div className={style.divcardContent}>
              <div className={style.header}>
                <div className={style.textHeader}>{data?.propertyName}</div>
                {/* <div className={style.texteditor}>Featured Doctor</div> */}
              </div>
              <div className={style.locationText}>
                {data?.location?.city || ""}
              </div>
              <div className={style.rowcontent}>
                <FaUserFriends color="#7d7d7d" />
                <p className={style.textrow}>
                  {data?.noOfGuests} {t("guestMaximum")}
                </p>
              </div>
              <div className={style.rowcontent}>
                <FaClock color="#7d7d7d" />{" "}
                <p className={style.textrow}>
                  {t("checkInAfter")} {data?.checkInTime}
                </p>
              </div>
              <div className={style.rowcontent}>
                <FaMoneyBillAlt color="#7d7d7d" />{" "}
                <p className={style.textrow}>
                  Rs. {(data?.propertyRent || 0) + (data?.meditourFee || 0)}
                </p>
              </div>
            </div>
            <div className={style.rowdisplay}>
              <div className={style.footer}>
                <div className={style.footerText}>
                  {data?.propertyCount} {t("rooms")}
                </div>
                <div className={style.footerSubText}>{t("total")}</div>
              </div>
              <div className={style.bar} />
              <div className={style.footer}>
                <div className={style.footerText}>
                  {data?.satisfiedPatientCount &&
                  data?.satisfiedPatientPercentage
                    ? `${data?.satisfiedPatientCount} (${data?.satisfiedPatientPercentage})`
                    : "0 %"}
                </div>
                <div className={style.footerSubText}>
                  {t("satisfiedPatient")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule and Contact Information */}
        <div className={style.secoundcolmn}>
          <div className={style.centerBar} />
          <div
            className={
              ["ur", "ar", "ps", "pr"].includes(i18n.language)
                ? style.schedulelang
                : style.schedule
            }
          >
            <div className={style.rowWay}>
              <div className={style.rowVise}>
                <div className={style.feactureFont}>{t("featuring")}</div>
                <div className={style.settingbar}>
                  <p className={style.settingtitle}>{t("available")}</p>
                  <div
                    style={{
                      height: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CustomizedSwitche
                      check={data?.isAvailable}
                      onChange={onStatusChange}
                    />
                  </div>
                </div>
              </div>
              <div className={style.Scheduleday}>
                {data?.features?.length > 0 ? (
                  <div className={style.availability}>
                    {data?.features.map((f: any) => (
                      <div className={style.feacture}>{f?.name}</div>
                    ))}
                  </div>
                ) : (
                  <div className={style.noAvailability}>
                    {t("noFeaturing")}!
                  </div>
                )}
              </div>
            </div>
            <div className={style.rowDetail}>
              <div className={style.format}>
                <div className={style.rowcontent}>
                  <BiSolidPhone size={16} color="#7D7D7D" />
                  <div className={style.textrow}>{data?.contactNumber}</div>
                </div>
                {/* <div className={style.rowcontent}>
                  <MdOutlineMail size={16} color="#7D7D7D" />
                  <div className={style.textrow}>{data?.email}</div>
                </div> */}
                <div className={style.rowcontent}>
                  <MdOutlineLocationOn size={16} color="#7D7D7D" />
                  <div
                    className={style.textRow2}
                  >{`${data?.location?.address}`}</div>
                </div>
              </div>
              {/* <div className={style.detail} onClick={onclickDetail}>
                Edit
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
