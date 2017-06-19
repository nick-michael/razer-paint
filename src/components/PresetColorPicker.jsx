import React from 'react';
import PropTypes from 'prop-types';

const PresetColorPicker = (props) => {
    const renderColors = () => props.presetColors.map(color => (
        <div key={color} className="color-spot-container">
            <div className={`color-spot ${color === props.brushColor ? 'color-spot__selected' : ''}`} style={{ background: `#${color}` }} onClick={() => props.setColor(color)} />
        </div>
            ));

    return (
        <div className="preset-color-picker">
            {renderColors()}
        </div>
    );
};

/* eslint-disable react/no-unused-prop-types */
PresetColorPicker.propTypes = {
    brushColor: PropTypes.string.isRequired,
    presetColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    setColor: PropTypes.func.isRequired,
};
/* eslint-enable react/no-unused-prop-types */

export default PresetColorPicker;
