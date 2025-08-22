import React, { useState, useEffect, useRef } from "react";
import { useFilePicker } from "use-file-picker";
import ImageUpload from "assets/images/upload.png";
import ImageFile from "assets/images/file.png";
import Style from "./ImagNewPicker.module.css";
import { uploadFile } from "shared/services";
interface ImgPickerProps {
  setData?: any;
  className?: string;
  useImagePicker?: boolean;
  placeholder?: string;
  initialValue?: string;
  setName?: any;
  accept?: any;
}

export default function ImagNewPicker({
  useImagePicker = true,
  setData,
  placeholder = "Select files",
  initialValue,
  setName,
  accept,
}: ImgPickerProps) {
  const [uploading, setUploading] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    initialValue || placeholder
  );

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    accept: accept,
    readAs: "DataURL",
    multiple: true,
    onFilesSelected: ({ plainFiles }) => { },
    onFilesRejected: ({ errors }) => { },
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      uploadImage(plainFiles, filesContent);
    },
  });

  const uploadImage = async (plainFiles: any, filesContent: any) => {
    setUploading(true);
    const data: any = new FormData();
    const imagedata = plainFiles[0];
    await data.append("file", imagedata);

    uploadFile(data)
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          setData(res?.data?.fileUrl);
          setName(plainFiles[0].name);
          setCurrentPlaceholder(plainFiles[0].name);
        }
      })
      .catch((err: any) => { })
      .finally(() => {
        setUploading(false);
      });
  };

  const handlePickerClick = () => {
    openFilePicker();
    if (inputRef.current) inputRef.current.focus();
  };
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const buttonImage = useImagePicker ? ImageUpload : ImageFile;

  useEffect(() => {
    if (initialValue) {
      setCurrentPlaceholder(initialValue);
    }
  }, [initialValue]);

  return (
    <div>
      <div
        className={Style.border}
        style={{
          height: "48px",
          border: isFocused ? "2px solid transparent" : "1px solid #ccc",
          borderRadius: "6px",
          backgroundImage: isFocused
            ? "linear-gradient(white, white), linear-gradient(to right, #ff7631, #2575fc)"
            : "none",
          backgroundOrigin: "border-box",
          backgroundClip: isFocused ? "padding-box, border-box" : "border-box",
        }}
        onClick={handlePickerClick}

      >
        {/* Hidden input for focus tracking */}
        <input
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
        />

        {uploading ? (
          <div>loading....</div>
        ) : (
          <div className={Style.flx}>
            {filesContent.map((file, index) => (
              <div key={index} style={{ display: "flex" }}>
                {file.type && file.type.startsWith("image/") && (
                  <img
                    alt={file.name}
                    src={file.content}
                    style={{ maxWidth: "100px", marginRight: "10px" }}
                  />
                )}
                {file.type && !file.type.startsWith("image/") && (
                  <a href={file.content} download={file.name}>
                    Download {file.name}
                  </a>
                )}
              </div>
            ))}
            <div className={Style.flx}>
              {/* Left side for placeholder text */}
              <div style={{ width: "80%" }}>
                <p
                  style={{
                    fontSize: "16px",
                    textAlign: "start",
                    color:
                      currentPlaceholder === placeholder ? "#7d7d7d" : "#6f6f72",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {currentPlaceholder}
                </p>
              </div>
              {/* Right side for image button */}
              <div className={Style.end}>
                <img
                  className={Style.imge3}
                  src={buttonImage}
                  onClick={handlePickerClick}
                  alt={useImagePicker ? "Select images" : "Select files"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}
