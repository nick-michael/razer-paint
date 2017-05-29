import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import { BRUSH, PICKER, ERASER, FILL } from '../constants/tools';

import { saveFile, openFile } from '../utils/fileStytem';

const Toolbar = props => (
    <div className="toolbar">
        <div className="toolbar-item" onMouseUp={() => props.selectTool(BRUSH)}>
            <div className={`toolbar-item-icon toolbar-item-icon-brush${props.tool === BRUSH ? '__selected' : ''}`} />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(PICKER)}>
            <div className={`toolbar-item-icon toolbar-item-icon-picker${props.tool === PICKER ? '__selected' : ''}`} />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(ERASER)}>
            <FontAwesome className={`toolbar-item-fontawesome ${props.tool === ERASER ? 'toolbar-item-fontawesome__selected' : ''}`} name="eraser" />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(FILL)}>
            <div className={`toolbar-item-icon toolbar-item-icon-fill${props.tool === FILL ? '__selected' : ''}`} />
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={() => props.canUndo && props.undo()}>
            <div className={`toolbar-item-icon toolbar-item-icon-undo${props.canUndo ? '__selected' : ''}`} />
        </div>
        <div className="toolbar-item" onMouseUp={() => props.canRedo && props.redo()}>
            <div className={`toolbar-item-icon toolbar-item-icon-redo${props.canRedo ? '__selected' : ''}`} />
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={props.capture}>
            <FontAwesome className={'toolbar-item-fontawesome__selected'} name="camera" />
        </div>
        <div className="toolbar-item" onMouseUp={typeof props.selectedFrame === 'number' && props.insertFrame}>
            <FontAwesome className={`toolbar-item-fontawesome ${typeof props.selectedFrame === 'number' ? 'toolbar-item-fontawesome__selected' : ''}`} name="level-down" />
        </div>
        <div className="toolbar-item" onMouseUp={typeof props.selectedFrame === 'number' && props.deleteFrame}>
            <div className={`toolbar-item-icon toolbar-item-icon-trash${typeof props.selectedFrame === 'number' ? '__selected' : ''}`} />
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={() => saveFile(props.saveState)}>
            <FontAwesome className={'toolbar-item-fontawesome__selected'} name="floppy-o" />
        </div>
        <div className="toolbar-item" onMouseUp={() => openFile(props.loadAnimation)}>
            <FontAwesome className={'toolbar-item-fontawesome__selected'} name="folder-open" />
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={props.isPlaying ? props.animate.length > 0 && props.pauseAnimation : props.animate.length > 0 && props.playAnimation}>
            <FontAwesome className={`toolbar-item-fontawesome ${props.animate.length > 0 ? 'toolbar-item-fontawesome__selected' : ''}`} name={props.isPlaying ? 'pause' : 'play'} />
        </div>
        <div className="toolbar-slider">
            <div className="toolbar-slider-value">
                fps: {props.fps}
            </div>
            <input
              className="toolbar-slider-input"
              type="range"
              max={60}
              min={1}
              value={props.fps}
              onMouseUp={e => props.updateFps(e.target.value)}
              onChange={e => props.setFps(e.target.value)}
            />
        </div>
    </div>
);

Toolbar.propTypes = {
    tool: PropTypes.string.isRequired,
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    selectedFrame: PropTypes.number.isRequired,
    fps: PropTypes.number.isRequired,
    animate: PropTypes.arrayOf(PropTypes.object).isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    capture: PropTypes.func.isRequired,
    selectTool: PropTypes.func.isRequired,
    setFps: PropTypes.func.isRequired,
    updateFps: PropTypes.func.isRequired,
    insertFrame: PropTypes.func.isRequired,
    deleteFrame: PropTypes.func.isRequired,
    saveState: PropTypes.func.isRequired,
    loadFile: PropTypes.func.isRequired,
    playAnimation: PropTypes.func.isRequired,
    pauseAnimation: PropTypes.func.isRequired,
};

export default Toolbar;
