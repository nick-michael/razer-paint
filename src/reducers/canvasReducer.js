import * as types from '../actions/actionTypes';
import { BRUSH } from '../constants/tools';

const defaultState = {
    brushColor: 'ffffff',
    isPainting: false,
    tool: BRUSH,
    keyboardOverride: false,
    presetColors: ['FF0000', 'FF8000', 'FFF700', '00FF03', '00FFFA', '000CFF', '9900FF', 'FD00FF'],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.SELECT_TOOL:
            return { ...state, tool: action.payload };
        case types.SET_IS_PAINTING:
            return { ...state, isPainting: action.payload };
        case types.SET_COLOR:
            return { ...state, brushColor: action.payload, presetColors: state.presetColors.includes(`${action.payload}`) ? state.presetColors : [`${action.payload}`].concat(state.presetColors.slice(0, 23)) };
        case types.TOGGLE_KEYBOARD_OVERRIDE:
            return { ...state, keyboardOverride: !state.keyboardOverride };
        default:
            return state;
    }
};
