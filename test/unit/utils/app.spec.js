import * as appUtils from '../../../src/utils/app';

const { remote } = window.require('electron'); // eslint-disable-line import/no-extraneous-dependencies
const { setPlatform } = window.require('os');

describe('App Utils', () => {
    describe('getFloat', () => {
        it('should return left for darwin', () => {
            setPlatform('darwin');
            expect(appUtils.getFloat()).to.equal('left');
        });

        it('should return right for win32', () => {
            setPlatform('win32');
            expect(appUtils.getFloat()).to.equal('right');
        });
    });

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
