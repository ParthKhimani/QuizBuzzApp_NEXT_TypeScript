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
        queryClient.invalidateQueries(["employees"]);
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
                        <TableCell
                          rowSpan={employeeQuery.data.data?.quizes?.length}
                        >
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
                              deleteEmployeeMutation.mutate(
                                JSON.stringify(item)
                              );
                            }}
                          >
                            Delete
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
        <div style={{ fontWeight: "bolder", textAlign: "center" }}>
          *No candidates assigned in your technology yet !
        </div>
      )}
    </>
  );
};

export default EmployeeTableManagerDashboard;
