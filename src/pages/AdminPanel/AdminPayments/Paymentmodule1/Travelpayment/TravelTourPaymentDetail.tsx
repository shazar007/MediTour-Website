import React, { useState } from "react";
import AdminNavBar from "../../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "../PaymentMODULE1.module.css";
import Tour from "assets/images/tourPakges.png";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function TravelTourPaymentDetail() {
  const { state } = useLocation();
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");
  let departDate = dayjs(state?.tourId?.departDate).format("MM-DD-YYYY ");
  let returnDate = dayjs(state?.tourId?.returnDate).format("MM-DD-YYYY ");
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payment Booking" />
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
            style={{ color: "#00b69b" }}
          >
            Booking ID: RNT1234
          </p>
        </div>
        <div className={classNames(commonStyles.flxBetween, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard222)}>
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
          <div className={classNames(Styles.DetailCard222)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                VENDOR DETAILS
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
                  Id:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  ABD1234
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
                  {state?.agencyId?.name}
                </p>
              </div>{" "}
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Address:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.agencyId?.location?.address}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.DetailCard222)}>
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
                  {state?.actualPrice}
                </p>
              </div>
              {/* <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Meditour Amount:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  Rs. 800
                </p>
              </div> */}
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
                      {departDate}, {state?.tourId?.departTime}
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      10-02-2024, 06:16 PM
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
                        commonStyles.col5
                      )}
                    >
                      Rs. {state?.tourId?.pricePerHead}/-
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
                        commonStyles.col5
                      )}
                    >
                      Rs. {state?.tourId?.pricePerCouple} /-
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
                        commonStyles.col5
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
                        commonStyles.col5
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
                    Styles.colorGray,
                    Styles.mt8
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
              <div className={classNames(Styles.mt24, commonStyles.flxBetween)}>
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
