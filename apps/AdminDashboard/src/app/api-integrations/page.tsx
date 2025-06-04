import React from 'react';
import Head from 'next/head';

const ApiIntegrations = () => {
  return (
    <>
      <Head>
        <title>API & Integrations - EventMingle</title>
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">API & Integrations</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Manage API Keys</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">API Key Name</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rate Limit</label>
              <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save Changes</button>
          </form>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Integration Logs</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Integration logs will be displayed here</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiIntegrations; 