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
import { Manager } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteManagerFn, getManagerData } from "../api/apis";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
        queryClient.invalidateQueries();
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
      {managerQuery.isLoading && (
        <div style={{ display: "flex" }}>
          <CircularProgress style={{ margin: "auto" }} />
        </div>
      )}
      {managerQuery.isFetched && (
        <TableContainer
          component={Paper}
          style={{ width: "75%", margin: "auto", opacity: 0.8 }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold " }}>
                  Manager's mail Id
                </TableCell>
                <TableCell style={{ fontWeight: "bold " }}>
                  Technology Assigned
                </TableCell>
                <TableCell style={{ fontWeight: "bold " }}>Action</TableCell>
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
                        onClick={handleUpdateManager}
                        value={JSON.stringify(item)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => {
                          const confirmation = confirm("Are you sure ?");
                          if (confirmation)
                            deleteManagerMutation.mutate(JSON.stringify(item));
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

export default ManagerTable;
