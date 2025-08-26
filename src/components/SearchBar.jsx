import React, { useState, useEffect } from 'react';
import Input from './ui/Input.jsx';
import Button from './ui/Button.jsx';
import { debounce } from '../lib/utils.js';
import useLeadsStore from '../store/leadsStore.js';
import { SearchIcon, CloseIcon } from './icons';

/**
 * SearchBar Component
 * Provides search functionality for leads
 */
const SearchBar = () => {
  // Local state for input value
  const [inputValue, setInputValue] = useState('');
  
  // Get store actions and state
  const { searchLeads, searchQuery, clearFilters } = useLeadsStore();

  // Create debounced search function
  const debouncedSearch = debounce((query) => {
    searchLeads(query);
  }, 300); // 300ms delay

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setInputValue('');
    clearFilters();
  };

  // Sync input value with store search query
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex items-center space-x-2 w-full max-w-md">
      {/* Search input */}
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search leads..."
          aria-label="Search leads by name, email, company"
          value={inputValue}
          onChange={handleInputChange}
          className="pr-10 text-sm"
        />
        
        {/* Search icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Clear button - only show when there's a search query */}
      {inputValue && (
        <Button
          variant="outline"
          size="default"
          onClick={handleClearSearch}
          className="px-3"
        >
          <CloseIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;