const builder = require('electron-builder'); // eslint-disable-line import/no-extraneous-dependencies
const config = require('./config');

builder.build(config, (err) => {
    if (err) {
        throw err;
    }
});
