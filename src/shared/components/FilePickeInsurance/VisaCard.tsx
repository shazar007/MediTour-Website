import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import ImageFile from "assets/images/filePicker.png";
import Style from "./FilePicker.module.css";
import commonStyles from "shared/utils/common.module.css";
import { uploadFile } from "shared/services";
import classNames from "classnames";
import upload from "assets/images/upload.png";
import { MdDeleteOutline } from "react-icons/md";
interface VisaCardProps {
  setData?: any;
  img?: any;
  useImagePicker?: boolean;
  placeholder?: string;
  upLoadName?: any;
  dis?: any;
  formik?: any;
  fieldName?: any;
}

export default function VisaCard({
  img,
  useImagePicker = true,
  setData,
  upLoadName,
  dis,
  fieldName,
  formik,
}: VisaCardProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    multiple: true,

    onFilesRejected: ({ errors }) => {},
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      uploadImage(plainFiles[0]);
    },
  });

  const handleCancelSelection = () => {
    // Reset the selected file and form field
    setSelectedFileName("");
    formik.setFieldValue(fieldName, null);

    // Check if setData is a function before calling it
    if (typeof setData === "function") {
      setData(null);
    }
  };

  const uploadImage = async (imagedata: any) => {
    setUploading(true);
    setLoadingIndicator(true);

    const data: any = new FormData();
    await data.append("file", imagedata);

    uploadFile(data)
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          setSelectedFileName(imagedata.name);

          if (typeof setData === "function") {
            setData(res?.data?.fileUrl);
          }
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setUploading(false);
        setLoadingIndicator(false);
      });
  };

  const handlePickerClick = () => {
    openFilePicker();
  };

  return (
    <div>
      <p style={{ fontSize: "16px", fontWeight: "500", color: "#00276D" }}>
        {upLoadName}
      </p>
      <p style={{ fontSize: "12px", fontWeight: "400", color: "#7D7D7D" }}>
        {dis}
      </p>
      <div className={Style.uploadButton}>
        {!selectedFileName && (
          <>
            <img
              alt="ImageFile"
              className={Style.imge3}
              src={img ? img : ImageFile}
              onClick={handlePickerClick}
            />
            <div>
              <p
                style={{ textAlign: "center" }}
                className={classNames(
                  commonStyles.fs15,
                  commonStyles.colorBlue,
                  Style.mt8
                )}
              >
                'To proceed, please upload a picture '
              </p>

              {img ? null : (
                <p
                  style={{ textAlign: "center", marginBottom: "6px" }}
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.colorBlue,
                    Style.mt8,
                    Style.borderBottom
                  )}
                >
                  Supports word, .doc, pdf
                </p>
              )}
            </div>

            {loadingIndicator && (
              <div className={classNames(commonStyles.flx, Style.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs16,
                    commonStyles.colorBlue
                  )}
                >
                  Loading...
                </p>
              </div>
            )}
          </>
        )}
        {selectedFileName && !loadingIndicator && (
          <div className={Style.uploadedFile}>
            <img className={Style.ImageView1} alt="uploaded" src={upload} />
            <p
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#00276D",
                width: "200px",
              }}
            >
              {selectedFileName}
            </p>
            <button
              onClick={handleCancelSelection}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <MdDeleteOutline className={Style.ImageView1} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
