import React, { useState } from "react";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
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
  ispassword: any;
  Label: any;
  onKeyDown?: (e: React.KeyboardEvent) => void; // Add onKeyDown prop to capture key press
}

const AdminInput = (props: Partial<Props>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    ispassword,
    Label,
    onKeyDown,
  } = props;
  const inputType = ispassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          sx={{
            width: "100%",
            "& .MuiInputLabel-root": {
              fontWeight: 400,
              fontFamily: "Poppins",
            },
          }}
          variant="outlined"
          id={id}
          placeholder={Label}
          label={placeholder}
          type={inputType} // Use inputType instead of type
          value={value}
          onChange={onChange}
          style={{ margin: "0px" }}
          onKeyDown={onKeyDown} // Attach the onKeyDown event handler
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {ispassword ? (
                    showPassword ? (
                      <BsEyeFill
                        style={{
                          height: "22px",
                          width: "22px",
                          color: "#909198",
                        }}
                      />
                    ) : (
                      <BsEyeSlashFill
                        style={{
                          height: "22px",
                          width: "22px",
                          color: "#909198",
                        }}
                      />
                    )
                  ) : null}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </div>
  );
};

export default AdminInput;
