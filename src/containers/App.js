import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColor } from '../actions/canvasActions';
import * as frameActions from '../actions/frameActions';
import App from '../components/App';

const mapStateToProps = (state) => {
    const { brushColor, presetColors } = state.canvas;
    const { animate, selectedFrame, isPlaying, clipboard } = state.frames;
    return { brushColor, presetColors, animate, selectedFrame, isPlaying, clipboard };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    { setColor, ...frameActions },
    dispatch,
);

const mergeProps = (stateProps, dispatchProps) => {
    const setLongHexColor = (hex) => {
        const color = hex.substr(1);
        if (color.length === 6) {
            dispatchProps.setColor(color);
        } else if (color.length === 3) {
            color.replace('/./g', str => str[0]);
            dispatchProps.setColor(color);
        }
    };
    return { ...stateProps, ...dispatchProps, setLongHexColor };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
