import * as types from './actionTypes';

export const undo = () => ({
    type: types.UNDO,
});

export const redo = () => ({
    type: types.REDO,
});

export const paintFrame = frame => ({
    type: types.PAINT_FRAME,
    payload: frame,
});

export const keyframe = () => ({
    type: types.KEYFRAME,
});

export const capture = () => ({
    type: types.CAPTURE,
});

export const selectAnimationFrame = index => ({
    type: types.SELECT_ANIMATION_FRAME,
    payload: index,
});

export const deleteFrame = () => ({
    type: types.DELETE_FRAME,
});

export const insertFrame = () => ({
    type: types.INSERT_FRAME,
});

export const loadFrame = () => ({
    type: types.LOAD_FRAME,
});

export const loadFile = snapshot => ({
    type: types.LOAD_FILE,
    payload: snapshot,
});

export const setIsPlaying = flag => ({
    type: types.SET_IS_PLAYING,
    payload: flag,
});

export const setFps = fps => ({
    type: types.SET_FPS,
    payload: fps,
});
