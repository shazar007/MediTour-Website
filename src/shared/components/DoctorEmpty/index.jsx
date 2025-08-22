import React from "react";
import Commonloader from "assets/lottiefile/doctorEmpty.json";
import Lottie from "lottie-react";
export default function DoctorEmpty() {
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
          animationData={Commonloader}
          loop={true}
          style={{ height: 550, width: 550 }}
        />
      </div>
    </div>
  );
}
