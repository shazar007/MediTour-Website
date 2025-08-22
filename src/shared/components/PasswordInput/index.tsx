import React, { useState } from "react";
import styles from "./password.module.css";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
interface Props {
  id: any;
  name: string;
  placeholder: string;
  type: any;
  value: any;
  onChange: any;
  ref: any;
  onKeyPress?: any;
}

const PasswordInput = (props: Partial<Props>) => {
  const { id, name, type, placeholder, value, onChange, onKeyPress } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box
      component="form"
      sx={{
        fontStyle: "italic",
        fontFamily: '"Poppins", sans-serif',
        fontSize: "14px",
        color: "#00276d",
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
      {" "}
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
            borderBottom: "1px solid #6F6F72", // Set this to the original border style if needed
          },
          "& .MuiInput-underline:after": {
            borderBottom: "1px solid #6F6F72", // Maintains the underline style after input is focused or filled
          },
          "& .MuiInput-underline:before": {
            borderBottom: "1px solid #6F6F72", // Default underline style
          },
        }}
        variant="standard"
        id={id}
        label={placeholder}
        onKeyDown={onKeyPress}
        type={showPassword ? "text" : "Password"}
        value={value}
        onChange={onChange}
        style={{ margin: "0px", fontStyle: "italic", fontSize: "14px" }}
        className={styles.inputStyle}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? (
                  <BsEyeFill className={styles.eyeIcon} />
                ) : (
                  <BsEyeSlashFill className={styles.eyeIcon} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default PasswordInput;
