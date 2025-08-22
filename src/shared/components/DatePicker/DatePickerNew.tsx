import * as React from "react";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Datem from "assets/images/datepicker.png";
import style from "./datePicker.module.css";
import { DesktopDatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

// Extend dayjs with UTC and Timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface DatepickerProps extends DatePickerProps<dayjs.Dayjs> {
  setData?: (date: dayjs.Dayjs | null) => void;
  className?: string;
  placeholder?: string;
  futureDisable?: boolean;
  value?: dayjs.Dayjs | null | undefined;
  height?: any;
  border?: any;
  borderRadius?: any;
  backgroundColor?: any;
}

function MuiIcon() {
  return (
    <img src={Datem} alt="Date picker opening icon" className={style.DateImg} />
  );
}

export default function DatepickerNew({
  setData,
  className,
  placeholder,
  futureDisable,
  height,
  border,
  borderRadius,
  backgroundColor,
  value,
  ...rest
}: DatepickerProps) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const { t, i18n }: any = useTranslation();
  useEffect(() => {
    if (value) {
      const safeDate = dayjs.isDayjs(value) ? value : dayjs(value);
      setSelectedDate(safeDate);
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (futureDisable && date && date.isAfter(dayjs(), "day")) {
      return;
    }
    const adjustedDate = date ? date.startOf("day").utc(true) : null;

    setSelectedDate(adjustedDate);
    if (setData) {
      setData(adjustedDate);
    }
  };
  const formatDateToYYYYMMDD = (
    date: Date | string | dayjs.Dayjs | null
  ): string => {
    if (!date) return "";

    const d = dayjs.isDayjs(date) ? date.toDate() : new Date(date);
    return dayjs(d).format("YYYY-MM-DD");
  };
  const { isRtl } = useDirection();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        defaultValue={dayjs(new Date())}
        label={placeholder}
        value={selectedDate}
        onChange={handleDateChange}
        slots={{ openPickerIcon: MuiIcon }}
        sx={{
          width: "100%",
          "& .MuiInputBase-input": {
            padding: "0px !important",
          },
          "& .MuiStack-root": {
            overflow: "visible",
            textAlign: "left",
          },
          "& .MuiInputLabel-shrink": {
            display: "none",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            display: "none",
          },
          "& .MuiIconButton-root": {
            color: "gray",
            padding: "8px",
            "&:hover": {
              color: "darkgray",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: "#000000",
            fontSize: "14px",
            marginLeft: "15px",
            paddingLeft: "0px",
          },
          "& .MuiInputLabel-root": {
            fontSize: "14px",
            border: "none",
            lineHeight: "28px",
            fontFamily: "inherit",
            top: isRtl ? "-5px" : "-5px",
            color: "#7d7d7d",
            left: isRtl ? "-7px" : "0px",
            right: isRtl ? "5%" : "0px",
          },
          "& .MuiOutlinedInput-root": {
            height: height || "48px",
            padding: "0px 10px",
            borderRadius: borderRadius || "4px",
            border: border || "1px solid #ccc",
            backgroundColor: backgroundColor || "#fff",
            "&:hover": {
              borderColor: "#ccc",
            },
            "&.Mui-focused": {
              border: "none",
              background: "linear-gradient(to right, #ff7631, #2575fc)",
              // padding: "2px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& > fieldset": {
                border: "none",
              },
              "& > input": {
                backgroundColor: "#fff",
                height: "calc(100% - 4px)",
                margin: "2px 0",

              },
            },
          },
          "& .Mui-focused .MuiOutlinedInput-input": {
            backgroundColor: "#fff",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            // padding: "0px 10px !important",
            // margin: "0 !important",
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
}