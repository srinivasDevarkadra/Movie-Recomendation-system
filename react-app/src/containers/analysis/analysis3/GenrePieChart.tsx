// src/CombinedCharts.tsx

import React from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import "./style.scss";

interface GenrePieChartProps {
  genre: string;
  hitPercentage: number;
  flopPercentage: number;
  totalMovies: number;
  avgRating: number;
}

function GenrePieChart({ genre, hitPercentage, flopPercentage, totalMovies, avgRating }: GenrePieChartProps) {
  const chartRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = React.useRef<Chart<"pie", number[], string> | null>(null);

  React.useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Hit', 'Flop'],
          datasets: [
            {
              data: [hitPercentage, flopPercentage],
              backgroundColor: ['#36a2eb', '#ff6384'], // Sober and cool colors
            },
          ],
        },
        options: {
          // Add chart options here if needed
        },
      });
    }
  }, [hitPercentage, flopPercentage]);

  return (
    <div className="chart">
      <h2>{genre}</h2>
      <p>Total Movies: {totalMovies}</p>
      <p>Avg Rating: {avgRating}</p>
      <canvas ref={chartRef} width={150} height={150}></canvas> {/* Decrease the size here */}
    </div>
  );
}

function CombinedCharts({data}) {
  console.log(data);
  // const genreData = [
  //   {
  //     genre: 'Action',
  //     hitPercentage: 60,
  //     flopPercentage: 40,
  //     totalMovies: 100,
  //     avgRating: 7.5,
  //   },
  //   {
  //     genre: 'Drama',
  //     hitPercentage: 70,
  //     flopPercentage: 30,
  //     totalMovies: 80,
  //     avgRating: 8.0,
  //   },
  //   {
  //     genre: 'Comedy',
  //     hitPercentage: 50,
  //     flopPercentage: 50,
  //     totalMovies: 120,
  //     avgRating: 6.5,
  //   },
  //   {
  //     genre: 'Sci-Fi',
  //     hitPercentage: 80,
  //     flopPercentage: 20,
  //     totalMovies: 90,
  //     avgRating: 7.8,
  //   },
  // ];

  const genreData = data.map(item => {
    const hitStats = Array.isArray(item.hitFlopStats) ? item.hitFlopStats.find(stat => stat.status === "Hit") : { count: 0 };
    const flopStats = Array.isArray(item.hitFlopStats) ? item.hitFlopStats.find(stat => stat.status === "Flop") : { count: 0 };
  
    const totalMovies = item.totalMovies || 0;
    const hitPercentage = totalMovies > 0 ? (hitStats?.count / totalMovies) * 100 : 0;
    const flopPercentage = totalMovies > 0 ? (flopStats?.count / totalMovies) * 100 : 0;
  
    return {
      genre: item.genre ? item.genre.name : 'Unknown',
      hitPercentage: Math.round(hitPercentage),
      flopPercentage: Math.round(flopPercentage),
      totalMovies: totalMovies,
      avgRating: item.avgRatings ? parseFloat(item.avgRatings.toFixed(2)) : 0,
    };
  });

  return (
    <div>
      <div className="charts-row">
        {genreData.map((data, index) => (
          <GenrePieChart key={index} {...data} />
        ))}
      </div>
    </div>
  );
}

export default CombinedCharts;