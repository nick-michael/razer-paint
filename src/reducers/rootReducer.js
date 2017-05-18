import { combineReducers } from 'redux';

import canvas from './canvasReducer';
import frames from './frameReducer';

export default combineReducers({
    canvas,
    frames,
});
