import React from "react";
import style from "./Cards.module.css";
import { FaClock } from "react-icons/fa6";
import dayjs from "dayjs";

interface CardProps {
  days: any;
}

const Card: React.FC<CardProps> = ({ days }) => {
  return (
    <div className={style.card}>
      {days?.availability?.map((item: any, index: any) => (
        <div className={style.cardbody} key={index}>
          <p className={style.col1}>
            {dayjs().day(item?.dayOfWeek).format("dddd")}
          </p>
          {item?.morning?.startTime || item?.morning?.endTime ? (
            <p className={style.col2}>
              <span className={style.icons}>
                <FaClock />
              </span>
              {item?.morning?.startTime &&
                dayjs(item?.morning?.startTime, "HH:mm").format("hh:mm A")}
              {" - "}
              {"  "}
              {item?.morning?.endTime &&
                dayjs(item?.morning?.endTime, "HH:mm").format("hh:mm A")}
            </p>
          ) : null}

          {item?.evening?.startTime || item?.evening?.endTime ? (
            <p className={style.col2}>
              <span className={style.icons}>
                <FaClock />
              </span>
              {item?.evening?.startTime &&
                dayjs(item?.evening?.startTime, "HH:mm").format("hh:mm A")}
              {" - "}
              {"  "}
              {item?.evening?.endTime &&
                dayjs(item?.evening?.endTime, "HH:mm").format("hh:mm A")}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Card;
