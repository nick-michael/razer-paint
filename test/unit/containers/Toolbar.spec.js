import React from 'react';
import { shallow } from 'enzyme';

import Toolbar, { setCount } from '../../../src/containers/Toolbar';
import * as frameActions from '../../../src/actions/frameActions';
import fakeStore from '../reduxUtils';
import { BRUSH } from '../../../src/constants/tools';

describe('Toolbar Container', () => {
    const sandbox = sinon.sandbox.create();
    let state;
    let clock;
    let selectAnimationFrameSpy;
    let paintFrameSpy;
    let setIsPlayingSpy;
    let toggleReverseSpy;
    let loadFileSpy;
    let keyframeSpy;

    const createToolbarComponent = () => shallow(
        <Toolbar store={fakeStore(state)} />,
    );

    beforeEach(() => {
        setCount(0);
        clock = sinon.useFakeTimers();
        state = {
            frames: {
                frame: {},
                frames: [{}],
                redoFrames: [{}],
                animate: [{ 0: '000001' }, { 0: '000002' }, { 0: '000003' }],
                selectedFrame: 0,
                isEditing: true,
                fps: 30,
                isPlaying: false,
                isReversed: false,
                clipboard: { 0: 'clpbrd' },
            },
            canvas: {
                tool: BRUSH,
            },
        };

        selectAnimationFrameSpy = sandbox.spy(frameActions, 'selectAnimationFrame');
        paintFrameSpy = sandbox.spy(frameActions, 'paintFrame');
        setIsPlayingSpy = sandbox.spy(frameActions, 'setIsPlaying');
        toggleReverseSpy = sandbox.spy(frameActions, 'toggleReverse');
        loadFileSpy = sandbox.spy(frameActions, 'loadFile');
        keyframeSpy = sandbox.spy(frameActions, 'keyframe');
    });

    afterEach(() => {
        clock.restore();
        sandbox.restore();
    });

    describe('playAnimation', () => {
        it('should deselect frame and play animation', () => {
            state.frames.fps = 2;
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().playAnimation();

            sinon.assert.calledWith(selectAnimationFrameSpy, null);
            sinon.assert.calledWith(setIsPlayingSpy, true);

            clock.tick(500);
            sinon.assert.calledOnce(paintFrameSpy);
            sinon.assert.calledWith(paintFrameSpy, { 0: '000001' });

            clock.tick(500);
            sinon.assert.calledTwice(paintFrameSpy);
            sinon.assert.calledWith(paintFrameSpy, { 0: '000002' });
        });

        it('should deselect frame and play animation in reverse', () => {
            state.frames.fps = 2;
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().playAnimation(true);

            sinon.assert.calledWith(selectAnimationFrameSpy, null);
            sinon.assert.calledWith(setIsPlayingSpy, true);

            clock.tick(500);
            sinon.assert.calledOnce(paintFrameSpy);
            sinon.assert.calledWith(paintFrameSpy, { 0: '000001' });

            clock.tick(500);
            sinon.assert.calledTwice(paintFrameSpy);
            sinon.assert.calledWith(paintFrameSpy, { 0: '000003' });
        });

        it('should play animation relative to fps', () => {
            state.frames.fps = 2;
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().playAnimation();

            clock.tick(500);
            sinon.assert.calledOnce(paintFrameSpy);

            clock.tick(500);
            sinon.assert.calledTwice(paintFrameSpy);

            clock.reset();
            paintFrameSpy.reset();

            state.frames.fps = 30;
            const newToolbarComponent = createToolbarComponent();
            newToolbarComponent.props().playAnimation();

            clock.tick(500);
            sinon.assert.callCount(paintFrameSpy, 15);
        });
    });

    describe('toggleReverse', () => {
        it('should dispatch only toggleReverse if not playing', () => {
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().toggleReverse();

            sinon.assert.calledOnce(toggleReverseSpy);
            sinon.assert.notCalled(selectAnimationFrameSpy);
            sinon.assert.notCalled(setIsPlayingSpy);
        });

        it('should dispatch toggleReverse and re-play the animation', () => {
            state.frames.isPlaying = true;
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().toggleReverse();

            sinon.assert.calledOnce(toggleReverseSpy);
            sinon.assert.calledOnce(selectAnimationFrameSpy);
            sinon.assert.calledOnce(setIsPlayingSpy);
        });
    });

    describe('updateFps', () => {
        it('should re-play the animation', () => {
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().updateFps();

            sinon.assert.calledOnce(selectAnimationFrameSpy);
            sinon.assert.calledOnce(setIsPlayingSpy);
        });
    });

    describe('paseAnimation', () => {
        it('should set isPlaying to false', () => {
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().pauseAnimation();

            sinon.assert.calledWith(setIsPlayingSpy, false);
        });
    });

    describe('loadAnimation', () => {
        it('should load file from args', () => {
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().loadAnimation('file.rzp');

            sinon.assert.calledWith(loadFileSpy, 'file.rzp');
        });
    });

    describe('paste', () => {
        it('should save keyframe and load clipboard into state', () => {
            const toolbarComponent = createToolbarComponent();
            toolbarComponent.props().paste();

            sinon.assert.calledOnce(keyframeSpy);
            sinon.assert.calledWith(paintFrameSpy, { 0: 'clpbrd' });
        });
    });

    it('should set canUndo to true if frames contains more than one frame', () => {
        state.frames.frames = [{ 0: '000001' }, { 0: '000002' }, { 0: '000003' }];
        const toolbarComponent = createToolbarComponent();

        expect(toolbarComponent.props().canUndo).to.be.true;
    });

    it('should set canUndo to false if frames contains one (or less) frame', () => {
        state.frames.frames = [{ 0: '000001' }];
        const toolbarComponent = createToolbarComponent();

        expect(toolbarComponent.props().canUndo).to.be.false;
    });

    it('should set canRedo to true if redoFrames contains at least one frame', () => {
        state.frames.redoFrames = [{ 0: '000001' }];
        const toolbarComponent = createToolbarComponent();

        expect(toolbarComponent.props().canRedo).to.be.true;
    });

    it('should set canRedo to false if redoFrames contains no frames', () => {
        state.frames.redoFrames = [];
        const toolbarComponent = createToolbarComponent();

        expect(toolbarComponent.props().canRedo).to.be.false;
    });
});
