import React from 'react';
import { shallow } from 'enzyme';

import Canvas from '../../../src/containers/Canvas';
import * as canvasActions from '../../../src/actions/canvasActions';
import * as frameActions from '../../../src/actions/frameActions';
import fakeStore from '../reduxUtils';
import { BRUSH, PICKER, ERASER, FILL } from '../../../src/constants/tools';

describe('App Container', () => {
    const sandbox = sinon.sandbox.create();
    let state;
    let setColorSpy;
    let paintFrameSpy;

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
    });

    afterEach(() => {
        sandbox.restore();
    });

    // describe('paintPixel', () => {
    //     it('should replace the pixel color with the provided color', () => {
    //         const canvasComponent = createCanvasComponent();
    //         canvasComponent.props().paintPixel(0, 'fafafa');

    //         sinon.assert.calledWith(paintFrameSpy, { '0': 'fafafa' });
    //     });
    // });
});
