import React from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "./TravelStyle.module.css";
import {useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const FlightContent = ({ item }: { item?: any }) => {

  const {t} : any = useTranslation()
  const navigate = useNavigate();


  const handledetail = (travel: any, totalTravelers: any) => {
    navigate("/services/myRequest/TravellDetail", {
      state: {
        data: travel,
        totalTravelers: totalTravelers,
      },
    });
  };

  const inBooking =
    item.requestId?.adult + item?.requestId?.children + item?.requestId?.infant;

  const checkItme = item?.requestId?.flights;

  return (
    <>
      <div className={classNames(style.mainconatiner)}>
        <div
          className={classNames(
            commonstyle.flx,
            commonstyle.flxBetween,
            commonstyle.col4,
            commonstyle.colsm12,
            commonstyle.colmd6
          )}
        >
          <div>
            <p className={classNames(style.pickdrop)} style={{ color: "#fff" }}>
              {t("flightType")}
            </p>
            <p
              className={classNames(style.pickupdetail)}
              style={{ color: "#fff" }}
            >
              {item?.requestId?.requestType}
            </p>
          </div>

          <div>
            <p className={classNames(style.pickdrop)} style={{ color: "#fff" }}>
              {t("traveler")}
            </p>
            <p
              className={classNames(style.pickupdetail)}
              style={{ color: "#fff" }}
            >
              {inBooking} {t("traveler")}
            </p>
          </div>
        </div>
        {checkItme?.map((user: any) => (
          <div
            className={classNames(
              commonstyle.flx,
              commonstyle.flxBetween,
              commonstyle.flxWrap
            )}
            style={{
              borderBottom: "1.5px dashed #7D7D7D",

              margin: "5px 0",
            }}
          >
            <div className={classNames(style.colwidth)}>
              <DataAtom title={t("from")} description={user?.from} />
            </div>
            <div className={classNames(style.colwidth)}>
              <DataAtom title={t("to")} description={user?.to} />
            </div>

            <div className={classNames(style.colwidth)}>
              <DataAtom
                title={t("class")}
                description={item?.flightClass || item?.requestId?.flightClass}
              />
            </div>
            <div className={classNames(style.colwidth)}>
              <DataAtom
                title={t("departure")}
                description={dayjs(user?.departure).format("MM-DD-YYYY")}
              />
            </div>
          </div>
        ))}
        <div>
          {item?.requestId?.returnFlight && (
            <>
              {checkItme?.map((user: any) => (
                <div
                  className={classNames(
                    commonstyle.flx,
                    commonstyle.flxBetween,
                    commonstyle.flxWrap
                    

             
                  )}
                  style={{
                    borderBottom: "1.5px dashed #7D7D7D",
      
                    margin: "5px 0",
                  }}
                >
                  <div className={classNames(style.colwidth)}>
                    <DataAtom title={t("from")} description={user?.to} />
                  </div>
                  <div className={classNames(style.colwidth)}>
                    <DataAtom title={t("to")} description={user?.from} />
                  </div>

                  <div className={classNames(style.colwidth)}>
                    <DataAtom
                      title={t("class")}
                      description={
                        item?.flightClass || item?.requestId?.flightClass
                      }
                    />
                  </div>
                  <div className={classNames(style.colwidth)}>
                    <DataAtom
                      title={t("returnDate")}
                      description={dayjs(item?.requestId?.returnFlight).format(
                        "MM-DD-YYYY"
                      )}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightContent;
const DataAtom = (props: any) => {
  return (
    <div>
      <p className={classNames(style.pickdrop)} style={{ color: "#fff" }}>
        {props.title}
      </p>
      <p className={classNames(style.pickupdetail)} style={{ color: "#fff" }}>
        {props.description}
      </p>
    </div>
  );
};
