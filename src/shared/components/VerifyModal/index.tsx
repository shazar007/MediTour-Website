import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthCode, { AuthCodeRef } from "react-auth-code-input";
import commonStyles from "../../utils/common.module.css";
import classNames from "classnames";
import PrimaryButton from "../PrimaryButton";
import successImg from "assets/images/success.png";

import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "10px!important",
  boxShadow: 24,
  textAlign: "center",
  padding: 4,
};

interface Props {
  loading: boolean;
  showModal: any;
  hanldeCloseModal: any;
  handleSubmit: any;
  code: any;
  codeError: any;
  setCodeError: any;
  setCode: any;
  hanldeCloseVerification: any;
  minutes: any;
  seconds: any;
  handleSendCodeToEmail: any;
  successMessage: any;
}

export default function VerifyModal(props: Partial<Props>) {
  const { t }: any = useTranslation();
  const AuthInputRef = React.useRef<AuthCodeRef>(null);
  const {
    loading,
    showModal,
    hanldeCloseModal,
    handleSubmit,
    setCode,
    codeError,
    minutes,
    seconds,
    handleSendCodeToEmail,
    setCodeError,
    hanldeCloseVerification,
    successMessage,
  } = props;

  const handleOnChange = (res: string) => {
    setTimeout(() => {
      setCodeError("");
    }, 10000);
    setCode(res);
  };
  if (codeError) {
    AuthInputRef.current?.clear();
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={showModal}
        // onClose={hanldeCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {successMessage ? (
            <>
              <Modal
                open={showModal}
                // onClose={hanldeCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img
                    src={successImg}
                    alt="success"
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
                    children={"OK"}
                    colorType={"blue"}
                    onClick={hanldeCloseModal}
                  />
                </Box>
              </Modal>
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                {successMessage}
              </Typography>
              <PrimaryButton
                children={"OK"}
                colorType={"blue"}
                onClick={hanldeCloseModal}
              /> */}
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <IoClose
                  style={{
                    width: 24,
                    height: 24,
                    alignSelf: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={hanldeCloseVerification}
                />
              </div>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: "center", color: "#001F57" }}
              >
                {t("otpHeadDesc_")}
              </Typography>
              <AuthCode
                // value={code}
                ref={AuthInputRef}
                allowedCharacters="numeric"
                onChange={handleOnChange}
                containerClassName={classNames(commonStyles.codeInputContainer)}
                inputClassName={classNames(commonStyles.codeInput)}
              />
              {codeError ? (
                <span className={classNames(commonStyles.error)}>
                  *{codeError}
                </span>
              ) : null}
              <Typography
                id="modal-modal-description"
                component={"span"}
                sx={{
                  textAlign: "center",
                  marginTop: "16px",
                  color: "#001F57",
                  // textDecoration: "underline",
                }}
              >
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    {t("timeRemaining")}:{" "}
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <p>
                    {t("didntRecieveCode")}{" "}
                    <span
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={handleSendCodeToEmail}
                    >
                      {t("sendAgain")}
                    </span>
                  </p>
                )}
              </Typography>
              <div
                style={{
                  paddingTop: 32,
                  width: 125,
                  display: "table",
                  margin: "auto",
                }}
              >
                <PrimaryButton
                  children={loading ? t("loading") : t("submit")}
                  colorType={"blue"}
                  onClick={handleSubmit}
                />
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
