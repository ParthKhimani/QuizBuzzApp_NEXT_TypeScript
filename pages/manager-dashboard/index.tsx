import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QuizIcon from "@mui/icons-material/Quiz";
import { useRouter } from "next/router";
import EmployeeTableManagerDashboard from "../components/employee-table-manager-dashboard";
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const ManagerDashboard = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  let managerTechnology = "";

  if (token) {
    const decode: JwtPayload = jwt_decode(token);
    managerTechnology = decode.technology;
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Manager
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
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <Button
            variant="outlined"
            style={{ margin: "10px" }}
            onClick={() => {
              router.replace("/manager-dashboard/add-employee");
            }}
          >
            Add Employee
          </Button>
          <Button
            variant="outlined"
            style={{ margin: "10px" }}
            onClick={() => {
              router.replace("/manager-dashboard/add-quiz");
            }}
          >
            Add Quiz
          </Button>
        </div>
        <Typography
          variant="h6"
          component="div"
          color={"#2196f3"}
          textAlign={"center"}
        >
          EMPLOYEE TABLE
        </Typography>
        <EmployeeTableManagerDashboard />
      </Box>
    </>
  );
};
export default ManagerDashboard;
