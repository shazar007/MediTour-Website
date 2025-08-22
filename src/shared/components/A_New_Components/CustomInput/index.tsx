import React, { useState } from "react";
import styles from "./input.module.css";

type TextInputProps = {
  label?: string;
  error?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  type?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  id,
  type,
  ...rest
}) => {
  const [qualificationTags, setQualificationTags] = useState<string[]>([]);

  // Handle adding a tag on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (id === "qualification" && e.key === "Enter" && value) {
      setQualificationTags((prevTags) => [...prevTags, value.trim()]);
      onChange &&
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Remove tag on 'X' click
  const removeTag = (tag: string) => {
    setQualificationTags(qualificationTags.filter((t) => t !== tag));
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        <input
          type={type ? type : "text"}
          className={styles.field}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          {...rest}
        />

        {/* Show qualification tags with remove option inside the input */}
        {id === "qualification" && qualificationTags.length > 0 && (
          <div className={styles.tagsContainer}>
            {qualificationTags.map((tag, index) => (
              <div key={index} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  className={styles.removeTagButton}
                  onClick={() => removeTag(tag)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default CustomInput;
