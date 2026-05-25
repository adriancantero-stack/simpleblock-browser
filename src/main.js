const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const { ElectronBlocker } = require('@ghostery/adblocker-electron');
const fetch = require('cross-fetch');

function createWindow() {
  const win = new BrowserWindow({
    width: 1150,
    height: 750,
    backgroundColor: '#000000',
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then(blocker => {
    blocker.enableBlockingInSession(session.defaultSession);
    console.log('✅ SimpleBlock: Bloqueio ativado');
  }).catch(err => {
    console.error('❌ Erro ao carregar bloqueador:', err);
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
