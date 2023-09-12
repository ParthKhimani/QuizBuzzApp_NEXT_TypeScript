import { EmployeeProps, Quiz } from "@/types";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GetQuizFn } from "../api/apis";
import HighChart from "./high-chart";

const QuizDataForEmployeeTable: React.FC<EmployeeProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const employee = item?.emailId;

  const quizDataQuery = useQuery({
    queryKey: ["quiz", employee],
    queryFn: () => GetQuizFn(employee),
  });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Check Score</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex" }}>
            <Table>
              <TableContainer>
                <TableHead>
                  <TableCell style={{ fontWeight: "bolder" }}>Quizes</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>Score</TableCell>
                </TableHead>
                <TableBody>
                  {item?.quizes?.map((quiz: Quiz, index: number) => (
                    <>
                      {quiz.attempted && (
                        <TableRow key={index}>
                          <TableCell>Quiz {index + 1}</TableCell>
                          <TableCell>
                            {quiz.scoreGained}/{quiz.score}
                          </TableCell>
                        </TableRow>
                      )}
                      {!quiz.attempted && (
                        <TableRow key={index}>
                          <TableCell>Quiz {index + 1}</TableCell>
                          <TableCell
                            style={{ color: "red", fontWeight: "bold" }}
                          >
                            *Yet not attempted the Quiz
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </TableContainer>
            </Table>
            <HighChart data={quizDataQuery.data?.quiz?.quizes} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default QuizDataForEmployeeTable;
