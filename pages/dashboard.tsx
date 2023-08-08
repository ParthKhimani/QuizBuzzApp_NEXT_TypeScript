import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import QuizIcon from "@mui/icons-material/Quiz";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Login from "./components/login";
import { useState } from "react";

const CommonDashboard = () => {
  const [value, setValue] = useState("admin");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuizBuzz
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Typography variant="h6" component="div" color={"#2196f3"}>
          SELECT YOUR SIGN IN METHOD
        </Typography>
      </div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Admin" value="admin" />
            <Tab label="Manager" value="manager" />
            <Tab label="Employee" value="employee" />
          </TabList>
        </Box>
        <TabPanel value="admin">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" component="div" color={"#2196f3"}>
              ADMIN LOGIN
            </Typography>
          </div>
          <Login role="admin" />
        </TabPanel>
        <TabPanel value="manager">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" component="div" color={"#2196f3"}>
              MANAGER LOGIN
            </Typography>
          </div>
          <Login role="manager" />
        </TabPanel>
        <TabPanel value="employee">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" component="div" color={"#2196f3"}>
              EMPLOYEE LOGIN
            </Typography>
          </div>
          <Login role="employee" />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default CommonDashboard;
