import React from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./ambulancepayments.module.css";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import { TbRefresh } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function AmbulancePaymentsDetails() {
  const { state } = useLocation();
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");
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
            Route Bid
          </p>

          <p
            style={{ color: "#00B69B" }}
            className={classNames(commonStyles.f18, commonStyles.semiBold)}
          >
            Request ID: REQ1234
          </p>
        </div>

        <div className={classNames(Styles.flx, Styles.gap24, Styles.mt24)}>
          <div className={commonStyles.col5}>
            {" "}
            <div className={classNames(Styles.DetailCard)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
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
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {date}
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
                    MR No.:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.userId?.mrNo}
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
                    Name:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.userId?.name}
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
                    Contact:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.userId?.phone}
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
                    Email:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.userId?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className={classNames(Styles.DetailCard, Styles.mt24)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
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
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    PRO1234
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
                    Name:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.ambulanceId?.name}
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
                    Address:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.ambulanceId?.location?.address}
                  </p>
                </div>{" "}
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Ambulance Name:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.bidRequestId?.ambulanceName}
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
                    Ambulance No:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.bidRequestId?.ambulanceNo}
                  </p>
                </div>{" "}
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Price
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.bidRequestId?.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={commonStyles.col7}>
            <div className={classNames(Styles.DetailCard)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
                >
                  USER REQUEST
                </p>
              </div>
              <div className={Styles.headerBody}>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Pick up Location:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.requestId?.pickUp?.address}
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
                    Drop-off Location:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.requestId?.dropOff?.address}
                  </p>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
