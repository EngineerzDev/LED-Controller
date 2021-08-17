const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain
const SerialPort = require('serialport');
const port = new SerialPort('COM3', { baudRate: 9600 })

app.allowRendererProcessReuse = false;


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 600,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  ipc.on(`closeApp`, () => {
    mainWindow.close()
  }) 

  ipc.on(`minimizeApp`, () => {
    mainWindow.minimize()
  }) 

  ipc.on(`update`, (event, args) => {
    //send command over serial port to the arduino of format {on/off}{red}{green}{blue}
    port.write(args)
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
