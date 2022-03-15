import React from "react";
import MuiButton from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

import { ButtonProps } from "./Button.interface";

export const Button: React.FC<ButtonProps> = (props) => {
  const { isLoading, ...restProps } = props;

  if (isLoading) {
    return <LoadingButton loading={isLoading} {...restProps} />;
  }
  return <MuiButton {...restProps} />;
};
