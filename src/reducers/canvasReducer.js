import * as types from '../actions/actionTypes';
import { BRUSH } from '../constants/tools';

const defaultState = {
    brushColor: '#FFF',
    isPainting: false,
    tool: BRUSH,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.SELECT_TOOL:
            return { ...state, tool: action.payload };
        case types.SET_IS_PAINTING:
            return { ...state, isPainting: action.payload };
        case types.SET_COLOR:
            return { ...state, brushColor: action.payload };
        default:
            return state;
    }
};
