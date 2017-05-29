import * as os from 'os';

import React from 'react';
import PropTypes from 'prop-types';

const PresetColorPicker = props => {
    const renderColors = () => {
        return props.presetColors.map((color) => {
            return (
                <div className="color-spot-container">
                    <div className={`color-spot ${color === props.brushColor ? 'color-spot__selected' : ''}`} style={{ background: `#${color}` }} onClick={() => props.setColor(color)} />
                </div>
            );
        });
    };

    return (
        <div className="preset-color-picker">
            {renderColors()}
        </div>
    );
};

PresetColorPicker.propTypes = {
    brushColor: PropTypes.string.isRequired,
    presetColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    setColor: PropTypes.func.isRequired,
};

export default PresetColorPicker;
