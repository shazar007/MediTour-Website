import React from "react";
import styles from "./style.module.css";
import cute from "assets/images/cute.png";
import cute1 from "assets/images/cute3.png";
import cute2 from "assets/images/cute2.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const AddPropertyCard = () => {
  const { t }: any = useTranslation();
  const { hotelInfo, user } = useSelector((state: any) => state?.root?.common);

  const navigate = useNavigate();
  return (
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <p>{t("itsEasyToGetStartedOn")}</p>
          <p className={styles.brandName}>MediTour Global</p>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.step}>
            <div className={styles.stepText}>
              <p className={styles.stepText1}>1 {t("tellUsAboutYourPlace")}</p>
              <p className={styles.stepText2}>{t("shareSomeBasicInfo_")}</p>
            </div>
            <img src={cute1} className={styles.stepimage} />
          </div>
          <div className={styles.step}>
            <div className={styles.stepText}>
              <p className={styles.stepText1}>2 {t("makeItStandOut")}</p>
              <p className={styles.stepText2}>{t("addPhotosAndTitle_")}</p>
            </div>
            <img src={cute2} className={styles.stepimage} />
          </div>
          <div className={styles.step}>
            <div className={styles.stepText}>
              <p className={styles.stepText1}>3 {t("finishUpAndPublish")}</p>
              <p className={styles.stepText2}>{t("chosingAStartingPrice_")}</p>
            </div>
            <img src={cute} className={styles.stepimage} />
          </div>
        </div>
      </div>
      <button
        className={styles.getstartedbtn}
        onClick={() =>
          navigate("/hotel/addProperty", { state: { id: user?._id } })
        }
      >
        {t("getStarted")}
      </button>
    </div>
  );
};

export default AddPropertyCard;
