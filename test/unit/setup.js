import { expect } from 'chai';
import sinon from 'sinon';

const jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});

const electron = {
    remote: {
        getCurrentWindow: sinon.stub().returns({
            minimize: sinon.stub(),
            close: sinon.stub(),
        }),
        dialog: sinon.stub().returns({
            showSaveDialog: sinon.stub(),
            showOpenDialog: sinon.stub(),
        }),
    },
    resetBehavior() {
        this.remote.getCurrentWindow().minimize.resetBehavior();
        this.remote.getCurrentWindow().close.resetBehavior();
        this.remote.dialog().showSaveDialog.resetBehavior();
        this.remote.dialog().showOpenDialog.resetBehavior();
    },
};

const moduleStubs = { electron };

global.window.require = (name) => {
    const module = moduleStubs[name];
    if (!module) {
        throw new TypeError(`Unknown module: ${name}`);
    }
    module.resetBehavior();
    return module;
};

global.expect = expect;
global.sinon = sinon;
