import React, { useState, useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import ImageUpload from "assets/images/upload.png";
import ImageFile from "assets/images/file.png";
import Styles from "./Imgpicker.module.css";
import { uploadFile } from "shared/services";

interface ImgPickerProps {
  setData?: any;
  className?: string;
  useImagePicker?: boolean;
  placeholder?: string;
  initialValue?: string;
  value?: any;
  disabled?: boolean;
}

export default function StyledImagePicker({
  className,
  useImagePicker = true,
  setData,
  placeholder = "Select files",
  initialValue,
  value,
  disabled = false,
}: ImgPickerProps) {
  const [uploading, setUploading] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    initialValue || placeholder
  );

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    multiple: false, // Ensure only one file is selected
    onFilesSelected: ({ plainFiles }) => {
      uploadImage(plainFiles); // Trigger file upload
    },
  });

  const uploadImage = async (plainFiles: any) => {
    if (!plainFiles.length) return;
    const file = plainFiles[0];

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData);
      if (response.status === 200 && response.statusText === "OK") {
        setData(response.data.fileUrl); // Update parent component with file URL
        setCurrentPlaceholder(file.name); // Update placeholder with file name
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handlePickerClick = () => {
    if (!disabled) {
      openFilePicker();
    }
  };

  const buttonImage = useImagePicker ? ImageUpload : ImageFile;

  useEffect(() => {
    if (value) {
      setCurrentPlaceholder(value);
    } else if (initialValue) {
      setCurrentPlaceholder(initialValue);
    }
  }, [value, initialValue]);

  return (
    <div>
      <div className={`${Styles.wrapper} ${disabled ? Styles.disabled : ""}`}>
        {uploading ? (
          <div>Loading...</div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {filesContent.map((file, index) => (
              <div key={index} style={{ display: "flex" }}>
                {file.type && file.type.startsWith("image/") && (
                  <img
                    alt={file.name}
                    src={file.content}
                    className={Styles.imagePreview}
                  />
                )}
                {file.type && !file.type.startsWith("image/") && (
                  <a href={file.content} download={file.name}>
                    Download {file.name}
                  </a>
                )}
              </div>
            ))}
            <div className={Styles.container}>
              <div className={Styles.placeholderWrapper}>
                <p className={Styles.placeholderText}>{currentPlaceholder}</p>
              </div>
              <div className={Styles.buttonWrapper}>
                <img
                  className={Styles.buttonImage}
                  src={buttonImage}
                  onClick={handlePickerClick}
                  alt={useImagePicker ? "Select images" : "Select files"}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={Styles.underline}></div>
    </div>
  );
}
