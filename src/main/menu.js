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
            const extensionStatus = store.get('extensionStatus', true);
            const activeUser = store.get('active_user', null);
            
            let message = '';
            if (activeUser && store.has(activeUser)) {
              const user = store.get(activeUser, {});
              message = `Aktif Kullanıcı\n\n` +
                       `Ad Soyad: ${user.avukat_adi || 'Belirtilmemiş'} ${user.avukat_soyadi || ''}\n` +
                       `Avukat ID: ${activeUser}\n` +
                       `Asistan Durumu: ${extensionStatus ? 'Aktif' : 'Durdurulmuş'}`;
            } else {
              message = `UYAP Asistan\n\n` +
                       `Henüz UYAP portalına giriş yapılmamış.\n\n` +
                       `Asistan Durumu: ${extensionStatus ? 'Aktif' : 'Durdurulmuş'}\n\n` +
                       `Not: UYAP portalına giriş yaptıktan sonra,\n` +
                       `eklenti özellikleri (dosya listesi, tebligat listesi, vb.)\n` +
                       `portal sayfasında otomatik olarak görünecektir.`;
            }
            
            dialog.showMessageBox(mainWindow, {
              type: activeUser ? 'info' : 'warning',
              title: 'Kullanıcı Bilgileri',
              message: message,
              buttons: ['Tamam']
            });
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
          label: 'Özellikler Nasıl Kullanılır?',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'UYAP Asistan Özellikleri',
              message: 'UYAP Asistan Nasıl Kullanılır?\n\n' +
                      '1. Portal Menüsünden bir UYAP portalını seçin\n' +
                      '   (Avukat/Bilirkişi/Vatandaş)\n\n' +
                      '2. UYAP portalına giriş yapın\n\n' +
                      '3. Giriş yaptıktan sonra İMEREK özellikleri\n' +
                      '   otomatik olarak sayfada görünecektir:\n\n' +
                      '   • Evrak Listesi butonu (📋)\n' +
                      '   • Tebligat Listesi butonu (✉️)\n' +
                      '   • Not Al butonu (📝)\n' +
                      '   • Notlar butonu (📑)\n\n' +
                      '4. Bu butonlar dosya detay sayfalarında\n' +
                      '   otomatik olarak eklenir\n\n' +
                      '5. Asistan Menüsünden asistanı\n' +
                      '   etkinleştir/durdur yapabilirsiniz',
              buttons: ['Tamam']
            });
          }
        },
        { type: 'separator' },
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
