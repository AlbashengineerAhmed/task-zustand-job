import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/Table.jsx';
import { cn } from '../lib/utils.js';
import Badge from './ui/Badge.jsx';
import Button from './ui/Button.jsx';
import { DocumentIcon, ClipboardListIcon, DownloadIcon } from './icons';
import { formatDate } from '../lib/utils.js';
import useLeadsStore from '../store/leadsStore.js';

/**
 * LeadsTable Component
 * Displays leads data in a responsive table format
 */
const LeadsTable = () => {
  // Get store state and actions
  const { 
    getPaginatedLeads, 
    setSelectedLead, 
    loading, 
    pagination,
    setPagination,
    toggleLeadSelection,
    toggleAllLeadsSelection,
    isLeadSelected,
    selectedLeads
  } = useLeadsStore();

  // Get current page leads
  const leads = getPaginatedLeads();

  // Handle lead selection
  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
  };

  // Handle checkbox click
  const handleCheckboxClick = (e, leadId) => {
    e.stopPropagation();
    toggleLeadSelection(leadId);
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    toggleAllLeadsSelection(e.target.checked);
  };
  
  // Check if all leads on current page are selected
  const areAllSelected = () => {
    const currentLeadIds = leads.map(lead => lead.id);
    return currentLeadIds.length > 0 && currentLeadIds.every(id => isLeadSelected(id));
  };


  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination({ currentPage: newPage });
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'New':
        return 'default';
      case 'Contacted':
        return 'primary';
      case 'Qualified':
        return 'success';
      case 'Proposal':
        return 'warning';
      case 'Closed Won':
        return 'success';
      case 'Closed Lost':
        return 'danger';
      default:
        return 'default';
    }
  };

  // Calculate pagination info
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
        <span className="text-gray-700 font-medium">Loading leads...</span>
        <span className="text-sm text-gray-500 mt-1">Please wait while we fetch your data</span>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <DocumentIcon className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No leads found</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] pr-0">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={areAllSelected()}
                    onChange={handleSelectAll}
                  />
                </div>
              </TableHead>
              <TableHead className="min-w-[200px]">Lead</TableHead>
              <TableHead className="min-w-[150px]">Tags</TableHead>
              <TableHead className="min-w-[200px]">Connected with</TableHead>
              <TableHead className="min-w-[120px]">Date</TableHead>
              <TableHead className="min-w-[100px]">Export</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow 
                key={lead.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleLeadClick(lead)}
              >
                <TableCell className="pr-0">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={isLeadSelected(lead.id)}
                      onChange={(e) => handleCheckboxClick(e, lead.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900 whitespace-nowrap">{lead.name}</div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">{lead.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    {lead.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-gray-50 whitespace-nowrap">
                        {tag}
                      </Badge>
                    ))}
                    {lead.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 whitespace-nowrap">
                        +{lead.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">
                        {(lead.connectedWith || lead.name).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 whitespace-nowrap">{lead.connectedWith || lead.name}</div>
                      <div className="text-sm text-gray-500 whitespace-nowrap">{lead.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(lead.createdAt)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 whitespace-nowrap flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Export lead:', lead.id);
                    }}
                  >
                    <DownloadIcon className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Selected count */}
      {selectedLeads.length > 0 && (
        <div className="bg-blue-50 p-3 rounded-lg mb-2 flex items-center justify-between border border-blue-200 shadow-sm">
          <div className="flex items-center">
            <ClipboardListIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm text-blue-700 font-medium">
              {selectedLeads.length} {selectedLeads.length === 1 ? 'lead' : 'leads'} selected
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => useLeadsStore.getState().clearSelectedLeads()}
            className="text-xs bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border-red-200"
          >
            Clear selection
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-700 w-full sm:w-auto text-center sm:text-left font-medium">
            Showing {startItem} to {endItem} of {pagination.totalItems} results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="bg-white"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {(() => {
                // Generate page numbers to show
                let pagesToShow = [];
                if (totalPages <= 5) {
                  // If 5 or fewer pages, show all
                  for (let i = 1; i <= totalPages; i++) {
                    pagesToShow.push(i);
                  }
                } else {
                  // Complex pagination logic for more than 5 pages
                  const currentPage = pagination.currentPage;
                  
                  // Always show first page
                  pagesToShow.push(1);
                  
                  // Add ellipsis if needed
                  if (currentPage > 3) {
                    pagesToShow.push('...');
                  }
                  
                  // Add pages around current page
                  const startPage = Math.max(2, currentPage - 1);
                  const endPage = Math.min(totalPages - 1, currentPage + 1);
                  
                  for (let i = startPage; i <= endPage; i++) {
                    if (!pagesToShow.includes(i)) {
                      pagesToShow.push(i);
                    }
                  }
                  
                  // Add ellipsis if needed
                  if (currentPage < totalPages - 2) {
                    pagesToShow.push('...');
                  }
                  
                  // Always show last page
                  if (!pagesToShow.includes(totalPages)) {
                    pagesToShow.push(totalPages);
                  }
                }
                
                return pagesToShow.map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return (
                    <Button
                      key={page}
                      variant={pagination.currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 p-0 bg-white"
                    >
                      {page}
                    </Button>
                  );
                });
              })()}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
              className="bg-white"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsTable;