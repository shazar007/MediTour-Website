import React from "react";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import { BiSolidPlaneAlt } from "react-icons/bi";
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

  const styles = useStyles(type); 

  return (
    <div style={styles.card}>
      <div
        className={classNames(
          styles.header,
          commonstyle.flx,
          commonstyle.flxBetween
        )}
        style={{
          borderBottom: "2px solid #E0E0E0",
          paddingBottom: "10px",
        }}
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
              borderRadius: "32px",
              objectFit: "contain" as React.CSSProperties["objectFit"],
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          />
          <span style={styles.text}>{item.agencyId?.name}</span>
        </div>
        <span style={styles.text}>
          {item?.gatewayName === "blink" ? `PKR${item?.bidRequestId?.ticketPrice}` : `$ ${item?.bidRequestId?.dollarAmount}` || `PKR ${item?.ticketPrice}`}
        </span>
      </div>
      {items?.map((userId: any) => (
        <React.Fragment key={userId?.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative",
              color: "#0e54a3",
              margin: "18px 0",
            }}
          >
            <div
              style={{
                marginRight: "10px",
                fontSize: "18px",
                width: "30%",
              }}
            >
              {userId?.from}
            </div>

            {/* Plane Icon and Time */}
            <div
              style={{
                position: "relative",
                flexGrow: 1,
                height: "1px",
                borderTop: "2px dotted #0e54a3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40%",
              }}
            >
              <BiSolidPlaneAlt
                style={{
                  position: "absolute",
                  top: "-33px",
                  fontSize: "24px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  fontSize: "14px",
                  color: "#0e54a3",
                }}
              >
                {/* {bids?.flightTime} */}

                <span>
                  {`${userId?.departureDate} ${dayjs(
                    userId?.departureTime
                  ).format("hh:mm A")}`}
                </span>
              </div>
            </div>

            {/* Right City */}
            <div
              style={{
                marginLeft: "10px",
                fontSize: "18px",
                width: "30%",
                textAlign: "right",
              }}
            >
              {userId?.to}
            </div>
          </div>
          <div style={styles.details}>
            <img
              src={
                userId?.companyLogo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
              }
              alt="Airline Logo"
              style={styles.airlineLogo}
            />
            <span style={styles.text}>{userId?.companyName}</span>
            {/* <span style={styles.text}>
              PKR {item?.ticketPrice || item?.bidRequestId?.ticketPrice}
            </span> */}
          </div>
        </React.Fragment>
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            margin: "5px 0",
          }}
        >
          {!checkType || !item?.eTicket ? (
            <span style={styles.eTicketText}>
              E-Ticket {t("willUploadedInMinutes")}
            </span>
          ) : null}
        </div>

        <button onClick={handledetail} style={styles.button}>
          {t("view")} {t("details")}
        </button>
      </div>
    </div>
  );
};

export default BidDetailsComponent;

const useStyles = (type: any) => ({
  card: {
    width: "61.11vw",
    backgroundColor: "#F5F5F5",
    borderRadius: "8px",
    // margin: "20px auto",
    marginTop: "-15px",
    marginBottom: "20px",
    padding: "20px",
    boxShadow: type ? "none" : "0 8px 20px rgba(0, 0, 0, 0.25)",
    transition: "box-shadow 0.3s ease",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: "2px solid #E0E0E0",
    paddingBottom: "10px",
  },
  logo: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "contain",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  text: {
    fontSize: "18px",
    color: "#00276D",
    fontWeight: "600",
  },
  textBold: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#00276D",
  },
  route: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0",
  },
  planeIcon: {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    color: "#006838",
  },
  dash: {
    borderStyle: "dashed",
    borderBottom: "1px solid #00276D",
    width: "100px",
    margin: "0 8px",
  },
  timeText: {
    fontSize: "12px",
    color: "#666666",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0",
  },
  airlineLogo: {
    width: "48px",
    height: "30px",
    borderRadius: "4px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  eTicketText: {
    color: "rgba(0, 104, 56, 1)",
    fontWeight: "500",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "transparent",
    color: "#00276D",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    border: "none",
    borderRadius: "0",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "color 0.3s ease",
    marginTop: "10px",
    marginLeft: "20px",
    borderBottom: "2px solid #00276D",
  },
});
