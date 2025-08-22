import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
import ImageFile from "assets/images/imagePPicker.png";
import Style from "./ShortImgae.module.css";
import commonStyles from "shared/utils/common.module.css";
import { uploadFile } from "shared/services";
import { IoClose } from "react-icons/io5";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface ImgPickerProps {
  setData?: any;
  className?: string;
  useImagePicker?: boolean;
  placeholder?: string;
}
export default function ShortImagePicker({
  className,
  useImagePicker = true,
  setData,
}: ImgPickerProps) {
  const { t }: any = useTranslation();

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
      <div className={classNames(Style.outerr)}>
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handlePickerClick}
        >
          <img className={Style.imge3} src={ImageFile} />

          <p className={Style.textTitle}>
            <strong style={{ fontWeight: "700", color: "#F69A1D" }}>
              {t("uploadPhotos")}
            </strong>{" "}
            {t("orJustDrandAndDrop")}
          </p>
        </div>
        {selectedFileName && !loadingIndicator && (
          <div>
            <div className={classNames(commonStyles.flx, Style.mt8)}>
              {/* <p
                style={{ textAlign: "start" }}
                className={classNames(
                  commonStyles.fs16,
                  commonStyles.colorBlue,
                  Style.filename
                )}
              >
                {selectedFileName}
              </p> */}

              {/* <div className={Style.end}>
                <IoClose
                  className={Style.close}
                  onClick={handleCancelSelection}
                />
              </div> */}
            </div>
            <div>
              {/* {filesContent.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <img
                    src={filesContent[0].content} // Update to use the actual content field
                    alt="Selected Image"
                    style={{
                      width: "100%",
                      height: "150px",
                      marginTop: "16px",
                    }}
                  />
                </div>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
