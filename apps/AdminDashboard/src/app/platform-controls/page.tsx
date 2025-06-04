import React from 'react';
import Head from 'next/head';

const PlatformControls = () => {
  return (
    <>
      <Head>
        <title>Platform Controls - EventMingle</title>
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Platform Controls</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Platform Settings</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform Name</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform URL</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform Description</label>
              <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows={3}></textarea>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PlatformControls; 