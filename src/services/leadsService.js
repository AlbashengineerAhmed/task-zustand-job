import apiClient from './api.js';

/**
 * Leads Service
 * Handles all API calls related to leads management
 */
class LeadsService {
  /**
   * Fetch all leads from the API
   * Using JSONPlaceholder posts as mock lead data
   * @returns {Promise<Array>} - Array of leads
   */
  async getLeads() {
    try {
      const response = await apiClient.get('/posts');
      
      // Transform posts data to lead format
      const leads = response.data.map(post => ({
        id: post.id,
        name: `Lead ${post.id}`,
        email: `lead${post.id}@example.com`,
        company: `Company ${post.id}`,
        title: post.title,
        description: post.body,
        status: this.getRandomStatus(),
        source: this.getRandomSource(),
        createdAt: this.getRandomDate(),
        tags: this.getRandomTags(),
        score: Math.floor(Math.random() * 100) + 1
      }));
      
      return leads;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw new Error('Failed to fetch leads');
    }
  }

  /**
   * Get a single lead by ID
   * @param {number} id - Lead ID
   * @returns {Promise<Object>} - Lead object
   */
  async getLeadById(id) {
    try {
      const response = await apiClient.get(`/posts/${id}`);
      const post = response.data;
      
      return {
        id: post.id,
        name: `Lead ${post.id}`,
        email: `lead${post.id}@example.com`,
        company: `Company ${post.id}`,
        title: post.title,
        description: post.body,
        status: this.getRandomStatus(),
        source: this.getRandomSource(),
        createdAt: this.getRandomDate(),
        tags: this.getRandomTags(),
        score: Math.floor(Math.random() * 100) + 1
      };
    } catch (error) {
      console.error('Error fetching lead:', error);
      throw new Error('Failed to fetch lead');
    }
  }

  /**
   * Search leads by query
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Filtered leads
   */
  async searchLeads(query) {
    try {
      const leads = await this.getLeads();
      
      if (!query) return leads;
      
      const filteredLeads = leads.filter(lead => 
        lead.name.toLowerCase().includes(query.toLowerCase()) ||
        lead.email.toLowerCase().includes(query.toLowerCase()) ||
        lead.company.toLowerCase().includes(query.toLowerCase()) ||
        lead.title.toLowerCase().includes(query.toLowerCase())
      );
      
      return filteredLeads;
    } catch (error) {
      console.error('Error searching leads:', error);
      throw new Error('Failed to search leads');
    }
  }

  /**
   * Generate random status for mock data
   * @returns {string} - Random status
   */
  getRandomStatus() {
    const statuses = ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed Won', 'Closed Lost'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  /**
   * Generate random source for mock data
   * @returns {string} - Random source
   */
  getRandomSource() {
    const sources = ['Website', 'Social Media', 'Email Campaign', 'Referral', 'Cold Call', 'Trade Show'];
    return sources[Math.floor(Math.random() * sources.length)];
  }

  /**
   * Generate random date within last 30 days
   * @returns {string} - Random date
   */
  getRandomDate() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
    return new Date(randomTime).toISOString();
  }

  /**
   * Generate random tags for mock data
   * @returns {Array<string>} - Array of random tags
   */
  getRandomTags() {
    const allTags = ['Hot', 'Warm', 'Cold', 'Enterprise', 'SMB', 'Startup', 'Priority', 'Follow-up'];
    const numTags = Math.floor(Math.random() * 3) + 1;
    const shuffled = allTags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numTags);
  }
}

// Export singleton instance
export default new LeadsService();