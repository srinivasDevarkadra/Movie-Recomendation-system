import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';


Chart.register(...registerables);

function Gross({ data }) { // Data is passed as a prop
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    // Process the data to fit into the chart
    const months = data.map(item => new Date(0, item.month - 1, 0).toLocaleString('default', { month: 'long' }));
    const avgROI = data.map(item => item.avgROI);

    // Create the bar chart
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      // Destroy the previous chart instance, if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Average ROI',
              data: avgROI,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Average ROI',
              },
            },
          },
        },
      };

      // Create the chart instance and store it in the ref
      chartInstanceRef.current = new Chart(ctx, config);
    }
  }, [data]); // Dependency array includes data, so the chart will update when data changes

  return (
    <div>
      <canvas ref={chartRef} width={400} height={200}></canvas>
    </div>
  );
}

export default Gross;
