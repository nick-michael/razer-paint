import * as os from 'os';
import https from "https";
import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';

import { ChromePicker } from 'react-color';
import Canvas from '../containers/Canvas';
import Animation from './Animation';
import UpdateOverlay from './UpdateOverlay';
import PresetColorPicker from './PresetColorPicker';
import * as icons from '../icons/icons';
import { version } from '../../package.json';

const float = os.platform() === 'darwin' ? 'left' : 'right';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showUpdateOverlay: false };
    }

    componentWillMount() {
        this.checkForUpdates((response) => {
            if (version < response.version) {
                this.setState({ showUpdateOverlay: true });
            }
        });
    }

    checkForUpdates(callback) {
        return https.get({
            host: 'raw.githubusercontent.com',
            path: '/nick-michael/razer-paint/master/package.json'
        }, function(response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                callback(parsed);
            });
        });
    }

    closeUpdateOverlay = () => {
        this.setState({ showUpdateOverlay: false });
    }

    handleMinimize() {
        remote.getCurrentWindow().minimize();
    }

    handleClose() {
        remote.getCurrentWindow().close();
    }

    render() {
        const { brushColor, presetColors, setColor, setLongHexColor, isPlaying, animate, selectAnimationFrame, selectedFrame } = this.props;
        return (
            <div className="page">
                <div className="topBar">
                    <span className="label">Razer Paint</span>
                    <span className="button-container" style={{ float }}>
                        <span className="button button-close" style={{ float }} onClick={this.handleClose}>
                            <div className="button-icon"><icons.Close /></div>
                        </span>
                        <span className="button button-minimize" style={{ float }} onClick={this.handleMinimize}>
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
        )
    }

};

App.propTypes = {
    brushColor: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
    animate: PropTypes.arrayOf(PropTypes.object).isRequired,
    presetColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectAnimationFrame: PropTypes.func.isRequired,
    setLongHexColor: PropTypes.func.isRequired,
    selectedFrame: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

// export default App;
