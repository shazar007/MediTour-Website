import { useEffect } from "react";
import style from "./DonationDashBoard.module.css";

import commonstyles from "shared/utils/common.module.css";
import Donors from "assets/images/donationDonor.png";
import Packages from "assets/images/donationpackage.png";
import Criteria from "assets/images/donationCirtia.png";
import Payments from "assets/images/donationpay.png";
import { useDispatch, useSelector } from "react-redux";

import CustomLineChartDonation from "shared/components/DonationLineChar/LineChart";
import {
  donationDONORLIST,
  donationGRAPH,
  donationGraphDETAILSUpperPortion,
  donationTOPDONORS,
} from "shared/services/Donation";
import {
  setDonationGraphDetails,
  setGraphdata,
  setTodayDonations,
  setTopDonorsArray,
  setYesterdayDonations,
} from "shared/redux";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "", value: 0 },
  { name: "", value: 0 },
  { name: "", value: 0 },
  { name: "", value: 0 },
  { name: "", value: 0 },
  { name: "", value: 0 },
  { name: "", value: 0 },
  { name: "", value: 0 },
];
function DonationDashBoard() {
  const { t, i18n }: any = useTranslation();
  const { graphdata, donationGraphDetails } = useSelector(
    (state: any) => state.root.donation
  );
  const dispatch = useDispatch();

  graphdata.forEach(
    (item: { day: string; totalAmount: number }, index: number) => {
      data[index].name = item.day;
      data[index].value = item.totalAmount;
    }
  );

  const GraphDetails = () => {
    donationGraphDETAILSUpperPortion()
      .then((res: any) => {
        if (res?.data) {
          dispatch(
            setDonationGraphDetails({
              totalDonations: res.data.totalAmount,
              donatedPeople: res.data.totalDonors,
              totalPackages: res.data.totalPackages,
            })
          );
        }
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  interface WeekDataItem {
    date: string;
    totalAmount: number;
  }
  const GraphOnly = () => {
    donationGRAPH()
      .then((res: any) => {
        if (res?.status === 200) {
          const currentWeekData: WeekDataItem[] = res.data.currentWeekData;
          const dayArray = currentWeekData.map((item: WeekDataItem) => {
            const dateObject = new Date(item.date);
            const dayOfWeek = dateObject.toLocaleDateString("en-US", {
              weekday: "short",
            });
            return { day: dayOfWeek, totalAmount: item.totalAmount };
          });
          dispatch(setGraphdata(dayArray));
        }
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  const fetchDonorLists = () => {
    donationDONORLIST()
      .then((res: any) => {
        dispatch(setTodayDonations(res?.data?.todayDonations?.donations));
        dispatch(
          setYesterdayDonations(res?.data?.yesterdayDonations?.donations)
        );
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  const fetchTopDonors = () => {
    donationTOPDONORS()
      .then((res: any) => {
        dispatch(setTopDonorsArray(res?.data?.donations));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  useEffect(() => {
    GraphDetails();
    GraphOnly();
    fetchDonorLists();
    fetchTopDonors();
  }, []);
  const navigate = useNavigate();

  const handlegoDonor = () => {
    navigate("/donation/donors");
  };

  const handlegoCriteria = () => {
    navigate("/donation/criteria");
  };
  const handlegoPackages = () => {
    navigate("/donation/packages");
  };

  const handlegoPayment = () => {
    navigate("/donation/payments");
  };
  return (
    <>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        <div className={style.flx}>
          <div>
            <div className={style.dashCard}>
              <div className={style.flxcard}>
                <img src={Donors} alt="Donor" className={style.Icons} />
                <div>
                  <p className={style.Value}>
                    {donationGraphDetails?.donatedPeople}
                  </p>{" "}
                  <p className={style.Title}>{t("donors")}</p>
                </div>
              </div>
              <div className={style.FlxEnd} onClick={handlegoDonor}>
                <p className={style.Card_Detail}>{t("details")}</p>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={style.Arrow} />
                ) : (
                  <FaArrowRightLong className={style.Arrow} />
                )}
              </div>
            </div>
          </div>
          <div className={style.dashCard}>
            <div className={style.flxcard}>
              <img
                src={Packages}
                alt="Donation Packages"
                className={style.Icons}
              />
              <div>
                <p className={style.Value}>
                  {" "}
                  {donationGraphDetails?.totalPackages}
                </p>{" "}
                <p className={style.Title}>{t("packages")}</p>
              </div>
            </div>
            <div className={style.FlxEnd} onClick={handlegoPackages}>
              <p className={style.Card_Detail}>{t("details")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <FaArrowLeftLong className={style.Arrow} />
              ) : (
                <FaArrowRightLong className={style.Arrow} />
              )}
            </div>
          </div>{" "}
          <div className={style.dashCard}>
            <div className={style.flxcard}>
              <img
                src={Criteria}
                alt="Package Cirteria"
                className={style.Icons}
              />
              <div>
                <p className={style.Value}>20</p>{" "}
                <p className={style.Title}>{t("criteria")}</p>
              </div>
            </div>
            <div className={style.FlxEnd} onClick={handlegoCriteria}>
              <p className={style.Card_Detail}>{t("details")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <FaArrowLeftLong className={style.Arrow} />
              ) : (
                <FaArrowRightLong className={style.Arrow} />
              )}
            </div>
          </div>{" "}
          <div className={style.dashCard}>
            <div className={style.flxcard}>
              <img
                src={Payments}
                alt="Donations Payments"
                className={style.Icons}
              />
              <div>
                <p className={style.Value}>
                  {" "}
                  {donationGraphDetails?.totalDonations}
                </p>{" "}
                <p className={style.Title}>{t("payments")}</p>
              </div>
            </div>
            <div className={style.FlxEnd} onClick={handlegoPayment}>
              <p className={style.Card_Detail}>{t("details")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <FaArrowLeftLong className={style.Arrow} />
              ) : (
                <FaArrowRightLong className={style.Arrow} />
              )}
            </div>
          </div>
        </div>
        <div className={commonstyles.outerContainer}>
          <CustomLineChartDonation data={data} />
        </div>
      </div>
    </>
  );
}

export default DonationDashBoard;
