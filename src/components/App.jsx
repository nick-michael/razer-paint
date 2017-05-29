import * as os from 'os';

import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';

import { ChromePicker } from 'react-color';
import FontAwesome from 'react-fontawesome';
import Canvas from '../containers/Canvas';
import Animation from './Animation';
import PresetColorPicker from './PresetColorPicker';

const float = os.platform() === 'darwin' ? 'left' : 'right';

const closeApp = () => {
    remote.getCurrentWindow().close();
};

const minimizeApp = () => {
    remote.getCurrentWindow().minimize();
};

const App = props => (
    <div>
        <div className="topBar">
            <span className="label">Razer Paint</span>
            <span className="button-container" style={{ float }}>
                <span className="button button-close" style={{ float }} onClick={closeApp}>
                    <FontAwesome className="button-icon" name="times" />
                </span>
                <span className="button button-minimize" style={{ float }} onClick={minimizeApp}>
                    <FontAwesome className="button-icon" name="minus" />
                </span>
            </span>
        </div>
        <div className="surface" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Canvas />
            <div style={{ marginLeft: '5px', display: 'inline-flex' }}>
                <ChromePicker
                    color={props.brushColor}
                    onChangeComplete={colorObject => props.setLongHexColor(colorObject.hex)}
                    disableAlpha
                />
                <PresetColorPicker brushColor={props.brushColor} presetColors={props.presetColors} setColor={props.setColor}/>
            </div>
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
