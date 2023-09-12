import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEmployeeFn, getEmployeeData } from "../api/apis";
import { useRouter } from "next/router";
import { Employee } from "@/types";
import QuizDataForEmployeeTable from "./quiz-data-for-employee-table";
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";

const EmployeeTableManagerDashboard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const token = Cookies.get("token");
  let managerTechnology = "";
  if (token) {
    const decode: JwtPayload = jwt_decode(token);
    managerTechnology = decode.technology;
  }
  const employeeQuery = useQuery({
    queryFn: getEmployeeData,
    queryKey: ["employees"],
  });

  const deleteEmployeeMutation = useMutation(
    (employeeJSONString: string) => deleteEmployeeFn(employeeJSONString),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  const handleUpdateEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    const emailId = JSON.parse(data!).emailId;
    const password = JSON.parse(data!).password;

    router.push({
      pathname: "/manager-dashboard/update-employee",
      query: {
        emailId: emailId,
        password: password,
      },
    });
  };

  const handleAssignQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
    const employeeObj = event.currentTarget.getAttribute("value");
    const technology = JSON.parse(employeeObj!).technology;
    const employee = JSON.parse(employeeObj!).emailId;
    router.push({
      pathname: "/manager-dashboard/assign-quiz",
      query: { technology: technology?._id, employee: employee },
    });
  };

  return (
    <>
      <br />
      {employeeQuery?.data?.data?.filter(
        (item: Employee) => managerTechnology === item.technology.name
      ).length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            style={{
              width: "75%",
              margin: "auto",
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Employee's mail Id</TableCell>
                  <TableCell>Technology</TableCell>
                  <TableCell>Scored in Quizes</TableCell>
                  <TableCell>Assign Quiz</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {employeeQuery?.data?.data?.map(
                (item: Employee, index: React.Key | null | undefined) => (
                  <TableBody>
                    {managerTechnology === item.technology.name && (
                      <TableRow key={index}>
                        <TableCell
                          rowSpan={employeeQuery.data.data?.quizes?.length}
                        >
                          {item.emailId}
                        </TableCell>
                        <TableCell
                          rowSpan={employeeQuery.data.data?.quizes?.length}
                        >
                          {item.technology.name}
                        </TableCell>
                        {item.quizes.length === 0 && (
                          <TableCell>
                            Assign a Quiz to check the score !
                          </TableCell>
                        )}
                        {item.quizes.length !== 0 && (
                          <TableCell>
                            <QuizDataForEmployeeTable item={item} />
                          </TableCell>
                        )}
                        <TableCell>
                          <Button
                            value={JSON.stringify(item)}
                            onClick={handleAssignQuiz}
                          >
                            <AssignmentIcon />
                          </Button>
                        </TableCell>
                        <TableCell
                          rowSpan={employeeQuery.data.data?.quizes?.length}
                        >
                          <Button
                            onClick={handleUpdateEmployee}
                            value={JSON.stringify(item)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            onClick={() => {
                              deleteEmployeeMutation.mutate(
                                JSON.stringify(item)
                              );
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                )
              )}
            </Table>
          </TableContainer>
        </>
      ) : (
        <div
          style={{ fontWeight: "bolder", textAlign: "center", color: "red" }}
        >
          *No candidates assigned in your technology yet !
        </div>
      )}
    </>
  );
};

export default EmployeeTableManagerDashboard;
