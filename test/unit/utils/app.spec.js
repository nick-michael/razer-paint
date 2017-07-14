import * as appUtils from '../../../src/utils/app';

const { remote } = window.require('electron'); // eslint-disable-line import/no-extraneous-dependencies

describe('App Utils', () => {
    describe('handleMinimize', () => {
        it('should call minimize on current window', () => {
            appUtils.handleMinimize();
            sinon.assert.calledOnce(remote.getCurrentWindow().minimize);
        });
    });

    describe('handleClose', () => {
        it('should call close on current window', () => {
            appUtils.handleClose();
            sinon.assert.calledOnce(remote.getCurrentWindow().close);
        });
    });
});
