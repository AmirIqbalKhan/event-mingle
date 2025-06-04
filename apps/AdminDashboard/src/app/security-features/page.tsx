import React from 'react';
import Head from 'next/head';

const SecurityFeatures = () => {
  return (
    <div>
      <Head>
        <title>Security Features - EventMingle</title>
      </Head>
      <div className="security-features">
        <h1>Security Features</h1>
        <div className="security-overview">
          <h2>Security Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Security Score</p>
                  <h3 className="text-2xl font-bold text-green-600">92/100</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 5 points from last scan
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <i className="fas fa-shield-alt text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Active Threats</p>
                  <h3 className="text-2xl font-bold text-red-600">2</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-down mr-1"></i> 4 less than last month
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-md">
                  <i className="fas fa-shield-virus text-red-600 text-xl"></i>
                </div>
              </div>
            </div>
            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures; 