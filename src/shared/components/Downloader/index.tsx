import React from "react";
import { PiDownloadSimpleBold } from "react-icons/pi";
import style from "./downloader.module.css";
interface Props {
  link: any;
}
function Downloader(props: Partial<Props>) {
  const { link } = props;
  //
  const handleImageClick = () => {
    const fileContent = "Hello, this is a text file content.";
    const blob = new Blob([fileContent], { type: "text/plain" });
    // const link = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.download = "Download ";
    a.click();
  };

  const filename = "Download ";

  return (
    <div className={style.downloaderContainer}>
      <PiDownloadSimpleBold onClick={handleImageClick} className={style.icon} />
      <div className={style.filename}>{filename}</div>
      <a id={link}></a>
    </div>
  );
}

export default Downloader;
