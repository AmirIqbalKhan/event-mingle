import React from 'react';
import Head from 'next/head';

const MobileIntegration = () => {
  return (
    <div>
      <Head>
        <title>Mobile Integration - EventMingle</title>
      </Head>
      <div className="mobile-integration">
        <h1>Mobile Integration</h1>
        <div className="mobile-analytics">
          <h2>Mobile App Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">App Downloads</p>
                  <h3 className="text-2xl font-bold">12,845</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 24% from last month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-md">
                  <i className="fas fa-cloud-download-alt text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Daily Active Users</p>
                  <h3 className="text-2xl font-bold">5,782</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 12% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <i className="fas fa-users text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">App Retention Rate</p>
                  <h3 className="text-2xl font-bold">68%</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 8% from last month
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-md">
                  <i className="fas fa-chart-line text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileIntegration; 