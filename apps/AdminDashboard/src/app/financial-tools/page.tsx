import React from 'react';
import Head from 'next/head';

const FinancialTools = () => {
  return (
    <div>
      <Head>
        <title>Financial Tools - EventMingle</title>
      </Head>
      <div className="financial-tools">
        <h1>Financial Tools</h1>
        <div className="financial-overview">
          <h2>Financial Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Monthly Revenue</p>
                  <h3 className="text-2xl font-bold text-green-600">$64,582</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 18.5% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Transaction Volume</p>
                  <h3 className="text-2xl font-bold text-indigo-600">4,285</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 12.2% from last month
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-md">
                  <i className="fas fa-exchange-alt text-indigo-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Average Transaction</p>
                  <h3 className="text-2xl font-bold text-purple-600">$15.07</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 5.8% from last month
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-md">
                  <i className="fas fa-chart-line text-purple-600 text-xl"></i>
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

export default FinancialTools; 