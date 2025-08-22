import React, { useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const SwitchButton = (props: any) => {
  const { active, setActive } = props;
  const navigate = useNavigate();
  const { systemType } = useSelector((state: any) => state.root.common);
  const { t, i18n }: any = useTranslation();
  const isRtl = useDirection();
  const handleSwitch = (option: any) => {
    setActive(option);
  };

  const check = active === "login" ? "0" : "50%";

  return (
    <div className={classNames(style.capsule_container)}>
      <div
        className={classNames(style.capsule_active)}
        style={{
          left: isRtl ? check : "",

          right: isRtl ? check : "",
        }}
      ></div>
      <div
        className={classNames(style.capsule_button, {
          [style.active]: active === "login",
        })}
        onClick={() => handleSwitch("login")}
        style={{ color: active === "login" ? "white" : "#555" }}
      >
        {t("login")}
      </div>
      <div
        className={classNames(style.capsule_button, {
          [style.active]: active === "signup",
        })}
        onClick={() => handleSwitch("signup")}
        style={{ color: active === "signup" ? "white" : "#555" }}
      >
        {t("signup")}
      </div>
    </div>
  );
};

export default SwitchButton;
