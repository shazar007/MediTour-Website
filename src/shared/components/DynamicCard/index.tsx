import React from "react";
import CardStyless from "./CardStyless.module.css";
import CommonStyless from "shared/utils/common.module.css";
import Vector from "assets/images/Vector.png";
import classNames from "classnames";
import RatingStar from "shared/RatingStar";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
import DoctorCard from "../A_New_Components/DoctorCard";
import PhysiotheristsEmpty from "../PhsiotheristEmpty";

interface Props {
  data?: any;
  onPressDetail?: any;
}

const DynamicCard = (props: Props) => {
  const { data, onPressDetail } = props;
  return (
    <div className={classNames(CommonStyless.mb28, CommonStyless.mt28)}>
      <div className={CardStyless.cardContainer}>
        {data?.doctors?.length > 0 ? (
          data.doctors.map((doc: any, index: number) => (
            <DoctorCard
              key={index}
              item={doc}
              onClick={onPressDetail}
            // type="speciality"
            />
          ))
        ) : (
          <div
            style={{
              margin: "0 auto",
            }}
          >
            <PhysiotheristsEmpty />
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicCard;
