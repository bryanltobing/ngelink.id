import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthLayout from "@client/components/templates/AuthLayout";

import { registerValidationSchema } from "@client/definitions/validationSchema";

import { NextPageWithLayout } from "@client/types";

type RegisterForm = {
  email: string;
  password: string;
};

const RegisterPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerValidationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmitRegisterForm = handleSubmit((data) => console.log(data));

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

          <form onSubmit={handleSubmitRegisterForm}>
            <Stack spacing={2} mb={3}>
              <TextField
                {...register("email")}
                label="Email"
                placeholder="email@email.com"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                {...register("password")}
                label="Password"
                placeholder="**************"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: showPassword ? (
                    <Icon
                      sx={{ cursor: "pointer" }}
                      onClick={handleToggleShowPassword}
                    >
                      visibility
                    </Icon>
                  ) : (
                    <Icon
                      sx={{ cursor: "pointer" }}
                      onClick={handleToggleShowPassword}
                    >
                      visibility_off
                    </Icon>
                  ),
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Stack>

            <Button type="submit" variant="contained" fullWidth>
              SUBMIT
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

RegisterPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default RegisterPage;
