'use client';

import React from 'react';
import Script from 'next/script';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" />
      <Script src="../admin-chat-functions.js" />
      <Script src="../admin-panel-integration.js" />
      <Script src="../eventmingle-admin-integration.js" />
      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f8f9fa;
          color: #333;
        }
        .sidebar {
          min-width: 250px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          overflow-y: auto;
          z-index: 10;
        }
        .main-content {
          margin-left: 250px;
          min-height: 100vh;
        }
        .section {
          scroll-margin-top: 20px;
        }
        .card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        .card:hover {
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .primary-gradient {
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
        }
        .tab-header {
          background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 1rem;
          border-radius: 0.5rem 0.5rem 0 0;
          font-weight: bold;
        }
        .progress-bar {
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-bar-fill-green {
          background-color: #22c55e;
        }
        .progress-bar-fill-blue {
          background-color: #3b82f6;
        }
        .progress-bar-fill-purple {
          background-color: #8b5cf6;
        }
        .chart-container {
          height: 300px;
          position: relative;
          margin-bottom: 2rem;
        }
        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: #ef4444;
          color: white;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 1px;
          background-color: #9ca3af;
          border-radius: 50%;
          display: block;
          opacity: 0.4;
        }
        .typing-indicator span:nth-of-type(1) {
          animation: typing 1s infinite;
        }
        .typing-indicator span:nth-of-type(2) {
          animation: typing 1s 0.2s infinite;
        }
        .typing-indicator span:nth-of-type(3) {
          animation: typing 1s 0.4s infinite;
        }
        @keyframes typing {
          0% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 0.4; transform: translateY(0); }
        }
        .team-member {
          transition: all 0.3s ease;
        }
        .team-member:hover {
          transform: translateY(-5px);
        }
        .gradient-text {
          background: linear-gradient(90deg, #3B82F6, #8B5CF6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      {children}
    </>
  );
} 