import AdminNavBar from "../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "../adminbooking.module.css";
import { TbRefresh } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function HotelDetail() {
  const { state } = useLocation();
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");
  const ChickIn = dayjs(state?.arrivalDate?.from).format(" MM-DD-YYYY");
  const Chickout = dayjs(state?.arrivalDate?.to).format(" MM-DD-YYYY");
  const totalAmount = Number(state?.totalAmount) + Number(state?.processingFee);
  const remainingAmount = totalAmount - Number(state?.paidByUserAmount);
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Booking" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <p
              className={classNames(
                commonStyles.fs22,
                Styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              Hotel Details
            </p>
            <TbRefresh className={Styles.refresh} />
          </div>
          <div className={classNames(commonStyles.flx)}>
            <p
              style={{ color: "#00B69B" }}
              className={classNames(commonStyles.f18, commonStyles.semiBold)}
            >
              Booking ID: {state?.bookingId}
            </p>
          </div>
        </div>

        <div className={classNames(commonStyles.flx, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                PROPERTY
              </p>
            </div>
            <div className={Styles.headerBody}>
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
                  {state?.hotelId?.name}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.hotelId?.email}
                </p>
              </div>
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
                  {state?.hotelId?.phoneNumber}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                GUEST
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
              </div>
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
        </div>

        <div className={classNames(Styles.flx, Styles.mt24)}>
          <div className={classNames(Styles.labDetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                PLAN
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
                  No. of guest:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.noOfGuest}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  No. of rooms:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.rooms?.length}
                </p>
              </div>

              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  No. of Appartments:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.apartments?.length}
                </p>
              </div>

              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Check in:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {ChickIn}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Check out:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {Chickout}
                </p>
              </div>
            </div>
          </div>
          <div style={{ width: "32.2%" }}>
            <div className={classNames(Styles.textDetailCard)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
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
                    Amount:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.totalAmount}/-
                  </p>
                </div>
                <div className={classNames(commonStyles.flxBetween)}>
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Fee:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.processingFee}/-
                  </p>
                </div>
                <div className={classNames(commonStyles.flxBetween)}>
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Total Amount:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {totalAmount}/-
                  </p>
                </div>
                <div className={classNames(commonStyles.flxBetween)}>
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Fully Paid:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.isPaidFull ? "Yes" : "No"}
                  </p>
                </div>
                <div className={classNames(commonStyles.flxBetween)}>
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Paid Amount:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.paidByUserAmount}/-
                  </p>
                </div>
                {!state?.isPaidFull && (
                  <div className={classNames(commonStyles.flxBetween)}>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.semiBold
                      )}
                    >
                      Remaining Amount:
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray
                      )}
                    >
                      {remainingAmount}/-
                    </p>
                  </div>
                )}

                {/* {!state?.isPaidFull} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
