import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import style from "./index.module.css";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface ContinueButtonProps {
  buttonText?: string;
  onClick?: () => void;
  customClass?: string;
  backgroundColor?: string;
  textColor?: string;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({
  buttonText = "Apply",
  onClick,
  customClass = "",
  backgroundColor = "#0e54a3",
  textColor,
}) => {
  const { t, i18n }: any = useTranslation();
const { isRtl } = useDirection();
  return (
    <div className={style.showMoreContainer}>
      <button
        onClick={onClick}
        className={`${style.showMoreButton} ${customClass}`}
        style={{
          backgroundColor,
          // color: textColor || "inherit", // Commented out line
        }}
      >
        {buttonText}
        <span className={style.icon}
        
        style={isRtl? {transform: "rotate(180deg)" }: undefined}
        >
          <IoMdArrowForward />
        </span>
      </button>
    </div>
  );
};

export default ContinueButton;
