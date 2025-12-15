import { Box } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export const CenterWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {children}
    </Box>
  );
};
