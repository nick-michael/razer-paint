import * as types from '../actions/actionTypes';
import { initializeFrame } from '../utils/frame';

const frame = initializeFrame();
const defaultState = {
    frame,
    frames: [frame],
    redoFrames: [],
    animate: [],
    selectedFrame: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.UNDO:
            return {
                ...state,
                frame: state.frames.slice(-2)[0],
                frames: state.frames.slice(0, state.frames.length - 1),
                redoFrames: state.redoFrames.concat(state.frame),
            };
        case types.REDO:
            return {
                ...state,
                frame: state.redoFrames.slice(-1)[0],
                frames: state.frames.concat(state.redoFrames.slice(-1)[0]),
                redoFrames: state.redoFrames.slice(0, -1),
            };
        case types.PAINT_FRAME:
            return { ...state, frame: action.payload, redoFrames: [] };
        case types.KEYFRAME:
            return { ...state, frames: state.frames.concat(state.frame) };
        case types.CAPTURE:
            return { ...state, animate: state.animate.concat(state.frame) };
        case types.SELECT_ANIMATION_FRAME:
            return { ...state, selectedFrame: action.payload };
        case types.DELETE_FRAME:
            return { ...state,
                animate: state.animate.filter((e, i) => (i !== state.selectedFrame)),
                selectedFrame: state.selectedFrame >= state.animate.length - 1
                    ? null
                    : state.selectedFrame,
            };
        case types.INSERT_FRAME:
            return {
                ...state,
                animate: [
                    ...state.animate.slice(0, state.selectedFrame + 1),
                    state.frame,
                    ...state.animate.slice(state.selectedFrame + 1)],
            };
        case types.LOAD_FRAME:
            return {
                ...state,
                frame: state.animate[state.selectedFrame],
                frames: state.frames.concat(state.frame),
            };
        default:
            return state;
    }
};
