import React, { useState, useRef, useEffect } from "react";
import styles from "./TextInputWithDropdown.module.css";
import { RingLoader } from "shared/components";

interface TextInputWithDropdownProps {
  placeholder: string;
  onChange: (values: string[]) => void;
  value: string[];
  options: string[];
}
const TextInputWithDropdown: React.FC<TextInputWithDropdownProps> = ({
  placeholder,
  onChange,
  value,
  options = [],
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const handleInputClick = () => {
    setIsDropdownVisible(true);
    setIsTooltipVisible(false);
    setFilteredOptions(options);
  };

  const handleOptionClick = (option: string) => {
    toggleValue(option);
  };

  const handleTooltipClick = () => {
    setIsTooltipVisible((prev) => !prev);
    setIsDropdownVisible(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsDropdownVisible(false);
      setIsTooltipVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [options]);

  const renderTooltipItems = () => {
    return value.slice(1).map((item, index) => (
      <div key={index + 1} className={styles.tooltipItem}>
        <span>{item}</span>
        <button
          type="button"
          className={styles.tooltipCloseButton}
          onClick={() => handleRemoveItem(index + 1)}
        >
          &times;
        </button>
      </div>
    ));
  };

  const handleRemoveItem = (index: number) => {
    const newValues = value.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    console.log("Input Value:", e.target.value); // Debugging
    setInputValue(e.target.value);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(query)
    );
    setFilteredOptions(filteredOptions);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      console.log("Enter Pressed with Value:", inputValue.trim()); // Debugging
      toggleValue(inputValue.trim());
    }
  };

  const toggleValue = (item: string) => {
    let newValues;
    if (value.includes(item)) {
      newValues = value.filter((val) => val !== item);
    } else {
      newValues = [...value, item];
    }
    console.log("New Values:", newValues); // Debugging
    onChange(newValues);
    setInputValue("");
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputWrapper}

        onClick={handleInputClick}

      >
        <div className={styles.selectedTextWrapper}>
          {value.length > 0 && (
            <div className={`${styles.selectedText} ${styles.customInput}`}>
              <div className={styles.selectedTextWrapperText}>{value[0]}</div>
              <button
                className={styles.clearButton}
                onClick={() => handleRemoveItem(0)}
              >
                &times;
              </button>
            </div>
          )}

          {value.length > 1 && (
            <div className={styles.moreItems} onClick={handleTooltipClick}>
              +{value.length - 1} more
              {isTooltipVisible && (
                <div className={styles.tooltip}>{renderTooltipItems()}</div>
              )}
            </div>
          )}
        </div>

        <input
          className={styles.input}
          type="text"
          placeholder={value.length === 0 ? placeholder : ""}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleInputKeyPress}
          style={{ marginLeft: value.length > 0 ? "10px" : "0" }}
        />

        <div className={styles.arrowIcon} onClick={handleInputClick}>
          ▼
        </div>
      </div>

      {isDropdownVisible && options.length > 0 && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContainer}>
            {loading ? (
              <div className={styles.loaderContainer}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              filteredOptions.map((option: any, index: any) => (
                <div
                  key={index}
                  className={`${styles.dropdownItem} ${value.includes(option) ? styles.selectedItem : ""
                    }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                  {value.includes(option) && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInputWithDropdown;
