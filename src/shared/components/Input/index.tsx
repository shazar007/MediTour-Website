import React from "react";
import styles from "./input.module.css";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface Props {
  id?: any;
  name?: string;
  placeholder?: string;
  type?: any;
  value?: any;
  onChange?: any;
  ref?: any;
  onClick?: any;
  onBlur?: any;
  contentEditable?: any;
  ondown?: any;
}

const CustomInput = (props: Partial<Props>) => {
  const {
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    onClick,
    ondown,
    onBlur,
    contentEditable,
  } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event); // Call the provided onChange function
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          color: "#00276d",
          fontStyle: "italic",
          fontFamily: '"Poppins", sans-serif',
          fontSize: "14px",
          "& > :not(style)": { m: 1, width: "100%", font: "inherit" },
          "& .MuiInput-input": {
            color: "#00276d",
            font: "italic",
            fontFamily: '"Poppins", sans-serif',
            fontSize: "14px",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            color: "#00276d",
            fontStyle: "italic",
            fontFamily: '"Poppins", sans-serif',
            fontSize: "14px",
            "&::placeholder": {
              fontFamily: '"Poppins", sans-serif',
              fontSize: "14px",
            },
            "& .MuiInputLabel-root": {
              fontSize: "14px",
              fontStyle: "italic",
              fontFamily: '"Poppins", sans-serif',
              color: "#00276d",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "1px solid #6F6F72",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "1px solid #6F6F72",
            },
            "& .MuiInput-underline:before": {
              borderBottom: "1px solid #6F6F72",
            },
          }}
          variant="standard"
          id={id}
          label={placeholder}
          type={type}
          value={value}
          onChange={handleChange}
          style={{ margin: "0px" }}
          className={styles.inputStyle}
          onKeyDown={ondown ? ondown : handleKeyDown}
          onBlur={onBlur}
          onClick={onClick} // Apply onClick here
          contentEditable={contentEditable}
        />
      </Box>
    </div>
  );
};

export default CustomInput;
