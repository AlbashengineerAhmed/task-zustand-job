import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import leadsService from '../services/leadsService.js';

/**
 * Leads Store using Zustand
 * Manages all lead-related state and actions
 */
const useLeadsStore = create(
  devtools(
    (set, get) => ({
      // State
      leads: [], // Array of all leads
      selectedLead: null, // Currently selected lead
      loading: false, // Loading state for API calls
      error: null, // Error message
      pagination: {
        currentPage: 1,
        itemsPerPage: 7,
        totalItems: 0,
      },
      selectedLeads: [], // Array of selected lead IDs

      // Actions
      /**
       * Fetch all leads from API
       */
      fetchLeads: async () => {
        set({ loading: true, error: null });
        try {
          const leads = await leadsService.getLeads();
          set({ 
            leads,
            loading: false,
            pagination: {
              ...get().pagination,
              totalItems: leads.length
            }
          });
        } catch (error) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },


      /**
       * Set selected lead
       * @param {Object} lead - Lead to select
       */
      setSelectedLead: (lead) => {
        set({ selectedLead: lead });
      },

      /**
       * Set pagination
       * @param {Object} pagination - Pagination object
       */
      setPagination: (pagination) => {
        set({ 
          pagination: { 
            ...get().pagination, 
            ...pagination 
          } 
        });
      },

      /**
       * Get paginated leads for current page
       * @returns {Array} - Paginated leads
       */
      getPaginatedLeads: () => {
        const { leads, pagination } = get();
        const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
        const endIndex = startIndex + pagination.itemsPerPage;
        return leads.slice(startIndex, endIndex);
      },

      /**
       * Clear error message
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Toggle lead selection
       * @param {string} leadId - ID of the lead to toggle selection
       */
      toggleLeadSelection: (leadId) => {
        const selectedLeads = [...get().selectedLeads];
        const index = selectedLeads.indexOf(leadId);
        
        if (index === -1) {
          selectedLeads.push(leadId);
        } else {
          selectedLeads.splice(index, 1);
        }
        
        set({ selectedLeads });
      },

      /**
       * Toggle all leads selection on current page
       * @param {boolean} selected - Whether to select or deselect all
       */
      toggleAllLeadsSelection: (selected) => {
        const paginatedLeads = get().getPaginatedLeads();
        const currentSelectedLeads = [...get().selectedLeads];
        
        if (selected) {
          // Add all current page leads that aren't already selected
          const leadsToAdd = paginatedLeads
            .filter(lead => !currentSelectedLeads.includes(lead.id))
            .map(lead => lead.id);
          
          set({ selectedLeads: [...currentSelectedLeads, ...leadsToAdd] });
        } else {
          // Remove all current page leads from selection
          const currentPageIds = paginatedLeads.map(lead => lead.id);
          const filteredSelection = currentSelectedLeads.filter(
            id => !currentPageIds.includes(id)
          );
          
          set({ selectedLeads: filteredSelection });
        }
      },

      /**
       * Check if a lead is selected
       * @param {string} leadId - ID of the lead to check
       * @returns {boolean} - Whether the lead is selected
       */
      isLeadSelected: (leadId) => {
        return get().selectedLeads.includes(leadId);
      },

      /**
       * Clear all selected leads
       */
      clearSelectedLeads: () => {
        set({ selectedLeads: [] });
      },

    }),
    {
      name: 'leads-store', // Store name for devtools
    }
  )
);

export default useLeadsStore;