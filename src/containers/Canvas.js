import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as canvasActions from '../actions/canvasActions';
import * as frameActions from '../actions/frameActions';
import Canvas from '../components/Canvas';

const mapStateToProps = (state) => {
    const { brushColor, tool } = state.canvas;
    const { frame, frames, redoFrames, animate } = state.frames;
    return { brushColor, tool, frame, frames, redoFrames, animate };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    { ...canvasActions, ...frameActions },
    dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
