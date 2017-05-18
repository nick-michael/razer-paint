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
