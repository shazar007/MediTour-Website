import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./pagination.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface PaginationProps {
  onNext?: () => void;
  onPrevious?: () => void;
  startItem?: number;
  endItem?: number;
  totalItems?: number;
}

const toArabicNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) {
    return ""; // or "0" or whatever fallback you want
  }
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((char) => (/\d/.test(char) ? arabicDigits[parseInt(char)] : char))
    .join("");
};

const NewPagination: React.FC<PaginationProps> = ({
  onNext,
  onPrevious,
  startItem = 1,
  endItem = 1,
  totalItems = 1,
}) => {
  const { t, i18n } = useTranslation() as {
    t: (key: string) => string;
    i18n: any;
  };

  const { isRtl } = useDirection();

  const isArabicBasedLang = ["ur", "ar", "ps", "fa", "pr"].includes(
    i18n.language
  );

  const displayStart = isArabicBasedLang
    ? toArabicNumber(startItem)
    : startItem;
  const displayEnd = isArabicBasedLang ? toArabicNumber(endItem) : endItem;
  const displayTotal = isArabicBasedLang
    ? toArabicNumber(totalItems)
    : totalItems;

  return (
    <div
      className={styles.pagination}
      style={isRtl ? { marginBottom: "10px" } : undefined}
    >
      <div className={isRtl ? styles.graylg : styles.gray}>
        <p className={classNames(commonstyles.fs14, commonstyles.semiBold)}>
          {displayStart}-{displayEnd} {t("of")} {displayTotal}
        </p>
      </div>

      <button
        style={{ backgroundColor: "transparent" }}
        className={styles.Paginationicons}
        onClick={onPrevious}
        disabled={startItem === 1}
      >
        {isRtl ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <button
        style={{ backgroundColor: "transparent" }}
        className={styles.Paginationicons}
        onClick={onNext}
        disabled={endItem === totalItems}
      >
        {isRtl ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </div>
  );
};

export default NewPagination;
