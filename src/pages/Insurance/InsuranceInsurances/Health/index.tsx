import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./health.module.css";
import { useNavigate } from "react-router-dom";
import MySelfImg from "assets/images/myself.png";
import FamilyImg from "assets/images/family.png";
import ParentsImg from "assets/images/parents.png";
import { useTranslation } from "react-i18next";

export default function HeathMain() {
  const { t, i18n }: any = useTranslation();

  const navigate = useNavigate();

  const handlenavigate = (cat: any) => {
    navigate(`/insurance/Health/${cat}`, {
      state: { type: cat },
    });
  };

  return (
    <div className={classNames(commonstyles.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        <p className={classNames(commonstyles.fs20, commonstyles.semiBold)}>
          {t("health")}
        </p>
        <div className={classNames(commonstyles.outerContainer)}>
          <div className={classNames(style.Wrapper)}>
            <div
              className={style.myselfcard}
              onClick={() => handlenavigate("mySelf")}
            >
              <p
                className={classNames(
                  commonstyles.fs20,
                  commonstyles.semiBold,
                  commonstyles.colorBlue
                )}
              >
                {t("mySelf")}
              </p>
              <div className={style.textcontainer}>
                <p className={classNames(commonstyles.fs16, style.textdata)}>
                  {t("mySelfDes_")}
                </p>
              </div>

              <div className={style.imgcontainer}>
                <img
                  src={MySelfImg}
                  alt="My Self"
                  className={style.healtImgss}
                />
              </div>
            </div>
            <div
              className={style.myselfcard}
              onClick={() => handlenavigate("family")}
            >
              <p
                className={classNames(
                  commonstyles.fs20,
                  commonstyles.semiBold,
                  commonstyles.colorBlue
                )}
              >
                {t("family")}
              </p>
              <div className={style.textcontainer}>
                <p className={classNames(commonstyles.fs16, style.textdata)}>
                  {t("familyDes_")}
                </p>
              </div>

              <div className={style.imgcontainer}>
                <img
                  src={FamilyImg}
                  alt="Family"
                  className={style.healtImgss}
                />
              </div>
            </div>
            <div
              className={style.myselfcard}
              onClick={() => handlenavigate("parents")}
            >
              <p
                className={classNames(
                  commonstyles.fs20,
                  commonstyles.semiBold,
                  commonstyles.colorBlue
                )}
              >
                {t("parents")}
              </p>
              <div className={style.textcontainer}>
                <p className={classNames(commonstyles.fs16, style.textdata)}>
                  {t("parentsDes_")}
                </p>
              </div>
              <div className={style.imgcontainer}>
                <img
                  src={ParentsImg}
                  alt="Parents"
                  className={style.healtImgss}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
