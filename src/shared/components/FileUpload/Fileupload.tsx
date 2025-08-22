import React, { useState } from "react";
import {
  IoCloudUploadOutline,
  IoClose,
  IoCheckmarkCircleOutline,
} from "react-icons/io5"; // Import icons
import { MdDeleteOutline } from "react-icons/md"; // Import delete icon
import { FaUpload } from "react-icons/fa"; // Import upload icon
import styles from "./index.module.css";
import classNames from "classnames";
import { notifySuccess } from "../A_New_Components/ToastNotification";

interface FileUploadProps {
  allowedFileTypes?: string[];
  maxSizeInMB?: number;
  setData: (file: any) => void;
  onFileDelete?: () => void;
  customUploadText?: React.ReactNode;
  data: any;
}

const FileUpload: React.FC<FileUploadProps> = ({
  allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"],
  maxSizeInMB = 10,
  onFileDelete,
  customUploadText,
  setData,
  data,
}) => {
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        setError(
          `File type not allowed. Allowed types: ${allowedFileTypes.join(", ")}`
        );
        return;
      }
      if (file.size > maxSizeInMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeInMB} MB.`);
        return;
      }
      setData(file);
      setError("");
    }
  };

  const handleDeleteFile = () => {
    setIsModalOpen(true); // Open the modal instead of deleting the file directly
  };

  const confirmDeleteFile = () => {
    setData(null);
    setIsModalOpen(false);
    if (onFileDelete) onFileDelete();
notifySuccess(" Your file has been successfully deleted!");
  };

  return (
    <div>
      <div className={styles.fileUploadContainer}>
        {/* Upload Area */}
        {!data && (
          <label htmlFor="fileInput" className={styles.uploadArea}>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <IoCloudUploadOutline className={styles.uploadIcon} />
            {customUploadText || (
              <>
                <p>Select a file or drag and drop here</p>
                <p className={styles.uploadText}>
                  JPG, PNG or PDF, file size no more than {maxSizeInMB}MB
                </p>
              </>
            )}
            <button
              className={styles.selecttbtn}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Select File
            </button>
          </label>
        )}

        {/* Error Message */}
        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* File Details and Remove Button */}
        {data && (
          <div className={styles.fileDetails}>
            <FaUpload className={styles.uploadIcon} />
            <span>
              {data.name} - {Math.round(data.size / 1024)} kb
            </span>
            <button
              onClick={handleDeleteFile}
              className={styles.removeFileButton}
            >
              <MdDeleteOutline />
            </button>
          </div>
        )}
      </div>

      {/* Modal for Delete Confirmation */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <IoClose
                onClick={() => setIsModalOpen(false)}
                style={{ cursor: "pointer" }}
              />
            </div>

            <MdDeleteOutline className={styles.removeFileButton} />
            <p className={classNames(styles.sure)}>Are you sure</p>
            <span
              style={{
                color: "#00276D",
                fontSize: "16px",
              }}
            >
              you want to delete "{data?.name}"?
            </span>

            <div className={styles.modalButtons}>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={confirmDeleteFile}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
