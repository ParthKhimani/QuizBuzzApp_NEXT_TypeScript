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
import HighChart from "../components/high-chart";
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { CircularProgress } from "@mui/material";

const EmployeeDashboard = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  let employee = "";

  if (token) {
    const decode: JwtPayload = jwt_decode(token);
    employee = decode.employee;
  }

  const quizDataQuery = useQuery({
    queryKey: ["quiz", employee],
    queryFn: () => GetQuizFn(employee),
  });

  const handleStartQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.value;
    router.push({
      pathname: "/employee-dashboard/quiz-page",
      query: { quizIndex: index, employee: employee },
    });
  };

  const handleCheckAnswers = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.value;
    router.push({
      pathname: "/employee-dashboard/check-answers",
      query: { quizIndex: index },
    });
  };

  const cardContent = (count: number, attempt: boolean) => (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14, textAlign: "center" }} gutterBottom>
          {quizDataQuery.data?.quiz?.technology.name}
        </Typography>
        <hr />
        <Typography sx={{ textAlign: "center" }} variant="h5" component="div">
          Quiz {count}
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
          {quizDataQuery.data?.quiz?.quizes[count - 1]?.quiz?.questions?.length}{" "}
          Questions
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
            Score : {quizDataQuery.data?.quiz?.quizes[count - 1].scoreGained}/
            {quizDataQuery.data?.quiz?.quizes[count - 1].score}
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

    for (let i = 1; i <= quizDataQuery.data?.quiz?.quizes?.length; i++) {
      const attempt = quizDataQuery.data?.quiz?.quizes[i - 1].attempted;
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
      <AppBar position="fixed">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Candidate
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
      <Box sx={{ marginTop: 10 }}>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <Typography variant="h6" component="div">
            No. of quizzes assigned to you:{" "}
            {quizDataQuery.data?.quiz?.quizes
              ? quizDataQuery.data?.quiz?.quizes?.length
              : 0}
          </Typography>
        </div>
        {quizDataQuery.isLoading && (
          <div style={{ display: "flex" }}>
            <CircularProgress style={{ margin: "auto" }} />
          </div>
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
        <div style={{ width: "40%", margin: "auto" }}>
          <HighChart data={quizDataQuery.data?.quiz?.quizes} />
        </div>
      </Box>
    </>
  );
};

export default EmployeeDashboard;
