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
import { Quiz, Employee } from "@/types";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { deleteEmployeeFn, getEmployeeData } from "../api/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getStaticProps: GetStaticProps<{
  employees: Employee[];
}> = async () => {
  const employeeData = await getEmployeeData();
  return {
    props: {
      employees: employeeData.data,
    },
    revalidate: 5,
  };
};

const ManagerDashboard = ({
  employees,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const employeeQuery = useQuery({
    queryFn: getEmployeeData,
    queryKey: ["employees"],
    initialData: employees,
  });

  const deleteEmployeeMutation = useMutation(
    (employeeJSONString: string) => deleteEmployeeFn(employeeJSONString),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["employees"]);
      },
    }
  );

  const handleUpdateEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    router.push({
      pathname: "/manager-dashboard/update-employee",
      query: { data },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Manager
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              router.replace("/dashboard");
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
export default ManagerDashboard;
