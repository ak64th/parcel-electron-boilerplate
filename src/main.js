import { app, BrowserWindow, screen } from 'electron';

import path from 'node:path';

const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:1234/');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  }

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);
