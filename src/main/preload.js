const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('bridge', {
  // Storage API (chrome.storage.local equivalent)
  storage: {
    get: (keys) => ipcRenderer.invoke('storage-get', keys),
    set: (items) => ipcRenderer.invoke('storage-set', items)
  },
  
  // Runtime API (chrome.runtime equivalent)
  runtime: {
    sendMessage: (message) => ipcRenderer.invoke('runtime-sendMessage', message)
  },
  
  // OAuth API (chrome.identity equivalent)
  oauth: {
    getToken: () => ipcRenderer.invoke('oauth-getToken')
  },

  // Extension status listener
  onExtensionStatusChanged: (callback) => {
    ipcRenderer.on('extension-status-changed', (event, isEnabled) => {
      callback(isEnabled);
    });
  }
});
