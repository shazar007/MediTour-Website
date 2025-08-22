import { useState, ChangeEvent, useEffect } from "react";
import styles from "./customonroute.module.css";

interface Props {
  setSelectedValue: (value: string) => void;
  initialValue: string;
  error: boolean;
}

export default function CustomOnRouteSelect({
  setSelectedValue,
  initialValue,
  error,
}: Props) {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  useEffect(() => {
    setSelectedOption(initialValue);
  }, [initialValue]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    setSelectedValue(newValue);
  };

  const getSelectClassName = () => {
    switch (selectedOption) {
      case "completed":
        return styles.completeSelect;
      case "in-progress":
        return styles.inProcessSelect;
      default:
        return "";
    }
  };

  return (
    <div className={styles.CustomSelectOrder}>
      <select
        style={{ fontWeight: "700", width: "100%" }}
        className={getSelectClassName()}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="completed">Completed</option>
        <option value="in-progress">In Process</option>
      </select>
    </div>
  );
}
