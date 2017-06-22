import React from 'react';
import PropTypes from 'prop-types';

import { ChromePicker } from 'react-color';
import Canvas from '../containers/Canvas';
import Animation from './Animation';
import UpdateOverlay from './UpdateOverlay';
import PresetColorPicker from './PresetColorPicker';
import * as icons from '../icons/icons';
import { version } from '../../package.json';
import * as keyCodes from '../constants/keyCodes';
import { keycodeToPixels } from '../utils/frame';
import checkForUpdates from '../utils/update';
import { handleClose, handleMinimize } from '../utils/app';

const { platform } = window.require('os');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showUpdateOverlay: false };
    }

    componentWillMount() {
        checkForUpdates().then((response) => {
            if (version < response.version) {
                this.setState({ showUpdateOverlay: true });
            }
        });
        document.addEventListener('keydown', this.handleKeyPress);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    handleKeyUp = (event) => {
        (event.code === 'CapsLock' || event.code === 'PrintScreen') && this.handleKeyPress(event);
    };

    handleKeyPress = (event) => {
        if (this.props.keyboardOverride) {
            if (!keycodeToPixels()[event.code]) return;
            const newPixels = {};
            for (let index = 0; index < keycodeToPixels()[event.code].length; index += 1) {
                newPixels[keycodeToPixels()[event.code][index]] = this.props.brushColor;
            }
            const newFrame = Object.assign(this.props.frame, newPixels);
            this.props.paintFrame(newFrame);
        } else {
            const eventString = `${event.shiftKey ? 'shift+' : ''}${event.ctrlKey ? 'ctrl+' : ''}${event.altKey ? 'alt+' : ''}${event.keyCode}`;
            this.keyCodeActionMap()[eventString] &&
            this.keyCodeActionMap()[eventString]();
        }
    };

    paste = () => {
        this.props.keyframe();
        this.props.paintFrame(this.props.clipboard);
    }


    keyCodeActionMap = () => ({
        [keyCodes.SPACEBAR]: this.props.toggleIsPlaying,
        [keyCodes.ARROW_LEFT]: !this.props.isPlaying && this.props.previousFrame,
        [keyCodes.ARROW_RIGHT]: !this.props.isPlaying && this.props.nextFrame,
        [`ctrl+${keyCodes.Z}`]: !this.props.isPlaying && this.props.undo,
        [`shift+ctrl+${keyCodes.Z}`]: !this.props.isPlaying && this.props.redo,
        [`ctrl+${keyCodes.C}`]: !this.props.isPlaying && this.props.copy,
        [`ctrl+${keyCodes.V}`]: !this.props.isPlaying && this.paste,
    });

    closeUpdateOverlay = () => {
        this.setState({ showUpdateOverlay: false });
    }

    render() {
        const {
            brushColor,
            presetColors,
            setColor,
            setLongHexColor,
            isPlaying,
            animate,
            selectAnimationFrame,
            selectedFrame,
        } = this.props;

        return (
            <div className="page">
                <div className="topBar">
                    <span className="label">Razer Paint</span>
                    <span className={`button-container ${platform() === 'darwin' ? '' : 'button-container__win'}`}>
                        <span className={`button button-close ${platform() === 'darwin' ? '' : 'button__win button-close__win'}`} onClick={handleClose}>
                            <div className="button-icon"><icons.Close /></div>
                        </span>
                        <span className={`button button-minimize ${platform() === 'darwin' ? '' : 'button__win button-minimize__win'}`} onClick={handleMinimize}>
                            <div className="button-icon"><icons.Minimize /></div>
                        </span>
                    </span>
                </div>
                <div className="surface" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Canvas />
                    <div style={{ marginLeft: '5px', display: 'inline-flex' }}>
                        <ChromePicker
                          color={brushColor}
                          onChangeComplete={colorObject => setLongHexColor(colorObject.hex)}
                          disableAlpha
                        />
                        <PresetColorPicker
                          brushColor={brushColor}
                          presetColors={presetColors}
                          setColor={setColor}
                        />
                    </div>
                </div>
                <Animation
                  isPlaying={isPlaying}
                  frames={animate}
                  selectAnimationFrame={selectAnimationFrame}
                  selectedFrame={selectedFrame}
                />
                {this.state.showUpdateOverlay && <UpdateOverlay close={this.closeUpdateOverlay} />}
            </div>
        );
    }

}

App.propTypes = {
    keyboardOverride: PropTypes.bool.isRequired,
    brushColor: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
    frame: PropTypes.objectOf(PropTypes.string),
    clipboard: PropTypes.objectOf(PropTypes.string),
    animate: PropTypes.arrayOf(PropTypes.object).isRequired,
    presetColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectAnimationFrame: PropTypes.func.isRequired,
    setLongHexColor: PropTypes.func.isRequired,
    paintFrame: PropTypes.func.isRequired,
    keyframe: PropTypes.func.isRequired,
    toggleIsPlaying: PropTypes.func.isRequired,
    nextFrame: PropTypes.func.isRequired,
    previousFrame: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    selectedFrame: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

// export default App;
