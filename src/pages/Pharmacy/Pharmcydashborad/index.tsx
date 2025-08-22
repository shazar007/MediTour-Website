import { useEffect } from "react";
import styles from "../Pharmcydashborad/dashborad.module.css";
import style from "./dashborad.module.css";
import commonstyle from "../../../shared/utils/common.module.css";
import classNames from "classnames";
import Request from "assets/images/pharmacyrequets.png";
import Order from "assets/images/phr-Orders.png";
import Payment from "assets/images/phr-Payment.png";
import PhrLineChart from "shared/components/PhrLineChart/lindex";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import {
  PharmacyGRAPH,
  PharmacyGetNotifications,
  PharmacyGraphDETAILSUpperPortion,
} from "shared/services";
import {
  setPharmacyGraphDetails,
  setPharmacyNotication,
  setday2Array,
  setdayArray,
} from "shared/redux";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const data = [
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
];
function PharmcyDashborad() {
  const { t, i18n }: any = useTranslation();
  const { pharmacyGraphDetails, dayArray, dayArray2 } = useSelector(
    (state: any) => state.root.pharmacy
  );
  const { user } = useSelector((state: any) => state.root.common);
  const pharmacy_ID = user?._id;
  const dispatch = useDispatch();

  if (Array.isArray(dayArray)) {
    dayArray.forEach((item, index) => {
      if (data[index]) {
        // make sure slot exists
        data[index].name = item.day;
        data[index].value1 = item.ordersCount;
      }
    });
  }

  if (Array.isArray(dayArray2)) {
    dayArray2.forEach((item, index) => {
      if (data[index]) {
        data[index].name = item.day;
        data[index].value2 = item.ordersCount;
      }
    });
  }

  const GraphDetails = () => {
    PharmacyGraphDETAILSUpperPortion()
      .then((res: any) => {
        if (res?.data) {
          dispatch(
            setPharmacyGraphDetails({
              comOrdersPercentageChange: res.data.comOrdersPercentageChange,
              completeTodayOrdersCount: res.data.completeTodayOrdersCount,
              newOrdersPercentageChange: res.data.newOrdersPercentageChange,
              pendingPercentageChange: res.data.pendingPercentageChange,
              pendingYesOrdersCount: res.data.pendingYesOrdersCount,
              todayOrdersCount: res.data.todayOrdersCount,
            })
          );
        }
      })
      .catch((err: any) => {});
  };

  interface WeekDataItem {
    date: string;
    ordersCount: number;
  }

  const GraphOnly = () => {
    PharmacyGRAPH()
      .then((res: any) => {
        if (res?.status === 200) {
          const currentWeekData: WeekDataItem[] = res.data.currentWeekData;
          const previousWeekData = res.data.previousWeekData;
          const dayArray = currentWeekData?.map((item: WeekDataItem) => {
            const dateObject = new Date(item.date);
            const dayOfWeek = dateObject.toLocaleDateString("en-US", {
              weekday: "short",
            });
            return { day: dayOfWeek, ordersCount: item.ordersCount };
          });

          dispatch(setdayArray(dayArray));

          const dayArray2 = previousWeekData?.map((item: WeekDataItem) => {
            const dateObject = new Date(item.date);
            const dayOfWeek = dateObject.toLocaleDateString("en-US", {
              weekday: "short",
            });

            return { day: dayOfWeek, ordersCount: item.ordersCount };
          });
          dispatch(setday2Array(dayArray2));
        }
      })
      .catch((err: any) => {});
  };
  const Notification = () => {
    PharmacyGetNotifications(pharmacy_ID)
      .then((res: any) => {
        dispatch(setPharmacyNotication(res.data.notifications));
      })
      .catch((err: any) => {});
  };

  useEffect(() => {
    GraphOnly();
    GraphDetails();
    Notification();
  }, []);

  const navigate = useNavigate();

  const handlegoRequest = () => {
    navigate("/pharmacy/requests");
  };

  const handlegoOrder = () => {
    navigate("/pharmacy/orders");
  };

  const handlegoPayment = () => {
    navigate("/pharmacy/payments");
  };

  return (
    <>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyle.pl36
            : commonstyle.pr36
        }
      >
        <div className={classNames(styles.flxp)}>
          <div className={classNames(styles.Maincards)}>
            <div className={styles.flxx16}>
              <img
                src={Request}
                alt="pharmacy Request"
                className={styles.icon}
              />
              <div>
                <p className={style.Card_Values}>
                  {pharmacyGraphDetails?.pendingYesOrdersCount}
                </p>
                <p className={style.Card_Label}>{t("requests")}</p>
              </div>
            </div>
            <div
              className={commonstyle.flxEnd}
              onClick={handlegoRequest}
              style={{ gap: "8px", alignItems: "center", cursor: "pointer" }}
            >
              <p className={style.Card_Detail}>{t("details")}</p>
              <>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={styles.Arrow} />
                ) : (
                  <FaArrowRightLong className={styles.Arrow} />
                )}
              </>{" "}
            </div>
          </div>{" "}
          <div className={classNames(styles.Maincards)}>
            <div className={styles.flxx16}>
              <img src={Order} alt="pharmacy order" className={styles.icon} />
              <div>
                <p className={style.Card_Values}>
                  {pharmacyGraphDetails?.pendingYesOrdersCount}
                </p>
                <p className={style.Card_Label}>{t("orders")}</p>
              </div>
            </div>
            <div
              className={commonstyle.flxEnd}
              onClick={handlegoOrder}
              style={{ gap: "8px", alignItems: "center", cursor: "pointer" }}
            >
              <p className={style.Card_Detail}>{t("details")}</p>
              <>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={styles.Arrow} />
                ) : (
                  <FaArrowRightLong className={styles.Arrow} />
                )}
              </>{" "}
            </div>
          </div>{" "}
          <div className={classNames(styles.Maincards)}>
            <div className={styles.flxx16}>
              <img
                src={Payment}
                alt="pharmacy payment"
                className={styles.icon}
              />
              <div>
                <p className={style.Card_Values}>
                  {pharmacyGraphDetails?.pendingYesOrdersCount}
                </p>
                <p className={style.Card_Label}>{t("payments")}</p>
              </div>
            </div>
            <div
              className={commonstyle.flxEnd}
              onClick={handlegoPayment}
              style={{ gap: "8px", alignItems: "center", cursor: "pointer" }}
            >
              <p className={style.Card_Detail}>{t("details")}</p>
              <>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={styles.Arrow} />
                ) : (
                  <FaArrowRightLong className={styles.Arrow} />
                )}
              </>{" "}
            </div>
          </div>
        </div>
        <div className={classNames(styles.col12)}>
          <div className={styles.graph}>
            <PhrLineChart data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PharmcyDashborad;
