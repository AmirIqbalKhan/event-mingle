import React from 'react';
import Head from 'next/head';

const SecurityCompliance = () => {
  return (
    <>
      <Head>
        <title>Security & Compliance - EventMingle</title>
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Security & Compliance</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Role-Based Access Control</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Admin</option>
                <option>User</option>
                <option>Guest</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permissions</label>
              <div className="mt-2 space-y-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Manage Users</span>
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Manage Events</span>
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Manage Settings</span>
                </label>
              </div>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save Changes</button>
          </form>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Audit Trails</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Audit logs will be displayed here</p>
          </div>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">GDPR Compliance</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">GDPR compliance tools will be displayed here</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityCompliance; 