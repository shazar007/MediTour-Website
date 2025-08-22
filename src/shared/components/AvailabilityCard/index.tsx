import Card from "./Card.module.css";
import React from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import dayjs from "dayjs";
const AvailabilityCard = ({ data, title, subTitle, source }: any) => {
  //

  return (
    <div className={Card.scheduleWrapper}>
      <div className={Card.header}>
        <div
          className={classNames(
            commonstyle.colorBlue,
            commonstyle.fs16,
            commonstyle.semiBold
          )}
        >
          <span
            className={classNames(
              commonstyle.colorBlue,
              commonstyle.fs16,
              commonstyle.semiBold
            )}
            style={{
              margin: "0 5px",
            }}
          >
            {source}
          </span>
          <span>{subTitle || "Availabilty"}</span>
        </div>
        <div
          style={{
            color: "#4cbdb5",
            fontSize: "14px",
          }}
        >
          <span style={{ margin: "0 3px" }}> Fee</span>

          <span>{data?.price?.actualPrice}</span>
          {"/"}
          {"-"}
        </div>
      </div>
      <hr />
      {/* ...... */}
      <div className={Card.scheduleContainer}>
        {data?.availability?.map((item: any, index: any) => (
          <div key={index} className={Card.card}>
            <div className={Card.cardHeader}>
              {<CiCalendar />}
              <span>{dayjs().day(item?.dayOfWeek).format("dddd")}</span>
            </div>
            {item?.morning?.startTime || item?.morning?.endTime ? (
              <div className={Card.cardBody}>
                {<CiClock2 />}
                <span>
                  {item?.morning?.startTime &&
                    dayjs(item?.morning?.startTime, "HH:mm").format("hh:mm A")}
                  {" - "}
                  {"  "}
                  {item?.morning?.endTime &&
                    dayjs(item?.morning?.endTime, "HH:mm").format("hh:mm A")}
                </span>
              </div>
            ) : null}
            {item?.evening?.startTime || item?.evening?.endTime ? (
              <div className={Card.cardBody}>
                {<CiClock2 />}
                <span>
                  {item?.evening?.startTime &&
                    dayjs(item?.evening?.startTime, "HH:mm").format("hh:mm A")}
                  {" - "}
                  {"  "}
                  {item?.evening?.endTime &&
                    dayjs(item?.evening?.endTime, "HH:mm").format("hh:mm A")}
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityCard;
