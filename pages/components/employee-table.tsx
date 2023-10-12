import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEmployeeFn, getEmployeeData } from "../api/apis";
import { useRouter } from "next/router";
import { Employee, Quiz } from "@/types";
import QuizDataForEmployeeTable from "./quiz-data-for-employee-table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";

const EmployeeTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const employeeQuery = useQuery({
    queryFn: getEmployeeData,
    queryKey: ["employees"],
  });

  const deleteEmployeeMutation = useMutation(
    (employeeJSONString: string) =>
      deleteEmployeeFn(JSON.parse(employeeJSONString)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  const handleUpdateEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    router.push({
      pathname: "/admin-dashboard/update-employee",
      query: { data },
    });
  };

  const handleAssignQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
    const employeeObj = event.currentTarget.getAttribute("value");
    const technology = JSON.parse(employeeObj!).technology;
    const employee = JSON.parse(employeeObj!).emailId;
    router.push({
      pathname: "/admin-dashboard/assign-quiz",
      query: { technology: technology?._id, employee: employee },
    });
  };

  return (
    <>
      <br />
      {employeeQuery.isLoading && (
        <div style={{ display: "flex" }}>
          <CircularProgress style={{ margin: "auto" }} />
        </div>
      )}
      {employeeQuery.isFetched && (
        <TableContainer
          component={Paper}
          style={{
            width: "75%",
            margin: "auto",
            opacity: 0.8,
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold " }}>
                  Employee's mail Id
                </TableCell>
                <TableCell style={{ fontWeight: "bold " }}>
                  Technology
                </TableCell>
                <TableCell style={{ fontWeight: "bold " }}>
                  Scored in Quizes
                </TableCell>
                <TableCell style={{ fontWeight: "bold " }}>
                  Assign Quiz
                </TableCell>
                <TableCell style={{ fontWeight: "bold " }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeQuery.data?.data?.map(
                (item: Employee, index: React.Key | null | undefined) => (
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
                    {item?.quizes?.length === 0 && (
                      <TableCell>Assign a Quiz to check the score !</TableCell>
                    )}
                    {item?.quizes?.length !== 0 && (
                      <TableCell>
                        <QuizDataForEmployeeTable item={item} />
                      </TableCell>
                    )}
                    <TableCell>
                      <Button
                        value={JSON.stringify(item)}
                        onClick={handleAssignQuiz}
                      >
                        <AssignmentIcon color="secondary" />
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
                          const confirmation = confirm("Are you sure ?");
                          if (confirmation)
                            deleteEmployeeMutation.mutate(JSON.stringify(item));
                        }}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default EmployeeTable;
