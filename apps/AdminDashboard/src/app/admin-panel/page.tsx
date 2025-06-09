'use client';

import React from 'react';

const AdminPanel = () => {
  return (
    <div className="bg-gray-100">
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
    </div>
  );
};

export default AdminPanel; 