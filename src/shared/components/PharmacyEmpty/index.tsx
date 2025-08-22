import React from "react";
import Lottie from "lottie-react";
export default function PharmacyEmpty() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie
          animationData={""}
          loop={true}
          style={{ height: 550, width: 550 }}
        />
      </div>
    </div>
  );
}
