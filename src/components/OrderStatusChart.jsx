import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current && data && data.length > 0) {
      const statusCounts = {};
      data.forEach((status) => {
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });

      const statusLabels = Object.keys(statusCounts).sort((a, b) => {
        // Define the desired order: confirmed, shipped, delivered
        const order = ["confirmed", "shipped", "delivered"];
        return order.indexOf(a) - order.indexOf(b);
      });
      const statusValues = statusLabels.map((label) => statusCounts[label]);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, {
        type: "pie",
        data: {
          labels: statusLabels,
          datasets: [
            {
              data: statusValues,
              backgroundColor: ["#878BB6", "#4ACAB4", "#FFEA88"], // Adjust colors as needed
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartContainer} />;
};

export default PieChart;
