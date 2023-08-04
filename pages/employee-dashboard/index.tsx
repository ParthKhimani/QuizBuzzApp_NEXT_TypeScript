import { useState } from "react";
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
import { GetQuizFn } from "../api/apis";
import { useQuery } from "@tanstack/react-query";
import { Quizes } from "@/types";
import HighChart from "../components/high-chart";

const EmployeeDashboard = () => {
  const router = useRouter();
  const [quizCount, setQuizCount] = useState<number>(0);
  const [technology, setTechnology] = useState<string>();
  const [quizes, setQuizes] = useState<Quizes[]>([]);

  const quizDataQuery = useQuery({
    queryKey: ["quiz"],
    queryFn: GetQuizFn,
    onSuccess: (data) => {
      setQuizes(data.quiz.quizes);
      setQuizCount(data.quiz.quizes!.length);
      setTechnology(data.quiz.technology.name);
    },
    refetchInterval: 1000,
  });

  const handleStartQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.value;
    localStorage.setItem("quiz-index", index);
    router.replace("/employee-dashboard/quiz-page");
  };

  const handleCheckAnswers = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.value;
    localStorage.setItem("quiz-index", index);
    router.replace("/employee-dashboard/check-answers");
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
      {!attempt && (
        <CardActions>
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
        </CardActions>
      )}
      {attempt && (
        <>
          <Typography sx={{ fontSize: 16, textAlign: "center" }} gutterBottom>
            Score : {quizes[count - 1].scoreGained}/{quizes[count - 1].score}
          </Typography>
          <hr />
          <Button
            sx={{
              width: "100%",
              color: "white",
            }}
            size="medium"
            onClick={handleCheckAnswers}
            value={count}
          >
            Check Answers
          </Button>
        </>
      )}
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
          sx={{
            boxShadow: 8,
            backgroundColor: backgroundColor,
            color: color,
            margin: "15px",
            borderRadius: "10px",
          }}
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
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Typography variant="h6" component="div" color="#2196f3">
          No. of quizzes assigned to you: {quizCount}
        </Typography>
      </div>
      {quizDataQuery.isLoading && (
        <Typography
          variant="h3"
          component="div"
          color="#2196f3"
          style={{ textAlign: "center" }}
        >
          Please Wait...
        </Typography>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        {renderCards()}
      </div>
      <hr />
      <HighChart data={quizes} />
    </>
  );
};

export default EmployeeDashboard;
