'use client';

import React from 'react';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'EventMingle Admin Dashboard',
};

const AdminPanel = () => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>EventMingle Admin Dashboard</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="../admin-chat-functions.js"></script>
        <script src="../admin-panel-integration.js"></script>
        <script src="../eventmingle-admin-integration.js"></script>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f8f9fa;
            color: #333;
          }
          .sidebar {
            min-width: 250px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            overflow-y: auto;
            z-index: 10;
          }
          .main-content {
            margin-left: 250px;
            min-height: 100vh;
          }
          .section {
            scroll-margin-top: 20px;
          }
          .card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
          }
          .card:hover {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          }
          .badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          .primary-gradient {
            background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
          }
          .tab-header {
            background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem 0.5rem 0 0;
            font-weight: bold;
          }
          .progress-bar {
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
          }
          .progress-bar-fill-green {
            background-color: #22c55e;
          }
          .progress-bar-fill-blue {
            background-color: #3b82f6;
          }
          .progress-bar-fill-purple {
            background-color: #8b5cf6;
          }
          .chart-container {
            height: 300px;
            position: relative;
            margin-bottom: 2rem;
          }
          
          /* Notification badge */
          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: #ef4444;
            color: white;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Chat typing indicator */
          .typing-indicator {
            display: flex;
            align-items: center;
          }
          
          .typing-indicator span {
            height: 8px;
            width: 8px;
            margin: 0 1px;
            background-color: #9ca3af;
            border-radius: 50%;
            display: block;
            opacity: 0.4;
          }
          
          .typing-indicator span:nth-of-type(1) {
            animation: typing 1s infinite;
          }
          
          .typing-indicator span:nth-of-type(2) {
            animation: typing 1s 0.2s infinite;
          }
          
          .typing-indicator span:nth-of-type(3) {
            animation: typing 1s 0.4s infinite;
          }
          
          @keyframes typing {
            0% { opacity: 0.4; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-5px); }
            100% { opacity: 0.4; transform: translateY(0); }
          }
          
          /* Team member styles */
          .team-member {
            transition: all 0.3s ease;
          }
          .team-member:hover {
            transform: translateY(-5px);
          }
          
          /* Gradient text */
          .gradient-text {
            background: linear-gradient(90deg, #3B82F6, #8B5CF6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        </style>
      </Head>
      <body className="bg-gray-100" onLoad="initEventMingleIntegration()">
        {/* Sidebar */}
        <div className="sidebar bg-white border-r border-gray-200 px-3 py-6">
          <div className="px-4 mb-6">
            <h1 className="text-xl font-bold text-indigo-600">EventMingle Admin</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
          
          <div className="mb-6 px-4">
            <div className="flex items-center space-x-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-medium">Jason Miller</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-1">
            <a href="#dashboard" className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md group">
              <i className="fas fa-th-large mr-3 text-indigo-500"></i>
              Dashboard
            </a>
            <a href="#user-management" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group">
              <i className="fas fa-users mr-3 text-gray-500"></i>
              User Management
            </a>
            <a href="#event-management" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group">
              <i className="fas fa-calendar-alt mr-3 text-gray-500"></i>
              Event Management
            </a>
            <a href="#transaction-management" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group relative">
              <i className="fas fa-credit-card mr-3 text-gray-500"></i>
              Transactions
              <span className="notification-badge">5</span>
            </a>
            <a href="#analytics" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group">
              <i className="fas fa-chart-line mr-3 text-gray-500"></i>
              Matching Analytics
            </a>
            <a href="#matching-settings" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group">
              <i className="fas fa-sliders-h mr-3 text-gray-500"></i>
              Matching Settings
            </a>
            <a href="#financial-reports" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group">
              <i className="fas fa-file-invoice-dollar mr-3 text-gray-500"></i>
              Financial Reports
            </a>
            <a href="#profile-fields" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group">
              <i className="fas fa-user-edit mr-3 text-gray-500"></i>
              Profile Settings
            </a>
            <a href="#content-moderation" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group relative">
              <i className="fas fa-shield-alt mr-3 text-gray-500"></i>
              Content Moderation
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Add your main content here */}
        </div>
      </body>
    </div>
  );
};

export default AdminPanel; 