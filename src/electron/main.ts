import { join } from 'path';
import { app, BrowserWindow } from 'electron';

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

    mainWindow.loadURL(
        isDev ? 'http://localhost:1776' : join(__dirname, '../../index.html')
    );

    if (isDev) mainWindow.webContents.openDevTools();
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
