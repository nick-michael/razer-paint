import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColor } from '../actions/canvasActions';
import App from '../components/App';

const mapStateToProps = (state) => {
    const { brushColor } = state.canvas;
    return { brushColor };
};

const mapDispatchToProps = dispatch => bindActionCreators({ setColor }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
