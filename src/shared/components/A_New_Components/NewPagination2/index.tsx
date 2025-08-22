import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./pagination.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import { useDirection } from "shared/utils/DirectionContext";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  onNext?: any;
  onPrevious?: any;
  startItem?: number;
  endItem?: number;
  totalItems?: number;
}

const NewPagination2: React.FC<PaginationProps> = ({
  onNext,
  onPrevious,
  startItem,
  endItem,
  totalItems,
}) => {
  const isRtl = useDirection();
  const { t, i18n }: any = useTranslation();
  return (
    <div className={styles.pagination}>
      <div className={styles.gray}>
        <p className={classNames(commonstyles.fs14, commonstyles.semiBold)}>
          {startItem}-{endItem} {t("of")} {totalItems}
        </p>
      </div>
      <button
        className={classNames(styles.Paginationicons)}
        onClick={onPrevious}
        disabled={startItem === 1}
      >
        {isRtl ? (
          <IoCaretForwardSharp
            size={35}
            className={classNames(styles.forwardback)}
          />
        ) : (
          <IoCaretBackSharp
            size={35}
            className={classNames(styles.forwardback)}
          />
        )}
      </button>
      <button
        className={classNames(styles.Paginationicons)}
        onClick={onNext}
        disabled={endItem === totalItems}
      >
        {isRtl ? (
          <IoCaretBackSharp
            size={35}
            className={classNames(styles.forwardback)}
          />
        ) : (
          <IoCaretForwardSharp
            size={35}
            className={classNames(styles.forwardback)}
          />
        )}
      </button>
    </div>
  );
};

export default NewPagination2;
