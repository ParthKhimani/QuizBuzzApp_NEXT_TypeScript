import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState } from "react";
import { useRouter } from "next/router";
import { Question, Answer } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { GetQuizDataFn } from "../api/apis";
import Cookies from "js-cookie";

const QuizPage = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState("");
  const quizIndex = String(router.query.quizIndex);
  const employee = String(router.query.employee);

  const quizQuery = useQuery({
    queryKey: ["quiz", quizIndex, employee],
    queryFn: () => GetQuizDataFn(quizIndex, employee),
  });

  const questionValue: Question[] = quizQuery.data?.quiz?.questions?.map(
    (questionObject: Question) => ({
      question: questionObject.question,
      options: questionObject.options.map((options) => options),
    })
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedAnswer = event.target.value;
    const existingAnswer = answers.find((answer) => answer.index === index + 1);
    if (existingAnswer) {
      const updatedAnswers = answers.map((answer) =>
        answer.index === index + 1
          ? { ...answer, answer: selectedAnswer }
          : answer
      );
      setAnswers(updatedAnswers);
    } else {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { index: index + 1, answer: selectedAnswer },
      ]);
    }
  };

  const handleSubmit = () => {
    if (answers.length === quizQuery.data?.quiz?.questions?.length) {
      router.push({
        pathname: "/employee-dashboard",
        query: { employee: employee },
      });
      fetch("http://localhost:3333/add-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          quizIndex: quizIndex,
          answers: answers,
          employee: employee,
        }),
      });
    } else {
      setError("*Please attempt all the questions!");
    }
  };

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
        sx={{
          width: "75%",
          margin: "80px auto",
          boxShadow: 8,
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {questionValue?.map((questionObj, index) => (
          <>
            <Typography variant="h5" component="div" color="#2196f3">
              {index + 1}. {questionObj.question}
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(event) => handleChange(event, index as number)}
              >
                {questionObj.options.map((option, optionIndex) => (
                  <>
                    <FormControlLabel
                      value={optionIndex + 1}
                      control={<Radio color="success" />}
                      label={option.value}
                    />
                  </>
                ))}
              </RadioGroup>
            </FormControl>
            <hr />
          </>
        ))}
        <span style={{ color: "red", display: "block", margin: "10px" }}>
          {error}
        </span>
        <Button
          type="submit"
          variant="contained"
          color="success"
          style={{
            width: "15%",
            margin: "10px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};
export default QuizPage;
