import AdminNavBar from "../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "../adminbooking.module.css";
import { TbRefresh } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function RentACardetail() {
  const { state } = useLocation();
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");
  let pick = dayjs(state?.pickupDateTime).format("MM-DD-YYYY h:mm a");
  let Drop = dayjs(state?.dropoffDateTime).format("MM-DD-YYYY h:mm a");
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
              Rent a Car Details
            </p>
            <TbRefresh className={Styles.refresh} />
          </div>
          <div className={classNames(commonStyles.flx)}>
            <p
              style={{ color: "#00B69B" }}
              className={classNames(commonStyles.f18, commonStyles.semiBold)}
            >
              Booking ID: ABC1234
            </p>
          </div>
        </div>

        <div className={classNames(commonStyles.flx, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
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
                  Company ID:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.rentACarId?.venderId}
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
                  {state?.rentACarId?.name}
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
                  {state?.rentACarId?.email}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Number:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.rentACarId?.location?.address}
                </p>
              </div>
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
                  {state?.rentACarId?.name}
                </p>
              </div>
            </div>
          </div>
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
                  Rs. {state?.totalAmount} /-
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(Styles.flx, Styles.mt24)}>
          <div className={classNames(Styles.VEHICLEDetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                RENT DETAILS
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
                  With Driver:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.withDriver}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Pick-up Location:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.pickupLocation}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Drop-off Location:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.dropoffLocation}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Pick-up Date & Time:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {pick}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Drop-off Date & Time:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {Drop}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.VEHICLEDetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                VEHICLE DETAILS
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
                  Name:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vehicleId?.vehicleName}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Type:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vehicleId?.vehicleType}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Model:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vehicleId?.vehicleModel}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Year:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vehicleId?.vehicleYear}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Color:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vehicleId?.vehicleColour}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  ID No.:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vehicleId?.vehicleVinNo}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Registration No.:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vehicleId?.vehicleRegisterationNo}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Registration Date:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vehicleId?.vehicleRegisterationDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
