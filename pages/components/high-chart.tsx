import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Quizes } from "@/types";
import { Box, Card } from "@mui/material";

interface HighChartProps {
  data: Quizes[];
}

const HighChart: React.FC<HighChartProps> = ({ data }) => {
  let totalScore = 0;
  let scoreGained = 0;
  let borderColor = "";
  let attemptCompleted = false;
  for (let i = 0; i < data?.length; i++) {
    if (data[i].attempted) {
      totalScore += data[i].score;
      scoreGained += data[i].scoreGained;
    }
    if (data[i].attempted == true) attemptCompleted = true;
  }
  const percentage = (scoreGained * 100) / totalScore;
  const remainingPercentage = 100 - percentage;

  if (percentage < 33) borderColor = "red";
  else borderColor = "green";

  const options = {
    title: {
      text: "Overall Score",
    },
    series: [
      {
        type: "pie",
        name: ["correct", "incorrect"],
        data: [percentage, remainingPercentage],
        colors: ["green", "red"],
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        {attemptCompleted && (
          <Card
            variant="outlined"
            sx={{
              boxShadow: 8,
              borderColor: borderColor,
              padding: 2,
            }}
            style={{ margin: "15px", borderRadius: "10px" }}
          >
            {percentage > 33 && (
              <div
                style={{
                  color: "green",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                Passed with - {percentage} %
              </div>
            )}
            {percentage < 33 && (
              <div
                style={{
                  color: "red",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                Failed with - {percentage} %
              </div>
            )}
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div style={{ color: "green" }}>Correct - {scoreGained}</div>
            <div style={{ color: "red" }}>
              Incorrect - {totalScore - scoreGained}
            </div>
          </Card>
        )}
        {!attemptCompleted && (
          <div style={{ fontWeight: "bolder" }}>
            *Please Attempt any quiz to check your grade!
          </div>
        )}
      </Box>
    </>
  );
};

export default HighChart;
