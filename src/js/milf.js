const { Menu, remote, Tray, BrowserWindow} = require('electron');
// const $ = require('jquery');

let win = remote.getCurrentWindow();
win.webContents.session.clearCache(function(){

});

window.onload = (e) => {
  console.log('loaded');
  const close  = document.getElementById('close-window');
  
  close.onclick = () => {
    if(localStorage.getItem('saveTray') === 'true'){
      win.hide();
      return;
    }
    if(localStorage.getItem('saveTray') === 'false'){
      win.close();
      return;
    }
    win.close();
  }

  const minimize = document.getElementById('minimize-window');
  minimize.onclick = () => {
    win.minimize();
  }

  const restore = document.getElementById('restore-window');
  restore.onclick = () => {
    if(!win.isMaximized()) {
      win.maximize();
      return;
    }
    if(win.isMaximized()) {
      win.restore();
      return;
    }
  }
}

// $(document).ready(function(){

//   $('#close-window').click(function() {
//     if(localStorage.getItem('saveTray') === 'true'){
//       win.hide();
//     }
//     if(localStorage.getItem('saveTray') === 'false'){
//       win.close();
//     }
//   });

//   $('#minimize-window').click(function() {
//       win.minimize();
//   });

//   $('#restore-window').click(function(){
//       if(!win.isMaximized()) {
//           win.maximize();
//           return;
//       }
//       if(win.isMaximized()){
//           win.restore();
//           return;
//       }
//   });
// });






