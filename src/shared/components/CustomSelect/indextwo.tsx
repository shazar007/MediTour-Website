import React, { useState, useEffect } from "react";
import styles from "./customSelect.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RiArrowDropDownLine } from "react-icons/ri"; // Import RiArrowDropDownLine
import { FaAngleDown } from "react-icons/fa"; // Import a different icon (optional)

interface CustomSelectResetValueProps {
  options: string[];
  placeholder?: string;
  onSelect: (selectedOption: string) => void;
  value?: string;
  isEditing?: boolean;
  setvalue?: string;
}

const CustomSelectResetValue: React.FC<CustomSelectResetValueProps> = ({
  options,
  placeholder,
  onSelect,
  value,
  setvalue,
  isEditing = false,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (isEditing && value) {
      setSelectedOption(value);
    }
  }, [isEditing, value]);

  useEffect(() => {
    if (setvalue) {
      setSelectedOption(setvalue);
    }
  }, [setvalue]);
  const handleSelect = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{
          m: 1,
          textAlign: "start",
          width: "100%",
          margin: "0px",
          fontSize: "14px",
          color: "#00276D",
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
      >
        <InputLabel
          style={{ fontSize: "14px", color: "#00276d" }}
          className={styles.PlaceHolder}
          id="demo-simple-select-standard-label"
        >
          {placeholder}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={setvalue}
          onChange={(e: any) => handleSelect(e)}
          label="Age"
          className={styles.selectStyle}
          disabled={isEditing}
          IconComponent={(props) => (
            <RiArrowDropDownLine
              {...props}
              style={{
                fontSize: 32,
                color: "#00276d",
                right: -5,
              }}
            />
          )}
        >
          {options.map((v: any, ind: any) => (
            <MenuItem className={styles.PlaceHolder} value={v} key={ind}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomSelectResetValue;
