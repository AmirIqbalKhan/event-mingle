'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Card, Button } from '@event-mingle/ui';

Chart.register(...registerables);

const statCards = [
  {
    title: 'EARNINGS',
    value: '$22,500',
    change: '19% compared to last week',
    color: 'bg-orange-100',
    border: 'border-orange-200',
    chartColor: 'rgba(255, 159, 64, 0.5)',
    data: [5, 9, 7, 12, 8, 15],
  },
  {
    title: 'SALES',
    value: '$500',
    change: '19% compared to last week',
    color: 'bg-purple-100',
    border: 'border-purple-200',
    chartColor: 'rgba(153, 102, 255, 0.5)',
    data: [3, 7, 5, 10, 6, 12],
  },
  {
    title: 'VISITS',
    value: '$21,215',
    change: '19% compared to last week',
    color: 'bg-blue-100',
    border: 'border-blue-200',
    chartColor: 'rgba(54, 162, 235, 0.5)',
    data: [4, 8, 6, 11, 7, 13],
  },
  {
    title: 'LIKES',
    value: '$421,215',
    change: '19% compared to last week',
    color: 'bg-indigo-100',
    border: 'border-indigo-200',
    chartColor: 'rgba(99, 102, 241, 0.5)',
    data: [2, 6, 4, 9, 5, 11],
  },
];

const topProductsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Mobile',
      data: [5000, 10000, 7000, 9000, 11000],
      backgroundColor: '#38bdf8',
    },
    {
      label: 'Laptop',
      data: [2000, 5000, 3000, 4000, 6000],
      backgroundColor: '#fbbf24',
    },
    {
      label: 'Computer',
      data: [3000, 6000, 4000, 5000, 7000],
      backgroundColor: '#a3e635',
    },
  ],
};

const referrals = [
  { label: 'visits from Facebook', value: 2301, color: 'bg-blue-400' },
  { label: 'visits from Twitter', value: 2107, color: 'bg-purple-400' },
  { label: 'visits from Search', value: 2308, color: 'bg-green-400' },
];

const totalRevenue = 63;
const totalSale = '245,124';

const recentActivity = [
  { user: 'Alice', action: 'Created new event', time: '2 min ago', color: 'bg-indigo-500' },
  { user: 'Bob', action: 'Updated user role', time: '10 min ago', color: 'bg-blue-500' },
  { user: 'Carol', action: 'Added API key', time: '30 min ago', color: 'bg-green-500' },
  { user: 'Dave', action: 'Completed task', time: '1 hr ago', color: 'bg-purple-500' },
];

const tasksOverviewData = {
  labels: ['Completed', 'In Progress', 'Pending'],
  datasets: [
    {
      data: [42, 15, 8],
      backgroundColor: ['#22c55e', '#fbbf24', '#ef4444'],
      borderWidth: 0,
    },
  ],
};

const systemStatus = [
  { label: 'Server', status: 'Online', color: 'bg-green-500', text: 'text-green-600' },
  { label: 'Database', status: 'Online', color: 'bg-green-500', text: 'text-green-600' },
  { label: 'API', status: 'Degraded', color: 'bg-yellow-400', text: 'text-yellow-600' },
];

const usersTable = [
  { name: 'Alice', email: 'alice@email.com', role: 'Admin', color: 'bg-blue-500' },
  { name: 'Bob', email: 'bob@email.com', role: 'User', color: 'bg-green-500' },
  { name: 'Carol', email: 'carol@email.com', role: 'User', color: 'bg-green-500' },
  { name: 'Dave', email: 'dave@email.com', role: 'Moderator', color: 'bg-purple-500' },
];

const roleBadge = (role: string) => {
  if (role === 'Admin') return 'bg-blue-100 text-blue-700';
  if (role === 'User') return 'bg-green-100 text-green-700';
  if (role === 'Moderator') return 'bg-purple-100 text-purple-700';
  return 'bg-gray-100 text-gray-700';
};

const MasterDashboard = () => {
  return (
    <>
      <Head>
        <title>Master Dashboard - EventMingle</title>
      </Head>
      <div className="p-6 min-h-screen bg-gray-100">
        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, idx) => (
            <Card key={idx} className={`relative ${card.color} ${card.border} border rounded-2xl shadow-lg group p-6 flex flex-col justify-between min-h-[160px] transition-all duration-200 hover:shadow-2xl`}>
              <div className="mb-6">
                <div className="text-xs font-bold text-gray-500 mb-1 tracking-wider">{card.title}</div>
                <div className="text-3xl font-extrabold text-gray-800 mb-1">{card.value}</div>
                <div className="text-xs text-gray-500 mb-2">{card.change}</div>
              </div>
              <div className="absolute left-0 bottom-0 w-full h-12 pointer-events-none">
                <Line
                  data={{
                    labels: ['', '', '', '', '', ''],
                    datasets: [
                      {
                        data: card.data,
                        fill: true,
                        backgroundColor: card.chartColor,
                        borderColor: 'transparent',
                        tension: 0.4,
                        pointRadius: 0,
                      },
                    ],
                  }}
                  options={{
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: { x: { display: false }, y: { display: false } },
                    elements: { line: { borderWidth: 2 } },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  height={48}
                />
              </div>
            </Card>
          ))}
        </div>
        {/* Widgets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Products Bar Chart */}
          <Card className="p-6">
            <div className="font-bold text-lg mb-2">Top Products</div>
            <div className="h-56">
              <Bar
                data={topProductsData}
                options={{
                  plugins: { legend: { display: true, position: 'bottom' } },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: '#f3f4f6' }, beginAtZero: true },
                  },
                }}
              />
            </div>
          </Card>
          {/* Referrals */}
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="font-bold text-lg mb-2">Referrals</div>
              {referrals.map((ref, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>{ref.value}</span>
                    <span>{ref.label}</span>
                  </div>
                  <div className="w-full h-2 rounded bg-gray-200 mt-1">
                    <div className={`h-2 rounded ${ref.color}`} style={{ width: `${Math.min(ref.value / 25, 100)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {/* Total Revenue Gauge */}
          <Card className="p-6 flex flex-col items-center justify-center">
            <div className="font-bold text-lg mb-2">Total Revenue</div>
            <div className="relative w-32 h-32">
              <Doughnut
                data={{
                  labels: ['Revenue'],
                  datasets: [
                    {
                      data: [totalRevenue, 100 - totalRevenue],
                      backgroundColor: ['#22c55e', '#f3f4f6'],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  cutout: '80%',
                  plugins: { legend: { display: false } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-800">{totalRevenue}%</div>
              </div>
            </div>
          </Card>
        </div>
        {/* Recent Activity */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="font-bold text-lg mb-4">Recent Activity</div>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${activity.color} mr-3`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{activity.user}</div>
                    <div className="text-xs text-gray-500">{activity.action}</div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        {/* Tasks Overview */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="font-bold text-lg mb-4">Tasks Overview</div>
            <div className="h-64">
              <Pie
                data={tasksOverviewData}
                options={{
                  plugins: { legend: { display: true, position: 'bottom' } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </Card>
        {/* System Status */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="font-bold text-lg mb-4">System Status</div>
            <div className="grid grid-cols-3 gap-4">
              {systemStatus.map((status, idx) => (
                <div key={idx} className="text-center">
                  <div className={`w-3 h-3 rounded-full ${status.color} mx-auto mb-2`}></div>
                  <div className="text-sm font-medium text-gray-800">{status.label}</div>
                  <div className={`text-xs ${status.text}`}>{status.status}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        {/* Users Table */}
        <Card>
          <div className="p-6">
            <div className="font-bold text-lg mb-4">Users</div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {usersTable.map((user, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${user.color} mr-2`}></div>
                          <span className="text-sm font-medium text-gray-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${roleBadge(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default MasterDashboard; 