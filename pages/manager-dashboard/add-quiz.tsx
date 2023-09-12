import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Alert,
  AppBar,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";
import { useRouter } from "next/router";
import { Option, Question } from "@/types";
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const AddQuiz: React.FC = () => {
  const router = useRouter();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [quizOpenError, setQuizOpenError] = useState(false);
  const [emailOpenSuccess, setEmailOpenSuccess] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
  ]);
  const token = Cookies.get("token");
  let managerTechnology = "";

  if (token) {
    const decode: JwtPayload = jwt_decode(token);
    managerTechnology = decode.technology;
  }

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion(event.target.value);
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index].value = event.target.value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    const isFieldsFilled =
      currentQuestion.trim() !== "" &&
      options.every((option) => option.value.trim() !== "") &&
      currentAnswer.trim() !== "";

    if (isFieldsFilled) {
      const question: Question = {
        id: questions.length + 1,
        question: currentQuestion,
        options: [...options],
        answer: currentAnswer,
      };
      setQuestions([...questions, question]);
      setCurrentQuestion("");
      setOptions([
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
      ]);
      setCurrentAnswer("");
      setOpenSuccess(true);
    } else {
      setOpenError(true);
    }
  };

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleQuizCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setQuizOpenError(false);
  };

  const handleEmailCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setEmailOpenSuccess(false);
  };

  const handleAnswerSelection = (event: SelectChangeEvent) => {
    const answer = event.target.value;
    setCurrentAnswer(answer as string);
  };

  const handleSaveQuiz = () => {
    if (questions.length === 0) {
      setQuizOpenError(true);
    } else {
      fetch("http://localhost:3333/add-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          questions: questions,
          technology: managerTechnology,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          switch (result.status) {
            case "202":
              setEmailOpenSuccess(true);
              break;
          }
        });
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    console.log(questionId);
    const updatedQuestions = questions.filter(
      (question) => question.id !== questionId
    );
    setQuestions(
      updatedQuestions.map((question, index) => ({
        ...question,
        id: index + 1,
      }))
    );
  };

  const handleClearQuiz = () => {
    setQuestions([]);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Manager
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              router.replace("/");
              Cookies.remove("token");
            }}
          >
            sign out
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", margin: "10px" }}>
        <Box
          sx={{
            margin: "10px",
            marginTop: 10,
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Add Quiz
          </Typography>
          <TextField
            label="Question"
            value={currentQuestion}
            onChange={handleQuestionChange}
            fullWidth
            margin="normal"
          />
          {options.map((option) => (
            <TextField
              key={option.id}
              label={`Option ${option.id}`}
              value={option.value}
              onChange={(event) =>
                handleOptionChange(
                  event as React.ChangeEvent<HTMLInputElement>,
                  option.id - 1
                )
              }
              fullWidth
              margin="normal"
            />
          ))}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Answer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentAnswer}
              label="Choose Answer"
              name="answer"
              onChange={handleAnswerSelection}
              fullWidth
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            style={{ margin: "10px" }}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>

          <Snackbar
            open={openSuccess}
            autoHideDuration={2000}
            onClose={handleCloseSuccess}
          >
            <Alert
              onClose={handleCloseSuccess}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Question Added Successfully !
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={2000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Error in adding the Question !
            </Alert>
          </Snackbar>
          <Button
            variant="outlined"
            onClick={() => {
              router.replace("/manager-dashboard");
            }}
          >
            Go to Dashboard
          </Button>
        </Box>
        <Box
          sx={{
            margin: "10px",
            marginTop: 10,
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Questions Added
          </Typography>
          <Typography variant="h6" gutterBottom>
            Technology : {managerTechnology}
          </Typography>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "20%" }}>Serial Number</TableCell>
                  <TableCell style={{ width: "70%" }}>Question</TableCell>
                  <TableCell style={{ width: "10%" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question) => (
                  <TableRow>
                    <TableCell style={{ width: "20%" }}>
                      {question.id}
                    </TableCell>
                    <TableCell style={{ width: "70%" }}>
                      {question.question}
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      <IconButton
                        color="primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              style={{ margin: "10px" }}
              onClick={handleClearQuiz}
            >
              Clear Quiz
            </Button>
            <Button
              variant="contained"
              color="success"
              style={{ margin: "10px" }}
              onClick={handleSaveQuiz}
            >
              Save Quiz
            </Button>
          </div>
          <Snackbar
            open={quizOpenError}
            autoHideDuration={2000}
            onClose={handleQuizCloseError}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={handleQuizCloseError}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Error in adding Quiz !
            </Alert>
          </Snackbar>
          <Snackbar
            open={emailOpenSuccess}
            autoHideDuration={2000}
            onClose={handleEmailCloseSuccess}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={handleEmailCloseSuccess}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Quiz Alert sent to all the Candidates !
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </>
  );
};

export default AddQuiz;
