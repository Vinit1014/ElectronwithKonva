// // const path = require('path');
// // const {app, BrowserWindow} = require('electron');

// // function createMainWindow(){
// //     const mainWindow = new BrowserWindow({
// //         title: 'Hello',
// //         width: 500,
// //         height: 600,
// //         webPreferences: {
// //             nodeIntegration: true
// //         }
// //     });

// //     mainWindow.loadFile(path.join(__dirname,'./index.html'));
// // }


// // app.whenReady().then(()=>{
// //     createMainWindow();
// // })

// // main.js

// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true // This allows your Electron app to use Node.js APIs in the renderer process.
//     }
//   });

//   mainWindow.loadFile('index.html');
  
//   // Open DevTools - Remove this in production
// //   mainWindow.webContents.openDevTools();

//   mainWindow.on('closed', function () {
//     mainWindow = null;
//   });
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', function () {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });


// main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Make sure contextIsolation is false to use nodeIntegration
    }
  });

  mainWindow.loadFile('index.html');

  // Open DevTools - Remove this in production
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle IPC messages from renderer process
ipcMain.on('button-clicked', (event, arg) => {
  console.log(`Button clicked: ${arg}`);
  // Send a response back to the renderer process
  event.reply('button-response', `Received: ${arg}`);
});
