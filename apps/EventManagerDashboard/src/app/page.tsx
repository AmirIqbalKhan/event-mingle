'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Ticket, DollarSign, BarChart3, User as UserIcon, CheckCircle, PlusCircle, CreditCard } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock data
const summary = {
  events: 24,
  revenue: 12400,
  tickets: 1250,
  clients: 58,
};

const attendanceData = [
  { name: 'Mon', attendance: 120 },
  { name: 'Tue', attendance: 98 },
  { name: 'Wed', attendance: 150 },
  { name: 'Thu', attendance: 80 },
  { name: 'Fri', attendance: 170 },
  { name: 'Sat', attendance: 200 },
  { name: 'Sun', attendance: 110 },
];

const activity = [
  { icon: <PlusCircle className="h-5 w-5 text-green-500" />, text: 'New event "Tech Expo" created', user: 'Alice', time: '2 min ago' },
  { icon: <CreditCard className="h-5 w-5 text-blue-500" />, text: 'Payment received from John Doe', user: 'John Doe', time: '10 min ago' },
  { icon: <CheckCircle className="h-5 w-5 text-yellow-500" />, text: 'Ticket sales reached 1,000', user: 'Sales Bot', time: '30 min ago' },
  { icon: <UserIcon className="h-5 w-5 text-purple-500" />, text: 'Client "Acme Corp" added', user: 'Admin', time: '1 hr ago' },
];

const tasksOverviewData = [
  { name: 'Completed', value: 42, color: '#22c55e' },
  { name: 'In Progress', value: 15, color: '#fbbf24' },
  { name: 'Pending', value: 8, color: '#ef4444' },
];

const systemStatus = [
  { label: 'Server', status: 'Online', color: 'bg-green-500', text: 'text-green-600' },
  { label: 'Database', status: 'Online', color: 'bg-green-500', text: 'text-green-600' },
  { label: 'API', status: 'Degraded', color: 'bg-yellow-400', text: 'text-yellow-600' },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.events}</div>
            <p className="text-xs text-gray-500">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.revenue}</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.tickets}</div>
            <p className="text-xs text-gray-500">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50 border-indigo-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.clients}</div>
            <p className="text-xs text-gray-500">+4 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex flex-col items-center justify-center">
              <div className="w-32 h-32 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tasksOverviewData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tasksOverviewData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {tasksOverviewData.map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className={`w-4 h-4 rounded-full mr-2`} style={{ backgroundColor: item.color }}></span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.text}</p>
                    <p className="text-sm text-gray-500">{item.user}</p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {systemStatus.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className={`w-4 h-4 rounded-full ${item.color} border-2 border-white shadow`}></span>
                <span className="font-medium text-gray-700">{item.label}:</span>
                <span className={`font-bold ${item.text}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 