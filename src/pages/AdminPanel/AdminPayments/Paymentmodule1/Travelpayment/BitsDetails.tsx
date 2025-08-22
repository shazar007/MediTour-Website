import React from "react";
import AdminNavBar from "../../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "../PaymentMODULE1.module.css";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { FaPlaneDeparture } from "react-icons/fa6";

export default function BitsDetails() {
  const { state } = useLocation();
  const flightDetails = state?.bidIds?.[0]?.flightDetails?.[0];
  const flightPolicies = state?.bidIds?.[0]?.flightPolicies;
  const formattedArrivalTime = flightDetails?.arrivalTime
    ? dayjs(flightDetails.arrivalTime).format("hh:mm A")
    : "N/A";
  const formattedDepartureTime = flightDetails?.departureTime
    ? dayjs(flightDetails.departureTime).format("hh:mm A")
    : "N/A";
  const formatFlightTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${mins}m`;
  };

  const formattedFlightTime = flightDetails?.flightTime
    ? formatFlightTime(parseInt(flightDetails.flightTime))
    : "N/A";

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
            Details
          </p>
          <p
            className={classNames(
              commonStyles.fs18,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            ID: {state?.bidIds?.[0]?.requestId || "N/A"}
          </p>
        </div>
        <div className={classNames(Styles.flx, Styles.mt24)}>
          <div style={{ width: "32.2%", marginRight: "24px" }}>
            <div className={classNames(Styles.DetailCard2)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
                >
                  FLIGHT DETAILS
                </p>
              </div>
              <div className={Styles.headerBody}>
                <div className={commonStyles.flxCenter}>
                  <img
                    src={flightDetails?.companyLogo}
                    className={classNames(Styles.plane, Styles.largePlane)}
                    alt="Company Logo"
                  />
                </div>

                <p
                  className={classNames(
                    commonStyles.fs12,
                    commonStyles.medium,
                    commonStyles.colorBlue,
                    Styles.textCenter,
                    Styles.mt8
                  )}
                >
                  {flightDetails?.companyName || "N/A"}, Flight No:
                  {flightDetails?.flightNo || "N/A"}
                </p>
                <div
                  className={classNames(
                    Styles.flxBetween,
                    Styles.mt16,
                    Styles.colorBlue
                  )}
                >
                  <div className={Styles.flightDetailContainer}>
                    <div className={Styles.flightDetailItem}>
                      <p
                        className={classNames(
                          commonStyles.fs10,
                          Styles.flightLocation
                        )}
                      >
                        {flightDetails?.from || "N/A"}
                      </p>
                      <p
                        className={classNames(
                          commonStyles.fs10,
                          Styles.flightTime
                        )}
                      >
                        {formattedDepartureTime}
                      </p>
                    </div>
                    <div className={Styles.flightIconContainer}>
                      <FaPlaneDeparture
                        color="#0e54a3"
                        className={Styles.plane}
                      />
                      <div className={Styles.flightLine}></div>
                      <p
                        className={classNames(
                          commonStyles.fs10,
                          Styles.flightDuration
                        )}
                      >
                        {formattedFlightTime}
                      </p>
                    </div>
                    <div className={Styles.flightDetailItem}>
                      <p
                        className={classNames(
                          commonStyles.fs10,
                          Styles.flightLocationTo
                        )}
                      >
                        {flightDetails?.to || "N/A"}
                      </p>
                      <p
                        className={classNames(
                          commonStyles.fs10,
                          Styles.flightTimeTo
                        )}
                      >
                        {formattedArrivalTime}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={classNames(
                    commonStyles.flxBetween,
                    Styles.mt16,
                    Styles.colorBlue
                  )}
                >
                  <p
                    className={classNames(
                      commonStyles.fs16,
                      commonStyles.medium,
                      Styles.colorBlue
                    )}
                  >
                    {flightDetails?.from || "N/A"}
                  </p>
                  <p
                    className={classNames(
                      commonStyles.fs16,
                      commonStyles.medium
                    )}
                  >
                    {flightDetails?.to || "N/A"}
                  </p>
                </div>
                <div
                  className={classNames(
                    commonStyles.flxBetween,
                    Styles.colorBlue
                  )}
                >
                  <p className={classNames(commonStyles.fs9)}>
                    {flightDetails?.departureDate || "N/A"}
                  </p>
                  <p className={classNames(commonStyles.fs9)}>
                    {flightDetails?.arrivalDate || "N/A"}
                  </p>
                </div>
                <p
                  className={classNames(
                    Styles.textCenter,
                    commonStyles.fs18,
                    commonStyles.mt56,
                    Styles.medium,
                    Styles.colorBlue
                  )}
                >
                  PKR {state?.bidIds?.[0]?.ticketPrice || "N/A"} ||{" "}
                  {state?.adult} Adult, {state?.children} Children,{" "}
                  {state?.infant} Infant
                </p>
              </div>
            </div>
          </div>
          <div style={{ width: "32.2%" }}>
            <div className={classNames(Styles.DetailCard2)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
                >
                  FLIGHT AMENITIES
                </p>
              </div>
              <div className={Styles.headerBody}>
                <ul>
                  {flightDetails?.amenities?.length > 0 ? (
                    flightDetails.amenities.map(
                      (amenity: string, index: number) => (
                        <li key={index}>{amenity}</li>
                      )
                    )
                  ) : (
                    <li>No amenities available</li>
                  )}
                </ul>
              </div>
            </div>
            <div className={classNames(Styles.DetailCard2, Styles.mt24)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
                >
                  FLIGHT POLICIES
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
                    Handbag:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {flightDetails?.noOfHandbag || "N/A"}
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
                    Baggage Weight:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {flightDetails?.baggageWeight || "N/A"}
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
                    Cancellation Deduction:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {flightPolicies?.cancelationDeduction || "N/A"}
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
                    Cancellation Duration:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {flightPolicies?.cancelationDuration || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
