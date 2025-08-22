import React, { useState, useEffect } from "react";
import styles from "./customSelect.module.css";
import { useDirection } from "shared/utils/DirectionContext";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RiArrowDropDownLine } from "react-icons/ri";

interface CustomSelectProps {
  options: string[];
  placeholder?: string;
  onSelect: (selectedOption?: any, val?: any) => void;
  value?: string;
  isEditing?: boolean;
  keyValue?: any;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select",
  onSelect,
  value,
  isEditing = false,
  keyValue,
}) => {
  console.log("🚀 ~ value:", value);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const { isRtl } = useDirection();

  // useEffect(() => {
  //   if (isEditing && value) {
  //     setSelectedOption(value);
  //   }
  // }, [isEditing, value]);

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  const handleSelect = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue, keyValue);
  };

  return (
    <FormControl
      variant="standard"
      sx={{
        width: "100%",
        borderRadius: "4px",
        border: "0.5px solid #ccc",
        fontFamily: "inherit",
      }}
    >
      <Select
        value={selectedOption}
        onChange={handleSelect}
        displayEmpty
        disabled={isEditing}
        className={styles.selectStyle}
        IconComponent={(props) => (
          <RiArrowDropDownLine
            {...props}
            style={{
              fontSize: 28,
              color: "#7D7D7D",
              right: isRtl ? "auto" : "10px",
              left: isRtl ? "10px" : "auto",
            }}
          />
        )}
        renderValue={(selected) =>
          selected ? (
            selected
          ) : (
            <span style={{ color: "#7d7d7d" }}>{placeholder}</span>
          )
        }
        sx={{
          height: "48px",
          fontSize: "14px",
          textTransform: "capitalize",
          display: "flex",
          margin: "0px",
          fontFamily: "inherit",
          alignItems: "center",
          direction: isRtl ? "rtl" : "ltr",
          color: selectedOption ? "#7d7d7d" : "#7d7d7d",

          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "none !important",
          },
          "& .MuiSelect-select": {
            paddingRight: "10px !important", // force override
            paddingLeft: "10px !important", // adjust for both directions
            minWidth: "unset", // remove min-width if needed
          },
          "&:before": {
            borderBottom: "none",
          },
          "&:after": {
            borderBottom: "none",
          },
        }}
      >
        {options.map((v, ind) => (
          <MenuItem sx={{ textTransform: "capitalize" }} key={ind} value={v}>
            {v}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
