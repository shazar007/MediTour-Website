import React, { useState, useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { Avatar } from "@mui/material";
import Styles from "./Imgpicker.module.css";
import { uploadFile } from "shared/services";

interface ImgPickerProp {
  setData?: any;
  className?: string;
  placeholder?: string;
  initialValue?: string;
  value?: any;
  disabled?: boolean;
  accept?:any;
}

export default function ProfileImagePicker({
  setData,
  initialValue,
  accept,
  value,
  disabled = false,
}: ImgPickerProp) {
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(
    initialValue || ""
  );

  const { openFilePicker, } = useFilePicker({
    accept:accept,
    readAs: "DataURL",
    multiple: false,
    onFilesSelected: ({ plainFiles }) => {
      uploadImage(plainFiles);
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
        setCurrentImage(response.data.fileUrl); // Set the image URL for display
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

  useEffect(() => {
    if (value) {
      setCurrentImage(value);
    } else if (initialValue) {
      setCurrentImage(initialValue);
    }
  }, [value, initialValue]);

  return (
    <div
      className={`${Styles.wrapperProfile} ${
        disabled ? Styles.disabledProfile : ""
      }`}
    >
      {uploading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={Styles.imageContainerProfile}
          onClick={handlePickerClick}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
          <Avatar
            alt="Profile Image"
            src={currentImage || undefined} // Use Material-UI's default avatar if no image
            sx={{
              width: 120,
              height: 120,
              backgroundColor: "#f0f0f0",
              fontSize: "1rem",
            }}
          />
        </div>
      )}
    </div>
  );
}
