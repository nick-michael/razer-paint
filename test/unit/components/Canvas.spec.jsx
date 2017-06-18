import React from 'react';
import { shallow } from 'enzyme';

import Canvas from '../../../src/components/Canvas';
import Pixel from '../../../src/components/Pixel';
import ChromaSDK from '../../../src/utils/chroma';
import * as frameUtils from '../../../src/utils/frame';

describe('Canvas Component', () => {
    const sandbox = sinon.sandbox.create();
    let canvas;
    let eventListenerStub;
    let chromaInitStub;
    let createKeyboardEffectStub;
    let frameToSdkStub;

    beforeEach(() => {
        ChromaSDK.initialised = true;

        eventListenerStub = sandbox.stub(window, 'addEventListener');
        chromaInitStub = sandbox.stub(ChromaSDK, 'init');
        createKeyboardEffectStub = sandbox.stub(ChromaSDK, 'createKeyboardEffect');
        frameToSdkStub = sandbox.stub(frameUtils, 'frameToSdk').returns('converted_frame');

        canvas = shallow(
            <Canvas
              frame={{ 0: '000000' }}
              handlePixelMouseUp={sandbox.stub()}
              handlePixelMouseDown={sandbox.stub()}
              handleMouseOver={sandbox.stub()}
              handleMouseUp={sandbox.stub()}
              setIsPainting={sandbox.stub()}
            />,
        );
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should add mouseup listener on mount', () => {
        canvas.instance().componentWillMount();

        sinon.assert.calledWith(eventListenerStub, 'mouseup', sinon.match.func);
    });

    it('should initialize the chroma sdk on mount', () => {
        canvas.instance().componentWillMount();

        sinon.assert.calledWith(chromaInitStub, 54235);
    });

    it('should convert current frame to sdk format', () => {
        sinon.assert.calledWith(frameToSdkStub, canvas.instance().props.frame);
    });

    it('should call chroma sdk with CHROMA_CUSTOM effect and animation frame', () => {
        sinon.assert.calledWith(createKeyboardEffectStub, 'CHROMA_CUSTOM', 'converted_frame');
    });

    it('should render 6 rows', () => {
        expect(canvas.find('.row').length).to.equal(frameUtils.CANVAS_HEIGHT);
    });

    it('should render 132 pixels', () => {
        const totalPixels = frameUtils.CANVAS_HEIGHT * frameUtils.CANVAS_WIDTH;
        expect(canvas.find(Pixel).length).to.equal(totalPixels);
    });

    it('should set pinting to true on mouse down', () => {
        canvas.find('.canvas').props().onMouseDown();

        sinon.assert.calledWith(canvas.instance().props.setIsPainting, true);
    });

    describe('makePixel', () => {
        it('should call handlePixelMouseUp on mouse up', () => {
            canvas.find('.pixel-container').nodes[0].props.onMouseUp('e', '0');

            sinon.assert.calledWith(canvas.instance().props.handlePixelMouseUp, 'e', '0');
        });

        it('should call handlePixelMouseDown on mouse down', () => {
            canvas.find('.pixel-container').nodes[0].props.onMouseDown('e', '0');

            sinon.assert.calledWith(canvas.instance().props.handlePixelMouseDown, 'e', '0');
        });

        it('should call handleMouseOver on mouse over', () => {
            canvas.find('.pixel-container').nodes[0].props.onMouseOver('e', '0');

            sinon.assert.calledWith(canvas.instance().props.handleMouseOver, 'e', '0');
        });
    });
});
