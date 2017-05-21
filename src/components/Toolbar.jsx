import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import { BRUSH, PICKER, ERASER } from '../constants/tools';

const Toolbar = props => (
    <div className="toolbar">
        <div className="toolbar-item" onMouseUp={() => props.selectTool(BRUSH)}>
            <FontAwesome className={`toolbar-item-icon${props.tool === BRUSH ? '__selected' : ''}`} name="paint-brush" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(PICKER)}>
            <FontAwesome className={`toolbar-item-icon${props.tool === PICKER ? '__selected' : ''}`} name="eyedropper" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(ERASER)}>
            <FontAwesome className={`toolbar-item-icon${props.tool === ERASER ? '__selected' : ''}`} name="eraser" />
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={() => props.canUndo && props.undo()}>
            <FontAwesome className={`toolbar-item-icon${props.canUndo ? '__selected' : ''}`} name="undo" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.canRedo && props.redo()}>
            <FontAwesome className={`toolbar-item-icon${props.canRedo ? '__selected' : ''}`} name="repeat" />
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={props.capture}>
            <FontAwesome className={'toolbar-item-icon__selected'} name="camera" />
        </div>
        <div className="toolbar-item" onMouseUp={typeof props.selectedFrame === 'number' && props.insertFrame}>
            <FontAwesome className={`toolbar-item-icon${typeof props.selectedFrame === 'number' ? '__selected' : ''}`} name="level-down" />
        </div>
        <div className="toolbar-item" onMouseUp={typeof props.selectedFrame === 'number' && props.loadFrame}>
            <FontAwesome className={`toolbar-item-icon${typeof props.selectedFrame === 'number' ? '__selected' : ''}`} name="level-up" />
        </div>
        <div className="toolbar-item" onMouseUp={typeof props.selectedFrame === 'number' && props.deleteFrame}>
            <FontAwesome className={`toolbar-item-icon${typeof props.selectedFrame === 'number' ? '__selected' : ''}`} name="trash" />
        </div>
    </div>
);

Toolbar.propTypes = {
    tool: PropTypes.string.isRequired,
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    selectedFrame: PropTypes.number.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    capture: PropTypes.func.isRequired,
    selectTool: PropTypes.func.isRequired,
    insertFrame: PropTypes.func.isRequired,
    loadFrame: PropTypes.func.isRequired,
    deleteFrame: PropTypes.func.isRequired,
};

export default Toolbar;
