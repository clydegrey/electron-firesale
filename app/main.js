const fs = require('fs');
const { app, BrowserWindow, dialog } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.loadFile(`${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
});

exports.getFileFromUser = () => {
  const files = dialog.showOpenDialog({
    properties: ['openFile'],
    buttonLabel: 'unveil',
    filters: [
      {
        name: 'text files',
        extensions: ['txt', 'text']
      },
      {
        name: 'markdown files',
        extensions: ['md', 'mdown', 'markdown']
      }
    ]
  });
  if (!files) return;
  const [file] = files;

  openFile(file);
};

const openFile = file => {
  const contents = fs.readFileSync(file).toString();
  mainWindow.webContents.send('file-opened', file, contents);
};
