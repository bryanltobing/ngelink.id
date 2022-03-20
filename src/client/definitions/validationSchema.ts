import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Email is invalid")
    .required("Email must be filled"),
  password: Yup.string()
    .trim()
    .required("Password must be filled")
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
      "Password must contain at least one character and one number with no special character"
    )
    .min(6, "Password minimal 6 character"),

  confirmationPassword: Yup.string()
    .required("Confirmation password must be filled")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirmation password must match password"
    ),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Email is invalid")
    .required("Email must be filled"),
  password: Yup.string().trim().required("Password must be filled"),
});
