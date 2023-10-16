const axios = require('axios');

class MerakiAPI {
  constructor(options) {
    this.apiKey = options.apiKey;
    this.apiUrl = options.apiUrl;
  }

  getHeaders() {
    return {
      'X-Cisco-Meraki-API-Key': this.apiKey,
    }
  }

  async makeRequest(endpoint) {
    try {
      const response = await axios.get(`${this.apiUrl}${endpoint}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch: ${error.message}`);
    }
  }

  getOrganizationById(organizationId) {
    return this.makeRequest(`/organizations/${organizationId}`);
  }

  getOrganizations() {
    return this.makeRequest(`/organizations`);
  }

  getNetworksInOrganization(organizationId) {
    return this.makeRequest(`/organizations/${organizationId}/networks`);
  }

  getNetworkDevicesById(networkId) {
    return this.makeRequest(`/networks/${networkId}/devices`);
  }

  getInsightApplicationsInOrganization(organizationId) {
    return this.makeRequest(`/organizations/${organizationId}/insight/applications`);
  }

  getApplicationHealthByTime(networkId, applicationId) {
    return this.makeRequest(`/networks/${networkId}/insight/applications/${applicationId}/healthByTime`);
  }
}

module.exports = MerakiAPI;