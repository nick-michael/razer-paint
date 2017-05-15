'use strict'

// Import modules
const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

// Load environmental variables
require('dotenv').load()

// Create a variable to hold the window
let mainWindow = null

app.on('ready', function() {

  // creates a new browser window
  mainWindow = new BrowserWindow({
    minWidth: 1000,
    width: 1000,
    height: 600
  })
  // load the file
  mainWindow.loadURL('http://localhost:8081/')
  // Register window events
  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
