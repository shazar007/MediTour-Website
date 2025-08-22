import classNames from "classnames";
import { useEffect } from "react";
import style from "./InsuranceDashboard.module.css";
import commonstyles from "shared/utils/common.module.css";
import Request from "assets/images/insurancerequest.png";
import insuranceinsurance from "assets/images/insuranceinsurance.png";
import person from "assets/images/insuranceperson.png";
import payment from "assets/images/insurancepayment.png";
import InsuranceLineChart from "shared/components/InsuranceCharts/InsuranceStackChart";
import {
  insuranceDashDetails,
  insuranceMonthsGraph,
} from "shared/services/Insurance";
import {
  setDashboardMonthsArray,
  setInsuranceDashDetails,
  setInsuranceDashboardRenderFlag,
} from "shared/redux";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Mon", Health: 10, Travel: 75 },
  { name: "Tue", Health: 75, Travel: 100 },
  { name: "Wed", Health: 100, Travel: 125 },
  { name: "Thu", Health: 125, Travel: 150 },
  { name: "Fri", Health: 75, Travel: 100 },
  { name: "Sat", Health: 65, Travel: 25 },
  { name: "Sun", Health: 75, Travel: 72 },
];
const data2 = [
  { name: "Jan", PreviousCustomer: 90, NewCustomer: 0 },
  { name: "Feb", PreviousCustomer: 300, NewCustomer: 10 },
  { name: "Mar", PreviousCustomer: 20, NewCustomer: 350 },
  { name: "Apr", PreviousCustomer: 340, NewCustomer: 15 },
  { name: "May", PreviousCustomer: 20, NewCustomer: 250 },
  { name: "Jun", PreviousCustomer: 360, NewCustomer: 35 },
  { name: "Jul", PreviousCustomer: 15, NewCustomer: 350 },
  { name: "Aug", PreviousCustomer: 15, NewCustomer: 350 },
  { name: "Sep", PreviousCustomer: 300, NewCustomer: 350 },
  { name: "Oct", PreviousCustomer: 15, NewCustomer: 350 },
  { name: "Nov", PreviousCustomer: 100, NewCustomer: 150 },
  { name: "Dec", PreviousCustomer: 200, NewCustomer: 250 },
];
function InsuranceDashboard() {
  const {
    insuranceDashDetailss,
    insuranceDashboardRenderFlag,
    dashboardMonthsArray,
  } = useSelector((state: any) => state.root.insurance);
  const { t, i18n }: any = useTranslation();

  const dispatch = useDispatch();
  //

  insuranceDashDetailss.healthPayments.forEach(
    (item: { Days: string; totalAmount: number }, index: number) => {
      data[index].name = item.Days;
      data[index].Health = item.totalAmount;
    }
  );

  insuranceDashDetailss.travelPayments.forEach(
    (item: { totalAmount: number }, index: number) => {
      data[index].Travel = item.totalAmount;
    }
  );

  dashboardMonthsArray.forEach(
    (
      item: { month: string; newCustomers: number; previousCustomers: number },
      index: number
    ) => {
      data2[index].name = item.month;
      data2[index].PreviousCustomer = item.previousCustomers;
      data2[index].NewCustomer = item.newCustomers;
    }
  );

  interface healthPaymentsArray {
    totalAmount: number;
    _id: string;
  }
  const GraphDetails = () => {
    insuranceDashDetails()
      .then((res: any) => {
        const healthPayments: healthPaymentsArray[] = res.data.healthPayments;
        const healthArray = healthPayments.map((item: healthPaymentsArray) => {
          const dateObject = new Date(item._id);
          const dayName = dateObject.toLocaleDateString("en-US", {
            weekday: "short",
          });
          return {
            Days: dayName,
            totalAmount: item.totalAmount,
          };
        });

        const travelPayments: healthPaymentsArray[] = res.data.travelPayments;
        const travelArray = travelPayments.map((item: healthPaymentsArray) => {
          const dateObject = new Date(item._id);
          const dayName = dateObject.toLocaleDateString("en-US", {
            weekday: "short",
          });
          return {
            Days: dayName,
            totalAmount: item.totalAmount,
          };
        });

        dispatch(
          setInsuranceDashDetails({
            todayRequestCount: res.data.todayRequestCount,
            todayCustomerCount: res.data.todayCustomerCount,
            healthPayments: healthArray,
            travelPayments: travelArray,
            totalTravelPayments: res.data.totalTravelPayments,
            totalHealthPayments: res.data.totalHealthPayments,
            totalRevenue: res.data.totalRevenue,
          })
        );
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  interface MonthDataItem {
    month: string;
    newCustomers: number;
    previousCustomers: number;
  }
  const fetchMonthGraph = () => {
    insuranceMonthsGraph()
      .then((res: any) => {
        const currentTodayRequest: MonthDataItem[] = res.data;
        const monthArray = currentTodayRequest.map((item: MonthDataItem) => {
          const dateObject = new Date(item.month);
          const Months = dateObject.toLocaleDateString("en-US", {
            month: "short",
          });

          return {
            month: Months,
            newCustomers: item.newCustomers,
            previousCustomers: item.previousCustomers,
          };
        });
        dispatch(setDashboardMonthsArray(monthArray));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  useEffect(() => {
    if (insuranceDashboardRenderFlag) {
      GraphDetails();

      dispatch(setInsuranceDashboardRenderFlag(false));
    }
  }, [insuranceDashboardRenderFlag]);

  useEffect(() => {
    GraphDetails();
    fetchMonthGraph();
  }, []);
  const navigate = useNavigate();

  const handlegoinsurance = () => {
    navigate("/insurance/Category");
  };

  const handlegoRequest = () => {
    navigate("/insurance/request");
  };
  const handlegoinsuredPerson = () => {
    navigate("/insurance/insuredperson");
  };

  const handlegoPayment = () => {
    navigate("/insurance/payments");
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
        <div className={classNames(commonstyles.flx)} style={{ gap: "24px" }}>
          <div className={classNames(style.requestCard)}>
            <div className={commonstyles.flx} style={{ gap: "12px" }}>
              <img
                src={insuranceinsurance}
                alt="insuranceinsurance"
                className={style.iconss}
              />

              <div>
                <p className={style.Card_Values}>
                  {insuranceDashDetailss?.todayCustomerCount}
                </p>
                <p className={style.Card_Label}>{t("insurances")}</p>
              </div>
            </div>
            <div className={style.fleEnd} onClick={handlegoinsurance}>
              <p className={style.Card_Detail}>{t("details")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <FaArrowLeftLong className={style.Arrow} />
              ) : (
                <FaArrowRightLong className={style.Arrow} />
              )}
            </div>
          </div>
          <div className={classNames(style.requestCard)}>
            <div className={commonstyles.flx} style={{ gap: "12px" }}>
              <img
                src={Request}
                alt="Insurance Request"
                className={style.iconss}
              />

              <div>
                <p className={style.Card_Values}>
                  {insuranceDashDetailss?.todayRequestCount}
                </p>
                <p className={style.Card_Label}> {t("requests")}</p>
              </div>
            </div>
            <div className={style.fleEnd} onClick={handlegoRequest}>
              <p className={style.Card_Detail}>{t("details")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <FaArrowLeftLong className={style.Arrow} />
              ) : (
                <FaArrowRightLong className={style.Arrow} />
              )}
            </div>
          </div>
          <div className={classNames(style.requestCard)}>
            <div className={commonstyles.flx} style={{ gap: "12px" }}>
              <img src={person} alt="Request Card" className={style.iconss} />

              <div>
                <p className={style.Card_Values}>
                  {" "}
                  {insuranceDashDetailss?.todayCustomerCount}
                </p>
                <p className={style.Card_Label}>{t("insuredPerson")}</p>
              </div>
            </div>
            <div className={style.fleEnd} onClick={handlegoinsuredPerson}>
              <p className={style.Card_Detail}>{t("details")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <FaArrowLeftLong className={style.Arrow} />
              ) : (
                <FaArrowRightLong className={style.Arrow} />
              )}
            </div>
          </div>{" "}
          <div className={classNames(style.requestCard)}>
            <div className={commonstyles.flx} style={{ gap: "12px" }}>
              <img
                src={payment}
                alt="Insurance Pymenets"
                className={style.iconss}
              />

              <div>
                <p className={style.Card_Values}>
                  {insuranceDashDetailss?.totalRevenue}
                </p>
                <p className={style.Card_Label}>{t("payments")}</p>
              </div>
            </div>
            <div className={style.fleEnd} onClick={handlegoPayment}>
              <p className={style.Card_Detail}>{t("details")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <FaArrowLeftLong className={style.Arrow} />
              ) : (
                <FaArrowRightLong className={style.Arrow} />
              )}
            </div>
          </div>
        </div>
        <div className={classNames(style.CustomerGraph)}>
          <InsuranceLineChart data2={data2} />
        </div>
      </div>
    </div>
  );
}

export default InsuranceDashboard;
