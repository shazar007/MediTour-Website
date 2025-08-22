import { useState } from "react";
import { Line } from "react-chartjs-2";

import styles from "./Calender.module.css";

const StatisticsGraph = () => {
  const [selectedOption, setSelectedOption] = useState("Last 6 months");

  const last6MonthsData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Appointments",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgb(0, 51, 102)",
        backgroundColor: "rgba(0, 51, 102, 0.2)",
        tension: 0.4,
      },
      {
        label: "Walk In patients",
        data: [3, 7, 10, 15, 8, 4],
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const last12MonthsData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Appointments",
        data: [12, 19, 3, 5, 2, 3, 4, 10, 6, 8, 12, 7],
        borderColor: "rgb(0, 51, 102)",
        backgroundColor: "rgba(0, 51, 102, 0.2)",
        tension: 0.4,
      },
      {
        label: "Walk In patients",
        data: [3, 7, 10, 15, 8, 4, 9, 11, 6, 5, 3, 8],
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Statistics Graph",
        font: { size: 18 },
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
        min: 0,
      },
    },
  };

  const graphData =
    selectedOption === "Last 6 months" ? last6MonthsData : last12MonthsData;

  return (
    <div className={styles.graphContainer}>
      <div className={styles.graphHeader}>
        <h3>Statistics</h3>
        <select
          onChange={(e) => setSelectedOption(e.target.value)}
          value={selectedOption}
        >
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>Other months</option>
        </select>
      </div>

      <Line data={graphData} options={options} />
    </div>
  );
};

export default StatisticsGraph;
