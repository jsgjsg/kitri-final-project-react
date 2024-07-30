// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
        <p className="mt-4 text-gray-600">You are logged in!</p>
      </div>
    </div>
  );
};

export default Dashboard;
