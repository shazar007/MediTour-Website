import React, { useState, useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import ImageUpload from "assets/images/upload.png";
import ImageFile from "assets/images/file.png";
import Style from "./Imgpicker.module.css";
import { uploadFile } from "shared/services";
import { PiUploadSimpleBold } from "react-icons/pi";

interface ImgPickerProps {
  setData?: any;
  className?: string;
  useImagePicker?: boolean;
  placeholder?: string;
  initialValue?: string;
}

export default function ImagePickerTable({
  className,
  useImagePicker = true,
  setData,
  initialValue,
}: ImgPickerProps) {
  const [uploading, setUploading] = useState(false);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    multiple: true,

    onFilesRejected: ({ errors }) => {},
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
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setUploading(false);
      });
  };

  const handlePickerClick = () => {
    openFilePicker();
  };

  const buttonImage = useImagePicker ? ImageUpload : ImageFile;

  return (
    <div>
      {uploading ? (
        <div>loading....</div>
      ) : (
        <div
          style={{
            display: "flex",
            margin: "15px 0",
          }}
        >
          {filesContent.map((file, index) => (
            <div key={index} style={{ display: "flex" }}>
              {/* <p
                style={{
                  display: "flex",
                  alignItems: "end",
                  margin: "0 30px  0 10px",
                  color: "#001f57",
                  fontStyle: "italic",
                }}
              >
                {file.name}
              </p> */}
              {file.type && file.type.startsWith("image/") && (
                <img alt={file.name} src={file.content}></img>
              )}
              {file.type && !file.type.startsWith("image/") && (
                <a href={file.content} download={file.name}>
                  Download {file.name}
                </a>
              )}
              <br />
            </div>
          ))}
          <div className={Style.flx}>
            <div
              style={{
                width: "100%",
              }}
            >
              <PiUploadSimpleBold
                className={Style.imageTable}
                onClick={handlePickerClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
