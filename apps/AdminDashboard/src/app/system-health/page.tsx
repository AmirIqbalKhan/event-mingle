'use client';

import React from 'react';
import Head from 'next/head';
import {
  Chart,
  registerables
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const SystemHealth = () => {
  // System performance data
  const performanceData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [45, 52, 68, 75, 62, 58],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Memory Usage (%)',
        data: [60, 65, 70, 75, 72, 68],
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  // Uptime data
  const uptimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Uptime (%)',
        data: [99.9, 99.8, 99.9, 99.7, 99.9, 99.8, 99.9],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Resource utilization data
  const resourceData = {
    labels: ['CPU', 'Memory', 'Disk', 'Network'],
    datasets: [
      {
        label: 'Current Usage (%)',
        data: [65, 72, 45, 58],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>System Health - EventMingle</title>
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">System Health</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">System Performance</h2>
          <div className="h-64">
            <Line data={performanceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Uptime</h2>
          <div className="h-64">
            <Bar data={uptimeData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Resource Utilization</h2>
          <div className="h-64">
            <Bar data={resourceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemHealth; 