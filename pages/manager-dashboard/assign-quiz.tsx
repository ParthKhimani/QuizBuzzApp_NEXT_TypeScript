import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AbandonQuizFn,
  AssignQuizFn,
  GetEmployeeFn,
  GetQuizByTechnologyFn,
} from "../api/apis";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Toolbar,
  Typography,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import Cookies from "js-cookie";

const AssignQuiz = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const technology = router.query.technology as string;
  const employee = router.query.employee as string;

  const quizDataQuery = useQuery({
    queryKey: ["quiz", technology],
    queryFn: () => GetQuizByTechnologyFn(technology),
  });

  const employeeDataQuery = useQuery({
    queryKey: ["employee", employee],
    queryFn: () => GetEmployeeFn(employee),
  });

  const handleAssignQuiz = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const quiz = event.currentTarget.value;
    const result = await AssignQuizFn(quiz, employee);
    switch (result.status) {
      case "200":
        queryClient.invalidateQueries();
    }
  };

  const handleAbandonQuiz = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const quiz = event.currentTarget.value;
    const result = await AbandonQuizFn(quiz, employee);
    switch (result.status) {
      case "200":
        queryClient.invalidateQueries();
    }
  };

  const cardContent = (count: number) => (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14, textAlign: "center" }} gutterBottom>
          {quizDataQuery.data?.quiz[count - 1]?.technology?.name}
        </Typography>
        <hr />
        <Typography sx={{ textAlign: "center" }} variant="h5" component="div">
          Quiz {count}
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
          {quizDataQuery.data?.quiz[count - 1]?.questions.length} Questions
        </Typography>
      </CardContent>
      <hr />
      {!quizDataQuery?.data?.quiz[count - 1]?.employees.includes(
        employeeDataQuery?.data?.employee._id
      ) && (
        <CardActions>
          <Button
            color="success"
            sx={{
              width: "100%",
            }}
            size="medium"
            onClick={handleAssignQuiz}
            value={quizDataQuery.data?.quiz[count - 1]._id}
          >
            Assign Quiz
          </Button>
        </CardActions>
      )}
      {quizDataQuery?.data?.quiz[count - 1]?.employees.includes(
        employeeDataQuery?.data?.employee._id
      ) && (
        <CardActions>
          <Button
            color="error"
            sx={{
              width: "100%",
            }}
            size="medium"
            onClick={handleAbandonQuiz}
            value={quizDataQuery.data?.quiz[count - 1]._id}
          >
            Abandon Quiz
          </Button>
        </CardActions>
      )}
    </>
  );

  const renderCards = () => {
    const cards = [];

    for (let i = 1; i <= quizDataQuery.data?.quiz?.length; i++) {
      cards.push(
        <Card
          key={i}
          variant="outlined"
          sx={{
            boxShadow: 8,
            margin: "15px",
            borderRadius: "10px",
          }}
        >
          {cardContent(i)}
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
      <Box sx={{ marginTop: 2 }}>
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
        <Typography
          variant="h6"
          component="div"
          color="#2196f3"
          style={{ textAlign: "center" }}
        >
          Quizes found for candidate's relavant technology
        </Typography>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          {renderCards()}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              router.replace("/manager-dashboard");
            }}
          >
            Go to Dashboard
          </Button>
        </div>
      </Box>
    </>
  );
};
export default AssignQuiz;
