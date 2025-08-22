import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "16px !important",
  boxShadow: 24,
  overflowY: "auto",
  maxHeight: "80vh",
  p: 2,

  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

interface Props {
  showModal: any;
  children: any;
  close: any;
}

export default function CustomModal(props: Partial<Props>) {
  const { showModal, children, close } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={close ? close : () => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {/* <p
                    className={classNames(
                      commonstyles.fs24,
                      commonstyles.semiBold,
                      commonstyles.colorBlue
                    )}
                  >
                    Appointment
                  </p> */}
          <Box sx={style}>{children}</Box>
        </>
      </Modal>
    </div>
  );
}
