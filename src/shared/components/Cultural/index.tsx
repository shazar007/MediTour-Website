import React from "react";
import style from "./style.module.css";
import green from "assets/images/grenFLex.png";
import { useTranslation } from "react-i18next";
const Cultural = ({ data, title }: { data?: any; title?: any }) => {
  const { t }: any = useTranslation();
  return (
    <div className={style.mainContainer}>
      <div className={style.tourism}>
        <img src={data?.img1} alt="tourism" className={style.topImage} />
        {title === "PAKISTAN" && (
          <img src={green} alt="green" className={style.greenImage} />
        )}
        <div className={style.bottomDiv}>
          <div className={style.topView}>
            <div className={style.header}>
              <div className={style.topText}>{t(data?.Heading)}</div>
              <div className={style.bar} />
            </div>
            {/* <div className={style.right}>
              <div className={style.bookNow}>Book Now</div>
            </div> */}
            <p className={style.customTest}>{t(data?.h1)}</p>
            <p className={style.para}>{t(data?.paragraph)}</p>
          </div>
        </div>
      </div>
      <div className={style.tourism}>
        <img src={data?.img2} alt="tourism2" className={style.topImage} />
        {title === "PAKISTAN" && (
          <img src={green} alt="green3" className={style.greenImage} />
        )}
        <div className={style.bottomDiv}>
          <div className={style.topView}>
            <div className={style.header}>
              <div className={style.topText}>{t(data?.Heading2)}</div>
              <div className={style.bar} />
            </div>
            {/* <div className={style.right}>
              <div className={style.bookNow}>Book Now</div>
            </div> */}
            <p className={style.customTest}>{t(data?.h2)}</p>

            <p className={style.para}>{t(data?.paragraph2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cultural;
