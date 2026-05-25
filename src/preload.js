const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('simpleBlock', {
  platform: process.platform,
  version: '1.0.0'
});
