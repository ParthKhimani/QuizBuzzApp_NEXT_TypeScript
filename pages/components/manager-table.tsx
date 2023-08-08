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
import { Manager } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteManagerFn, getManagerData } from "../api/apis";
import { useRouter } from "next/router";

const ManagerTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const managerQuery = useQuery({
    queryFn: getManagerData,
    queryKey: ["managers"],
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

  const handleUpdateManager = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    router.push({
      pathname: "/admin-dashboard/update-manager",
      query: { data },
    });
  };

  return (
    <>
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
            {managerQuery.data?.data?.map(
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
    </>
  );
};

export default ManagerTable;
