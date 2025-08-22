import React from "react";
import styles from "./dropdown.module.css";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material";

interface DropdownProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  options?: { value: string; label: string }[];
}

const CustomDropdown = (props: DropdownProps) => {
  const { id, value, onChange, options = [] } = props;

  return (
    <Box
      component="form"
      sx={{
        color: "#00276d",
        fontStyle: "italic",
        fontFamily: '"Poppins", sans-serif',
        fontSize: "14px",
        "& > :not(style)": { m: 1, width: "100%", font: "inherit" },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl
        variant="standard"
        fullWidth
        className={styles.customDropdown}
      >
        {id && (
          <InputLabel
            sx={{
              color: "#00276d",
              fontStyle: "italic",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "14px",
            }}
            id={id}
            shrink={true}
          >
            {options.length > 0 ? "Select an option" : "No options available"}
          </InputLabel>
        )}
        <Select
          labelId={id}
          value={value || ""}
          onChange={onChange}
          displayEmpty
          className={styles.customDropdown}
          style={{ margin: "1px 0" }}
          MenuProps={{
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: "#00276d", // Selected background color
                  color: "#fff", // Selected text color
                },
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomDropdown;
