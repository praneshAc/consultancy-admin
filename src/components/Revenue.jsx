import React from "react";
import { Bar } from "react-chartjs-2";

const revenueData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  revenue: [5000, 7000, 6000, 8500, 9000, 9500],
};

const barChartData = {
  labels: revenueData.labels,
  datasets: [
    {
      label: "Revenue",
      backgroundColor: "rgba(54, 162, 235, 0.7)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(54, 162, 235, 0.9)",
      hoverBorderColor: "rgba(54, 162, 235, 1)",
      data: revenueData.revenue,
    },
  ],
};

const BarGraph = () => {
  return (
    <div style={{ width: "100%", margin: "auto", height: "400px" }}>
      <Bar
        data={barChartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarGraph;
