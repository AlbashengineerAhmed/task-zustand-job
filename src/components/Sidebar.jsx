import React, { useState } from 'react';
import { cn } from '../lib/utils.js';
import {
  MenuIcon,
  CloseIcon,
  LightningIcon,
  HomeIcon,
  UsersIcon,
  BuildingIcon,
  MenuListIcon,
  ClipboardIcon,
  TagIcon,
  EditIcon,
  ShoppingBagIcon,
  TerminalIcon,
  SettingsIcon,
  QuestionIcon,
  ChevronRightIcon
} from './icons';

/**
 * Sidebar Component
 * Navigation sidebar for the application
 */
const Sidebar = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className={`lg:hidden fixed top-4  z-50 ${isMobileMenuOpen? "left-52": "left-4"}`}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-purple-600 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          'bg-white border-r border-gray-200 flex flex-col overflow-hidden',
          'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out',
          'lg:relative lg:translate-x-0 lg:w-64',
          isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64',
          className
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
            <LightningIcon className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-hidden hover:overflow-y-auto">
          <div className="space-y-1">
            {/* Home */}
            <a
              href="#"
              className="flex items-center px-4 py-2 text-purple-600 bg-purple-50 rounded-md font-medium"
            >
              <HomeIcon className="mr-3 h-5 w-5" />
              Home
            </a>
          </div>

          {/* Team Management Section */}
          <div className="mt-3">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              TEAM MANAGEMENT
            </h3>
            <div className="mt-2 space-y-1">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <UsersIcon className="mr-3 h-5 w-5 text-gray-500" />
                Members
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <BuildingIcon className="mr-3 h-5 w-5 text-gray-500" />
                Departments
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <MenuListIcon className="mr-3 h-5 w-5 text-gray-500" />
                Bulk Adjustments
              </a>
            </div>
          </div>

          {/* Leads Management Section */}
          <div className="mt-2">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              LEADS MANAGEMENT
            </h3>
            <div className="mt-2 space-y-1">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <ClipboardIcon className="mr-3 h-5 w-5 text-gray-500" />
                Leads
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <TagIcon className="mr-3 h-5 w-5 text-gray-500" />
                Tags
              </a>
            </div>
          </div>

          {/* Brand & Products Section */}
          <div className="mt-2">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              BRAND & PRODUCTS
            </h3>
            <div className="mt-2 space-y-1">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <EditIcon className="mr-3 h-5 w-5 text-gray-500" />
                Customization
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <ShoppingBagIcon className="mr-3 h-5 w-5 text-gray-500" />
                Products
              </a>
            </div>
          </div>

          {/* Configuration Section */}
          <div className="mt-2">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              CONFIGURATION
            </h3>
            <div className="mt-2 space-y-1">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <TerminalIcon className="mr-3 h-5 w-5 text-gray-500" />
                Integrations
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <SettingsIcon className="mr-3 h-5 w-5 text-gray-500" />
                Settings
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-2">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              SUPPORT
            </h3>
            <div className="mt-2 space-y-1">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <QuestionIcon className="mr-3 h-5 w-5 text-gray-500" />
                FAQs
              </a>
            </div>
          </div>
        </nav>

        {/* Team Members */}
        <div className="p-4 border-t border-gray-200">
          <div className="relative">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex -space-x-2">
                <img
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <img
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <img
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500">+4</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 font-medium">Onboard your team members</div>
            <div className="text-xs text-gray-500 mb-2">Upload your team via CSV</div>
            <button className="text-sm text-purple-600 font-medium flex items-center">
              Onboard your team
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Sophia Williams</p>
              <p className="text-xs text-gray-500">sophia@alignui.com</p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-500">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;