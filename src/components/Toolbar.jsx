import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons/icons';
import { BRUSH, PICKER, ERASER, FILL } from '../constants/tools';

import { saveFile, openFile } from '../utils/fileStytem';

const Toolbar = props => (
    <div className="toolbar">
        <div className="toolbar-item" onMouseUp={() => props.selectTool(BRUSH)}>
            <div className={`toolbar-item-icon toolbar-item-icon__${props.tool === BRUSH ? 'selected' : 'available'}`}>
                <icons.Brush />
            </div>
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(PICKER)}>
            <div className={`toolbar-item-icon toolbar-item-icon__${props.tool === PICKER ? 'selected' : 'available'}`}>
                <icons.Eyedropper />
            </div>
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(ERASER)}>
            <div className={`toolbar-item-icon toolbar-item-icon__${props.tool === ERASER ? 'selected' : 'available'}`}>
                <icons.Eraser />
            </div>
        </div>
        <div className="toolbar-item" onMouseUp={() => props.selectTool(FILL)}>
            <div className={`toolbar-item-icon toolbar-item-icon__${props.tool === FILL ? 'selected' : 'available'}`}>
                <icons.Bucket />
            </div>
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={() => props.canUndo && props.undo()}>
            <div className={`toolbar-item-icon toolbar-item-icon__${props.canUndo ? 'available' : ''}`}>
                <icons.Undo />
            </div>
        </div>
        <div className="toolbar-item" onMouseUp={() => props.canRedo && props.redo()}>
            <div className={`toolbar-item-icon toolbar-item-icon__${props.canRedo ? 'available' : ''}`}>
                <icons.Redo />
            </div>
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={props.capture}>
            <div className="toolbar-item-icon toolbar-item-icon__available">
                <icons.Capture />
            </div>
        </div>
        <div className="toolbar-item" onMouseUp={typeof props.selectedFrame === 'number' && props.insertFrame}>
            <div className={`toolbar-item-icon toolbar-item-icon__${typeof props.selectedFrame === 'number' ? 'available' : ''}`}>
                <icons.Insert />
            </div>
        </div>
        <div className="toolbar-item" onMouseUp={typeof props.selectedFrame === 'number' && props.deleteFrame}>
            <div className={`toolbar-item-icon toolbar-item-icon__${typeof props.selectedFrame === 'number' ? 'available' : ''}`}>
                <icons.Trashcan />
            </div>
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={() => saveFile(props.saveState)}>
            <div className="toolbar-item-icon toolbar-item-icon__available">
                <icons.Save />
            </div>
        </div>
        <div className="toolbar-item" onMouseUp={() => openFile(props.loadAnimation)}>
            <div className="toolbar-item-icon toolbar-item-icon__available">
                <icons.Open />
            </div>
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-item" onMouseUp={props.isPlaying ? props.animate.length > 0 && props.pauseAnimation : props.animate.length > 0 && props.playAnimation}>
            <div className={`toolbar-item-icon ${props.animate.length > 0 ? 'toolbar-item-icon__available' : ''}`}>
                {props.isPlaying ? <icons.Pause /> : <icons.Play />}
            </div>
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
