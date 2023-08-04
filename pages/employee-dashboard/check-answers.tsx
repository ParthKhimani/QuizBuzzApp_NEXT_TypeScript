import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Question, Answer } from "@/types";

const AnswerPage = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>();
  const [correctAnswers, setCorrectAnswers] = useState<string[]>();
  const quizIndex = localStorage.getItem("quiz-index");
  const employee = localStorage.getItem("employee");
  const questionValue = questions.map((questionObject: Question) => ({
    question: questionObject.question,
    options: questionObject.options.map((options) => options),
  }));

  useEffect(() => {
    fetch("http://localhost:3333/get-quiz-data-with-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        index: quizIndex,
        employee: JSON.parse(employee!),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.quiz.questions);
        setSelectedAnswers(result.selectedAnswers);
        setCorrectAnswers(result.answers);
        console.log(selectedAnswers);
        console.log(correctAnswers);
      });
  }, []);

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
        <AppBar position="static">
          <Toolbar>
            <QuizIcon style={{ margin: "0px 10px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quiz {quizIndex}
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
      </Box>
      <Box
        sx={{
          width: "75%",
          margin: "80px auto",
          boxShadow: 8,
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {questionValue.map((questionObj, index) => {
          const selectedAnswer = selectedAnswers![index].answer;
          const correctAnswer = correctAnswers![index];
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
                      : "black"
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
        <Button
          variant="outlined"
          onClick={() => {
            router.replace("/employee-dashboard");
          }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </>
  );
};
export default AnswerPage;
