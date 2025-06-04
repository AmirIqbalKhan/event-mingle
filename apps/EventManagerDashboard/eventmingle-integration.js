/**
 * EventMingle Integration for Event Manager Admin Dashboard
 * 
 * This file handles all the integration points between the Event Manager Dashboard
 * and the EventMingle platform, including data synchronization, API communication,
 * and real-time WebSocket connections.
 */

// Configuration
const EventMingleConfig = {
  apiUrl: 'https://api.eventmingle.com/v2',
  apiKey: '', // Will be set during initialization
  connectionStatus: false,
  lastSynced: null,
  syncEnabled: true,
  syncOptions: {
    events: true,
    attendees: true,
    tickets: true,
    payments: true,
    analytics: true,
    autoSync: true
  },
  websocket: null
};

// Initialize EventMingle Integration
function initEventMingleIntegration(apiKey) {
  console.log('Initializing EventMingle integration...');
  
  // Set API key
  if (apiKey) {
    EventMingleConfig.apiKey = apiKey;
  } else {
    // Try to get from local storage
    const storedApiKey = localStorage.getItem('eventmingle_api_key');
    if (storedApiKey) {
      EventMingleConfig.apiKey = storedApiKey;
    } else {
      console.warn('No EventMingle API key provided. Integration features will be limited.');
    }
  }
  
  // Load sync options from storage
  loadSyncOptions();
  
  // Update UI indicators
  updateConnectionStatusUI();
  
  // Test connection to EventMingle
  testEventMingleConnection()
    .then(result => {
      EventMingleConfig.connectionStatus = result.success;
      
      if (result.success) {
        console.log('Successfully connected to EventMingle');
        
        // Initialize WebSocket connection for real-time updates
        initEventMingleWebSocket();
        
        // Perform initial data sync
        if (EventMingleConfig.syncOptions.autoSync) {
          syncWithEventMingle();
        }
      } else {
        console.error('Failed to connect to EventMingle:', result.error);
      }
      
      // Update UI with connection result
      updateConnectionStatusUI();
    });
    
  // Set up event listeners for sync controls
  setupSyncEventListeners();
}

// Test connection to EventMingle API
async function testEventMingleConnection() {
  try {
    // Skip actual API call if no API key
    if (!EventMingleConfig.apiKey) {
      return { success: false, error: 'No API key provided' };
    }
    
    const response = await fetch(`${EventMingleConfig.apiUrl}/health`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${EventMingleConfig.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, error: `API returned status: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Initialize WebSocket connection for real-time updates
function initEventMingleWebSocket() {
  // Close existing connection if any
  if (EventMingleConfig.websocket) {
    EventMingleConfig.websocket.close();
  }
  
  // Skip if no API key
  if (!EventMingleConfig.apiKey) {
    console.warn('Cannot initialize WebSocket without API key');
    return;
  }
  
  try {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProtocol}//api.eventmingle.com/ws?token=${EventMingleConfig.apiKey}`;
    
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = function() {
      console.log('EventMingle WebSocket connection established');
      EventMingleConfig.websocket = socket;
    };
    
    socket.onmessage = function(event) {
      handleEventMingleWebSocketMessage(JSON.parse(event.data));
    };
    
    socket.onclose = function() {
      console.log('EventMingle WebSocket connection closed');
      
      // Attempt to reconnect after a delay
      setTimeout(() => {
        if (EventMingleConfig.connectionStatus) {
          initEventMingleWebSocket();
        }
      }, 5000);
    };
    
    socket.onerror = function(error) {
      console.error('EventMingle WebSocket error:', error);
    };
  } catch (error) {
    console.error('Failed to initialize EventMingle WebSocket:', error);
  }
}

// Handle WebSocket messages from EventMingle
function handleEventMingleWebSocketMessage(message) {
  console.log('Received message from EventMingle:', message);
  
  // Process based on message type
  switch (message.type) {
    case 'event_update':
      handleEventUpdate(message.data);
      break;
      
    case 'attendee_update':
      handleAttendeeUpdate(message.data);
      break;
      
    case 'ticket_update':
      handleTicketUpdate(message.data);
      break;
      
    case 'payment_update':
      handlePaymentUpdate(message.data);
      break;
      
    case 'notification':
      handleNotification(message.data);
      break;
      
    default:
      console.log(`Unknown message type: ${message.type}`);
  }
}

// Handle various update types
function handleEventUpdate(data) {
  console.log('Handling event update:', data);
  
  // Refresh events table if on events page
  if (window.location.pathname.includes('events.html')) {
    refreshEventsTable();
  }
  
  // Show notification
  showNotification(`Event "${data.title}" was updated`);
}

function handleAttendeeUpdate(data) {
  console.log('Handling attendee update:', data);
  
  // Refresh attendees table if on attendees page
  if (window.location.pathname.includes('attendees.html')) {
    refreshAttendeesTable();
  }
  
  // Show notification
  showNotification(`Attendee "${data.name}" ${data.action}`);
}

function handleTicketUpdate(data) {
  console.log('Handling ticket update:', data);
  
  // Refresh tickets table if on tickets page
  if (window.location.pathname.includes('tickets.html')) {
    refreshTicketsTable();
  }
  
  // Show notification
  showNotification(`Ticket ${data.id} was ${data.action}`);
}

function handlePaymentUpdate(data) {
  console.log('Handling payment update:', data);
  
  // Refresh payments table if on payments page
  if (window.location.pathname.includes('payments.html')) {
    refreshPaymentsTable();
  }
  
  // Show notification
  showNotification(`Payment of $${data.amount} was ${data.status}`);
}

function handleNotification(data) {
  console.log('Handling notification:', data);
  
  // Show notification
  showNotification(data.message, data.type);
}

// Refresh data tables
function refreshEventsTable() {
  console.log('Refreshing events table');
  // This would typically fetch the latest events data and update the table
  // For this demo, we'll simulate by reloading the page after a short delay
  setTimeout(() => {
    //window.location.reload();
    console.log('Would refresh events table here');
  }, 500);
}

function refreshAttendeesTable() {
  console.log('Refreshing attendees table');
  // Similar to refreshEventsTable but for attendees
}

function refreshTicketsTable() {
  console.log('Refreshing tickets table');
  // Similar to refreshEventsTable but for tickets
}

function refreshPaymentsTable() {
  console.log('Refreshing payments table');
  // Similar to refreshEventsTable but for payments
}

// Sync data with EventMingle
async function syncWithEventMingle() {
  if (!EventMingleConfig.connectionStatus) {
    showNotification('Cannot sync: Not connected to EventMingle', 'error');
    return;
  }
  
  // Update UI to show sync in progress
  const syncButton = document.querySelector('.sync-now-btn');
  if (syncButton) {
    syncButton.disabled = true;
    syncButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Syncing...';
  }
  
  try {
    console.log('Syncing data with EventMingle...');
    
    // Determine what to sync based on options
    const syncPromises = [];
    
    if (EventMingleConfig.syncOptions.events) {
      syncPromises.push(syncEventsWithEventMingle());
    }
    
    if (EventMingleConfig.syncOptions.attendees) {
      syncPromises.push(syncAttendeesWithEventMingle());
    }
    
    if (EventMingleConfig.syncOptions.tickets) {
      syncPromises.push(syncTicketsWithEventMingle());
    }
    
    if (EventMingleConfig.syncOptions.payments) {
      syncPromises.push(syncPaymentsWithEventMingle());
    }
    
    if (EventMingleConfig.syncOptions.analytics) {
      syncPromises.push(syncAnalyticsWithEventMingle());
    }
    
    // Wait for all sync operations to complete
    const results = await Promise.allSettled(syncPromises);
    
    // Check results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    // Update last sync time
    EventMingleConfig.lastSynced = new Date();
    
    // Save to local storage
    localStorage.setItem('eventmingle_last_synced', EventMingleConfig.lastSynced.toISOString());
    
    // Show notification
    if (failed === 0) {
      showNotification(`Successfully synced all data with EventMingle`, 'success');
    } else {
      showNotification(`Synced ${successful} items with EventMingle. ${failed} items failed.`, 'warning');
    }
  } catch (error) {
    console.error('Error syncing with EventMingle:', error);
    showNotification('Error syncing with EventMingle', 'error');
  } finally {
    // Update UI
    updateLastSyncedUI();
    
    // Reset sync button
    if (syncButton) {
      syncButton.disabled = false;
      syncButton.innerHTML = '<i class="fas fa-sync-alt mr-2"></i> Sync Now';
    }
  }
}

// Individual sync functions
async function syncEventsWithEventMingle() {
  console.log('Syncing events with EventMingle');
  // This would make API calls to sync events data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: true, count: 28 };
}

async function syncAttendeesWithEventMingle() {
  console.log('Syncing attendees with EventMingle');
  // This would make API calls to sync attendees data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return { success: true, count: 1482 };
}

async function syncTicketsWithEventMingle() {
  console.log('Syncing tickets with EventMingle');
  // This would make API calls to sync tickets data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return { success: true, count: 1893 };
}

async function syncPaymentsWithEventMingle() {
  console.log('Syncing payments with EventMingle');
  // This would make API calls to sync payments data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { success: true, count: 1253 };
}

async function syncAnalyticsWithEventMingle() {
  console.log('Syncing analytics with EventMingle');
  // This would make API calls to sync analytics data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 900));
  
  return { success: true };
}

// Fetch events from EventMingle
async function fetchEventsFromEventMingle(page = 1, limit = 10, filters = {}) {
  if (!EventMingleConfig.connectionStatus) {
    return { events: [], pagination: { total: 0, page, limit, pages: 0 } };
  }
  
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    queryParams.append('page', page);
    queryParams.append('limit', limit);
    
    // Add any filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    
    const response = await fetch(`${EventMingleConfig.apiUrl}/events?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${EventMingleConfig.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`API returned status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching events from EventMingle:', error);
    throw error;
  }
}

// Fetch attendees from EventMingle
async function fetchAttendeesFromEventMingle(page = 1, limit = 10, filters = {}) {
  // Similar to fetchEventsFromEventMingle but for attendees
  // ...
}

// Update various UI elements
function updateConnectionStatusUI() {
  // Update connection status indicator
  const statusIndicators = document.querySelectorAll('.connection-status-indicator');
  const statusTexts = document.querySelectorAll('.connection-status-text');
  
  statusIndicators.forEach(indicator => {
    if (EventMingleConfig.connectionStatus) {
      indicator.classList.remove('bg-red-500');
      indicator.classList.add('bg-green-500');
    } else {
      indicator.classList.remove('bg-green-500');
      indicator.classList.add('bg-red-500');
    }
  });
  
  statusTexts.forEach(text => {
    if (EventMingleConfig.connectionStatus) {
      text.textContent = 'Connected';
      text.classList.remove('text-red-600');
      text.classList.add('text-green-600');
    } else {
      text.textContent = 'Not Connected';
      text.classList.remove('text-green-600');
      text.classList.add('text-red-600');
    }
  });
}

function updateLastSyncedUI() {
  // Update last synced time
  const lastSyncedElements = document.querySelectorAll('.last-synced-time');
  
  const formattedTime = EventMingleConfig.lastSynced 
    ? formatLastSyncedTime(EventMingleConfig.lastSynced) 
    : 'Never';
  
  lastSyncedElements.forEach(element => {
    element.textContent = formattedTime;
  });
}

// Helper to format last synced time
function formatLastSyncedTime(date) {
  const now = new Date();
  const diff = now - date;
  
  // If synced less than a minute ago
  if (diff < 60000) {
    return 'Just now';
  }
  
  // If synced less than an hour ago
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }
  
  // If synced today
  if (date.toDateString() === now.toDateString()) {
    return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // Otherwise, show date and time
  return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Load sync options from storage
function loadSyncOptions() {
  const storedOptions = localStorage.getItem('eventmingle_sync_options');
  
  if (storedOptions) {
    try {
      const parsedOptions = JSON.parse(storedOptions);
      EventMingleConfig.syncOptions = { ...EventMingleConfig.syncOptions, ...parsedOptions };
    } catch (e) {
      console.error('Error parsing stored sync options:', e);
    }
  }
  
  // Also load last synced time
  const lastSynced = localStorage.getItem('eventmingle_last_synced');
  
  if (lastSynced) {
    try {
      EventMingleConfig.lastSynced = new Date(lastSynced);
    } catch (e) {
      console.error('Error parsing last synced time:', e);
    }
  }
}

// Save sync options to storage
function saveSyncOptions() {
  localStorage.setItem('eventmingle_sync_options', JSON.stringify(EventMingleConfig.syncOptions));
}

// Set up event listeners for sync controls
function setupSyncEventListeners() {
  // Listen for sync button clicks
  document.querySelectorAll('.sync-now-btn').forEach(button => {
    button.addEventListener('click', syncWithEventMingle);
  });
  
  // Listen for changes to sync option checkboxes
  document.querySelectorAll('.sync-option-checkbox').forEach(checkbox => {
    if (checkbox.id && checkbox.id.startsWith('sync-')) {
      const optionName = checkbox.id.replace('sync-', '');
      
      // Set initial state based on config
      if (EventMingleConfig.syncOptions[optionName] !== undefined) {
        checkbox.checked = EventMingleConfig.syncOptions[optionName];
      }
      
      // Listen for changes
      checkbox.addEventListener('change', function() {
        if (EventMingleConfig.syncOptions[optionName] !== undefined) {
          EventMingleConfig.syncOptions[optionName] = this.checked;
          saveSyncOptions();
        }
      });
    }
  });
  
  // Listen for save sync preferences button
  document.querySelectorAll('.save-sync-preferences-btn').forEach(button => {
    button.addEventListener('click', function() {
      saveSyncOptions();
      showNotification('Sync preferences saved', 'success');
    });
  });
  
  // Listen for connect/disconnect button
  document.querySelectorAll('.connect-eventmingle-btn').forEach(button => {
    button.addEventListener('click', function() {
      if (EventMingleConfig.connectionStatus) {
        // Disconnect
        EventMingleConfig.connectionStatus = false;
        updateConnectionStatusUI();
        showNotification('Disconnected from EventMingle', 'info');
      } else {
        // Connect
        testEventMingleConnection()
          .then(result => {
            EventMingleConfig.connectionStatus = result.success;
            updateConnectionStatusUI();
            
            if (result.success) {
              showNotification('Connected to EventMingle successfully', 'success');
              // Initialize WebSocket connection for real-time updates
              initEventMingleWebSocket();
            } else {
              showNotification(`Failed to connect to EventMingle: ${result.error}`, 'error');
            }
          });
      }
    });
  });
}

// Create and show a notification
function showNotification(message, type = 'info') {
  console.log(`Notification (${type}): ${message}`);
  
  // Check if the notification container exists
  let notificationContainer = document.getElementById('notification-container');
  
  // Create container if it doesn't exist
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'fixed top-4 right-4 z-50 flex flex-col space-y-2';
    document.body.appendChild(notificationContainer);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  
  // Set class based on type
  let typeClass = 'bg-blue-500';
  let icon = 'info-circle';
  
  switch (type) {
    case 'success':
      typeClass = 'bg-green-500';
      icon = 'check-circle';
      break;
    case 'error':
      typeClass = 'bg-red-500';
      icon = 'exclamation-circle';
      break;
    case 'warning':
      typeClass = 'bg-yellow-500';
      icon = 'exclamation-triangle';
      break;
  }
  
  notification.className = `${typeClass} text-white p-4 rounded-md shadow-lg flex items-start max-w-md transform transition-all duration-300 ease-in-out`;
  notification.innerHTML = `
    <div class="flex-shrink-0 mr-3">
      <i class="fas fa-${icon}"></i>
    </div>
    <div class="flex-1">
      <p>${message}</p>
    </div>
    <div class="ml-3 flex-shrink-0">
      <button type="button" class="text-white focus:outline-none">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Add notification to container
  notificationContainer.appendChild(notification);
  
  // Add click handler to close button
  notification.querySelector('button').addEventListener('click', () => {
    notification.classList.add('opacity-0');
    setTimeout(() => {
      notification.remove();
      
      // Remove container if empty
      if (notificationContainer.children.length === 0) {
        notificationContainer.remove();
      }
    }, 300);
  });
  
  // Auto-remove notification after 5 seconds
  setTimeout(() => {
    notification.classList.add('opacity-0');
    setTimeout(() => {
      notification.remove();
      
      // Remove container if empty
      if (notificationContainer.children.length === 0) {
        notificationContainer.remove();
      }
    }, 300);
  }, 5000);
}

// Export API for use in other files
window.EventMingleIntegration = {
  init: initEventMingleIntegration,
  sync: syncWithEventMingle,
  fetchEvents: fetchEventsFromEventMingle,
  fetchAttendees: fetchAttendeesFromEventMingle,
  getConnectionStatus: () => EventMingleConfig.connectionStatus,
  getLastSynced: () => EventMingleConfig.lastSynced,
  showNotification
};

// Auto-initialize when included on a page
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing EventMingle integration...');
  initEventMingleIntegration();
});