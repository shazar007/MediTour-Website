import * as React from "react";
import dayjs from "dayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface CustomTimepickerProps {
  onTimeChange: (newTime: any) => void;
  defaultValue?: any; // Add defaultValue prop
}

const CustomTimepicker: React.FC<CustomTimepickerProps> = ({
  onTimeChange,
  defaultValue,
}) => {
  const [selectedTime, setSelectedTime] = React.useState(
    defaultValue ? dayjs(`2000-01-01T${defaultValue}`) : dayjs()
  );

  const handleTimeChange = (newTime: any) => {
    const formattedTime = dayjs(newTime).format("HH:mm");
    setSelectedTime(newTime);
    onTimeChange(formattedTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopTimePicker
        value={selectedTime}
        onChange={handleTimeChange}
        ampm={false}
        sx={{
          "& .MuiInputBase-input": {},
          "& .MuiOutlinedInput-input": {},
          "& .MuiInputBase-input:focus": {},
          "& .MuiSvgIcon-root": {},
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomTimepicker;
