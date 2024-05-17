import React, { useEffect, useState } from "react";
import { filterTodayParticipants } from "../../utils/filterTodayParticipants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { formatDate } from "../../utils/formatDate";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ event, todayParticipants }) => {
  const labels = [formatDate(moment().format())];

  const data = {
    labels,
    datasets: [
      {
        label: "Participant",
        data: [todayParticipants],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Amount of participant registered to ${event} today`,
      },
    },
  };

  return <Bar options={options} data={data} className="w-[1500px]" />;
};

export default LineChart;
