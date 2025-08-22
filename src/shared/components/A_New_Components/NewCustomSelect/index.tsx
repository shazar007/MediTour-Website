import React from "react";
import styles from "./newCustomSelect.module.css";
import classNames from "classnames";

type SelectFieldProps = {
  label?: string;
  error?: string;
  formik?: any;
  id: string;
  selectedOption?: string | number; // Prop to hold the current selection
  setSelectedOption: (value: string | number) => void; // Function to update it
  options: { label: string; value: string | number }[];
  height?: string;
  borderRadius?: string;
  borderColor?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const New_CustomSelect: React.FC<SelectFieldProps> = ({
  label,
  selectedOption,
  setSelectedOption,
  formik,
  error,
  id,
  options,
  height,
  borderRadius,
  borderColor,
  ...rest
}) => {
  // Ensure the selected value is controlled
  const selectedValue = formik ? formik.values[id] : selectedOption;

  return (
    <>
      <div
        className={styles.container}
        style={{
          borderRadius: borderRadius || "4px",
        }}
      >
        <select
          className={styles.select_field}
          value={selectedValue}
          onChange={(e) => {
            const newValue = e.target.value;
            setSelectedOption(newValue); // Update the selected option state
            if (formik) {
              formik.setFieldValue(id, newValue); // Update Formik state
            }
          }}
          {...rest}
          style={{
            height: height || "44px",
            borderRadius: borderRadius || "4px",
            borderColor: borderColor || "#ccc",
            //  paddingRight: "24px",
             marginRight: "16px",
          }}
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {formik
        ? formik.touched?.[id] &&
          formik.errors?.[id] && (
            <div className={classNames(styles.errorMessage)}>
              {formik.errors[id]}
            </div>
          )
        : error && <div className={styles.errorMessage}>{error}</div>}
    </>
  );
};

export default New_CustomSelect;
