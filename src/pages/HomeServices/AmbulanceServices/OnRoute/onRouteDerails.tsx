import classNames from "classnames";
import style from "./ambulanceRoutes.module.css";
import commonStyles from "shared/utils/common.module.css";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import Phone from "assets/images/mingcute_birthday-2-line.png";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { FaRegClock } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

export default function OnRouteDetails() {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const { state } = useLocation();

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonStyles.pl36
          : commonStyles.pr36
      }
    >
      {" "}
      <div className={style.detailCard}>
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ height: "80px", width: "80px" }} />
          <div>
            <p className={style.CardName}>{state?.name}</p>
          </div>
        </div>

        <div
          style={{ alignItems: "start" }}
          className={classNames(style.flxBetween)}
        >
          <div className={style.Rowss}>
            <FaRegClock color="#7d7d7d" className={style.iconss} />
            <div>
              <p className={style.colorTitle}>{t("time")}</p>
              <p className={style.value}>
                {dayjs(state?.createdAt)
                  .locale(isRtl ? "ur" : "en")
                  .format("DD MMM - hh:mm A")}
              </p>
            </div>
          </div>

          <div className={style.Rowss}>
            <img src={Phone} alt="phones" className={style.iconss} />
            <div>
              <p className={style.colorTitle}>{t("contact")}</p>
              <p className={style.value}>{state?.phone}</p>
            </div>
          </div>
          <div className={style.Rowss}>
            <CiLocationOn color="#7d7d7d7" />
            <div>
              <p className={style.colorTitle}>{t("pickUp")}</p>
              <p className={style.value}>--</p>
            </div>
          </div>
          <div className={style.Rowss}>
            <CiLocationOn color="#7d7d7d7" />
            <div>
              <p className={style.colorTitle}>{t("dropOff")}</p>
              <p className={style.value}>--</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.detailCard}>
        <p
          className={classNames(
            commonStyles.fs14,
            commonStyles.semiBold,
            commonStyles.mb16
          )}
        >
          {t("ambulanceDetails")}
        </p>
        <div
          style={{ alignItems: "start" }}
          className={classNames(style.flxBetween)}
        >
          <div className={style.w33}>
            <p className={style.colorTitle}>{t("ambulanceName")}</p>
            <p className={style.value}>{state?.bidRequestId?.ambulanceName}</p>
          </div>

          <div className={style.w33}>
            <p className={style.colorTitle}>{t("ambulanceNumber")} </p>
            <p className={style.value}>{state?.bidRequestId?.ambulanceNo}</p>
          </div>

          <div className={style.w33}>
            <p className={style.colorTitle}> {t("ambulancePrice")}</p>
            <p className={style.value}>{state?.totalAmount}</p>
          </div>
        </div>{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            flexDirection: "column",
            gap: "12px",
            marginTop: "36px",
          }}
        >
          <div className={style.TotalAmount}>
            <p className={style.heading}>{t("totalAmount")}: </p>
            <p className={style.Amount}>Rs. {state?.totalAmount}</p>
          </div>
          {state?.gatewayName === "stripe" && (
            <div className={style.TotalAmount}>
              <p className={style.heading}>{t("totalAmountInDollar")}:</p>
              <p className={style.Amount}>${state?.dollarAmount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
