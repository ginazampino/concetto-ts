import { join } from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { windowConfig } from './config';

const isDev = process.env.npm_lifecycle_event === 'app:dev' ? true : false;

app.disableHardwareAcceleration();

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
        },
    });

    // Load application from server:
    mainWindow.loadURL(
        isDev ? 'http://localhost:1776' : join(__dirname, '../../index.html')
    );

    // Launch browser dev tools on start:
    if (isDev) mainWindow.webContents.openDevTools();

    // Handle window controls:
    ipcMain.handle('quit-app', () => {
        app.quit();
    });

    ipcMain.handle('minimize-app', () => {
        mainWindow.minimize();
    });

    ipcMain.handle('maximize-app', () => {
        const isMax = mainWindow.isMaximized();
        isMax ? mainWindow.unmaximize() : mainWindow.maximize();
    });

    // Handle window resizing:
    mainWindow.on('resized', () => {});
}

app.whenReady().then(() => {
    createWindow();

    // Mac compatibility:
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Mac compatibility:
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
