import React from 'react';
import Head from 'next/head';

const MarketplaceManagement = () => {
  return (
    <div>
      <Head>
        <title>Marketplace Management - EventMingle</title>
      </Head>
      <div className="marketplace-management">
        <h1>Marketplace Management</h1>
        <div className="marketplace-overview">
          <h2>Marketplace Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Active Vendors</p>
                  <h3 className="text-2xl font-bold text-indigo-600">128</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 12 from last month
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-md">
                  <i className="fas fa-store text-indigo-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Active Listings</p>
                  <h3 className="text-2xl font-bold text-green-600">2,845</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 215 from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <i className="fas fa-tag text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Marketplace Revenue</p>
                  <h3 className="text-2xl font-bold text-purple-600">$58.2K</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 22.5% from last month
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-md">
                  <i className="fas fa-dollar-sign text-purple-600 text-xl"></i>
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

export default MarketplaceManagement; 