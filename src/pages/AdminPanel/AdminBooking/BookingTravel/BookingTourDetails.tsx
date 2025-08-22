import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./bookingtravel.module.css";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function BookingTourDetails() {
  const { state } = useLocation();
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");
  let departDate = dayjs(state?.tourId?.departDate).format("MM-DD-YYYY ");
  let returnDate = dayjs(state?.tourId?.returnDate).format("MM-DD-YYYY ");
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Booking" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(commonStyles.flxBetween)}>
          <p
            className={classNames(
              commonStyles.fs22,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            Tours
          </p>
          <p
            className={classNames(
              commonStyles.fs18,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            ID: RNT1234
          </p>
        </div>
        <div className={classNames(Styles.flx, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                USER
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Submitted at:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {date}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  MR No.:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.mrNo}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Name:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.name}
                </p>
              </div>{" "}
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Contact:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.phone}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.email}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                TOTAL AMOUNT
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Actual Amount:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  Rs. {state?.actualPrice} /-
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(Styles.mt24)}>
          <div className={classNames(Styles.MessageCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                PACKAGE DETAILS
              </p>
            </div>
            <div className={Styles.messageBody}>
              <div className={commonStyles.flxBetween}>
                <div className={commonStyles.col5}>
                  <div className={classNames(commonStyles.flxBetween)}>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Tour Name:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {state?.tourId?.packageName}
                    </p>
                  </div>
                  <div
                    className={classNames(commonStyles.flxBetween, Styles.mt8)}
                  >
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Date & Time:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {departDate}, {state?.tourId?.departTime}
                    </p>
                  </div>
                  <div
                    className={classNames(commonStyles.flxBetween, Styles.mt8)}
                  >
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Return Date & Time:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {returnDate}, {state?.tourId?.destinationTime}
                    </p>
                  </div>
                </div>
                <div className={commonStyles.col5}>
                  <div className={classNames(commonStyles.flxBetween)}>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Price Per Head:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      Rs. {state?.tourId?.meditourPricePerHead}/-
                    </p>
                  </div>
                  <div
                    className={classNames(commonStyles.flxBetween, Styles.mt8)}
                  >
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Price Per Couple:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      Rs. {state?.tourId?.meditourPricePerCouple} /-
                    </p>
                  </div>
                  <div
                    className={classNames(commonStyles.flxBetween, Styles.mt8)}
                  >
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Meal:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      BreakFast: {state?.tourId?.breakfastQuantity}/ Lunch:
                      {state?.tourId?.lunchQuantity} / Dinner:
                      {state?.tourId?.dinnerQuantity}
                    </p>
                  </div>
                  <div
                    className={classNames(commonStyles.flxBetween, Styles.mt8)}
                  >
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Days:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {state?.tourId?.packageDuration}
                    </p>
                  </div>
                </div>
              </div>
              <div className={classNames(Styles.mt24)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Plans:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.mt8,
                    Styles.colorGray
                  )}
                >
                  {state?.tourId?.dayByDayPlans}
                </p>
              </div>
              <div className={classNames(Styles.mt24)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Rules:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    Styles.mt8
                  )}
                >
                  {state?.tourId?.recentTourPolicy}
                </p>
              </div>

              <div className={classNames(Styles.mt24, commonStyles.flx)}>
                {" "}
                {state?.tourId.images.map((val: any, index: any) => (
                  <img
                    key={index}
                    src={val}
                    className={Styles.imgs}
                    alt={`Tour image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
