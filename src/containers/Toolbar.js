import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as canvasActions from '../actions/canvasActions';
import * as frameActions from '../actions/frameActions';
import Toolbar from '../components/Toolbar';

let interval;
let count = 0;

const mapStateToProps = (state) => {
    const { tool } = state.canvas;
    const { frame, frames, redoFrames, animate, selectedFrame, fps, isPlaying } = state.frames;
    const canUndo = frames.length > 1;
    const canRedo = redoFrames.length > 0;
    const saveState = { frame, animate, fps };
    return { tool, canUndo, canRedo, animate, selectedFrame, fps, isPlaying, saveState };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    { ...canvasActions, ...frameActions },
    dispatch,
);

const mergeProps = (stateProps, dispatchProps) => {
    const playAnimation = () => {
        dispatchProps.setIsPlaying(true);
        interval = setInterval(() => {
            if (count >= stateProps.animate.length) {
                count = 0;
            }
            dispatchProps.paintFrame(stateProps.animate[count]);
            count += 1;
        }, 1000 / stateProps.fps);
    };

    const updateFps = (fps) => {
        if (stateProps.isPlaying) {
            clearInterval(interval);
            interval = setInterval(() => {
                if (count >= stateProps.animate.length) {
                    count = 0;
                }
                dispatchProps.paintFrame(stateProps.animate[count]);
                count += 1;
            }, 1000 / fps);
        }
    };

    const pauseAnimation = () => {
        dispatchProps.setIsPlaying(false);
        clearInterval(interval);
    };
    return { ...stateProps, ...dispatchProps, playAnimation, pauseAnimation, updateFps };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Toolbar);
