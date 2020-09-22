require("electron-reload")(__dirname);

const { app, BrowserWindow, ipcMain, remote } = require("electron");
const main = require("electron-reload");
const { getEncuesta, getRespuestas,setEstudiante } = require("./database");
const { menu } = require("./menu");

let mainWindow;
let idSeleccionado = '';

function createWindow() {
  // Crea la ventana del navegador.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  // y carga el index.html de la aplicación.
  mainWindow.loadFile("src/views/index.html");

  // Abre las herramientas de desarrollo (DevTools).
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on(`display-app-menu`, function (e, args) {
    menu.popup({
      window: mainWindow,
      x: args.x,
      y: args.y,
    });
});

ipcMain.on('setIdSeleccionado', (event, id) => {
  idSeleccionado = id
  console.log(idSeleccionado);
})

ipcMain.handle('getEncuestaFromId', async (event) => {
  const result = await getEncuesta(idSeleccionado)
  console.log(result);
  return result
})

ipcMain.handle('getRespuestas', async (event) => {
  const res = await getRespuestas()
  console.log(res)
  return res
})

ipcMain.on('insertar_estudiante',(event,data) => {
  setEstudiante(data)
  .then(() => {
    console.log('estudiante insertado');
  })
})

ipcMain.on('debugear', (event, data) => {
  console.log(data);
})