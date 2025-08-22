import React from "react";
import Commonloader from "assets/lottiefile/Animation - 1730714190763.json";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

export default function PhysiotheristsEmpty({ size }: { size?: any }) {
      const {t}:any=useTranslation()
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Lottie Animation */}
      <Lottie
        animationData={Commonloader}
        loop={true}
        style={{ height: size ? size : 300, width: size ? size : 300 }}
      />

      {/* No Data Found Text */}
      <h2
        style={{
          fontSize: "20px",
          color: "#888",
          marginTop: "-50px",
          marginBottom: "30px",
          fontWeight: "500",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {t("noData")}
      </h2>
    </div>
  );
}
