import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import { BRUSH, PICKER, ERASER } from '../constants/tools';

const Toolbar = props => (
    <div className="toolbar">
        <div className="toolbar-item" onMouseUp={() => props.undo()}>
            <FontAwesome className={`toolbar-item-icon${props.frames.length > 1 ? '__selected' : ''}`} size="2x" name="undo" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.redo()}>
            <FontAwesome className={`toolbar-item-icon${props.redoFrames.length > 0 ? '__selected' : ''}`} size="2x" name="repeat" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(BRUSH)}>
            <FontAwesome className={`toolbar-item-icon${props.tool === BRUSH ? '__selected' : ''}`} size="2x" name="paint-brush" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(PICKER)}>
            <FontAwesome className={`toolbar-item-icon${props.tool === PICKER ? '__selected' : ''}`} size="2x" name="eyedropper" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(ERASER)}>
            <FontAwesome className={`toolbar-item-icon${props.tool === ERASER ? '__selected' : ''}`} size="2x" name="eraser" />
        </div>
    </div>
);

Toolbar.propTypes = {
    tool: PropTypes.string.isRequired,
    frames: PropTypes.arrayOf(PropTypes.object).isRequired,
    redoFrames: PropTypes.arrayOf(PropTypes.object).isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    selectTool: PropTypes.func.isRequired,
};

export default Toolbar;
