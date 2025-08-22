import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import styles from "./Pervious&NextButton.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
interface PaginationProps {
  onNext?: () => void;
  onPrevious?: () => void;
  length?: any;
  currentPage?: any;
}
export default function Pagination({
  onNext,
  onPrevious,
  length,
  currentPage = 3,
}: PaginationProps) {
  return (
    <div className={classNames(styles.flx, styles.gray)}>
      <p className={classNames(commonstyles.fs14, commonstyles.semiBold)}>
        {currentPage} of {length}
      </p>
      <FaChevronLeft className={styles.Paginationicons} onClick={onPrevious} />
      <FaChevronRight className={styles.Paginationicons} onClick={onNext} />
    </div>
  );
}
