import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrimaryButton from "../PrimaryButton";
import successImg from "assets/images/success.png";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "10px!important",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

interface Props {
  showModal: any;
  hanldeCloseModal: any;
  successMessage: any;
}

export default function SuccessModal(props: Partial<Props>) {
  const { showModal, hanldeCloseModal, successMessage } = props;
  const { t }: any = useTranslation();

  return (
    <div>
      <Modal
        open={showModal}
        // onClose={hanldeCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            alt="successImg"
            src={successImg}
            style={{ width: 80, height: 80 }}
          />

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mt: 2, mb: 2, color: "#001F57" }}
          >
            {successMessage}
          </Typography>
          <PrimaryButton
            children={t("ok")}
            colorType={"blue"}
            onClick={hanldeCloseModal}
          />
        </Box>
      </Modal>
    </div>
  );
}
