import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as canvasActions from '../actions/canvasActions';
import * as frameActions from '../actions/frameActions';
import Canvas from '../components/Canvas';
import { BRUSH, PICKER, ERASER, FILL } from '../constants/tools';

const mapStateToProps = (state) => {
    const { tool, brushColor, isPainting } = state.canvas;
    const { frame, frames, redoFrames, animate } = state.frames;

    return { tool, brushColor, isPainting, frame, frames, redoFrames, animate };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    { ...canvasActions, ...frameActions },
    dispatch,
);

const mergeProps = (stateProps, dispatchProps) => {
    const paintPixel = (pixel, color) => {
        const newFrame = Object.assign({}, stateProps.frame);
        newFrame[`${pixel}`] = color || stateProps.brushColor;
        dispatchProps.paintFrame(newFrame);
    };

    const pickPixel = (pixel) => {
        dispatchProps.setColor(stateProps.frame[pixel]);
        dispatchProps.selectTool(BRUSH);
    };

    const fill = (pixel, color) => {
        const fillColor = color || stateProps.brushColor;
        const newFrame = Object.assign({}, stateProps.frame);
        for (let index in newFrame) {
            if (newFrame[index] === stateProps.frame[pixel]) {
                newFrame[index] = fillColor;
            }
        }
        dispatchProps.paintFrame(newFrame);
    };

    const toolClickMap = {
        [BRUSH]: pixel => paintPixel(pixel),
        [ERASER]: pixel => paintPixel(pixel, '000000'),
        [PICKER]: pixel => pickPixel(pixel),
    };

    const handlePixelMouseDown = (e, pixel) => {
        if (e.button === 0) {
            toolClickMap[stateProps.tool] && toolClickMap[stateProps.tool](pixel);
        } else if (e.button === 2 && stateProps.tool !== FILL) {
            toolClickMap[ERASER](pixel)
        }
    };

    const handlePixelMouseUp = (e, pixel) => {
        stateProps.tool === FILL && fill(pixel, e.button === 2 && '000000');
    };

    const handleMouseOver = (e, pixel) => {
        stateProps.isPainting && handlePixelMouseDown(e, pixel);
    };

    const handleMouseUp = () => {
        stateProps.isPainting &&
        dispatchProps.setIsPainting(false) &&
        dispatchProps.keyframe();
    };

    const mergedProps = {
        canUndo: stateProps.canUndo,
        canRedo: stateProps.canRedo,
        frame: stateProps.frame,
        tool: stateProps.tool,
        handlePixelMouseDown,
        handlePixelMouseUp,
        handleMouseOver,
        handleMouseUp,
        paintFrame: dispatchProps.paintFrame,
        setIsPainting: dispatchProps.setIsPainting,
        animate: stateProps.animate,
    };

    return { ...mergedProps };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Canvas);
