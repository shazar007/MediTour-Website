import React from "react";
import email from "./email.module.css";
import Tickmark from "assets/images/success.png";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const EmailSendModel = (props) => {
  const { SuccessModel, setSuccessModel, showText } = props;
  const { systemType } = useSelector((state) => state.root.common);

  const navigate = useNavigate();
  setTimeout(() => {
    setSuccessModel(false);
    // navigate(`/${systemType}/login`)
  }, 2000);
  return (
    <>
      <div className={classNames(email.outer)}>
        <img
          className={classNames(email.imgWidth)}
          alt="Tickmark"
          src={Tickmark}
        />

        <div className={classNames(email.p)}>
          <p>{showText}</p>
        </div>
      </div>
    </>
  );
};
