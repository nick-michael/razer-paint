import React from 'react';
import PropTypes from 'prop-types';

import { ChromePicker } from 'react-color';
import Canvas from '../containers/Canvas';

const App = props => (
    <div className="surface" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Canvas />
        <div style={{ marginLeft: '5px' }}> <ChromePicker color={props.brushColor} onChangeComplete={colorObject => props.setColor(colorObject.hex)} disableAlpha /> </div>
    </div>
);

App.propTypes = {
    brushColor: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
};

export default App;
