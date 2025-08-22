import React, { useState } from "react";
import styles from "./input.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import classNames from "classnames";

type TextInputProps = {
  label?: string;
  password?: boolean;
  error?: string;
  togglePassword?: any;
  showPassword?: any;
  formik?: any;
  type?: any;
  value?: any;
  id?: any;
  height?: any;
  borderRadius?: any;
  border?: any;
  borderColor?: any;
  backgroundColor?: any;
  textAlign?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type,
  password,
  togglePassword = () => { },
  showPassword = false,
  formik,
  error,
  id,
  height,
  borderRadius,
  borderColor,
  textAlign,
  backgroundColor,

  ...rest
}) => {
  let touched = formik?.touched;
  let errorToShow = formik ? formik?.errors : error;
  const inputType = password
    ? (showPassword ? "text" : "password")
    : type || "text";
  return (
    <>
      <div
        className={styles.container}
        style={{
          borderRadius: borderRadius || "4px",
        }}
      >
        {label && <label className={styles.label}>{label}</label>}
        <input
          type={inputType}
          className={password ? styles.password_field : styles.field}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
          style={{
            borderRadius: borderRadius || "4px",
            backgroundColor: backgroundColor || "#fff",
            textAlign: textAlign,
            height: "40px",
            fontFamily: "inherit",
          }}
        />

        {password && (
          <div
            className={styles.showIcon}
            onClick={togglePassword}
            role="button"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        )}
      </div>
      {formik ? (
        touched[id] &&
        errorToShow[id] && (
          <div className={classNames(styles.errorMessage)}>
            {errorToShow[id]}
          </div>
        )
      ) : (
        <div className={styles.errorMessage}>{errorToShow}</div>
      )}
      {/* <span className={styles.errorMessage}>This is error</span> */}
    </>
  );
};

export default InputField;
