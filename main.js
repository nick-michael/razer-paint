const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Create a variable to hold the window
let mainWindow = null;

app.on('ready', () => {
  // creates a new browser window
    mainWindow = new BrowserWindow({
        width: 950,
        height: 400,
        resizable: process.env.NODE_ENV === 'development',
    });
  // load the file
    mainWindow.loadURL('http://localhost:8081/');
  // Register window events
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
