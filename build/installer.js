const electronInstaller = require('electron-winstaller');
const path = require('path');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: '.\\dist\\app\\Razer-Paint-win32-ia32',
    outputDirectory: '.\\dist\\app\\installer',
    authors: 'Nick Michael',
    exe: 'Razer Paint.exe'
  });