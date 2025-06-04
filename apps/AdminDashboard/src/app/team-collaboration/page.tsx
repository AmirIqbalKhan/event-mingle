'use client';

import React from 'react';
import Head from 'next/head';
import {
  Chart,
  registerables
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

Chart.register(...registerables);

const TeamCollaboration = () => {
  // Task progress data
  const taskProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [12, 19, 15, 25],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'In Progress',
        data: [8, 12, 10, 15],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  // Task distribution data
  const taskDistributionData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
      },
    ],
  };

  // Workflow metrics data
  const workflowData = {
    labels: ['Planning', 'Development', 'Testing', 'Deployment'],
    datasets: [
      {
        label: 'Time Spent (hours)',
        data: [40, 120, 60, 20],
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
        <title>Team Collaboration - EventMingle</title>
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Team Collaboration</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Task Progress</h2>
          <div className="h-64">
            <Line data={taskProgressData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Task Distribution</h2>
          <div className="h-64">
            <Doughnut data={taskDistributionData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Workflow Metrics</h2>
          <div className="h-64">
            <Bar data={workflowData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCollaboration; 