import { app, BrowserWindow, nativeImage } from 'electron';
import * as path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Keep a global reference of the window object
let mainWindow: BrowserWindow | null = null;

/**
 * Create the main application window
 */
const createWindow = (): void => {
  // Load the appropriate icon based on platform
  const iconPath = getIconPath();
  const icon = nativeImage.createFromPath(iconPath);

  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    icon: icon,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    trafficLightPosition: { x: 20, y: 20 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
    show: false, // Don't show until ready
  });

  // Load the app
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    
    // Set window title with branding
    mainWindow?.setTitle('TalkON - Secure Messaging');
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Update window title when page changes
  mainWindow.webContents.on('page-title-updated', (event, title) => {
    event.preventDefault();
    mainWindow?.setTitle(`${title} - TalkON`);
  });
};

/**
 * Get the appropriate icon path for the current platform
 */
const getIconPath = (): string => {
  const buildDir = path.join(__dirname, '../../build');
  
  switch (process.platform) {
    case 'win32':
      return path.join(buildDir, 'icon.ico');
    case 'darwin':
      return path.join(buildDir, 'icon.icns');
    default:
      return path.join(buildDir, 'icon.png');
  }
};

// App event handlers
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS, keep the app running until explicitly quit
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (_, contents) => {
  contents.on('new-window', (event) => {
    event.preventDefault();
  });
});

// App branding
app.setName('TalkON');
app.setAboutPanelOptions({
  applicationName: 'TalkON',
  applicationVersion: app.getVersion(),
  copyright: '© 2024 TalkON. All rights reserved.',
  website: 'https://talkon.app',
  iconPath: getIconPath(),
});

export default app;
