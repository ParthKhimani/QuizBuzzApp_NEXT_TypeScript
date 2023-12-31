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
  const [value, setValue] = useState("manager-table");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: " 10px",
          }}
        >
          <Button
            variant="contained"
            style={{ margin: " 10px" }}
            onClick={() => router.replace("/admin-dashboard/add-manager")}
          >
            Add Manager
          </Button>
          <Button
            variant="contained"
            style={{ margin: "10px" }}
            onClick={() => router.replace("/admin-dashboard/add-employee")}
          >
            Add Employee
          </Button>
          <Button
            variant="contained"
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
            <ManagerTable />
          </TabPanel>
          <TabPanel value="employee-table">
            <EmployeeTable />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
export default AdminDashboard;
