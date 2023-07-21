import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QuizIcon from "@mui/icons-material/Quiz";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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

interface Quiz {
  questions: Question[];
  employee: {
    quizes: {
      questions: Question[];
    }[];
  };
}

interface Quizes {
  quiz: Quiz;
  score: number;
  attempted: boolean;
}

const EmployeeDashboard = () => {
  const router = useRouter();
  const employee = localStorage.getItem("employee");
  const [quizCount, setQuizCount] = useState<number>(0);
  const [technology, setTechnology] = useState<string>();
  const [quizes, setQuizes] = useState<Quizes[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/get-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ employee: JSON.parse(employee!) }),
    })
      .then((response) => response.json())
      .then((result) => {
        setQuizes(result.quiz.quizes);
        setQuizCount(result.quiz.quizes!.length);
        setTechnology(result.quiz.technology.name);
      });
  }, []);

  const handleLogout = () => {
    router.replace("/dashboard");
  };

  const handleStartQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.value;
    localStorage.setItem("quiz-index", index);
    router.replace("/employee-dashboard/quiz-page");
  };

  const cardContent = (count: number, attempt: boolean) => (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14, textAlign: "center" }} gutterBottom>
          {technology}
        </Typography>
        <hr />
        <Typography sx={{ textAlign: "center" }} variant="h5" component="div">
          Quiz {count}
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
          {quizes[count - 1].quiz.questions.length} Questions
        </Typography>
      </CardContent>
      <hr />
      <CardActions>
        {!attempt && (
          <Button
            sx={{
              width: "100%",
            }}
            size="medium"
            onClick={handleStartQuiz}
            value={count}
          >
            Start Quiz
          </Button>
        )}
        {attempt && (
          <Typography style={{ margin: "5px", width: "100%" }}>
            Quiz Submitted
          </Typography>
        )}
      </CardActions>
    </>
  );

  const renderCards = () => {
    const cards = [];

    for (let i = 1; i <= quizCount; i++) {
      const attempt = quizes[i - 1].attempted;
      const backgroundColor = attempt ? "green" : "default";
      const color = attempt ? "white" : "default";
      cards.push(
        <Card
          key={i}
          variant="outlined"
          sx={{ boxShadow: 8, backgroundColor: backgroundColor, color: color }}
          style={{ margin: "15px", borderRadius: "10px" }}
        >
          {cardContent(i, attempt)}
        </Card>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cards}
      </div>
    );
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <QuizIcon style={{ margin: "0px 10px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome Candidate
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              sign out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Typography variant="h6" component="div" color="#2196f3">
          No. of quizzes assigned to you: {quizCount}
        </Typography>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        {renderCards()}
      </div>
    </>
  );
};

export default EmployeeDashboard;
