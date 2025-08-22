import React from "react";
import style from "./green.module.css";
import { MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { BiSolidPhone } from "react-icons/bi";
import { useTranslation } from "react-i18next";
const BranchCard = ({
  onclickDetail,
  data,
}: {
  onclickDetail?: any;
  data?: any;
}) => {
  const { t, i18n }: any = useTranslation();
  const getDayName = (dayOfWeek: number) => {
    const days = [
      t("monday"),
      t("tuesday"),
      t("wednesday"),
      t("thursday"),
      t("friday"),
      t("saturday"),
      t("sunday"),
    ];
    return days[dayOfWeek];
  };
  return (
    <div className={style.card}>
      <div className={style.spaceBetween}>
        <div className={style.firstcolumn}>
          {/* Image Container */}
          <div className={style.imageContainer}>
            <img
              src={
                data?.doctorImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
              }
              className={style.cardimg}
              alt="doctorImage"
            />
          </div>

          {/* Card Content */}
          <div className={style.cardContent}>
            <div className={style.divcardContent}>
              <div className={style.header}>
                <div className={style.textHeader}>{data?.name}</div>
                <div className={style.texteditor}>{t("featuredDoctor")}</div>
              </div>
              <div className={style.locationText}>
                {data?.hasPMDCNumber == true ? t("pmdcVerified") : null}
              </div>
              <div className={style.rowcontent}>
                <div className={style.textrow}>{data?.qualifications}</div>
              </div>
            </div>
            <div className={style.rowdisplay}>
              <div className={style.footer}>
                <div className={style.footerText}>
                  {data?.clinicExperience
                    ? `${data.clinicExperience} ${t("years")}`
                    : t("years")}
                </div>
                <div className={style.footerSubText}>{t("experience")}</div>
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
              ["ur", "ar", "ps"].includes(i18n.language)
                ? style.schedulelang
                : style.schedule
            }
          >
            <div className={style.rowWay}>
              <div className={style.feactureFont}>{t("schedule")}</div>
              <div className={style.Scheduleday}>
                {data?.hospitalAvailability?.[0]?.availability?.length > 0 ? (
                  <div className={style.availability}>
                    {data?.hospitalAvailability?.[0]?.availability?.map(
                      (f: any) => (
                        <div className={style.feacture}>
                          {getDayName(f?.dayOfWeek)}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className={style.noAvailability}>
                    {t("noAvailability")}!
                  </div>
                )}
              </div>
            </div>
            <div className={style.rowDetail}>
              <div className={style.format}>
                <div className={style.rowcontent}>
                  <BiSolidPhone size={16} color="#7D7D7D" />
                  <div className={style.textrow}>{data?.phoneNumber}</div>
                </div>
                <div className={style.rowcontent}>
                  <MdOutlineMail size={16} color="#7D7D7D" />
                  <div className={style.textrow}>{data?.email}</div>
                </div>
                <div className={style.rowcontent}>
                  <MdOutlineLocationOn size={16} color="#7D7D7D" />
                  <div
                    className={style.textRow2}
                  >{`${data?.location?.address}`}</div>
                </div>
              </div>
              <div className={style.detail} onClick={onclickDetail}>
                {t("edit")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
