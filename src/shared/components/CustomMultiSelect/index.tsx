import React, { useState, useEffect } from "react";
import styles from "./customSelect.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RiArrowDropDownLine } from "react-icons/ri";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";

interface CustomSelectProps {
  value?: string[];
  options: string[];
  placeholder?: string;
  onSelect: (selectedOptions: string[]) => void; // Update to accept an array of strings
  selectedOptions: string[]; // Add selectedOptions prop to manage selected options
}

const CustomMultiSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder,
  onSelect,
  selectedOptions,
  value,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedValues(value);
      onSelect(value);
    }
  }, [value]);

  // useEffect(() => {
  //   setSelectedValues(selectedOptions); // Update selectedValues when selectedOptions changes
  // }, [selectedOptions]);

  const handleSelect = (event: SelectChangeEvent<string | string[]>) => {
    const selectedValue = event.target.value;

    if (Array.isArray(selectedValue)) {
      setSelectedValues(selectedValue);
      onSelect(selectedValue);
    } else if (Array.isArray(value)) {
      setSelectedValues(value);
    } else {
      // Handle the case when a single value is selected
      const singleValue = selectedValue as string;

      setSelectedValues([singleValue]);
      onSelect([singleValue]);
    }
  };

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{
          m: 1,
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
          multiple // Enable multiple selection
          value={selectedValues}
          onChange={(e: any) => handleSelect(e)}
          label="Age"
          IconComponent={(props) => (
            <RiArrowDropDownLine
              {...props}
              style={{
                fontSize: 32,
                color: "#00276d",
                right: -5,
                // background: "white",
                height: 31,
              }}
            />
          )}
          className={styles.selectStyle}
          sx={{
            "& .MuiSelect-select": {
              textAlign: "start",
            },
          }}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <span key={value}>{value}, </span>
              ))}
            </div>
          )}
        >
          {/* <>
            <div
              className={classNames(commonStyles.mt16, commonStyles.mb8)}
              style={{ marginLeft: 16 }}
            >
              <p className={classNames(styles.colorBlue)}>+Add Speciality</p>
            </div> */}
          {options.map((v: any, ind: any) => (
            <MenuItem className={styles.PlaceHolder} value={v} key={ind}>
              {v}
            </MenuItem>
          ))}
          {/* </> */}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomMultiSelect;
