import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColor } from '../actions/canvasActions';
import { selectAnimationFrame } from '../actions/frameActions';
import App from '../components/App';

const mapStateToProps = (state) => {
    const { brushColor } = state.canvas;
    const { animate, selectedFrame } = state.frames;
    return { brushColor, animate, selectedFrame };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    { setColor, selectAnimationFrame },
    dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
