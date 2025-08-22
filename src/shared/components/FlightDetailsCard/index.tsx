import React from "react";
import styles from "./FlightDetailsCard.module.css";
import dayjs from "dayjs";
const FlightDetailsCard = ({
  details,
  itemIndex,
  show,
}: {
  details?: any;
  itemIndex?: any;
  show?: any;
}) => {
  return (
    <div className={styles.cardContainer}>
      {show && <div className={styles.subTitle}>Return Flights Details</div>}
      <div key={itemIndex} className={styles.sectionContainer}>
        {details?.length > 0 ? (
          details.map((user: any, index: any) => (
            <div key={index} className={styles.detailCard}>
              <div className={styles.section}>
                <span className={styles.labelText}>Company Logo</span>
                <img
                  src={user?.companyLogo}
                  alt="Company Logo"
                  className={styles.companyLogo}
                />
              </div>
              <div className={styles.section}>
                <span className={styles.labelText}>Company Name</span>
                <span className={styles.valueText}>{user?.companyName}</span>
              </div>
              <div className={styles.section}>
                <span className={styles.labelText}>From</span>
                <span className={styles.valueText}>{user?.from}</span>
              </div>
              <div className={styles.section}>
                <span className={styles.labelText}>To</span>
                <span className={styles.valueText}>{user?.to}</span>
              </div>
              <div className={styles.section}>
                <span className={styles.labelText}>Departure Date</span>
                <span className={styles.valueText}>
                  {dayjs(user?.departureDate).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className={styles.section}>
                <span className={styles.labelText}>Departure Time</span>
                <span className={styles.valueText}>
                  {dayjs(user?.departureTime).format("hh:mm A")}
                </span>
              </div>
              <div className={styles.section}>
                <span className={styles.labelText}>Arrival Date</span>
                <span className={styles.valueText}>
                  {dayjs(user?.arrivalDate).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className={styles.section}>
                <span className={styles.labelText}>Arrival Time</span>
                <span className={styles.valueText}>
                  {dayjs(user?.arrivalTime).format("hh:mm A")}
                </span>
              </div>
              <div className={styles.subTitle}>Flight Amenities</div>
              <div className={styles.amenitiesList}>
                {user?.amenities?.map((amenity: any, index: any) => (
                  <span key={index} className={styles.amenity}>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <span>No flight details found</span>
        )}
      </div>
    </div>
  );
};

export default FlightDetailsCard;
