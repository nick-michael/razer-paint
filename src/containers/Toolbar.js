import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as canvasActions from '../actions/canvasActions';
import * as frameActions from '../actions/frameActions';
import Toolbar from '../components/Toolbar';

let interval;
let count = 0;

// Exported for use in test scenario - find a better way to do this?
export const setCount = (number) => {
    count = number;
};

const mapStateToProps = (state) => {
    const { tool, keyboardOverride } = state.canvas;
    const {
        frame,
        frames,
        redoFrames,
        animate,
        selectedFrame,
        isEditing,
        fps,
        isPlaying,
        isReversed,
        clipboard,
    } = state.frames;

    const canUndo = frames.length > 1;
    const canRedo = redoFrames.length > 0;
    const saveState = { frame, animate, fps };
    return {
        tool,
        keyboardOverride,
        canUndo,
        canRedo,
        animate,
        selectedFrame,
        isEditing,
        fps,
        isPlaying,
        isReversed,
        clipboard,
        saveState,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    { ...canvasActions, ...frameActions },
    dispatch,
);

const mergeProps = (stateProps, dispatchProps) => {
    const playAnimation = (reverseOverride) => {
        const isReversed = typeof reverseOverride === 'boolean' ? reverseOverride : stateProps.isReversed;
        dispatchProps.selectAnimationFrame(null);
        dispatchProps.setIsPlaying(true);

        // Avoid putting logic inside the intervals to optimise performace
        // for higher framerates
        if (!isReversed) {
            interval = setInterval(() => {
                count %= stateProps.animate.length;
                dispatchProps.paintFrame(stateProps.animate[count]);
                count += 1;
            }, 1000 / stateProps.fps);
        } else {
            interval = setInterval(() => {
                count = count < 0 ? stateProps.animate.length - 1 : count;
                dispatchProps.paintFrame(stateProps.animate[count]);
                count -= 1;
            }, 1000 / stateProps.fps);
        }
    };

    const toggleReverse = () => {
        dispatchProps.toggleReverse();
        if (stateProps.isPlaying) {
            clearInterval(interval);
            playAnimation(!stateProps.isReversed);
        }
    };

    const updateFps = () => {
        clearInterval(interval);
        playAnimation();
    };

    const pauseAnimation = () => {
        dispatchProps.setIsPlaying(false);
        clearInterval(interval);
    };

    const loadAnimation = (file) => {
        count = 0;
        pauseAnimation();
        dispatchProps.loadFile(file);
    };

    const paste = () => {
        dispatchProps.keyframe();
        dispatchProps.paintFrame(stateProps.clipboard);
    };

    return {
        ...stateProps,
        ...dispatchProps,
        playAnimation,
        toggleReverse,
        pauseAnimation,
        updateFps,
        loadAnimation,
        paste,
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Toolbar);
