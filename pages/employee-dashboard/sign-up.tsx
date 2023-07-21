import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { AppBar, Avatar, FormHelperText, Grid, Toolbar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import QuizIcon from "@mui/icons-material/Quiz";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import * as yup from "yup";

const defaultTheme = createTheme();

const SignUp = () => {
  const [error, setError] = React.useState<string>();
  const [technology, setTechnology] = React.useState("");
  const router = useRouter();

  const validationSchema = yup.object({
    firstName: yup.string().required("*First Name is required!"),
    lastName: yup.string().required("*Last Name is required!"),
    emailId: yup
      .string()
      .email("*Enter a valid email Id")
      .required("*Email is required"),
    password: yup
      .string()
      .min(8, "*Password should be of minimum 8 characters length")
      .required("*Password is required"),
    technology: yup.string().required("*Select Technology"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      technology: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    setTechnology(event.target.value as string);
    formik.handleChange(event);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fetch("http://localhost:3333/employee-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((result) => {
        setError("");
        const status = result.status;
        switch (status) {
          case "400":
            setError("*Email id already registered!");
            break;

          case "202":
            router.replace("/dashboard");
            break;
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="static">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Candidate
          </Typography>
        </Toolbar>
      </AppBar>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  name="firstName"
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="emailId"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.emailId && Boolean(formik.errors.emailId)
                  }
                  helperText={formik.touched.emailId && formik.errors.emailId}
                />
              </Grid>

              <Grid item xs={12}>
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
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Technology
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={technology}
                    name="technology"
                    label="Technology"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.technology &&
                      Boolean(formik.errors.technology)
                    }
                  >
                    <MenuItem value={"MERN Stack"}>MERN Stack</MenuItem>
                    <MenuItem value={"MEAN Stack"}>MEAN Stack</MenuItem>
                    <MenuItem value={"PHP-laravel"}>PHP-laravel</MenuItem>
                    <MenuItem value={"Python"}>Python</MenuItem>
                    <MenuItem value={"Flutter-Android"}>
                      Flutter-Android
                    </MenuItem>
                    <MenuItem value={"iOS"}>iOS</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {formik.touched.technology && formik.errors.technology}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <div style={{ color: "red" }}>{error}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                router.replace("/dashboard");
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
