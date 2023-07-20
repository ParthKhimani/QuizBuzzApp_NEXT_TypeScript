import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";

interface Technology {
  name: String;
  managers: Manager[];
}

interface Manager {
  emailId: String;
  technology: Technology;
}

interface Quiz {
  score: number;
  attempted: boolean;
  scoreGained: number;
}

interface Employee {
  emailId: String;
  technology: Technology;
  quizes: Quiz[];
}

const ManagerDashboard = () => {
  const router = useRouter();
  const [data2, setData2] = React.useState<Employee[]>([]);
  const handleLogout = () => {
    router.replace("/dashboard");
  };
  const handleAddEmployee = () => {
    router.replace("/manager-dashboard/add-employee");
  };
  const handleAddQuiz = () => {
    router.replace("/manager-dashboard/add-quiz");
  };

  const fetchData2 = () => {
    fetch("http://localhost:3333/admin-dashboard/employee-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.data)) {
          setData2(result.data);
        }
      });
  };

  const handleUpdateEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    router.push({
      pathname: "/manager-dashboard/update-employee",
      query: { data },
    });
  };
  const handleDeleteEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    fetch("http://localhost:3333/admin-dashboard/delete-employee-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "200") {
          fetchData2();
        }
      });
  };

  React.useEffect(() => {
    fetchData2();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Manager
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
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
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "10px" }}
          onClick={handleAddQuiz}
        >
          Add Quiz
        </Button>
      </div>
      <Typography
        variant="h6"
        component="div"
        color="#2196f3"
        style={{ textAlign: "center" }}
      >
        Employee Table
      </Typography>
      <br />
      <TableContainer
        component={Paper}
        style={{ width: "75%", margin: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Employee's mail Id</TableCell>
              <TableCell>Technology</TableCell>
              <TableCell>Scored in Quizes</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map((item: Employee) => (
              <TableRow>
                <TableCell>{item.emailId}</TableCell>
                <TableCell>{item.technology.name}</TableCell>
                <TableCell>
                  {item.quizes.map((quiz: Quiz, index: number) => (
                    <div key={index}>
                      Quiz {index + 1}: {quiz.scoreGained}/{quiz.score}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="success"
                    style={{ marginRight: "10px" }}
                    onClick={handleUpdateEmployee}
                    value={JSON.stringify(item)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ margin: "10px" }}
                    onClick={handleDeleteEmployee}
                    value={JSON.stringify(item)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ManagerDashboard;
