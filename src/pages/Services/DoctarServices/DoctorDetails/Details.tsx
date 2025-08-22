import classNames from "classnames";
import React from "react";
import style from "./detail.module.css";

interface DetailProps {
  title: string[];
  detail?: string[];
}

const Details: React.FC<DetailProps> = ({ title, detail }) => {
  return (
    <div className={classNames(style.detailsContainer)}>
      {title.map((t, index) => (
        <div
          key={index}
          style={{
            marginTop: "24px",
          }}
        >
          <p className={classNames(style.title)}>{t}</p>
          {detail && detail[index] && (
            <p className={style.detail}>{detail[index]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Details;
