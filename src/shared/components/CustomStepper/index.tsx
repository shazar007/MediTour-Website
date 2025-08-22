import React from "react";
import { Step, StepLabel, Stepper, Box } from "@mui/material";
import { IoArrowBack, IoArrowForward } from "react-icons/io5"; // Add this
import { useTranslation } from "react-i18next";

interface Props {
  steps: any;
  selectedStep: number;
  onBack?: () => void; // Optional back handler
}

const CustomStepper = (props: Partial<Props>) => {
  const { t, i18n }: any = useTranslation();
  const { steps = [], selectedStep = 0, onBack } = props;

  return (
    <Box sx={{ width: "100%", marginLeft: "20px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: "8px",
          position: "absolute",
          zIndex: 1000,
        }}
        onClick={onBack}
      >
        {["ur", "ar", "ps", "pr"].some((lang) =>
          i18n.language.startsWith(lang)
        ) ? (
          <IoArrowForward size={20} color="#0e54a3" />
        ) : (
          <IoArrowBack size={20} color="#0e54a3" />
        )}
      </div>
      <Stepper
        activeStep={selectedStep}
        alternativeLabel
        sx={{
          display: "flex",
          flexWrap: "wrap",
          direction: "ltr",
          "& .MuiStepIcon-root.Mui-completed": {
            color: "green",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#0e54a3",
          },
          "& .MuiStep-root": {
            marginBottom: "5px",
            textAlign: ["ur", "ar", "ps", "pr"].some((lang) =>
              i18n.language.startsWith(lang)
            )
              ? "right"
              : "left",
          },
          "& .MuiStepLabel-label": {
            direction: ["ur", "ar", "ps", "pr"].some((lang) =>
              i18n.language.startsWith(lang)
            )
              ? "rtl"
              : "ltr",
          },
        }}
      >
        {steps.map((obj: any) => (
          <Step key={obj.id}>
            <StepLabel>{obj.lable}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CustomStepper;
