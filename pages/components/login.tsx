"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Grid, Link } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AdminLoginFn, ManagerLoginFn, EmployeeLoginFn } from "../api/apis";
import { LoginProps } from "@/types";
import Cookies from "js-cookie";

const defaultTheme = createTheme();

const Login: React.FC<LoginProps> = ({ role }) => {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const validationSchema = yup.object({
    emailId: yup
      .string()
      .email("Enter a valid email Id")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (role === "admin") {
      const AdminLoginData = await AdminLoginFn(formData);
      switch (AdminLoginData.status) {
        case "303":
          router.replace("/admin-dashboard");
          // localStorage.setItem("token", AdminLoginData.token);
          Cookies.set("token", AdminLoginData.token);
          break;

        case "404":
          setError("*Email id Not Registered as an admin!");
          break;

        case "400":
          setError("*Incorrect Password!");
          break;
      }
    }
    if (role === "manager") {
      const ManagerLoginData = await ManagerLoginFn(formData);
      switch (ManagerLoginData.status) {
        case "303":
          router.replace("/manager-dashboard");
          Cookies.set("token", ManagerLoginData.token);
          break;

        case "404":
          setError("*Email id Not Registered as an manager!");
          break;

        case "400":
          setError("*Incorrect Password!");
          break;
      }
    }
    if (role === "employee") {
      const EmployeeLoginData = await EmployeeLoginFn(formData);
      switch (EmployeeLoginData.status) {
        case "303":
          router.replace("/employee-dashboard");
          Cookies.set("token", EmployeeLoginData.token);
          break;

        case "404":
          setError("*Email id Not Registered as an employee!");
          break;

        case "400":
          setError("*Incorrect Password!");
          break;
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="emailId"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.emailId && Boolean(formik.errors.emailId)}
              helperText={formik.touched.emailId && formik.errors.emailId}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <div style={{ color: "red" }}>{error}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item>
              {role === "employee" && (
                <>
                  Don't have an account?
                  <Link
                    underline="hover"
                    variant="body2"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.replace("/sign-up")}
                  >
                    {" Sign Up"}
                  </Link>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
