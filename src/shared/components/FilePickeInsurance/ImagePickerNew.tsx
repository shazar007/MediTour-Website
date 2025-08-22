import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import ImageFile from "assets/images/newImagePicker.png";
import Style from "./FilePicker.module.css";
import commonStyles from "shared/utils/common.module.css";
import { uploadFile } from "shared/services";
import { IoClose } from "react-icons/io5";
import classNames from "classnames";
import Picker from "assets/images/imagePPicker.png";
import { useTranslation } from "react-i18next";
interface ImgPickerProps {
  setData?: any;
  className?: string;
  useImagePicker?: boolean;
  placeholder?: string;
  initialImage?: string;
  iimagess?: string;
}


export default function ImagePickerNew({
  className,
  useImagePicker = true,
  setData,
  iimagess,
  placeholder,
}: ImgPickerProps) {
  const { t }: any = useTranslation();

  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    multiple: true,

    onFilesRejected: ({ errors }) => { },
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      uploadImage(plainFiles[0]);
    },
  });

  const handleCancelSelection = () => {
    setSelectedFileName("");

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
      .catch((err: any) => { })
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
      <div className={classNames(commonStyles.col12, Style.outerr)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img
              className={Style.imge3}
              src={Picker}
              onClick={handlePickerClick}
            />
            <p
              style={{
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
              className={classNames(commonStyles.fs15, Style.mt8)}
            >
              {loadingIndicator ? (
                t("loading")
              ) : selectedFileName ? (
                <span style={{ color: "#00276d" }}>{selectedFileName}</span>
              ) : placeholder ? (
                <span>{placeholder}</span>
              ) : (
                <>
                  <strong style={{ color: "#F69A1D" }}>{t("uploadPhotos")}</strong>{" "}
                  {t("orJustDrandAndDrop")}
                </>
              )}
            </p>
          </div>

          {selectedFileName && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <IoClose
                className={Style.close}
                cursor={"pointer"}
                color="red"
                onClick={handleCancelSelection}
              />
            </div>
          )}
        </div>



        {(selectedFileName && !loadingIndicator) || iimagess ? (
          <div>
            {(filesContent.length > 0 || iimagess) && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <img
                  src={
                    filesContent.length > 0 && filesContent[0]?.content
                      ? filesContent[0].content
                      : iimagess || ""
                  }
                  alt="Selected"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginTop: "16px",
                  }}
                />
              </div>
            )}
          </div>
        ) : null}

      </div>
    </div>
  );
}
