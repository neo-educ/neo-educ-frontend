import React from 'react';
import { ClassPlanStatus } from '../types';

interface StatusBadgeProps {
  status: ClassPlanStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: ClassPlanStatus) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-success-100 text-success-800';
      case 'DRAFT':
        return 'bg-warning-100 text-warning-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );
};

export default StatusBadge;