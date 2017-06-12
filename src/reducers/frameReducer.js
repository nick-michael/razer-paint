import * as types from '../actions/actionTypes';
import { initializeFrame } from '../utils/frame';

const MAX_UNDO = -40;
const frame = initializeFrame();
const defaultState = {
    frame,
    frames: [frame],
    redoFrames: [],
    animate: [frame],
    selectedFrame: 0,
    isEditing: true,
    fps: 30,
    isPlaying: false,
    isReversed: false,
    clipboard: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.UNDO: {
            if (state.frames.length > 1) {
                const newFrame = state.frames.slice(-2)[0];
                const newState = {
                    frame: newFrame,
                    frames: state.frames.slice(0, state.frames.length - 1),
                    redoFrames: state.redoFrames.concat(state.frame),
                };

                if (state.isEditing && typeof state.selectedFrame === 'number') {
                    const newAnimation = [...state.animate];
                    newAnimation[state.selectedFrame] = newFrame;
                    newState.animate = newAnimation;
                }
                return { ...state, ...newState };
            }
            return state;
        }
        case types.REDO:
            if (state.redoFrames.length > 0) {
                const newFrame = state.redoFrames.slice(-1)[0];
                const newState = {
                    frame: newFrame,
                    frames: state.frames.concat(state.redoFrames.slice(-1)[0]),
                    redoFrames: state.redoFrames.slice(0, -1),
                };

                if (state.isEditing && typeof state.selectedFrame === 'number') {
                    const newAnimation = [...state.animate];
                    newAnimation[state.selectedFrame] = newFrame;
                    newState.animate = newAnimation;
                }

                return { ...state, ...newState };
            }
            return state;
        case types.PAINT_FRAME: {
            const newState = { frame: action.payload, redoFrames: [] };
            if (state.isEditing && typeof state.selectedFrame === 'number' && !state.isPlaying) {
                const newAnimation = [...state.animate];
                newAnimation[state.selectedFrame] = action.payload;
                newState.animate = newAnimation;
            }

            return { ...state, ...newState };
        }
        case types.KEYFRAME:
            return { ...state, frames: state.frames.slice(MAX_UNDO).concat(state.frame) };
        case types.CAPTURE:
            return { ...state, animate: state.animate.concat(state.frame) };
        case types.TOGGLE_EDITING:
            return { ...state, isEditing: !state.isEditing };
        case types.SELECT_ANIMATION_FRAME: {
            if (typeof action.payload === 'number') {
                return {
                    ...state,
                    frame: state.animate[action.payload],
                    frames: state.frames.slice(MAX_UNDO).concat(state.animate[action.payload]),
                    redoFrames: [],
                    selectedFrame: action.payload,
                };
            }
            return { ...state, selectedFrame: null };
        }
        case types.DELETE_FRAME: {
            const withoutFrame = state.animate.filter((e, i) => (i !== state.selectedFrame));
            const newAnimation = withoutFrame.length
                ? state.animate.filter((e, i) => (i !== state.selectedFrame))
                : [frame];

            const selectedFrame = state.selectedFrame >= state.animate.length - 1
                    ? Math.max(state.selectedFrame - 1, 0)
                    : state.selectedFrame;

            return { ...state,
                animate: newAnimation,
                selectedFrame,
                frame: newAnimation[selectedFrame],
            };
        }
        case types.INSERT_FRAME:
            return {
                ...state,
                selectedFrame: state.selectedFrame + 1,
                animate: [
                    ...state.animate.slice(0, state.selectedFrame + 1),
                    state.frame,
                    ...state.animate.slice(state.selectedFrame + 1)],
            };
        case types.LOAD_FRAME:
            return {
                ...state,
                frame: state.animate[state.selectedFrame],
                frames: state.frames.slice(MAX_UNDO).concat(state.frame),
            };
        case types.LOAD_FILE:
            return {
                ...state,
                frame: action.payload.frame,
                animate: action.payload.animate,
                fps: action.payload.fps,
            };
        case types.SET_IS_PLAYING:
            return {
                ...state,
                isPlaying: action.payload,
            };
        case types.TOGGLE_IS_PLAYING:
            return {
                ...state,
                isPlaying: !state.isPlaying,
            };
        case types.TOGGLE_REVERSE:
            return {
                ...state,
                isReversed: !state.isReversed,
            };
        case types.SET_FPS:
            return {
                ...state,
                fps: action.payload,
            };
        case types.COPY:
            return {
                ...state,
                clipboard: state.frame,
            };
        case types.NEXT_FRAME:
            return {
                ...state,
                selectedFrame: Math.min(state.selectedFrame + 1, state.animate.length - 1),
            };
        case types.PREVIOUS_FRAME:
            return {
                ...state,
                selectedFrame: Math.max(state.selectedFrame - 1, 0),
            };
        default:
            return state;
    }
};
