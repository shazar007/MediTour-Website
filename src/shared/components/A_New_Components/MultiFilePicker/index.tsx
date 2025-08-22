import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import ImageFile from "assets/images/imagePPicker.png";
import Style from "shared/components/FilePickeInsurance/FilePicker.module.css";
import commonStyles from "shared/utils/common.module.css";
import { upload_Multi_File } from "shared/services";
import { IoClose } from "react-icons/io5";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import RingLoader from "shared/components/RingLoader";

interface ImgPickerProps {
  setData?: any;
  img?: any;
  placeholder?: string;
  type?: any;
}

export default function MultiFilePicker({
  img,
  setData,
  placeholder,
  type,
}: ImgPickerProps) {
  const { t }: any = useTranslation();
  const [selectedFileName, setSelectedFileName] = useState(placeholder || "");
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (loadingIndicator) return;
    if (acceptedFiles && acceptedFiles.length > 0) {
      uploadImage(acceptedFiles);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const { openFilePicker } = useFilePicker({
    readAs: "DataURL",
    multiple: true,

    onFilesRejected: () => {},
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles.length > 0) {
        uploadImage(plainFiles);
      }
    },
  });

  const handleCancelSelection = () => {
    setSelectedFileName("");
    if (typeof setData === "function") {
      setData(null);
    }
  };

  const uploadImage = async (files: File[]) => {
    setLoadingIndicator(true);
    const formData = new FormData();
    files?.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await upload_Multi_File(formData);
      if (res.status === 200 && res.statusText === "OK") {
        const uploadedUrls = res?.data?.fileUrls || [];
        const fileNames = files.map((f) => f.name);
        setSelectedFileName(fileNames.join(", "));
        if (typeof setData === "function") {
          setData(uploadedUrls, fileNames);
        }
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoadingIndicator(false);
    }
  };

  const handlePickerClick = () => {
    if (loadingIndicator) return;
    openFilePicker();
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={Style.outter}
        style={{ cursor: loadingIndicator ? "wait" : "pointer" }}
        onClick={handlePickerClick}
      >
        <input {...getInputProps()} />
        {loadingIndicator ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RingLoader size={56} color={"#0e54a3"} />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className={Style.imge3}
              alt="MultiPicker"
              src={img ? img : ImageFile}
            />
          </div>
        )}

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
