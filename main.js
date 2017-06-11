const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Create a variable to hold the window
let mainWindow = null;

app.on('ready', () => {
  // creates a new browser window
    mainWindow = new BrowserWindow({
        width: 981,
        minWidth: 981,
        height: 442,
        minHeight: 442,
        frame: false,
        show: false,
        backgroundColor: '#3a3a3d'
    });
  // load the file
    mainWindow.loadURL(`file://${__dirname}/webapp/index.html`);
  // Register window events
    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    });
    
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });
});
