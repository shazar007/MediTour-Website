import React from "react";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import { BiSolidPlaneAlt } from "react-icons/bi";
import styles from "./style.module.css";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
const BidDetailsComponent = ({
  item,
  type,
  handledetail,
}: {
  item?: any;
  totalTravelers?: any;
  type?: any;
  handledetail?: any;
}) => {
  const {t} : any = useTranslation()
  const checkType = type === "booking";
  const items = checkType
    ? item?.bidRequestId?.flightDetails
    : item?.flightDetails;

  return (
    <>
      <div className={styles.card}>
        <div
          className={classNames(
            styles.header,
            commonstyle.flx,
            commonstyle.flxBetween
          )}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={
                item?.agencyId?.logo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
              }
              alt="Agency Logo"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "fill",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
            <span className={styles.text}>{item.agencyId?.name}</span>
          </div>
          <span className={styles.text}>
            {item?.gatewayName === "blink"
              ? `PKR${item?.bidRequestId?.ticketPrice}`
              : `$ ${item?.bidRequestId?.dollarAmount}` ||
                `PKR ${item?.ticketPrice}`}
          </span>
        </div>
        <div className={styles.flexWrapper}>
  <div className={styles.cardList}>
    {items?.map((userId: any) => (
      <div className={styles.CardContainer} key={userId?.id}>
        {/* Logo */}
        <div className={styles.bidCol}>
          <img
            src={
              userId?.companyLogo ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
            }
            alt="Airline Logo"
            className={styles.airlineLogo}
          />
        </div>

        {/* 2nd column */}
        <div className={styles.bidCol}>
          <div style={{display:'flex', alignItems:'center'}}>
            <BiSolidPlaneAlt size={24} />
            <span className={styles.text}>{userId?.companyName}</span>
        
          </div>
          <span className={styles.timeText}>
            {`${userId?.departureDate} ${dayjs(userId?.departureTime).format("hh:mm A")}`}
          </span>
        
          <div>
            <p className={styles.heading}>{t("from")}</p>
            <p className={styles.detail}>{userId?.from}</p>
          </div>
        </div>

        {/* 3rd column */}
        <div className={classNames(styles.bidCol,styles.bidCol3)} >
          <p className={styles.heading}>{t("to")}</p>
          <p className={styles.detail}>{userId?.to}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Button aligned to right */}
  <div className={styles.buttonWrapper}>
    <button onClick={handledetail} className={styles.button}>
      {t("viewDetails")}
    </button>
  </div>
</div>
{!checkType || !item?.eTicket ? (
        <span className={styles.eTicketText}>
          {t("eTicketUploadedIn_")}
        </span>
      ) : null}

      </div>

     
    </>
  );
};

export default BidDetailsComponent;
