import React from 'react';
import PropTypes from 'prop-types';

import Pixel from './Pixel';
import Toolbar from '../containers/Toolbar';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../utils/frame';
import ChromaSDK from '../utils/chroma';

export default class Canvas extends React.Component {
    componentDidMount() {
        window.addEventListener('mouseup', () => this.props.handleMouseUp());
        ChromaSDK.init(54235);
    }

    setKeys() {
        if (!ChromaSDK.initialised) return;
        let count = 0;
        for (let i = 0; i < CANVAS_HEIGHT; i += 1) {
            for (let j = 0; j < CANVAS_WIDTH; j += 1) {
                let color = this.props.frame[`${count}`].replace('#', '');
                color = color.length === 3 ? `${color}${color}` : `${color}`;
                color = `0x${color.substring(4, 6)}${color.substring(2, 4)}${color.substring(0, 2)}`;
                color = parseInt(color, 16);
                ChromaSDK.keyboard.customKey.color[i][j] = color || 0;
                count += 1;
            }
            // Set frame
        }
        ChromaSDK.createKeyboardEffect('CHROMA_CUSTOM_KEY', ChromaSDK.keyboard.customKey);
    }

    makePixel(count) {
        return (<div key={count} onMouseDown={() => this.props.handlePixelClick(`${count}`)} onMouseOver={() => this.props.handleMouseOver(`${count}`)}><Pixel color={this.props.frame[`${count}`]} /></div>);
    }

    render() {
        const pixels = [];
        let count = 0;
        for (let i = 0; i < CANVAS_HEIGHT; i += 1) {
            const row = [];
            for (let j = 0; j < CANVAS_WIDTH; j += 1) {
                row.push(this.makePixel(count));
                count += 1;
            }
            pixels.push(<div key={i} className={`row row-${i}`}>{row}</div>);
        }

        this.setKeys();

        return (
            <div>
                <div className="canvas" onMouseDown={() => this.props.setIsPainting(true)}>
                    {pixels}
                </div>
                <Toolbar />
            </div>
        );
    }
}

Canvas.propTypes = {
    frame: PropTypes.objectOf(PropTypes.string).isRequired,
    handlePixelClick: PropTypes.func.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    setIsPainting: PropTypes.func.isRequired,
};
