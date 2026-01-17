const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Get primary display dimensions
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

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
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

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
        console.log('Could not set window level:', error);
    }

    // Enable click-through by default (mouse events pass through to desktop)
    // This allows right-click menu and desktop interactions to work normally
    mainWindow.setIgnoreMouseEvents(true, { forward: true });

    // Load the app
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        // Open DevTools in development
        mainWindow.webContents.openDevTools();
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

// Handle close request from renderer
ipcMain.on('close-app', () => {
    console.log('Closing Life Live Wallpaper...');
    app.quit();
});

// Handle mouse event toggling for interactive elements (like close button)
ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
        win.setIgnoreMouseEvents(ignore, options);
    }
});
