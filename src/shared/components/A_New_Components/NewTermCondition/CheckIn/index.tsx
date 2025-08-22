import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface Props {
  placeholder?: string;
  setData?: (time: string) => void;
  onTimeSelect?: (time: string) => void;
  onTimeChange?: (newTime: string) => void;
  defaultValue?: string;
  value?: string;
  type?: any;
  AM?: any;
}

const CheckIn = (props: Props) => {
  const { t }: any = useTranslation();
  const isRtl: any = useDirection();
  const { placeholder, type, AM, setData, onTimeChange, defaultValue, value } =
    props;

  const handleTimeChange = (newTime: any) => {
    if (newTime) {
      const formattedTime = dayjs(newTime).format(AM ? AM : "HH:mm");
      setData && setData(formattedTime);
      onTimeChange && onTimeChange(formattedTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        value={
          value
            ? dayjs(value, "HH:mm")
            : defaultValue
            ? dayjs(defaultValue, "HH:mm")
            : null
        }
        ampm={AM ? true : false}
        label={placeholder}
        sx={{
          width: "100%",
          "& .MuiStack-root": {
            overflow: "visible",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "0px",
            textAlign: isRtl ? "right" : "left",
            fontSize: "14px",
            fontFamily: '"Poppins", sans-serif',
            paddingLeft: type === "box" ? (isRtl ? "0px" : "10px") : "0px",
            paddingRight: type === "box" ? (isRtl ? "10px" : "0px") : "0px",
            "&:hover": {
              borderColor: "#6F6F72 !important",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: type === "box" ? "0.5px solid #ccc" : "none",
            borderRadius: type === "box" ? "8px" : "0px",
            borderBottom: type !== "box" ? "1px solid" : undefined,
            padding: type === "box" ? "0px 8px" : "10px 0px",
          },

          "& .MuiIconButton-root": {
            padding: "0px",
            color: "#7D7D7D",
            right: isRtl ? "0px" : "-10px",
            left: isRtl ? "-10px" : "0px",
            bottom: "2px",
          },
          "& .MuiOutlinedInput-input": {
            height: type === "box" ? "0px" : "14px",
            color: "#7d7d7d",
            fontFamily: '"Poppins", sans-serif',
            fontSize: "14px",

            paddingLeft: isRtl ? "10px" : "8px",
            paddingRight: isRtl ? "8px" : "0px",
          },
          "& .MuiOutlinedInput-notchedOutline legend": {
            display: "none",
          },

          "& .MuiInputLabel-root": {
            fontSize: "14px",
            fontFamily: '"Poppins", sans-serif',
            color: type === "box" ? "#7d7d7d" : "#00276d",
            position: "absolute",
            pointerEvents: "none",
            top: "45%",
            transform: "translateY(-50%)",
            right: isRtl ? "10px" : "unset",
            left: isRtl ? "10px" : "unset",
            transition: "all 0.2s ease-out",

            "&.MuiInputLabel-shrink": {
              display: "none",
              backgroundColor: "#fff",
              padding: "10px 4px",
            },
          },
        }}
        onChange={handleTimeChange}
      />
    </LocalizationProvider>
  );
};

export default CheckIn;
