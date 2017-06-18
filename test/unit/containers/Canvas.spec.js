import React from 'react';
import { shallow } from 'enzyme';

import Canvas from '../../../src/containers/Canvas';
import * as canvasActions from '../../../src/actions/canvasActions';
import * as frameActions from '../../../src/actions/frameActions';
import fakeStore from '../reduxUtils';
import { BRUSH, PICKER, ERASER, FILL } from '../../../src/constants/tools';

describe('Canvas Container', () => {
    const sandbox = sinon.sandbox.create();
    let state;
    let setColorSpy;
    let paintFrameSpy;
    let setIsPaintingSpy;
    let keyframeSpy;

    const createCanvasComponent = () => shallow(
        <Canvas store={fakeStore(state)} />,
    );

    beforeEach(() => {
        state = {
            frames: {
                frame: {},
                frames: [{}],
                redoFrames: [{}],
                animate: [{}],
                isPlaying: false,
            },
            canvas: {
                tool: BRUSH,
                brushColor: 'ffffff',
                isPainting: false,
            },
        };

        setColorSpy = sandbox.spy(canvasActions, 'setColor');
        paintFrameSpy = sandbox.spy(frameActions, 'paintFrame');
        setIsPaintingSpy = sandbox.spy(canvasActions, 'setIsPainting');
        keyframeSpy = sandbox.spy(frameActions, 'keyframe');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Animation Not Playing', () => {
        describe('handlePixelMouseDown', () => {
            it('should paint a pixel with the state color on left click if brush is selected', () => {
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseDown({ button: 0 }, '0');

                sinon.assert.calledWith(paintFrameSpy, { 0: 'ffffff' });
            });

            it('should paint a pixel black on right click if brush is selected', () => {
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseDown({ button: 2 }, '0');

                sinon.assert.calledWith(paintFrameSpy, { 0: '000000' });
            });

            it('should paint a pixel black on left click if eraser is selected', () => {
                state.canvas.tool = ERASER;
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseDown({ button: 0 }, '0');

                sinon.assert.calledWith(paintFrameSpy, { 0: '000000' });
            });

            it('should paint a pixel black on right click if eraser is selected', () => {
                state.canvas.tool = ERASER;
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseDown({ button: 0 }, '0');

                sinon.assert.calledWith(paintFrameSpy, { 0: '000000' });
            });

            it('should set the state color to selected pixel black on left click if picker is selected', () => {
                state.canvas.tool = PICKER;
                state.frames.frame = { 0: 'fafafa', 1: '010101' };
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseDown({ button: 0 }, '0');

                sinon.assert.calledWith(setColorSpy, 'fafafa');
            });

            it('should paint a pixel black on right click if picker is selected', () => {
                state.canvas.tool = PICKER;
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseDown({ button: 2 }, '0');

                sinon.assert.calledWith(paintFrameSpy, { 0: '000000' });
            });

            it('should not paint a pixel on right click if fill is selected', () => {
                state.canvas.tool = FILL;
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseDown({ button: 2 }, '0');

                sinon.assert.notCalled(paintFrameSpy);
            });
        });

        describe('handlePixelMouseUp', () => {
            it('should fill with state color on left click with fill tool selected', () => {
                state.canvas.tool = FILL;
                state.frames.frame = { 0: 'fafafa', 1: '010101', 2: 'fafafa' };
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseUp({ button: 0 }, '0');

                sinon.assert.calledWith(paintFrameSpy, { 0: 'ffffff', 1: '010101', 2: 'ffffff' });
            });

            it('should fill black on right click with fill tool selected', () => {
                state.canvas.tool = FILL;
                state.frames.frame = { 0: 'fafafa', 1: '010101', 2: 'fafafa' };
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseUp({ button: 2 }, '0');

                sinon.assert.calledWith(paintFrameSpy, { 0: '000000', 1: '010101', 2: '000000' });
            });
        });
    });

    describe('Animation Playing', () => {
        describe('handlePixelMouseDown', () => {
            it('should not paint with brush', () => {
                state.frames.isPlaying = true;
                const canvasComponent = createCanvasComponent();

                canvasComponent.props().handlePixelMouseDown({ button: 0 }, '0');
                canvasComponent.props().handlePixelMouseDown({ button: 2 }, '0');

                sinon.assert.notCalled(paintFrameSpy);
            });

            it('should not paint with eraser', () => {
                state.canvas.tool = ERASER;
                state.frames.isPlaying = true;
                const canvasComponent = createCanvasComponent();

                canvasComponent.props().handlePixelMouseDown({ button: 0 }, '0');
                canvasComponent.props().handlePixelMouseDown({ button: 2 }, '0');

                sinon.assert.notCalled(paintFrameSpy);
            });

            it('should not pick or paint with picker', () => {
                state.canvas.tool = PICKER;
                state.frames.isPlaying = true;
                const canvasComponent = createCanvasComponent();

                canvasComponent.props().handlePixelMouseDown({ button: 0 }, '0');
                canvasComponent.props().handlePixelMouseDown({ button: 2 }, '0');

                sinon.assert.notCalled(paintFrameSpy);
                sinon.assert.notCalled(setColorSpy);
            });
        });

        describe('handlePixelMouseUp', () => {
            it('should not fill on left or right click with fill tool selected', () => {
                state.canvas.tool = FILL;
                state.frames.isPlaying = true;
                state.frames.frame = { 0: 'fafafa', 1: '010101', 2: 'fafafa' };
                const canvasComponent = createCanvasComponent();
                canvasComponent.props().handlePixelMouseUp({ button: 0 }, '0');
                canvasComponent.props().handlePixelMouseUp({ button: 2 }, '0');

                sinon.assert.notCalled(paintFrameSpy);
            });
        });
    });

    describe('handleMouseOver', () => {
        it('should paint pixel if isPainting', () => {
            state.canvas.isPainting = true;
            const canvasComponent = createCanvasComponent();
            canvasComponent.props().handleMouseOver({ button: 0 }, '0');

            sinon.assert.calledWith(paintFrameSpy, { 0: 'ffffff' });
        });

        it('should not paint pixel if not isPainting', () => {
            state.canvas.isPainting = false;
            const canvasComponent = createCanvasComponent();
            canvasComponent.props().handleMouseOver({ button: 0 }, '0');

            sinon.assert.notCalled(paintFrameSpy);
        });
    });
    describe('handleMouseUp', () => {
        it('should do nothing if not painting', () => {
            const canvasComponent = createCanvasComponent();
            canvasComponent.props().handleMouseUp();

            sinon.assert.notCalled(setIsPaintingSpy);
            sinon.assert.notCalled(keyframeSpy);
        });

        it('should set isPainting to false and make a keyframe', () => {
            state.canvas.isPainting = true;
            const canvasComponent = createCanvasComponent();
            canvasComponent.props().handleMouseUp();

            sinon.assert.calledWith(setIsPaintingSpy, false);
            sinon.assert.calledOnce(keyframeSpy);
        });
    });
});
