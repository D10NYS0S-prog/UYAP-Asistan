const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { registerContentInjection } = require('./injector');
const { createApplicationMenu } = require('./menu');
const { store, chromeStorage } = require('./storage');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../extension/style/img/icons/icon128.png'),
    title: 'UYAP Asistan - İMEREK'
  });

  // Register content injection for UYAP portals
  registerContentInjection(mainWindow);
  
  // Monitor page changes to detect login
  mainWindow.webContents.on('did-finish-load', async () => {
    const url = mainWindow.webContents.getURL();
    
    // Check if we're on a logged-in UYAP portal page
    if (/avukatbeta\.uyap\.gov\.tr/.test(url) && !/giris|edevletlogin/.test(url)) {
      // Try to extract user info from the page
      try {
        const userInfo = await mainWindow.webContents.executeJavaScript(`
          (function() {
            // Try to find user info from UYAP page
            const userElement = document.querySelector('.userName, .user-name, [class*="user"]');
            if (userElement) {
              const userName = userElement.textContent.trim();
              // Extract avukat ID if available
              const avukatId = userName.match(/\\d+/)?.[0] || 'user_' + Date.now();
              return {
                found: true,
                avukat_id: avukatId,
                avukat_adi: userName.split(' ')[0] || 'Avukat',
                avukat_soyadi: userName.split(' ').slice(1).join(' ') || '',
                full_name: userName
              };
            }
            return { found: false };
          })();
        `);
        
        if (userInfo.found) {
          console.log('User detected:', userInfo.avukat_id);
          
          // Save user info to storage
          store.set('active_user', userInfo.avukat_id);
          store.set(userInfo.avukat_id, {
            avukat_adi: userInfo.avukat_adi,
            avukat_soyadi: userInfo.avukat_soyadi,
            options: {
              extensionStatus: store.get('extensionStatus', true)
            },
            response: null
          });
          
          // Add this as a main tab
          const tabs = store.get('tabs', { main: [], view_document: [], fileviewer: [] });
          const newTab = {
            id: Date.now(),
            url: url,
            title: mainWindow.getTitle()
          };
          
          if (!tabs.main.find(t => t.url === url)) {
            tabs.main.push(newTab);
            store.set('tabs', tabs);
            console.log('User tab registered');
          }
        }
      } catch (err) {
        console.error('Error detecting user login:', err);
      }
    }
  });

  // Load the UYAP lawyer portal by default
  mainWindow.loadURL('https://avukatbeta.uyap.gov.tr');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Create application menu
  createApplicationMenu(mainWindow, store);
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for Chrome extension API compatibility
ipcMain.handle('storage-get', async (event, keys) => {
  return await chromeStorage.get(keys);
});

ipcMain.handle('storage-set', async (event, items) => {
  await chromeStorage.set(items);
  return true;
});

ipcMain.handle('runtime-sendMessage', async (event, message) => {
  console.log('Runtime message received:', message.ask);
  
  // Handle tabsAdd - when a portal tab is registered
  if (message.ask === 'tabsAdd') {
    const tabs = store.get('tabs', { main: [], view_document: [], fileviewer: [] });
    const tabClass = message.class || 'main';
    
    // Add sender info (simulated tab)
    const senderTab = {
      id: Date.now(), // Use timestamp as fake tab ID
      url: mainWindow.webContents.getURL(),
      title: mainWindow.getTitle()
    };
    
    // Check if tab already exists
    const existing = tabs[tabClass].find(t => t.url === senderTab.url);
    if (!existing) {
      tabs[tabClass].push(senderTab);
      store.set('tabs', tabs);
      console.log(`Tab added to ${tabClass}:`, senderTab.url);
    }
    
    return { tabs, sender: senderTab };
  }
  
  // Handle user membership check - save user info
  if (message.ask === 'uyelik' || message.ask === 'check') {
    const { avukat_id } = message.params || {};
    
    if (avukat_id) {
      // Check if we have this user's info
      const existingUser = store.get(avukat_id);
      if (existingUser) {
        // Return stored info
        return {
          kullanimHakki: existingUser.response || {},
          cSa: existingUser.cSa || 0
        };
      }
    }
    
    // Mock response for now (would normally call IMEREK backend)
    return {
      kullanimHakki: {
        imerek_avukat_id: avukat_id || 'unknown',
        uyap_type: 'ucretsiz',
        uyap_Ucretsiz_Son: { date: new Date().toISOString() }
      },
      cSa: 0
    };
  }
  
  // Handle extension status updates
  if (message.ask === 'extensionStatus') {
    store.set('extensionStatus', message.status);
    return true;
  }
  
  // Handle access token requests (for Google OAuth)
  if (message.ask === 'access_token' || message.ask === 'new_access_token') {
    // Return mock token for now - real OAuth would be implemented here
    return { access_token: 'mock-token-' + Date.now() };
  }
  
  // Handle database fetch requests
  if (message.ask === 'database') {
    try {
      const response = await fetch(message.url, message.request);
      const data = await response.text();
      return {
        status: response.status,
        body: data
      };
    } catch (error) {
      console.error('Database fetch error:', error);
      return { error: error.message };
    }
  }
  
  // Handle tebligat tracking (PTT shipment tracking)
  if (message.ask === 'tebligatCheck') {
    try {
      const response = await fetch('https://api.ptt.gov.tr/api/ShipmentTracking', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify([message.params.barkodNo.toString()])
      });
      const data = await response.text();
      return data;
    } catch (error) {
      console.error('Tebligat check error:', error);
      return { error: error.message };
    }
  }
  
  // Handle IMEREK backend requests (uyelik, check, kvkkCevabi, odemeBilgileri)
  if (message.ask === 'check' || message.ask === 'uyelik' || message.ask === 'kvkkCevabi' || message.ask === 'odemeBilgileri') {
    try {
      const requestData = {
        ...message,
        params: {
          ...message.params,
          version: app.getVersion()
        }
      };
      
      const response = await fetch('https://uyap-extension-requests.imerek.com', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(requestData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('IMEREK backend error:', error);
      return { error: error.message };
    }
  }
  
  // Handle file download requests
  if (message.ask === 'downloadfile') {
    const { dialog } = require('electron');
    const fs = require('fs');
    const path = require('path');
    const https = require('https');
    const http = require('http');
    
    try {
      let savePath;
      
      if (message.fileDownload.saveAs) {
        // Show save dialog
        const result = await dialog.showSaveDialog(mainWindow, {
          defaultPath: message.fileDownload.filename,
          filters: [
            { name: 'All Files', extensions: ['*'] }
          ]
        });
        
        if (result.canceled) {
          return { error: 'Download canceled by user' };
        }
        savePath = result.filePath;
      } else {
        // Use downloads folder
        const downloadsPath = app.getPath('downloads');
        savePath = path.join(downloadsPath, message.fileDownload.filename);
      }
      
      // Download the file
      return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(savePath);
        const protocol = message.fileDownload.url.startsWith('https') ? https : http;
        
        protocol.get(message.fileDownload.url, (response) => {
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            
            // Delete if requested
            if (message.fileDownload.deleteDownloaded) {
              fs.unlinkSync(savePath);
            }
            
            resolve({
              state: { current: 'complete' },
              filename: { current: savePath },
              id: Date.now()
            });
          });
        }).on('error', (err) => {
          fs.unlink(savePath, () => {}); // Delete incomplete file
          reject({ error: err.message });
        });
      });
    } catch (error) {
      console.error('Download error:', error);
      return { error: error.message };
    }
  }
  
  // Handle show default folder
  if (message.ask === 'showDefaultFolder') {
    const { shell } = require('electron');
    shell.openPath(app.getPath('downloads'));
    return { success: true };
  }
  
  // Default response
  return { success: true };
});

// Handle OAuth (for future implementation)
ipcMain.handle('oauth-getToken', async (event) => {
  // TODO: Implement Google OAuth PKCE flow
  return { token: 'mock-token' };
});
