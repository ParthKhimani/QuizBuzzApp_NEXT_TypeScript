import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AppBar, Paper, Toolbar } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useRouter } from "next/router";
import { UpdateEmployeeFn } from "../api/apis";
import Cookies from "js-cookie";
import { Employee, Technology } from "@/types";

const defaultTheme = createTheme();

const UpdateEmployee = () => {
  const [technology, setTechnology] = useState("");
  const router = useRouter();

  let employeeTechnology: Technology = {
    _id: "",
    name: "",
    managers: [],
    employees: [],
  };

  let employeeData: Employee = {
    _id: "",
    emailId: "",
    password: "",
    technology: employeeTechnology,
  };

  if (router.query.data) {
    try {
      employeeData = JSON.parse(String(router.query.data));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setTechnology(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await UpdateEmployeeFn(formData);
    switch (result.status) {
      case "200":
        router.replace("/admin-dashboard");
        break;

      case "202":
        router.replace("/admin-dashboard");
        break;
    }
  };

  useEffect(() => {
    if (employeeData) {
      setTechnology(employeeData.technology.name);
    }
  }, []);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Admin
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              router.replace("/");
              Cookies.remove("token");
            }}
          >
            sign out
          </Button>
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            component={Paper}
            sx={{
              marginTop: 10,
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: 0.8,
            }}
          >
            <Typography component="h1" variant="h5">
              Update Employee
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
                id="employee"
                label="Employee Email Id"
                name="employee"
                autoFocus
                defaultValue={employeeData ? employeeData.emailId : ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Assign Password"
                name="password"
                autoFocus
                defaultValue={employeeData ? employeeData.password : ""}
              />

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
                >
                  <MenuItem value={"MERN Stack"}>MERN Stack</MenuItem>
                  <MenuItem value={"MEAN Stack"}>MEAN Stack</MenuItem>
                  <MenuItem value={"PHP-laravel"}>PHP-laravel</MenuItem>
                  <MenuItem value={"Python"}>Python</MenuItem>
                  <MenuItem value={"Flutter-Android"}>Flutter-Android</MenuItem>
                  <MenuItem value={"iOS"}>iOS</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  router.replace("/admin-dashboard");
                }}
              >
                Go to Dashboard
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default UpdateEmployee;
