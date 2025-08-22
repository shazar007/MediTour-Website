import React from "react";
import styles from "./Pervious&NextButton.module.css";
import commomstyles from "../../../shared/utils/common.module.css";
import classNames from "classnames";
interface PerviousNextButtonProps {
  onNext: () => void;
  onPrevious: () => void;
  length: any;
  currentPage: any;
}

function PerviousNextButton({
  onNext,
  onPrevious,
  length,
  currentPage,
}: PerviousNextButtonProps) {
  return (
    <div>
      <div className={styles.flxend}>
        <div className={styles.flx}>
          <div className={styles.pages}>
            <strong>{length}</strong>
          </div>
          <button className={styles.btnss} onClick={onPrevious}>
            <strong>Previous</strong>
          </button>
          <button className={styles.number}>
            <strong>{currentPage}</strong>
          </button>
          <button className={styles.number2}>
            <strong>{currentPage + 1}</strong>
          </button>
          <button className={styles.btnss2} onClick={onNext}>
            <strong>Next</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerviousNextButton;
