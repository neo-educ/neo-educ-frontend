import React from 'react';
import { ChevronDown } from 'lucide-react';
import { MenuItemType } from './types';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <a
      href={item.href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full ${
        item.active
          ? 'border-primary-500 text-primary-600'
          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900'
      } transition-colors duration-200`}
      aria-current={item.active ? 'page' : undefined}
    >
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
      {item.children && (
        <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
      )}
    </a>
  );
};

export default MenuItem;