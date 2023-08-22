import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QuizIcon from "@mui/icons-material/Quiz";
import { useRouter } from "next/router";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useState } from "react";
import ManagerTable from "../components/manager-table";
import EmployeeTable from "../components/employee-table";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const router = useRouter();
  const [value, setValue] = useState("employee-table");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Button
          variant="outlined"
          style={{ margin: "10px" }}
          onClick={() => router.replace("/admin-dashboard/add-manager")}
        >
          Add Manager
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "10px" }}
          onClick={() => router.replace("/admin-dashboard/add-employee")}
        >
          Add Employee
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "10px" }}
          onClick={() => router.replace("/admin-dashboard/add-quiz")}
        >
          Add Quiz
        </Button>
      </div>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Manager Table" value="manager-table" />
            <Tab label="Employee Table" value="employee-table" />
          </TabList>
        </Box>
        <TabPanel value="manager-table">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              color={"#2196f3"}
              margin={"auto"}
            >
              MANAGER TABLE
            </Typography>
            <hr />
            <ManagerTable />
          </div>
        </TabPanel>
        <TabPanel value="employee-table">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              color={"#2196f3"}
              margin={"auto"}
            >
              EMPLOYEE TABLE
            </Typography>
            <hr />
            <EmployeeTable />
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default AdminDashboard;
