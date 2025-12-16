const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { registerContentInjection } = require('./injector');

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

  // Load the UYAP lawyer portal by default
  mainWindow.loadURL('https://avukatbeta.uyap.gov.tr');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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
  // TODO: Implement storage using electron-store or similar
  return {};
});

ipcMain.handle('storage-set', async (event, items) => {
  // TODO: Implement storage using electron-store or similar
  return true;
});

ipcMain.handle('runtime-sendMessage', async (event, message) => {
  // TODO: Implement message passing between contexts
  return { success: true };
});

// Handle OAuth (for future implementation)
ipcMain.handle('oauth-getToken', async (event) => {
  // TODO: Implement Google OAuth PKCE flow
  return { token: 'mock-token' };
});
