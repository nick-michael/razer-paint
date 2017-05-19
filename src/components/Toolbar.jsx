import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import { BRUSH, PICKER, ERASER } from '../constants/tools';

const Toolbar = props => (
    <div className="toolbar">
        <div className="toolbar-item" onMouseUp={() => props.canUndo && props.undo()}>
            <FontAwesome className={`toolbar-item-icon${props.canUndo ? '__selected' : ''}`} size="2x" name="undo" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.canRedo && props.redo()}>
            <FontAwesome className={`toolbar-item-icon${props.canRedo ? '__selected' : ''}`} size="2x" name="repeat" />
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
        <div className="toolbar-item" onMouseUp={props.capture}>
            <FontAwesome className={'toolbar-item-icon__selected'} size="2x" name="camera" />
        </div>
    </div>
);

Toolbar.propTypes = {
    tool: PropTypes.string.isRequired,
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    capture: PropTypes.func.isRequired,
    selectTool: PropTypes.func.isRequired,
};

export default Toolbar;
