const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

// FORCE DISABLE Hardware Acceleration - Essential for stable transparency on many Windows machines
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('wm-window-animations-disabled');

let mainWindow;

function createWindow() {
    // Get full screen size (including taskbar area)
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.size;

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        x: 0,
        y: 0,
        frame: false,
        transparent: true,
        skipTaskbar: true,
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        alwaysOnTop: false,
        backgroundColor: '#00000000', // Explicit 0% alpha background
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Remove menu bar
    mainWindow.setMenu(null);

    // Set window level to be behind normal windows (wallpaper behavior)
    // This makes desktop icons appear on top
    try {
        if (process.platform === 'win32') {
            // On Windows, we can use setAlwaysOnTop(false) and position it correctly
            mainWindow.setAlwaysOnTop(false);
            mainWindow.moveTop(); // Move to top of z-order first
            mainWindow.blur(); // Then blur to let other windows come forward
        }
    } catch (error) {
        console.error('Error setting window level:', error);
    }

    // Load the app
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        // IMPORTANT: Docked DevTools will BREAK transparency.
        // If testing transparency, DevTools should be detached or closed.
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Log when window is ready
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('Life Live Wallpaper loaded successfully!');
    });
}

// IPC Handlers for File System Operations
ipcMain.handle('load-components-file', async () => {
    try {
        const filePath = path.join(__dirname, '../src/data/components.json');
        const fs = require('fs').promises;
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data).components;
    } catch (error) {
        console.error('Error reading components file:', error);
        return [];
    }
});

ipcMain.on('save-components-file', async (event, components) => {
    try {
        const filePath = path.join(__dirname, '../src/data/components.json');
        const fs = require('fs').promises;
        const data = JSON.stringify({ components }, null, 2);
        await fs.writeFile(filePath, 'utf8', data);
        console.log('Components saved to file:', filePath);
    } catch (error) {
        console.error('Error writing components file:', error);
    }
});

ipcMain.handle('load-config-file', async () => {
    try {
        const filePath = path.join(__dirname, '../src/config/config.json');
        const fs = require('fs').promises;
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading config file:', error);
        return null;
    }
});

ipcMain.on('save-config-file', async (event, configData) => {
    try {
        const filePath = path.join(__dirname, '../src/config/config.json');
        const fs = require('fs').promises;
        const data = JSON.stringify(configData, null, 2);
        await fs.writeFile(filePath, 'utf8', data);
        console.log('Config saved to file:', filePath);
    } catch (error) {
        console.error('Error writing config file:', error);
    }
});

ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
        win.setIgnoreMouseEvents(ignore, options);
    }
});

ipcMain.on('close-app', () => {
    app.quit();
});

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
