import * as Yup from "yup";

const EmailPasswordSchema = {
  email: Yup.string()
    .email("Invalid email format")
    .required("The email field is required"),
  password: Yup.string()
    .required("The password field is required")
    .min(4, "Password must be at least 4 characters long"),
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("The name field is required"),
  ...EmailPasswordSchema,
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("The confirm password field is required"),
});

const LoginSchema = Yup.object().shape({
  ...EmailPasswordSchema,
});

export { SignupSchema, LoginSchema };
