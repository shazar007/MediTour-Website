import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: "100%",
          mr: 4,
          "& .MuiLinearProgress-bar": {
            backgroundColor: "green",
            borderRadius: 8,
          },
          "& .MuiLinearProgress-root": {
            backgroundColor: "#ddd",
          },
        }}
      >
        <LinearProgress
          variant="determinate"
          {...props}
          style={{ height: "8px", borderRadius: "8px" }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
