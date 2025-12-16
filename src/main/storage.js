const Store = require('electron-store');

// Create store instance with schema
const store = new Store({
  name: 'uyap-asistan-storage',
  defaults: {
    extensionStatus: true,
    active_user: null,
    tabs: {
      main: []
    },
    options: {
      notifications: true,
      autoDownload: false
    }
  }
});

/**
 * Chrome storage API compatibility layer for Electron
 * Provides chrome.storage.local API compatible methods
 */
class ChromeStorageCompat {
  constructor(electronStore) {
    this.store = electronStore;
  }

  /**
   * Get items from storage
   * @param {string|string[]|object|null} keys - Keys to get
   * @returns {Promise<object>} Retrieved values
   */
  async get(keys) {
    if (keys === null || keys === undefined) {
      // Get all items
      return this.store.store;
    }

    if (typeof keys === 'string') {
      // Single key
      return { [keys]: this.store.get(keys) };
    }

    if (Array.isArray(keys)) {
      // Multiple keys
      const result = {};
      for (const key of keys) {
        result[key] = this.store.get(key);
      }
      return result;
    }

    if (typeof keys === 'object') {
      // Object with default values
      const result = {};
      for (const [key, defaultValue] of Object.entries(keys)) {
        result[key] = this.store.get(key, defaultValue);
      }
      return result;
    }

    return {};
  }

  /**
   * Set items in storage
   * @param {object} items - Key-value pairs to set
   * @returns {Promise<void>}
   */
  async set(items) {
    if (typeof items === 'object' && items !== null) {
      for (const [key, value] of Object.entries(items)) {
        this.store.set(key, value);
      }
    }
  }

  /**
   * Remove items from storage
   * @param {string|string[]} keys - Keys to remove
   * @returns {Promise<void>}
   */
  async remove(keys) {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    for (const key of keysArray) {
      this.store.delete(key);
    }
  }

  /**
   * Clear all items from storage
   * @returns {Promise<void>}
   */
  async clear() {
    this.store.clear();
  }

  /**
   * Get the raw electron-store instance
   * @returns {Store}
   */
  getRawStore() {
    return this.store;
  }
}

// Create singleton instance
const chromeStorage = new ChromeStorageCompat(store);

module.exports = {
  store,
  chromeStorage
};
