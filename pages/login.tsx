import React, { ReactElement, useState } from "react";
import { Box, Paper, Typography, Stack, TextField, Icon } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@components/atoms";
import { AuthLayout } from "@components/templates";

import { useLoginMutation } from "@client/redux/modules/auth";

import { loginValidationSchema } from "@definitions/validationSchema";

import { NextPageWithLayout } from "@client/types";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmitLoginForm: SubmitHandler<LoginFormValues> = async (
    data
  ) => {
    login(data);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Paper component={Box} width="100%" maxWidth={400}>
        <Box mb={4}>
          <Typography variant="h4" textAlign="center">
            Sign In
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(handleSubmitLoginForm)}>
          <Stack spacing={2} mb={3}>
            <TextField
              {...register("email")}
              label="Email"
              placeholder="email@email.com"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            isLoading={isLoading}
          >
            SUBMIT
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

LoginPage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
