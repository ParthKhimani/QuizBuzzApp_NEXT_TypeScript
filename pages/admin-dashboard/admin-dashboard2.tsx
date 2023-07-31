import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QuizIcon from "@mui/icons-material/Quiz";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType, GetStaticProps } from "next";
import { deleteManagerFn, getEmployeeData, getManagerData } from "../api/apis";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

export const getStaticProps: GetStaticProps<{
  managers: Manager[];
  employees: Employee[];
}> = async () => {
  const managerData = await getManagerData();
  const employeeData = await getEmployeeData();
  return {
    props: {
      managers: managerData.data,
      employees: employeeData.data,
    },
    revalidate: 5,
  };
};

const AdminDashboard = ({
  managers,
  employees,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const managerQuery = useQuery({
    queryFn: getManagerData,
    queryKey: ["managers"],
    initialData: managers,
  });
  console.log(managerQuery.data);
  const deleteManagerMutation = useMutation({
    mutationFn: deleteManagerFn,
    onSuccess: () => {
      queryClient.invalidateQueries(["managers"]);
    },
  });
  const handleLogout = () => {
    router.replace("/dashboard");
  };
  const handleAddManager = () => {
    router.replace("/admin-dashboard/add-manager");
  };
  const handleAddEmployee = () => {
    router.replace("/admin-dashboard/add-employee");
  };
  const handleAddQuiz = () => {
    router.replace("/admin-dashboard/add-quiz");
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
          //   fetchData2();
        }
      });
  };

  const handleUpdateManager = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    router.push({
      pathname: "/admin-dashboard/update-manager",
      query: { data },
    });
  };

  const handleUpdateEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    router.push({
      pathname: "/admin-dashboard/update-employee",
      query: { data },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Admin
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
          onClick={handleAddManager}
        >
          Add Manager
        </Button>
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

      {/* manager table */}
      <br />
      <Typography
        variant="h6"
        component="div"
        color="#2196f3"
        style={{ textAlign: "center" }}
      >
        Manager Table
      </Typography>
      <br />
      <TableContainer
        component={Paper}
        style={{ width: "75%", margin: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Manager's mail Id</TableCell>
              <TableCell>Technology Assigned</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managerQuery.data.data?.map(
              (item: Manager, index: React.Key | null | undefined) => (
                <TableRow key={index}>
                  <TableCell>{item.emailId}</TableCell>
                  <TableCell>{item.technology.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      style={{ marginRight: "10px" }}
                      onClick={handleUpdateManager}
                      value={JSON.stringify(item)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      style={{ margin: "10px" }}
                      onSubmit={deleteManagerMutation.mutate}
                      value={JSON.stringify(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* employee table */}
      <br />
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
            {employees.map((item: Employee, index) => (
              <TableRow key={index}>
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
export default AdminDashboard;
