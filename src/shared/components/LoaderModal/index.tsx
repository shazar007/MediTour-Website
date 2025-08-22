import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Lottie from "lottie-react";
import Commonloader from "assets/lottiefile/Animation - 1713254983273.json";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 300,
  // bgcolor: "background.paper",
  bgcolor: "transparent",
  border: "none",
  outline: "none",
  borderRadius: "10px!important",
  // boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

interface Props {
  showModal: any;
  hanldeCloseModal: any;
  successMessage: any;
}

export default function LoadingModal(props: Partial<Props>) {
  const { showModal, hanldeCloseModal, successMessage } = props;

  return (
    <div>
      <Modal
        open={showModal}
        // onClose={hanldeCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backgroundColor: "transparent" }}
      >
        <Box sx={style}>
          <Lottie
            animationData={Commonloader}
            loop={true}
            style={{ height: 70, width: 70 }}
          />
        </Box>
      </Modal>
    </div>
  );
}
