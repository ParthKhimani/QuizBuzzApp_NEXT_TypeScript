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
  for (let i = 0; i < data.length; i++) {
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
      text: "Your Overall Score",
    },
    series: [
      {
        type: "pie",
        data: [percentage, remainingPercentage],
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {attemptCompleted && (
          <Card
            variant="outlined"
            sx={{
              boxShadow: 8,
              borderColor: borderColor,
              padding: 2,
              width: "40%",
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
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              colors={["green", "red"]}
            />
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
