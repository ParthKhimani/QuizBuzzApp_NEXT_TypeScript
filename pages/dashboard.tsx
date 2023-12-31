import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AdminLoginFn, ManagerLoginFn, EmployeeLoginFn } from "./api/apis";
import Cookies from "js-cookie";
import { SelectChangeEvent } from "@mui/material/Select";
import QuizIcon from "@mui/icons-material/Quiz";

const defaultTheme = createTheme();

const CommonDashboard = () => {
  const [error, setError] = useState<string>();
  const [role, setRole] = useState<string>();
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

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
    onSubmit: async (values) => {
      if (role === "admin") {
        const AdminLoginData = await AdminLoginFn(values);
        switch (AdminLoginData.status) {
          case "303":
            router.replace("/admin-dashboard");
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
        const ManagerLoginData = await ManagerLoginFn(values);
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
        const EmployeeLoginData = await EmployeeLoginFn(values);
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
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          component={Paper}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 8,
            padding: 5,
            borderRadius: "8px",
            opacity: 0.8,
          }}
        >
          <QuizIcon style={{ margin: " 10px" }} color="primary" />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#2196f3" }}
          >
            QuizBuzz
          </Typography>
          <FormControl fullWidth>
            <Box onSubmit={formik.handleSubmit} component="form" noValidate>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handleChange}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "@media (min-width: 600px)": {
                    flexDirection: "row",
                  },
                }}
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="manager"
                  control={<Radio />}
                  label="Manager"
                />
                <FormControlLabel
                  value="employee"
                  control={<Radio />}
                  label="Employee"
                  sx={{ mr: 0 }}
                />
              </RadioGroup>
              <hr />
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
                value={formik.values.emailId}
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
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CommonDashboard;
