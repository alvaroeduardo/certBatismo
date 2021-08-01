const { app, BrowserWindow } = require('electron');

function createWindow(){
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: __dirname + '/src/img/logo.png',
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            contextIsolation: false,
            devTools: true,
            allowRunningInsecureContent: true
        }
    })

    win.loadFile(__dirname + '/src/index.html');
}

app.whenReady().then(() => {
    console.log('Running the code.');
    createWindow()
})