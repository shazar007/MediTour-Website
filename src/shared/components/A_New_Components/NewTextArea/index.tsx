import React from "react";
import styles from "./newtextarea.module.css";
import classNames from "classnames";

type TextAreaProps = {
  label?: string;
  error?: string;
  formik?: any;
  value?: any;
  id?: any;
  height?: any;
  borderRadius?: any;
  borderColor?: any;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaField: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  formik,
  error,
  id,
  height,
  borderRadius,
  borderColor,
  ...rest
}) => {
  let touched = formik?.touched;
  let errorToShow = formik ? formik?.errors : error;

  return (
    <>
      <div
        className={styles.container}
        style={{
          borderRadius: borderRadius || "4px",
        }}
      >
        {label && <label className={styles.label}>{label}</label>}
        <textarea
          className={styles.textarea_field}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
          style={{
            height: height || "10vh",
            borderRadius: borderRadius || "4px",
            borderColor: borderColor || "#ccc",
          }}
        />
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
    </>
  );
};

export default TextAreaField;
