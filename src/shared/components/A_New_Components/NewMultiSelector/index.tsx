import React, { useState } from "react";
import styles from "./newselector.module.css";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface MultiSelectorProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}

const NewMultiSelector: React.FC<MultiSelectorProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const removeSelectedOption = (option: string) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  return (
    <div className={styles.container}>
      <div className={styles.selector} onClick={toggleDropdown}>
        {selectedOptions?.length > 0 ? (
          <div className={styles.selected}>
            {selectedOptions.map((option) => (
              <span key={option} className={styles.tag}>
                {option}
                <IoClose
                  className={styles.closeIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedOption(option);
                  }}
                />
              </span>
            ))}
          </div>
        ) : (
          <span className={styles.title}>Select Options</span>
        )}
        <FaChevronDown
          size={12}
          className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}
        />
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options
            .filter((option) => !selectedOptions.includes(option))
            .map((option) => (
              <li
                key={option}
                className={styles.listItem}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default NewMultiSelector;
