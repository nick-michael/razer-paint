const packager = require('electron-packager');
const config = require('./config');

packager(config, (err) => {
    if (err) {
        throw err;
    }
});