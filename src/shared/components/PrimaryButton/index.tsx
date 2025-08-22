import classNames from "classnames";
import styles from "./primarybutton.module.css";
import commonStyles from "shared/utils/common.module.css";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

interface Props {
  variant: any;
  onClick: any;
  disabled: boolean;
  children: any;
  colorType: any;
  arrowNext: boolean;
  type: any;
}
const PrimaryButton = (props: Partial<Props>) => {
  const { t, i18n }: any = useTranslation();
  const { colorType, type, arrowNext } = props;
  return (
    <button
      className={classNames(
        colorType === "green"
          ? commonStyles.btngreen
          : colorType === "blue"
          ? commonStyles.bgBlue
          : colorType === "New_blue"
          ? styles.New_blue
          : colorType === "blueOutline"
          ? styles.BlueOutines
          : colorType === "SkyBlueOutine"
          ? styles.SkyBlueOutine
          : colorType === "MedicalService"
          ? styles.MedicalService
          : colorType === "Ambulance"
          ? styles.Ambulance
          : colorType === "Linear"
          ? styles.Linear
          : colorType === "greenOutline"
          ? styles.GreenOutine
          : colorType === "physiotherapist"
          ? styles.physiotherapist
          : colorType === "Nutritionist"
          ? styles.Nutritionist
          : colorType === "ParamedicStaff"
          ? styles.ParamedicStaff
          : colorType === "Psychologists"
          ? styles.Psychologists
          : colorType === "Travel"
          ? styles.Travel
          : colorType === "Donation"
          ? styles.Donation
          : colorType === "Insurance"
          ? styles.Insurance
          : colorType === "Red"
          ? styles.Red
          : colorType === "admin"
          ? styles.admin
          : commonStyles.bgOrange,
        styles.container,
        styles.cursor,
        commonStyles.colorWhite,
        commonStyles.fs16,
        commonStyles.semiBold
      )}
      onClick={props.onClick}
      disabled={props.disabled}
      type={type}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {props.children}
        {arrowNext &&
          (["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
            <IoArrowBackOutline size={16} />
          ) : (
            <IoArrowForwardOutline size={16} />
          ))}
      </div>
    </button>
  );
};

export default PrimaryButton;
