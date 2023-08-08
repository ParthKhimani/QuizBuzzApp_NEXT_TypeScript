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
import { Employee, Quiz } from "@/types";
import QuizDataForEmployeeTable from "./quiz-data-for-employee-table";

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
        queryClient.invalidateQueries(["employees"]);
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

  return (
    <>
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
            {employeeQuery.data?.data?.map(
              (item: Employee, index: React.Key | null | undefined) => (
                <TableRow key={index}>
                  <TableCell rowSpan={employeeQuery.data.data?.quizes?.length}>
                    {item.emailId}
                  </TableCell>
                  <TableCell rowSpan={employeeQuery.data.data?.quizes?.length}>
                    {item.technology.name}
                  </TableCell>
                  {item.quizes.length === 0 && (
                    <TableCell>Assign a Quiz to check the score !</TableCell>
                  )}
                  {item.quizes.length !== 0 && (
                    <TableCell>
                      <QuizDataForEmployeeTable item={item} />
                    </TableCell>
                  )}
                  <TableCell rowSpan={employeeQuery.data.data?.quizes?.length}>
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
    </>
  );
};

export default EmployeeTable;
