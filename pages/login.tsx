import React, { ReactElement, useState } from "react";
import { Box, Paper, Typography, Stack, TextField, Icon } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

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
  const router = useRouter();

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
    const {
      data: { token },
    } = await login(data).unwrap();

    if (token) {
      const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
      cookies.set("ngelink-token", token, {
        expires: inOneHour,
        sameSite: "strict",
      });

      router.push("/");
    }
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = (req.cookies as { "ngelink-token": string })["ngelink-token"];

  if (token) {
    res.writeHead(307, { Location: "/" });
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
};
