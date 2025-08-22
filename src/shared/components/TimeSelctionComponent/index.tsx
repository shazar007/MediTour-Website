import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TimeSelection.css"; // External CSS for styles

const TimeSelctionComponent = ({
  selectedTime,
  setTime,
}: {
  selectedTime?: any;
  setTime?: any;
}) => {
  const validTime = selectedTime ? new Date(selectedTime) : null;
  const onChangeTime = (date: any) => {
    if (date) {
      setTime(date);
    }
  };

  return (
    <div>
      <DatePicker
        selected={validTime || new Date()}
        onChange={onChangeTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={1}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </div>
  );
};

export default TimeSelctionComponent;
