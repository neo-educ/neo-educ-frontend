import React from 'react';
import { MenuItemType } from './types';

interface MenuDropdownProps {
  items: MenuItemType[];
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ items }) => {
  return (
    <div className="absolute z-10 hidden group-hover:block pt-2 w-48">
      <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="py-1" role="menu" aria-orientation="vertical">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`block px-4 py-2 text-sm ${
                item.active
                  ? 'bg-gray-100 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
              } transition-colors duration-150`}
              role="menuitem"
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;