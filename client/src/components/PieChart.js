import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ portfolio = {} }) => {
  const labels = Object.keys(portfolio);
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  const percentages = Object.values(portfolio);
  const data = {
    labels: labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "white", // Make the text inside the pie chart white
        font: {
          weight: "bold",
          size: 10,
        },
        formatter: (value, context) => {
          // Get label from the dataset
          let label = context.chart.data.labels[context.dataIndex];
          return `${label}\n${value}%`; // Show label + percentage
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += context.raw + "%";
            return label;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} width={350} height={350} />;
};
