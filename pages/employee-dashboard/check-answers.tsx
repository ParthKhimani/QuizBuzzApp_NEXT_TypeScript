import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useRouter } from "next/router";
import { Question } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { GetQuizDataWithAnswersFn } from "../api/apis";
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const AnswerPage = () => {
  const router = useRouter();
  const quizIndex = String(router.query.quizIndex);
  const token = Cookies.get("token");
  let employee = "";

  if (token) {
    const decode: JwtPayload = jwt_decode(token);
    employee = decode.employee;
  }

  const quizQuery = useQuery({
    queryKey: ["query", quizIndex, employee],
    queryFn: () => GetQuizDataWithAnswersFn(quizIndex, employee),
  });

  const questionValue: Question[] = quizQuery.data?.quiz?.questions?.map(
    (questionObject: Question) => ({
      question: questionObject.question,
      options: questionObject.options.map((options) => options),
    })
  );
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 999,
        }}
      >
        <AppBar position="fixed">
          <Toolbar>
            <QuizIcon style={{ margin: "0px 10px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quiz {quizIndex}
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
      </Box>
      <Box
        component={Paper}
        sx={{
          width: "75%",
          margin: "80px auto",
          boxShadow: 8,
          padding: "20px",
          borderRadius: "10px",
          opacity: 0.8,
        }}
      >
        {quizQuery.isLoading && (
          <div style={{ display: "flex" }}>
            <CircularProgress style={{ margin: "auto" }} />
          </div>
        )}
        {questionValue?.map((questionObj, index) => {
          const selectedAnswer = quizQuery.data?.selectedAnswers![index].answer;
          const correctAnswer = quizQuery.data?.answers![index];
          const isCorrect = Number(selectedAnswer) === Number(correctAnswer);
          return (
            <>
              {isCorrect && (
                <Typography variant="h6" component="div" color="#28ab00">
                  *Correct Answer
                </Typography>
              )}
              {!isCorrect && (
                <Typography variant="h6" component="div" color="#d40202">
                  *Wrong Answer
                </Typography>
              )}
              <Typography variant="h5" component="div" color="#2196f3">
                {index + 1}. {questionObj.question}
              </Typography>
              {questionObj.options.map((option, optionIndex) => {
                const optionStyles = {
                  padding: "5px",
                  backgroundColor: isCorrect
                    ? Number(correctAnswer) === optionIndex + 1
                      ? "lightgreen"
                      : ""
                    : Number(correctAnswer) === optionIndex + 1
                    ? "lightgreen"
                    : Number(selectedAnswer) === optionIndex + 1
                    ? "lightpink"
                    : "",
                  color: isCorrect
                    ? Number(correctAnswer) === optionIndex + 1
                      ? "white"
                      : ""
                    : Number(correctAnswer) === optionIndex + 1
                    ? "white"
                    : Number(selectedAnswer) === optionIndex + 1
                    ? "white"
                    : "black",
                };
                return (
                  <Typography
                    variant="h6"
                    component="div"
                    key={optionIndex}
                    style={optionStyles}
                  >
                    {option.value}
                  </Typography>
                );
              })}
              <hr />
            </>
          );
        })}
        {quizQuery.isFetched && (
          <Button
            variant="outlined"
            onClick={() => {
              router.replace("/employee-dashboard");
            }}
          >
            Go to Dashboard
          </Button>
        )}
      </Box>
    </>
  );
};
export default AnswerPage;
