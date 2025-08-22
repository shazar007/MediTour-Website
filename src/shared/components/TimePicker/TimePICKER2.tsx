import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useDirection } from "shared/utils/DirectionContext";

interface Props {
  placeholder?: string;
  setData?: (time: string, keyValue?: any) => void;
  onTimeSelect?: (time: string) => void;
  onTimeChange?: (newTime: string) => void;
  defaultValue?: string;
  value?: string;
  type?: any;
  disabled?: any;
  AM?: any;
  height?: any;
  keyValue?: any;
  borderRadius?: any;
  border?: any;
  backgroundColor?: any;
}

const CustomTimePicker = (props: Props) => {
  const {
    placeholder,
    type,
    AM,
    setData,
    onTimeChange,
    defaultValue,
    value,
    disabled,
    height,
    keyValue,
    borderRadius,
    backgroundColor,
    border,
  } = props;
  const handleTimeChange = (newTime: any) => {
    if (newTime) {
      const formattedTime = dayjs(newTime).format(AM ? AM : "HH:mm");
      setData && setData(formattedTime, keyValue);
      onTimeChange && onTimeChange(formattedTime);
    }
  };
  const { isRtl } = useDirection();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        disabled={disabled}
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
            // paddingLeft: "0px",
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
            backgroundColor: "transparent",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            // padding: "0px 10px !important",
            // margin: "0 !important",
          },
        }}
        onChange={handleTimeChange}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
