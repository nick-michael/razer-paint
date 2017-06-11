const builder = require('electron-builder');
const config = require('./config');

builder.build(config, (err) => {
    if (err) {
        throw err;
    }
});