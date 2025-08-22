import React from "react";
import { TbCircleCheckFilled } from "react-icons/tb";
import styles from "./ThankyouModel.module.css"; // Assuming you use modular CSS

interface ThankyouModelProps {
  mainMessageLine1?: string;
  mainMessageLine2?: string;
  subMessage?: string;
  footerMessage?: string;
  onClose?: () => void;
}

const ThankyouModel: React.FC<ThankyouModelProps> = ({
  mainMessageLine1,
  mainMessageLine2,
  subMessage,
  footerMessage,
}) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <TbCircleCheckFilled className={styles.icon} />
        <div className={styles.messageContent}>
          <p className={styles.successText}>
            {mainMessageLine1}
            <br />
            {mainMessageLine2}
          </p>
          <div>
            <p className={styles.successText}>{subMessage}</p>
          </div>
          <p className={styles.thankyou}>{footerMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ThankyouModel;
