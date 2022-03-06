import React from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AuthLayout from "@client/components/templates/AuthLayout";

import { NextPageWithLayout } from "@client/types";

const RegisterPage: NextPageWithLayout = () => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Paper component={Box} width="100%" maxWidth={400}>
          <Box mb={4}>
            <Typography variant="h4" textAlign="center">
              Sign Up
            </Typography>
          </Box>

          <Stack spacing={2} mb={3}>
            <TextField label="Email" placeholder="email@email.com" />
            <TextField label="Password" placeholder="**************" />
          </Stack>

          <Button variant="contained" fullWidth>
            SUBMIT
          </Button>
        </Paper>
      </Box>
    </>
  );
};

RegisterPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default RegisterPage;
