import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, children }) => {
  return (
    <Card className="flex flex-col items-start p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      {children}
    </Card>
  );
};

export default StatCard;
