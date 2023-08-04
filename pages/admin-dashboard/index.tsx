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
import {
  deleteEmployeeFn,
  deleteManagerFn,
  getEmployeeData,
  getManagerData,
} from "../api/apis";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Manager, Quiz, Employee } from "@/types";

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
  const employeeQuery = useQuery({
    queryFn: getEmployeeData,
    queryKey: ["employees"],
    initialData: employees,
  });

  const deleteManagerMutation = useMutation(
    (managerJSONString: string) =>
      deleteManagerFn(JSON.parse(managerJSONString)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["managers"]);
      },
    }
  );
  const deleteEmployeeMutation = useMutation(
    (employeeJSONString: string) => deleteEmployeeFn(employeeJSONString),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["employees"]);
      },
    }
  );

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
          <Button color="inherit" onClick={() => router.replace("/dashboard")}>
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
                      onClick={() => {
                        deleteManagerMutation.mutate(JSON.stringify(item));
                      }}
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
        style={{
          width: "75%",
          margin: "auto",
        }}
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
            {employeeQuery.data.data?.map(
              (item: Employee, index: React.Key | null | undefined) => (
                <TableRow key={index}>
                  <TableCell rowSpan={employeeQuery.data.data?.length}>
                    {item.emailId}
                  </TableCell>
                  <TableCell rowSpan={employeeQuery.data.data?.length}>
                    {item.technology.name}
                  </TableCell>
                  {item.quizes.map((quiz: Quiz, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        Quiz {index + 1}: {quiz.scoreGained}/{quiz.score}
                      </TableCell>
                    </TableRow>
                  ))}
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
                      onClick={() => {
                        deleteEmployeeMutation.mutate(JSON.stringify(item));
                      }}
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
    </Box>
  );
};
export default AdminDashboard;
