import * as types from './actionTypes';

export const selectTool = tool => ({
    type: types.SELECT_TOOL,
    payload: tool,
});

// export const setIsPainting = (flag) => ({
//     type: types.SET_IS_PAINTING,
//     payload: flag
// });

export const setColor = color => ({
    type: types.SET_COLOR,
    payload: color,
});
