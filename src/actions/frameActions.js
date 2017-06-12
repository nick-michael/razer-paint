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

export const toggleEditing = () => ({
    type: types.TOGGLE_EDITING,
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

export const toggleIsPlaying = () => ({
    type: types.TOGGLE_IS_PLAYING,
});

export const toggleReverse = () => ({
    type: types.TOGGLE_REVERSE,
});

export const setFps = fps => ({
    type: types.SET_FPS,
    payload: fps,
});

export const copy = () => ({
    type: types.COPY,
});

export const nextFrame = () => ({
    type: types.NEXT_FRAME,
});

export const previousFrame = () => ({
    type: types.PREVIOUS_FRAME,
});
