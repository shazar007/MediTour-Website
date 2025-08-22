import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export default function RangePickerStepByStep({
  activePicker,
  setActivePicker,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  startAnchorStyle = { position: 'absolute', bottom: 10, left: 40, width: 0, height: 0 },
  endAnchorStyle = { position: 'absolute', bottom: 10, left: 40, width: 0, height: 0 },
}: {
  activePicker: "start" | "end" | null;
  setActivePicker: (value: "start" | "end" | null) => void;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: (value: Dayjs | null) => void;
  setEndDate: (value: Dayjs | null) => void;
  startAnchorStyle?: React.CSSProperties;
  endAnchorStyle?: React.CSSProperties;
}) {
  const startAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const endAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = React.useState(false);

React.useEffect(() => {
  if (activePicker === "start" && startAnchorRef.current) {
    setIsReady(true);
  }
  if (activePicker === "end" && endAnchorRef.current) {
    setIsReady(true);
  }
}, [activePicker]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div ref={startAnchorRef} style={startAnchorStyle} />
      <div ref={endAnchorRef} style={endAnchorStyle} />

      {activePicker === "start" && (
      <DatePicker
      value={startDate}
      minDate={dayjs()}
      // minDate={startDate}
      // minDate={dayjs()}
      // open={activePicker === "start"}
      open={true}
      onClose={() => setActivePicker("end")}
      onChange={(newValue) => {
        console.log(",,,chal raha ha")
        setStartDate(newValue);
        setActivePicker(null);
      }}
      slotProps={{
        textField: {
          sx: { display: "none" }
        },
        popper: {
          anchorEl: startAnchorRef.current,
          placement: "bottom-start", 
          disablePortal: true,
  style: { zIndex: 9999 }
      
        }
      }}
    />
    
      )}

      {activePicker === "end" && (
        <DatePicker
          value={endDate}
          open={activePicker === "end"}
          onClose={() => setActivePicker(null)}
          onChange={(newValue) => {
            setEndDate(newValue);
            setActivePicker(null);
          }}
          slotProps={{
            textField: {
              sx: { display: "none" }
            },
            popper: {
              anchorEl: endAnchorRef.current,
              placement: "bottom-start",
              disablePortal: true,
              style: { zIndex: 9999 }
            }
          }}
        />
      )}
    </LocalizationProvider>
  );
}
