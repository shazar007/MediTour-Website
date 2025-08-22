import React, { useState } from "react";

import "./LogoComponent.css";
import { add_File } from "shared/services";
import paper from "assets/images/upload.png";
import { MdDeleteOutline } from "react-icons/md";
const LogoComponent = ({
  setLoading,
  url,
  setUrl,
  fileName,
  setFileName,
}: {
  setLoading?: any;
  url?: any;
  setUrl?: any;
  fileName?: any;
  setFileName?: any;
}) => {
  const deleteFile = () => {
    setUrl(null);
    setFileName("");
  };

  const onUploadImage = (event: any) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      add_File(formData)
        .then((response: any) => {
          setUrl(response.data.fileUrl);
          setFileName(file.name);
        })
        .catch((err: any) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {!url && (
        <label className="uploadContainer">
          <img src={paper} className="uploadImage" alt="Upload" />
          <span
            style={{ marginLeft: "8px", color: "#00276D", fontSize: "12px" }}
          >
            Add Company logo
          </span>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={onUploadImage}
          />
        </label>
      )}

      {url && (
        <div className="fileContainer">
          <span style={{ fontSize: "12px", color: "#00276D", width: "250px" }}>
            {fileName}
          </span>
          <button onClick={deleteFile} className="deleteButton">
            <MdDeleteOutline color="#ff7631" className="deleteIcon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoComponent;
