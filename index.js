let electron = require("electron");
let app = electron.app;
let {BrowserWindow} = electron;
let win = null;
app.on("ready", function () {
  win = new BrowserWindow({
    webPreferences: { nodeIntegration: true },  //允许页面集成node环境
  });
  win.loadFile('index.html')
  win.on('closed',function(){
    win = null
  })
});

app.on('window-all-closed',function(){
    app.quit()
})
