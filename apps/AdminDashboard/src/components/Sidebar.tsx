import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">EventMingle</h1>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin User" className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-medium">Jason Miller</p>
            <p className="text-xs text-gray-500">Master Administrator</p>
          </div>
        </div>
      </div>
      
      <nav className="p-2">
        <div className="py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">MASTER DASHBOARD</h3>
          <Link href="/master-dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-tachometer-alt w-5 h-5 mr-3 text-gray-500"></i>
            Master Dashboard
          </Link>
        </div>
        
        <div className="py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">FEATURES</h3>
          <Link href="/unified-admin-control" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-cogs w-5 h-5 mr-3 text-gray-500"></i>
            Unified Admin Control
          </Link>
          <Link href="/user-management" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-users w-5 h-5 mr-3 text-gray-500"></i>
            User Management
          </Link>
          <Link href="/advanced-analytics" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-chart-line w-5 h-5 mr-3 text-gray-500"></i>
            Advanced Analytics
          </Link>
          <Link href="/system-health" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-heartbeat w-5 h-5 mr-3 text-gray-500"></i>
            System Health
          </Link>
          <Link href="/api-integrations" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-plug w-5 h-5 mr-3 text-gray-500"></i>
            API & Integrations
          </Link>
          <Link href="/security-compliance" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-shield-alt w-5 h-5 mr-3 text-gray-500"></i>
            Security & Compliance
          </Link>
          <Link href="/team-collaboration" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-users-cog w-5 h-5 mr-3 text-gray-500"></i>
            Team Collaboration
          </Link>
          <Link href="/platform-controls" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <i className="fas fa-sliders-h w-5 h-5 mr-3 text-gray-500"></i>
            Platform Controls
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 