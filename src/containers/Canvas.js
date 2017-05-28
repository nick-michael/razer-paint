import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as canvasActions from '../actions/canvasActions';
import * as frameActions from '../actions/frameActions';
import Canvas from '../components/Canvas';
import { BRUSH, PICKER, ERASER } from '../constants/tools';

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
    const paintPixel = (pixel) => {
        const newFrame = Object.assign({}, stateProps.frame);
        newFrame[`${pixel}`] = stateProps.tool === ERASER ? '000000' : stateProps.brushColor;
        dispatchProps.paintFrame(newFrame);
    };

    const pickPixel = (pixel) => {
        dispatchProps.setColor(stateProps.frame[pixel]);
        dispatchProps.selectTool(BRUSH);
    };

    const toolClickMap = {
        [BRUSH]: pixel => paintPixel(pixel),
        [ERASER]: pixel => paintPixel(pixel),
        [PICKER]: pixel => pickPixel(pixel),
    };

    const handlePixelClick = (pixel) => {
        toolClickMap[stateProps.tool] && toolClickMap[stateProps.tool](pixel);
    };

    const handleMouseOver = (pixel) => {
        stateProps.isPainting && paintPixel(pixel);
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
        handlePixelClick,
        handleMouseOver,
        handleMouseUp,
        paintFrame: dispatchProps.paintFrame,
        setIsPainting: dispatchProps.setIsPainting,
        animate: stateProps.animate,
    };

    return { ...mergedProps };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Canvas);
