import React from 'react';
import PropTypes from 'prop-types';

import { ChromePicker } from 'react-color';
import Canvas from '../containers/Canvas';
import Animation from './Animation';

const App = props => (
    <div>
        <div className="surface" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Canvas />
            <div style={{ marginLeft: '5px' }}> <ChromePicker color={props.brushColor} onChangeComplete={colorObject => props.setColor(colorObject.hex)} disableAlpha /> </div>
        </div>
        <Animation
          frames={props.animate}
          selectAnimationFrame={props.selectAnimationFrame}
          selectedFrame={props.selectedFrame}
        />
    </div>
);

App.propTypes = {
    brushColor: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
    animate: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectAnimationFrame: PropTypes.func.isRequired,
    selectedFrame: PropTypes.number.isRequired,
};

export default App;
