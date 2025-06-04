import React from 'react';
import Head from 'next/head';

const LocalizationManagement = () => {
  return (
    <div>
      <Head>
        <title>Localization Management - EventMingle</title>
      </Head>
      <div className="localization-management">
        <h1>Localization Management</h1>
        <div className="localization-overview">
          <h2>Localization Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Supported Languages</p>
                  <h3 className="text-2xl font-bold text-indigo-600">12</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 2 added this quarter
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-md">
                  <i className="fas fa-language text-indigo-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Translation Coverage</p>
                  <h3 className="text-2xl font-bold text-green-600">94.2%</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 2.4% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <i className="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Translation Strings</p>
                  <h3 className="text-2xl font-bold text-purple-600">4,285</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 125 from last month
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-md">
                  <i className="fas fa-font text-purple-600 text-xl"></i>
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

export default LocalizationManagement; 