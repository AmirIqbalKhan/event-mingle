'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

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
            <div key={idx} className={`relative ${card.color} ${card.border} border rounded-2xl shadow-lg group p-6 flex flex-col justify-between min-h-[160px] transition-all duration-200 hover:shadow-2xl`}>
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
            </div>
          ))}
        </div>
        {/* Widgets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Products Bar Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
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
          </div>
          {/* Referrals */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between">
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
          </div>
          {/* Total Revenue Gauge */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
            <div className="font-bold text-lg mb-2">Total Revenue</div>
            <div className="text-2xl font-extrabold mb-1">Total Sale</div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{totalSale}</div>
            <div className="w-32 h-32 relative flex items-center justify-center">
              <Doughnut
                data={{
                  labels: ['Revenue', 'Remainder'],
                  datasets: [
                    {
                      data: [totalRevenue, 100 - totalRevenue],
                      backgroundColor: ['#6366f1', '#e5e7eb'],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  cutout: '80%',
                  plugins: { legend: { display: false }, tooltip: { enabled: false } },
                }}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-indigo-600">
                {totalRevenue}
              </div>
            </div>
          </div>
        </div>
        {/* More Details Row */}
        <div className="flex flex-col items-center gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between w-full max-w-3xl hover:shadow-2xl transition-all">
            <div className="font-bold text-lg mb-4">Recent Activity</div>
            <ul className="divide-y divide-gray-100">
              {recentActivity.map((item, idx) => (
                <li key={idx} className="py-3 flex items-center space-x-3">
                  <span className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-bold text-lg ${item.color}`}>{item.user[0]}</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-700 block">{item.user}</span>
                    <span className="text-gray-500 text-sm block">{item.action}</span>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Tasks Overview Pie Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-center w-full max-w-3xl hover:shadow-2xl transition-all">
            <div className="font-bold text-lg mb-4">Tasks Overview</div>
            <div className="flex flex-col items-center w-full">
              <div className="w-32 h-32 mb-4">
                <Pie
                  data={tasksOverviewData}
                  options={{
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 w-full">
                <div className="flex items-center text-sm"><span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>Completed</div>
                <div className="flex items-center text-sm"><span className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></span>In Progress</div>
                <div className="flex items-center text-sm"><span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>Pending</div>
              </div>
            </div>
          </div>
          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-center w-full max-w-3xl hover:shadow-2xl transition-all">
            <div className="font-bold text-lg mb-4">System Status</div>
            <ul className="space-y-4">
              {systemStatus.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <span className={`w-4 h-4 rounded-full ${item.color} border-2 border-white shadow`}></span>
                  <span className="font-medium text-gray-700">{item.label}:</span>
                  <span className={`font-bold ${item.text}`}>{item.status}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* User Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-h-[320px] hover:shadow-2xl transition-all flex flex-col w-full max-w-3xl">
            <div className="font-bold text-lg mb-4">Recent Users</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-2">User</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {usersTable.map((user, idx) => (
                    <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-2 flex items-center space-x-2">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-base ${user.color}`}>{user.name[0]}</span>
                        <span className="font-medium text-gray-700">{user.name}</span>
                      </td>
                      <td className="py-2 text-gray-500">{user.email}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge(user.role)}`}>{user.role}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterDashboard; 