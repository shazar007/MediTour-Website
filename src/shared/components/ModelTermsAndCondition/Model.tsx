import React from "react";
import styles from "./ModelTermsAndCondition.module.css"; // Create a CSS module for styles
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const {t} : any = useTranslation()
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <IoClose className={styles.closeButton} onClick={onClose} />

        {children}

        {/* Close button at the bottom */}
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButtonClose} onClick={onClose}>
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
