import { Box } from "@mui/material";
import React from "react";

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Box bgcolor="background.default" height="100vh">
      {children}
    </Box>
  );
};

export default AuthLayout;
