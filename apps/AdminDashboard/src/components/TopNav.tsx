import React from 'react';

const TopNav = () => {
  return (
    <div className="top-nav fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <i className="fas fa-bell"></i>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <i className="fas fa-envelope"></i>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-8 h-8 rounded-full" />
              <span className="text-sm font-medium">Jason Miller</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav; 