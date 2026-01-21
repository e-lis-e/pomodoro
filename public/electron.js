const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Pomodoro',
        width: 400,
        height: 400,
        frame: false,
        titleBarStyle: 'hidden',
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'), //connect to the react app
        protocol:'file:',
        slashes:true,
    });

    mainWindow.setWindowButtonVisibility(false);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(startUrl); // load app in electron
}

app.whenReady().then(createMainWindow);