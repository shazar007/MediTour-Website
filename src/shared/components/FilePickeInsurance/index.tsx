import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import ImageFile from "assets/images/imagePPicker.png";
import Style from "./FilePicker.module.css";
import commonStyles from "shared/utils/common.module.css";
import { uploadFile } from "shared/services";
import { IoClose } from "react-icons/io5";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";

interface ImgPickerProps {
  setData?: any;
  img?: any;
  useImagePicker?: boolean;
  placeholder?: string;
  type?: any;
}

export default function FilePicker({
  img,
  useImagePicker = true,
  setData,
  placeholder,
  type,
}: ImgPickerProps) {
  const { t }: any = useTranslation();
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(placeholder || "");
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      uploadImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    multiple: true,

    onFilesRejected: ({ errors }) => {},
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }: any) => {
      console.log("🚀 ~ plainFiles:", plainFiles[0]?.path);
      uploadImage(plainFiles[0]);
    },
  });

  const handleCancelSelection = () => {
    // Reset the selected file and perform any other necessary actions
    setSelectedFileName("");

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
            setData(res?.data?.fileUrl, imagedata.name);
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
      <div className={Style.outter}>
        <img
          alt="ImageFIle"
          className={Style.imge3}
          src={img ? img : ImageFile}
          onClick={handlePickerClick}
        />

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p
            style={{ textAlign: "center" }}
            className={classNames(
              commonStyles.fs15,
              commonStyles.colorBlue,
              Style.mt8
            )}
          >
            {img ? (
              t("toProceedPleaseUpload_")
            ) : (
              <div>
                {t("dropYourFileHere")}, <strong>{t("orBrowse")}</strong>
              </div>
            )}
          </p>
          {type || img ? null : (
            <p
              style={{ textAlign: "center", marginBottom: "6px" }}
              className={classNames(
                commonStyles.fs14,
                commonStyles.colorBlue,
                Style.mt8,
                Style.borderBottom
              )}
            >
              {t("supports")} word, .doc, pdf
            </p>
          )}
        </div>
        {loadingIndicator && (
          <div className={classNames(commonStyles.flx, Style.mt8)}>
            <p
              className={classNames(commonStyles.fs16, commonStyles.colorBlue)}
            >
              {t("loading")}
            </p>
          </div>
        )}
        {!type && selectedFileName && !loadingIndicator && (
          <div className={classNames(commonStyles.flx, Style.mt8)}>
            <p
              className={classNames(
                commonStyles.fs16,
                commonStyles.colorBlue,
                Style.filename
              )}
            >
              {selectedFileName}
            </p>
            <div className={Style.end}>
              <IoClose
                className={Style.close}
                onClick={handleCancelSelection}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
