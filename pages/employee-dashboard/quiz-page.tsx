import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Option {
  id?: number;
  value: string;
}

interface Question {
  id?: number;
  question: string;
  options: Option[];
  answer?: string;
}

interface Answer {
  index: number;
  answer: string;
}

const QuizPage = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const quizIndex = localStorage.getItem("quiz-index");
  const employee = localStorage.getItem("employee");
  const questionValue = questions.map((questionObject: Question) => ({
    question: questionObject.question,
    options: questionObject.options.map((options) => options),
  }));
  const handleLogout = () => {
    router.replace("/dashboard");
  };

  useEffect(() => {
    fetch("http://localhost:3333/get-quiz-data", {
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
      });
  }, []);

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
    if (answers.length === questions.length) {
      router.replace("/employee-dashboard");
      fetch("http://localhost:3333/add-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          quizIndex: quizIndex,
          answers: answers,
          employee: JSON.parse(employee!),
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
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
        <AppBar position="static">
          <Toolbar>
            <QuizIcon style={{ margin: "0px 10px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quiz {quizIndex}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              sign out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ marginTop: "64px" }}>
        {questionValue.map((questionObj, index) => (
          <>
            <Typography variant="h6" component="div" color="#2196f3">
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
      </Box>
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
    </>
  );
};
export default QuizPage;
