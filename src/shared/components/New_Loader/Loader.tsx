import React from "react";
import Lottie from "lottie-react";
import loader from "../../../assets/lottiefile/loader.json";

const CustomLoader = () => {
  return (
    <div style={styles.overlay as React.CSSProperties}>
      <Lottie
        animationData={loader}
        loop={true}
        style={styles.animationStyle as React.CSSProperties}
      />
    </div>
  );
};

const styles = {
  animationStyle: {
    width: 300,
    height: 300,
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 110000000,
    backdropFilter: "blur(10px)",
  } as React.CSSProperties,
};

export default CustomLoader;
