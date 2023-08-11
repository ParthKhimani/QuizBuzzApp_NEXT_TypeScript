import * as React from "react";
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
import { AppBar, Toolbar } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useRouter } from "next/router";
import { AddEmployeeFn } from "../api/apis";
import Cookies from "js-cookie";
import { useState } from "react";
import { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const defaultTheme = createTheme();

const AddEmployee = () => {
  const [technology, setTechnology] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const token = Cookies.get("token");
  let managerTechnology = "";

  if (token) {
    const decode: JwtPayload = jwt_decode(token);
    managerTechnology = decode.technology;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setTechnology(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await AddEmployeeFn(formData);
    switch (result.status) {
      case "200":
        router.replace("/manager-dashboard");
        break;
      case "400":
        setError("Employee is already assigned to another technology !");
        break;

      case "402":
        setError("Employee is already assigned to that technology once!");
        break;
    }
  };

  return (
    <>
      <AppBar position="static">
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
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Employee
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Assign Password"
                name="password"
                autoFocus
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
                  <MenuItem value={managerTechnology}>
                    {managerTechnology}
                  </MenuItem>
                </Select>
              </FormControl>
              <div style={{ color: "red" }}>{error}</div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  router.replace("/manager-dashboard");
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
export default AddEmployee;
