import React, { useEffect, useRef, useState } from "react";
import "./TourismCard.css";
import green from "assets/images/grenFLex.png";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

export const CardComponent = ({ title, img }: any) => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();

  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);
  return (
    <div className="tourism-card">
      <div className="content">
        <p className="heading">{t("ecoAndNature")}</p>
        <hr className="underline" />
        <p className="subtitle">{t("ecoAndNatureHead")}</p>
        <p className="description" style={isRtl ? { lineHeight: "30px" } : {}}>
          {t("ecoAndNatureCon")}
        </p>
        {/* <div className="footer">
          {title === "PAKISTAN" && <img className="logo" src={green} />}
          <button className="book-now">Book Now</button>
        </div> */}
      </div>
      {title === "PAKISTAN" ? (
        <div className="media" onClick={handlePlayPause}>
          <video
            height="100%"
            ref={videoRef}
            autoPlay
            loop
            muted
            className="video"
            src={require("../../../assets/images/greenVideo.mp4")}
          ></video>

          <button className="play-button">{isPlaying ? "⏸" : "▶"}</button>
        </div>
      ) : (
        <div className="media">
          <img src={img} alt="media" className="video" />
        </div>
      )}
    </div>
  );
};
