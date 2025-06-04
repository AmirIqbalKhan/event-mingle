import React from 'react';
import Head from 'next/head';

const IntegratedManagement = () => {
  return (
    <div>
      <Head>
        <title>Integrated Management - EventMingle</title>
      </Head>
      <div className="integrated-management">
        <h1>Integrated Management</h1>
        <div className="system-status">
          <h2>System Status Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">EventMingle Status</p>
                  <h3 className="text-2xl font-bold text-green-600">Operational</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 99.9% uptime this month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <i className="fas fa-mobile-alt text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            {/* Add more status cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedManagement; 