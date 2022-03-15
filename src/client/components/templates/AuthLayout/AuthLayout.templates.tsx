import Box from "@mui/material/Box";
import React from "react";

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <Box bgcolor="background.default" height="100vh">
      {children}
    </Box>
  );
};
