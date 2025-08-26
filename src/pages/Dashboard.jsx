import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card.jsx';
import LeadsTable from '../components/LeadsTable.jsx';
import Button from '../components/ui/Button.jsx';
import Sidebar from '../components/Sidebar.jsx';
import NavigationTabs from '../components/NavigationTabs.jsx';
import { RefreshIcon, FilterIcon, ExportIcon } from '../components/icons';
import useLeadsStore from '../store/leadsStore.js';

/**
 * Dashboard Page Component
 * Main dashboard for lead management
 */
const Dashboard = () => {
  // Get store state and actions
  const { 
    fetchLeads, 
    leads, 
    loading, 
    error, 
    clearError 
  } = useLeadsStore();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('leads');

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle refresh
  const handleRefresh = () => {
    fetchLeads();
  };

  // Handle filter
  const handleFilter = () => {
    console.log('Filter button clicked');
    // TODO: Implement filter functionality
  };

  // Handle export
  const handleExport = () => {
    console.log('Export button clicked');
    // TODO: Implement export functionality
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 py-2 lg:py-0">
            {/* User Info */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-white">SW</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sophia Williams</p>
                <p className="text-xs text-gray-500 hidden sm:block">Welcome back to Alignui</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="text-red-800 hover:bg-red-100"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-6">
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="w-full">
          {/* Leads Table */}
          <div className="w-full">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <CardTitle>Leads ({leads.length})</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleFilter}
                      className="flex items-center space-x-2"
                    >
                      <FilterIcon className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleExport}
                      className="flex items-center space-x-2"
                    >
                      <ExportIcon className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRefresh}
                      disabled={loading}
                      className="flex items-center space-x-2"
                    >
                      <RefreshIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <LeadsTable />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Dashboard;