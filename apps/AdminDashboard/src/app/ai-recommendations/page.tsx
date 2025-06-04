import React from 'react';
import Head from 'next/head';

const AIRecommendations = () => {
  return (
    <div>
      <Head>
        <title>AI Recommendations - EventMingle</title>
      </Head>
      <div className="ai-recommendations">
        <h1>AI Recommendations</h1>
        <div className="ai-overview">
          <h2>AI System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Models Running</p>
                  <h3 className="text-2xl font-bold text-indigo-600">8</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 2 new this month
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-md">
                  <i className="fas fa-brain text-indigo-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Model Accuracy</p>
                  <h3 className="text-2xl font-bold text-green-600">92.4%</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 3.2% from last quarter
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <i className="fas fa-bullseye text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Avg. Processing Time</p>
                  <h3 className="text-2xl font-bold text-purple-600">214ms</h3>
                  <p className="text-sm text-green-600 flex items-center">
                    <i className="fas fa-arrow-down mr-1"></i> 18ms improvement
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-md">
                  <i className="fas fa-stopwatch text-purple-600 text-xl"></i>
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

export default AIRecommendations; 