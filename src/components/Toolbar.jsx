import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons/icons';
import { BRUSH, PICKER, ERASER, FILL } from '../constants/tools';

import { saveFile, openFile } from '../utils/fileStytem';

const getEditClassName = (isSelected, isEditing) => {
    if (!isSelected) {
        return '';
    } else if (isEditing) {
        return 'toolbar-item-icon__selected';
    }
    return 'toolbar-item-icon__available';
};

const Toolbar = props => (
    <div>
        <div className={`toolbar ${props.isPlaying ? 'toolbar-disabled-playing' : ''}`} style={{ marginBottom: '4px' }}>
            <div className="toolbar-item" onClick={() => props.selectTool(BRUSH)}>
                <div className="tooltip">Brush</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${props.tool === BRUSH ? 'selected' : 'available'}`}>
                    <icons.Brush />
                </div>
            </div>
            <div className="toolbar-item" onClick={() => props.selectTool(PICKER)}>
                <div className="tooltip">Color Picker</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${props.tool === PICKER ? 'selected' : 'available'}`}>
                    <icons.Eyedropper />
                </div>
            </div>
            <div className="toolbar-item" onClick={() => props.selectTool(ERASER)}>
                <div className="tooltip">Eraser</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${props.tool === ERASER ? 'selected' : 'available'}`}>
                    <icons.Eraser />
                </div>
            </div>
            <div className="toolbar-item" onClick={() => props.selectTool(FILL)}>
                <div className="tooltip">Fill Tool</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${props.tool === FILL ? 'selected' : 'available'}`}>
                    <icons.Bucket />
                </div>
            </div>
            <div className="toolbar-spacer" />
            <div className="toolbar-item toolbar-item-can-disable" onClick={() => props.canUndo && props.undo()}>
                <div className="tooltip">Undo</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${props.canUndo ? 'available' : ''}`}>
                    <icons.Undo />
                </div>
            </div>
            <div className="toolbar-item toolbar-item-can-disable" onClick={() => props.canRedo && props.redo()}>
                <div className="tooltip">Redo</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${props.canRedo ? 'available' : ''}`}>
                    <icons.Redo />
                </div>
            </div>
            <div className="toolbar-spacer" />
            <div className="toolbar-item toolbar-item-can-disable" onClick={() => typeof props.selectedFrame === 'number' && props.copy()}>
                <div className="tooltip">Copy</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${typeof props.selectedFrame === 'number' ? 'available' : ''}`}>
                    <icons.Copy />
                </div>
            </div>
            <div className="toolbar-item toolbar-item-can-disable" onClick={() => typeof props.selectedFrame === 'number' && props.clipboard && props.paste()}>
                <div className="tooltip">Paste</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${props.clipboard ? 'available' : ''}`}>
                    <icons.Paste />
                </div>
            </div>
        </div>
        <div className={`toolbar ${props.isPlaying ? 'toolbar-disabled-playing' : ''}`}>
            <div className="toolbar-item toolbar-item-can-disable" onClick={props.capture}>
                <div className="tooltip">Caputre Frame</div>
                <div className="toolbar-item-icon toolbar-item-icon__available">
                    <icons.Capture />
                </div>
            </div>
            <div className="toolbar-item" onClick={typeof props.selectedFrame === 'number' && props.toggleEditing}>
                <div className="tooltip">Edit Frame</div>
                <div className={`toolbar-item-icon ${getEditClassName(typeof props.selectedFrame === 'number', props.isEditing)}`}>
                    <icons.Edit />
                </div>
            </div>
            <div className="toolbar-item toolbar-item-can-disable" onClick={typeof props.selectedFrame === 'number' && props.insertFrame}>
                <div className="tooltip">Insert Frame</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${typeof props.selectedFrame === 'number' ? 'available' : ''}`}>
                    <icons.Insert />
                </div>
            </div>
            <div className="toolbar-item toolbar-item-can-disable" onClick={typeof props.selectedFrame === 'number' && props.deleteFrame}>
                <div className="tooltip">Delete Frame</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${typeof props.selectedFrame === 'number' ? 'available' : ''}`}>
                    <icons.Trashcan />
                </div>
            </div>
            <div className="toolbar-spacer" />
            <div className="toolbar-item" onClick={() => saveFile(props.saveState)}>
                <div className="tooltip">Save Animation</div>
                <div className="toolbar-item-icon toolbar-item-icon__available">
                    <icons.Save />
                </div>
            </div>
            <div className="toolbar-item" onClick={() => openFile(props.loadAnimation)}>
                <div className="tooltip">Open Animation</div>
                <div className="toolbar-item-icon toolbar-item-icon__available">
                    <icons.Open />
                </div>
            </div>
            <div className="toolbar-spacer" />
            <div className="toolbar-item" onClick={props.isPlaying ? props.animate.length > 0 && props.pauseAnimation : props.animate.length > 0 && props.playAnimation}>
                <div className="tooltip">{ props.isPlaying ? 'Pause' : 'Play' }</div>
                <div className={`toolbar-item-icon ${props.animate.length > 0 ? 'toolbar-item-icon__available' : ''}`}>
                    {props.isPlaying ? <icons.Pause /> : <icons.Play />}
                </div>
            </div>
            <div className="toolbar-item" onClick={props.toggleReverse}>
                <div className="tooltip">Reverse Animation</div>
                <div className={`toolbar-item-icon toolbar-item-icon__${props.isReversed ? 'selected' : 'available'}`}>
                    <icons.Rewind />
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
                  onMouseUp={props.updateFps}
                  onChange={e => props.setFps(e.target.value)}
                />
            </div>
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
    toggleEditing: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    insertFrame: PropTypes.func.isRequired,
    deleteFrame: PropTypes.func.isRequired,
    saveState: PropTypes.func.isRequired,
    loadAnimation: PropTypes.func.isRequired,
    playAnimation: PropTypes.func.isRequired,
    pauseAnimation: PropTypes.func.isRequired,
    toggleReverse: PropTypes.func.isRequired,
    isReversed: PropTypes.bool.isRequired,
};

export default Toolbar;
