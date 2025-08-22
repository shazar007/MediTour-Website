import classNames from "classnames";
import React from "react";
import style from "./style.module.css";
import commonstyle from "shared/utils/common.module.css";
import drcall from "assets/images/HospitalDashboard/drcall.png";
import clinic from "assets/images/HospitalDashboard/clinic.png";
import { FaClinicMedical } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import dayjs from "dayjs";

interface CardData {
  title: string;
  date: string;
  typeLabel: string;
  typeImg?: string;
  typeIcon?: JSX.Element;
  amountStatus: string;
  segmentType: any;
}

const AppoinmentHistory = ({ data }: { data?: any }) => {
  return (
    <div className={classNames(commonstyle.mt12)}>
      <div className={classNames(style.card)}>
        <div
          className={classNames(
            commonstyle.flx,
            commonstyle.flxBetween,
            commonstyle.flxWrap
          )}
        >
          <div className={style.cardtitle}>Appointments History</div>
          {/* <div className={style.details}>Details</div> */}
        </div>

        <div className={style.cardrow}>
          <SegmentCard
            title={data?.status}
            date={dayjs(data?.appointmentDateAndTime).format(
              "DD-MMM-YYYY-h:mmA"
            )}
            Label={data?.appointmentType}
            Img={drcall}
            Icon={data.typeIcon}
            amountStatus={data?.isPaidFull}
            segmentType={data?.status}
          />
        </div>
      </div>
    </div>
  );
};

export default AppoinmentHistory;

const SegmentCard = ({
  title,
  date,
  Label,
  Icon,
  Img,
  amountStatus,
  segmentType,
}: {
  title?: any;
  date?: any;
  Label?: any;
  Icon?: any;
  Img?: any;
  amountStatus?: any;
  segmentType?: any;
}) => {
  return (
    <div className={style.segmentcards}>
      <div className={classNames(style[segmentType])}></div>
      <div>
        <p className={classNames(style.title, style.mb4)}>{title}</p>
        <p
          className={classNames(style.label, style.mb4)}
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {date}
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          {Img ? (
            <img
              src={Img}
              alt={Label}
              className={style.iconImg}
              style={{ width: "16px", height: "16px" }}
            />
          ) : (
            Icon
          )}
          <p className={style.label}>{Label}</p>
        </div>
        <p className={style.amountstatus}>
          {amountStatus === true ? "Paid" : "Partial"}
        </p>
      </div>
    </div>
  );
};
