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
  type?: any;
  futureDisable?: boolean;
  value?: dayjs.Dayjs | null | undefined;
}

function MuiIcon() {
  return (
    <img src={Datem} alt="Date picker opening icon" className={style.DateImg} />
  );
}

export default function Datepicker({
  setData,
  className,
  placeholder,
  futureDisable,
  value,
  type,
  ...rest
}: DatepickerProps) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const { t, i18n }: any = useTranslation();
  useEffect(() => {
    if (value) {
      setSelectedDate(value);
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
  const { isRtl } = useDirection();
  const maxDate = futureDisable ? dayjs() : undefined;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        defaultValue={dayjs(new Date())}
        label={placeholder}
        value={selectedDate}
        maxDate={maxDate}
        onChange={handleDateChange}
        slots={{ openPickerIcon: MuiIcon }}
        sx={{
          height: "48px",
          width: "100%",
          "& .MuiStack-root": {
            overflow: "visible",
            textAlign: "left",
          },
          "& .MuiInputLabel-shrink": {
            display: "none",
          },
          "& .MuiOutlinedInput-notchedOutline":
            type == "box"
              ? {
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  color: "#999",
                }
              : {
                  width: "100%",
                  borderTop: "none",
                  borderRight: "none",
                  borderLeft: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid",
                  padding: "10px 0px",
                  fontSize: "14px",
                },

          "& .MuiIconButton-root": {
            padding: "0px",
          },
          "& .MuiOutlinedInput-input": {
            height: "12px",
            color: "#7d7d7d",
            fontSize: "14px",
            paddingLeft: "0px",
          },
          "& .MuiInputLabel-root": {
            fontSize: "14px",
            lineHeight: "24px",
            color: "#7d7d7d",
            position: "absolute",
            left: type === "box" ? "-7px" : "-1px",
            right: isRtl ? "5%" : "0px",
            marginTop: isRtl ? "-3px" : "10px",
            "& .MuiInputLabel-shrink": {
              display: "none",
            },
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "0px",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#ccc !important",
            },
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
}
