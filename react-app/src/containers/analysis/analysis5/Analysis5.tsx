import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analysis5 = ({ newDummyData }) => {

  const [chartData, setChartData] = useState({
    labels: newDummyData.map((data) => `Month ${data.month}`),
    datasets: [
      {
        label: 'Hits',
        data: newDummyData.map((data) => data.hits),
        backgroundColor: '#36a2eb',
      },
      {
        label: 'Flops',
        data: newDummyData.map((data) => data.flops),
        backgroundColor: '#ff6384',
      },
    ],
  });

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    setChartData({
      labels: newDummyData.map((data) => `Month ${data.month}`),
      datasets: [
        {
          label: 'Hits',
          data: newDummyData.map((data) => data.hits),
          backgroundColor: '#36a2eb',
        },
        {
          label: 'Flops',
          data: newDummyData.map((data) => data.flops),
          backgroundColor: '#ff6384',
        },
      ],
    });
  }, [newDummyData]);

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Analysis5;
