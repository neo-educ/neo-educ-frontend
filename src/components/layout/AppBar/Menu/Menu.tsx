import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu as MenuIcon, X } from 'lucide-react';
import MenuItem from './MenuItem';
import MenuDropdown from './MenuDropdown';
import { MenuItemType } from './types';

interface MenuProps {
  items: MenuItemType[];
  className?: string;
  logo?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ items, className = '', logo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {logo && <div className="mr-8">{logo}</div>}
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {items.map((item, index) => (
                <div key={index} className="relative group">
                  <MenuItem item={item} />
                  {item.children && (
                    <MenuDropdown items={item.children} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden transition-all duration-300 ease-in-out`}
      >
        <div className="pt-2 pb-4 space-y-1">
          {items.map((item, index) => (
            <div key={index}>
              <a
                href={item.href}
                className={`block px-4 py-2 text-base font-medium ${
                  item.active
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                } transition-colors duration-200`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    // Toggle children visibility logic could be added here
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
                  )}
                </div>
              </a>
              {item.children && (
                <div className="pl-4 space-y-1 mt-1">
                  {item.children.map((child, childIndex) => (
                    <a
                      key={childIndex}
                      href={child.href}
                      className={`block px-4 py-2 text-sm ${
                        child.active
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      } transition-colors duration-200`}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Menu;