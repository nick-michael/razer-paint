const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Create a variable to hold the window
let mainWindow = null;

app.on('ready', () => {
  // creates a new browser window
    mainWindow = new BrowserWindow({
        width: 1020,
        height: 442,
        resizable: process.env.NODE_ENV === 'development',
        frame: false,
    });
  // load the file
    mainWindow.loadURL('http://localhost:8081/');
  // Register window events
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
