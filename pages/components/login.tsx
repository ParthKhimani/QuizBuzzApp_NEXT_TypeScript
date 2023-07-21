import * as React from "react";
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

const defaultTheme = createTheme();
interface LoginProps {
  role: string;
}
const Login: React.FC<LoginProps> = ({ role }) => {
  const [data, setData] = React.useState<FormData>();
  const [error, setError] = React.useState<string>();
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setData(formData);
  };

  const handleSignUp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    router.replace("/employee-dashboard/sign-up");
  };

  React.useEffect(() => {
    if (data) {
      //fetching admin-login API
      if (role === "admin") {
        fetch("http://localhost:3333/admin-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(Object.fromEntries(data)),
        })
          .then((response) => response.json())
          .then((result) => {
            setError("");
            switch (result.status) {
              case "303":
                router.replace("/admin-dashboard");
                break;

              case "404":
                setError("*Email id Not Registered as an admin!");
                break;

              case "400":
                setError("*Incorrect Password!");
                break;
            }
          });
      }
      //fetching manager-login API
      if (role === "manager") {
        fetch("http://localhost:3333/manager-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(Object.fromEntries(data)),
        })
          .then((response) => response.json())
          .then((result) => {
            setError("");
            switch (result.status) {
              case "303":
                router.replace("/manager-dashboard");
                break;

              case "404":
                setError("*Email id Not Registered as a manager!");
                break;

              case "400":
                setError("*Incorrect Password!");
                break;
            }
          });
      }
      //fetching employee-login API
      if (role === "employee") {
        fetch("http://localhost:3333/employee-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(Object.fromEntries(data)),
        })
          .then((response) => response.json())
          .then((result) => {
            setError("");
            switch (result.status) {
              case "303":
                router.replace("/employee-dashboard");
                localStorage.setItem(
                  "employee",
                  JSON.stringify(data.get("emailId"))
                );
                break;

              case "404":
                setError("*Email id Not Registered as an employee!");
                break;

              case "400":
                setError("*Incorrect Password!");
                break;
            }
          });
      }
    }
  }, [data]);

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
                    onClick={handleSignUp}
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
