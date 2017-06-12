import * as os from 'os';
import https from 'https';
import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import { ChromePicker } from 'react-color';
import Canvas from '../containers/Canvas';
import Animation from './Animation';
import UpdateOverlay from './UpdateOverlay';
import PresetColorPicker from './PresetColorPicker';
import * as icons from '../icons/icons';
import { version } from '../../package.json';
import * as keyCodes from '../constants/keyCodes';

const float = os.platform() === 'darwin' ? 'left' : 'right';

const checkForUpdates = callback => https.get({
    host: 'raw.githubusercontent.com',
    path: '/nick-michael/razer-paint/master/package.json',
}, (response) => {
        // Continuously update stream with data
    let body = '';
    response.on('data', (d) => {
        body += d;
    });
    response.on('end', () => {
            // Data reception is done, do whatever with it!
        const parsed = JSON.parse(body);
        callback(parsed);
    });
});

const handleMinimize = () => {
    remote.getCurrentWindow().minimize();
};

const handleClose = () => {
    remote.getCurrentWindow().close();
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showUpdateOverlay: false };
    }

    componentWillMount() {
        checkForUpdates((response) => {
            if (version < response.version) {
                this.setState({ showUpdateOverlay: true });
            }
        });
        document.addEventListener('keydown', this.handleKeyPress);
    }


    handleKeyPress = (event) => {
        const eventString = `${event.shiftKey ? 'shift+' : ''}${event.ctrlKey ? 'ctrl+' : ''}${event.altKey ? 'alt+' : ''}${event.keyCode}`;
        this.keyCodeActionMap()[eventString] &&
        this.keyCodeActionMap()[eventString]();
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
                    <span className="button-container" style={{ float }}>
                        <span className="button button-close" style={{ float }} onClick={handleClose}>
                            <div className="button-icon"><icons.Close /></div>
                        </span>
                        <span className="button button-minimize" style={{ float }} onClick={handleMinimize}>
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
    brushColor: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
    clipboard: PropTypes.objectOf(PropTypes.string).isRequired,
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
