import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as canvasActions from '../actions/canvasActions';
import * as frameActions from '../actions/frameActions';
import Toolbar from '../components/Toolbar';

const mapStateToProps = (state) => {
    const { tool } = state.canvas;
    const { frames, redoFrames, animate } = state.frames;
    const canUndo = frames.length > 1;
    const canRedo = redoFrames.length > 0;
    return { tool, canUndo, canRedo, animate };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    { ...canvasActions, ...frameActions },
    dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
