const { Menu, dialog, BrowserWindow, app, shell } = require('electron');

function createApplicationMenu(mainWindow, store) {
  const isMac = process.platform === 'darwin';
  
  const template = [
    // App menu (macOS)
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),

    // Portal Menu
    {
      label: 'Portal',
      submenu: [
        {
          label: 'Avukat Portalı',
          accelerator: 'CmdOrCtrl+1',
          click: () => {
            mainWindow.loadURL('https://avukatbeta.uyap.gov.tr');
          }
        },
        {
          label: 'Bilirkişi Portalı',
          accelerator: 'CmdOrCtrl+2',
          click: () => {
            mainWindow.loadURL('https://bilirkisi.uyap.gov.tr');
          }
        },
        {
          label: 'Vatandaş Portalı',
          accelerator: 'CmdOrCtrl+3',
          click: () => {
            mainWindow.loadURL('https://vatandas.uyap.gov.tr');
          }
        },
        { type: 'separator' },
        {
          label: 'Yeniden Yükle',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.webContents.reload();
          }
        },
        { type: 'separator' },
        {
          label: 'Çıkış',
          accelerator: isMac ? 'Cmd+Q' : 'Alt+F4',
          click: () => {
            app.quit();
          }
        }
      ]
    },

    // Extension Menu
    {
      label: 'Asistan',
      submenu: [
        {
          label: 'Asistanı Etkinleştir/Durdur',
          type: 'checkbox',
          checked: store.get('extensionStatus', true),
          click: (menuItem) => {
            const isEnabled = menuItem.checked;
            store.set('extensionStatus', isEnabled);
            
            // Send message to renderer process
            mainWindow.webContents.send('extension-status-changed', isEnabled);
            
            // Show notification
            const status = isEnabled ? 'etkinleştirildi' : 'durduruldu';
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'UYAP Asistan',
              message: `Asistan ${status}`,
              buttons: ['Tamam']
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Kullanıcı Bilgileri',
          click: async () => {
            const userData = store.get('active_user', null);
            if (userData) {
              const user = store.get(userData, {});
              dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: 'Kullanıcı Bilgileri',
                message: `Aktif Kullanıcı\n\n` +
                        `Ad Soyad: ${user.avukat_adi || 'Belirtilmemiş'} ${user.avukat_soyadi || ''}\n` +
                        `Durum: ${store.get('extensionStatus', true) ? 'Aktif' : 'Durdurulmuş'}`,
                buttons: ['Tamam']
              });
            } else {
              dialog.showMessageBox(mainWindow, {
                type: 'warning',
                title: 'Kullanıcı Bilgileri',
                message: 'Henüz giriş yapılmamış. UYAP portalına giriş yapın.',
                buttons: ['Tamam']
              });
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Ayarları Sıfırla',
          click: async () => {
            const response = await dialog.showMessageBox(mainWindow, {
              type: 'question',
              buttons: ['İptal', 'Sıfırla'],
              defaultId: 0,
              title: 'Ayarları Sıfırla',
              message: 'Tüm ayarlar ve kaydedilmiş veriler silinecek. Emin misiniz?',
              cancelId: 0
            });
            
            if (response.response === 1) {
              store.clear();
              store.set('extensionStatus', true);
              dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: 'Ayarlar Sıfırlandı',
                message: 'Tüm ayarlar sıfırlandı. Uygulama yeniden başlatılacak.',
                buttons: ['Tamam']
              }).then(() => {
                app.relaunch();
                app.exit(0);
              });
            }
          }
        }
      ]
    },

    // View Menu
    {
      label: 'Görünüm',
      submenu: [
        { role: 'reload', label: 'Yeniden Yükle' },
        { role: 'forceReload', label: 'Zorla Yenile' },
        { role: 'toggleDevTools', label: 'Geliştirici Araçları' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Yakınlaştırmayı Sıfırla' },
        { role: 'zoomIn', label: 'Yakınlaştır' },
        { role: 'zoomOut', label: 'Uzaklaştır' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tam Ekran' }
      ]
    },

    // Help Menu
    {
      label: 'Yardım',
      submenu: [
        {
          label: 'UYAP Asistan Hakkında',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'UYAP Asistan Hakkında',
              message: 'UYAP Asistan - İMEREK\n\n' +
                      'Version: 1.0.0\n\n' +
                      'UYAP portallarını daha verimli kullanmanız için geliştirilmiş masaüstü uygulaması.\n\n' +
                      'Geliştirici: D10NYS0S-prog',
              buttons: ['Tamam']
            });
          }
        },
        {
          label: 'İMEREK Web Sitesi',
          click: async () => {
            await shell.openExternal('https://uyap.imerek.com');
          }
        },
        { type: 'separator' },
        {
          label: 'Lisans',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Lisans',
              message: 'ISC License\n\nCopyright (c) D10NYS0S-prog',
              buttons: ['Tamam']
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  
  return menu;
}

module.exports = { createApplicationMenu };
