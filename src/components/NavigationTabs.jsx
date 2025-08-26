import React from 'react';

/**
 * NavigationTabs Component
 * Provides navigation tabs for the dashboard
 */
const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'leads', label: 'Leads' },
    { id: 'leadQualityScore', label: 'Lead Quality Score' },
    { id: 'leaderboard', label: 'Leaderboard' }
  ];

  return (
    <div className="mb-4 overflow-x-auto">
      <div className="flex space-x-2 bg-white rounded-md p-1 shadow-sm border border-gray-100 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap py-2 px-3 sm:px-4 rounded-md font-medium text-xs sm:text-sm transition-colors
              ${activeTab === tab.id
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;