import React from "react";
import classNames from "classnames";
import styles from "./arrowBack.module.css";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  onClick: any;
}
const ArrowBack = (props: Partial<Props>) => {
  const { onClick } = props;
  return (
    <IoArrowBack
      className={classNames(styles.icon, styles.mb10)}
      onClick={() => onClick()}
    />
  );
};

export default ArrowBack;
