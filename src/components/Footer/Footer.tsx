import { Box } from "@mui/material";
import * as React from "react";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  return (
    <>
      <Box
        sx={{ textAlign: "center", pb: 2, pt: 2, borderTop: "1px dashed #DDD" }}
      >
        © 2024 News Application.
      </Box>
    </>
  );
}
