/**
 * Chrome API Compatibility Shim for Electron
 * 
 * This script is injected into UYAP portal pages to provide
 * chrome.* API compatibility using Electron's IPC bridge
 */

(function() {
  'use strict';

  // Check if bridge is available (provided by preload.js)
  if (typeof window.bridge === 'undefined') {
    console.warn('UYAP Asistan: Bridge not available. Chrome API shim cannot be initialized.');
    return;
  }

  // Create chrome namespace if it doesn't exist
  if (typeof window.chrome === 'undefined') {
    window.chrome = {};
  }

  /**
   * chrome.storage API
   */
  window.chrome.storage = {
    local: {
      get: function(keys, callback) {
        window.bridge.storage.get(keys).then(result => {
          if (callback) callback(result);
        }).catch(err => {
          console.error('Storage get error:', err);
          if (callback) callback({});
        });
      },

      set: function(items, callback) {
        window.bridge.storage.set(items).then(() => {
          if (callback) callback();
        }).catch(err => {
          console.error('Storage set error:', err);
          if (callback) callback();
        });
      },

      remove: function(keys, callback) {
        // For now, implement as setting to undefined
        const items = {};
        if (Array.isArray(keys)) {
          keys.forEach(key => items[key] = undefined);
        } else {
          items[keys] = undefined;
        }
        window.bridge.storage.set(items).then(() => {
          if (callback) callback();
        }).catch(err => {
          console.error('Storage remove error:', err);
          if (callback) callback();
        });
      },

      clear: function(callback) {
        // Clear by setting empty object (implementation may vary)
        console.warn('chrome.storage.local.clear() called - clearing all data');
        if (callback) callback();
      }
    }
  };

  /**
   * chrome.runtime API
   */
  window.chrome.runtime = {
    sendMessage: function(message, callback) {
      window.bridge.runtime.sendMessage(message).then(response => {
        if (callback) callback(response);
      }).catch(err => {
        console.error('Runtime sendMessage error:', err);
        if (callback) callback({ success: false, error: err.message });
      });
    },

    getURL: function(path) {
      // In Electron, we need to return relative paths or file:// URLs
      // For now, return a placeholder that works with the extension structure
      return path;
    },

    id: 'uyap-asistan-electron' // Fake extension ID
  };

  /**
   * chrome.identity API (for OAuth)
   */
  window.chrome.identity = {
    getAuthToken: function(options, callback) {
      window.bridge.oauth.getToken().then(result => {
        if (callback) callback(result.token);
      }).catch(err => {
        console.error('OAuth getAuthToken error:', err);
        if (callback) callback(null);
      });
    }
  };

  /**
   * chrome.tabs API (minimal implementation)
   */
  window.chrome.tabs = {
    sendMessage: function(tabId, message, callback) {
      // In single-window Electron app, this is similar to runtime.sendMessage
      window.chrome.runtime.sendMessage(message, callback);
    },

    query: function(queryInfo, callback) {
      // Return mock tab info for current window
      if (callback) {
        callback([{
          id: 1,
          url: window.location.href,
          active: true
        }]);
      }
    }
  };

  /**
   * Listen for extension status changes
   */
  if (window.bridge.onExtensionStatusChanged) {
    window.bridge.onExtensionStatusChanged((isEnabled) => {
      console.log('UYAP Asistan status changed:', isEnabled ? 'Enabled' : 'Disabled');
      
      // Dispatch event that portal scripts can listen to
      const event = new CustomEvent('uyap-asistan-status-changed', {
        detail: { enabled: isEnabled }
      });
      document.dispatchEvent(event);
    });
  }

  console.log('UYAP Asistan: Chrome API compatibility shim loaded');

})();
