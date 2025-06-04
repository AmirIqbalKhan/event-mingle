import React from 'react';
import Head from 'next/head';

const IntegrationHub = () => {
  return (
    <div>
      <Head>
        <title>Integration Hub - EventMingle</title>
      </Head>
      <div className="integration-hub">
        <h1>Integration Hub</h1>
        <div className="integration-overview">
          <h2>Integration Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Active Integrations</p>
                  <h3 className="text-2xl font-bold text-indigo-600">18</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 3 new this month
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-md">
                  <i className="fas fa-plug text-indigo-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Data Syncs (Daily)</p>
                  <h3 className="text-2xl font-bold text-green-600">124</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 12% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <i className="fas fa-sync-alt text-green-600 text-xl"></i>
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

export default IntegrationHub; 