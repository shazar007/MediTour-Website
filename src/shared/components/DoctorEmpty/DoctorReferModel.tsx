import React from "react";
import DoctorReferLoader from "assets/lottiefile/doctorReferLoader.json";
import Lottie from "lottie-react";
interface Props {
  showModal: any;
  hanldeCloseModal: any;
  successMessage: any;
}
export default function DoctorReferModel(props: Partial<Props>) {
  const { showModal, hanldeCloseModal, successMessage } = props;
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
          animationData={DoctorReferLoader}
          loop={true}
          style={{ height: 350, width: 350 }}
        />
      </div>
    </div>
  );
}
