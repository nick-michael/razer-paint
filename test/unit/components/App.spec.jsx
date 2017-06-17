import React from 'react';
import { shallow } from 'enzyme';
import { ChromePicker } from 'react-color';

import App from '../../../src/components/App';
import * as updateUtils from '../../../src/utils/update';
import { version } from '../../../package.json';
import * as keyCodes from '../../../src/constants/keyCodes';

describe('App Component', () => {
    const sandbox = sinon.sandbox.create();
    let mountApp;
    let app;
    let checkForUpdateStub;
    let eventListenerStub;

    beforeEach(() => {
        checkForUpdateStub = sandbox.stub(updateUtils, 'checkForUpdates').returns(Promise.resolve({ version }));

        mountApp = () => {
            app = shallow(
                <App
                    brushColor="ffffff"
                    setColor={() => {}}
                    clipboard={{ '0': 'clipboard' }}
                    animate={[]}
                    presetColors={['', '']}
                    selectAnimationFrame={() => {}}
                    setLongHexColor={sandbox.stub()}
                    paintFrame={sandbox.stub()}
                    keyframe={sandbox.stub()}
                    toggleIsPlaying={sandbox.stub()}
                    nextFrame={sandbox.stub()}
                    previousFrame={sandbox.stub()}
                    undo={sandbox.stub()}
                    redo={sandbox.stub()}
                    copy={sandbox.stub()}
                    selectedFrame={0}
                    isPlaying={false}
                />
            );
        }

        eventListenerStub = sandbox.stub(document, 'addEventListener');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should check for updates on mount', () => {
        mountApp();
        return Promise.resolve().then(() => {
            expect(app.instance().state.showUpdateOverlay).to.be.false;
            sinon.assert.calledOnce(checkForUpdateStub);
        });
    });

    it('should set showUpdateOverlay if update is available', () => {
        checkForUpdateStub.returns(Promise.resolve({ version: '9.9.9' }));
        mountApp();
        return Promise.resolve().then (() => {
            expect(app.instance().state.showUpdateOverlay).to.be.true;
            sinon.assert.calledOnce(checkForUpdateStub);
        });
    });

    it('should set up keydown listener on mount', () => {
        mountApp();
        sinon.assert.calledWithExactly(eventListenerStub, 'keydown', sinon.match.func);
    });

    describe('handleKeyPress', () => {
        let keyCodeActionMapStub;
        let keyCodeActionFunctionStub;

        beforeEach(() => {
            keyCodeActionFunctionStub = sandbox.stub();
            sandbox.stub(app.instance(), 'keyCodeActionMap')
            .returns({
                [keyCodes.ARROW_LEFT]: keyCodeActionFunctionStub,
                [`shift+${keyCodes.Z}`]: keyCodeActionFunctionStub,
                [`shift+ctrl+${keyCodes.Z}`]: keyCodeActionFunctionStub,
                [`shift+ctrl+alt+${keyCodes.Z}`]: keyCodeActionFunctionStub,
            });
        });

        it('should call keyCodeActionMap return function if it exists', () => {
            app.instance().handleKeyPress({ keyCode: keyCodes.ARROW_LEFT });

            sinon.assert.calledOnce(keyCodeActionFunctionStub);
        });

                
        it('should correctly add shift, crtl and alt codes', () => {
            app.instance().handleKeyPress({ keyCode: keyCodes.ARROW_LEFT });
            app.instance().handleKeyPress({
                keyCode: keyCodes.Z,
                shiftKey: true,
            });
            app.instance().handleKeyPress({
                keyCode: keyCodes.Z,
                shiftKey: true,
                ctrlKey: true,
            });
            app.instance().handleKeyPress({
                keyCode: keyCodes.Z,
                shiftKey: true,
                ctrlKey: true,
                altKey: true,
            });
            sinon.assert.callCount(keyCodeActionFunctionStub, 4);
        });
    });

    describe('paste', () => {        
        it('should dispatch a keyframe', () => {
            app.instance().paste();

            sinon.assert.calledOnce(app.instance().props.keyframe);
        });

        it('should paste the clipboard into paintFrame', () => {
            app.instance().paste();

            sinon.assert.calledWith(app.instance().props.paintFrame, { '0': 'clipboard' });
        });
    });

    describe('keyCodeActionMap', () => {        
        it('should call toggleIsPlaying on spacebar press', () => {
            mountApp();
            app.instance().keyCodeActionMap()[keyCodes.SPACEBAR] &&
            app.instance().keyCodeActionMap()[keyCodes.SPACEBAR]();

            sinon.assert.calledOnce(app.instance().props.toggleIsPlaying);
        });

        it('should call previousFrame on left arrow press if not playing', () => {
            mountApp();
            app.instance().keyCodeActionMap()[keyCodes.ARROW_LEFT] &&
            app.instance().keyCodeActionMap()[keyCodes.ARROW_LEFT]();

            sinon.assert.calledOnce(app.instance().props.previousFrame);
        });

        it('should not call previousFrame on left arrow press if playing', () => {
            mountApp();
            app.setProps({ isPlaying: true });
            app.instance().keyCodeActionMap()[keyCodes.ARROW_LEFT] &&
            app.instance().keyCodeActionMap()[keyCodes.ARROW_LEFT]();

            sinon.assert.notCalled(app.instance().props.previousFrame);
        });

        it('should call nextFrame on right arrow press if not playing', () => {
            mountApp();
            app.instance().keyCodeActionMap()[keyCodes.ARROW_RIGHT] &&
            app.instance().keyCodeActionMap()[keyCodes.ARROW_RIGHT]();

            sinon.assert.calledOnce(app.instance().props.nextFrame);
        });

        it('should not call nextFrame on right arrow press if playing', () => {
            mountApp();
            app.setProps({ isPlaying: true });
            app.instance().keyCodeActionMap()[keyCodes.ARROW_RIGHT] &&
            app.instance().keyCodeActionMap()[keyCodes.ARROW_RIGHT]();

            sinon.assert.notCalled(app.instance().props.nextFrame);
        });

        it('should call undo on ctrl+z press if not playing', () => {
            mountApp();
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.Z}`] &&
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.Z}`]();

            sinon.assert.calledOnce(app.instance().props.undo);
        });

        it('should not call undo on ctrl+z arrow press if playing', () => {
            mountApp();
            app.setProps({ isPlaying: true });
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.Z}`] &&
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.Z}`]();

            sinon.assert.notCalled(app.instance().props.undo);
        });

        it('should call redo on shift+ctrl+z press if not playing', () => {
            mountApp();
            app.instance().keyCodeActionMap()[`shift+ctrl+${keyCodes.Z}`] &&
            app.instance().keyCodeActionMap()[`shift+ctrl+${keyCodes.Z}`]();

            sinon.assert.calledOnce(app.instance().props.redo);
        });

        it('should not call redo on shift+ctrl+z arrow press if playing', () => {
            mountApp();
            app.setProps({ isPlaying: true });
            app.instance().keyCodeActionMap()[`shift+ctrl+${keyCodes.Z}`] &&
            app.instance().keyCodeActionMap()[`shift+ctrl+${keyCodes.Z}`]();

            sinon.assert.notCalled(app.instance().props.redo);
        });

        it('should call copy on ctrl+c press if not playing', () => {
            mountApp();
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.C}`] &&
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.C}`]();

            sinon.assert.calledOnce(app.instance().props.copy);
        });

        it('should not call copy on ctrl+c arrow press if playing', () => {
            mountApp();
            app.setProps({ isPlaying: true });
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.C}`] &&
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.C}`]();

            sinon.assert.notCalled(app.instance().props.copy);
        });

        it('should call paste on ctrl+v press if not playing', () => {
            mountApp();
            const pasteStub = sandbox.stub(app.instance(), 'paste');

            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.V}`] &&
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.V}`]();

            sinon.assert.calledOnce(pasteStub);
        });

        it('should not call paste on ctrl+v arrow press if playing', () => {
            mountApp();
            const pasteStub = sandbox.stub(app.instance(), 'paste');
            app.setProps({ isPlaying: true });

            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.V}`] &&
            app.instance().keyCodeActionMap()[`ctrl+${keyCodes.V}`]();

            sinon.assert.notCalled(pasteStub);
        });
    });

    describe('closeUpdateOverlay', () => {        
        it('should set showUpdateOverlay in state to false', () => {
            mountApp();
            app.instance().closeUpdateOverlay();

            expect(app.instance().state.showUpdateOverlay).to.be.false;
        });
    });

    describe('ChromePicker', () => {
        it('should pass hex color from change color response to setLongHexColor', () => {
            const chromePicker = app.find(ChromePicker);
            chromePicker.prop('onChangeComplete')({ hex: '#fff' });

            sinon.assert.calledWith(app.instance().props.setLongHexColor, '#fff');
        });
    });
});