'use client';

import React from 'react';
import Head from 'next/head';
import {
  Chart,
  registerables
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Card } from '@event-mingle/ui';

Chart.register(...registerables);

const AdvancedAnalytics = () => {
  // Real-time analytics data
  const realTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Users',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Cohort analysis data
  const cohortData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Retention Rate',
        data: [85, 78, 82, 88],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  // Trend reporting data
  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Advanced Analytics - EventMingle</title>
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Advanced Analytics</h1>
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Real-Time Analytics</h2>
          <div className="h-64">
            <Line data={realTimeData} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
        <Card className="mt-6 p-4">
          <h2 className="text-lg font-semibold mb-4">Cohort Analysis</h2>
          <div className="h-64">
            <Bar data={cohortData} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
        <Card className="mt-6 p-4">
          <h2 className="text-lg font-semibold mb-4">Trend Reporting</h2>
          <div className="h-64">
            <Line data={trendData} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default AdvancedAnalytics; 