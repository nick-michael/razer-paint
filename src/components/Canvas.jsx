import React from 'react';
import PropTypes from 'prop-types';

import Pixel from './Pixel';
import Toolbar from '../containers/Toolbar';
import { frameToSdk, CANVAS_WIDTH, CANVAS_HEIGHT } from '../utils/frame';
import ChromaSDK from '../utils/chroma';

export default class Canvas extends React.Component {
    componentWillMount() {
        window.addEventListener('mouseup', this.props.handleMouseUp);
        ChromaSDK.init(54235);
    }

    makePixel(count) {
        return (<div className="pixel-container" key={count} onMouseUp={e => this.props.handlePixelMouseUp(e, `${count}`)} onMouseDown={e => this.props.handlePixelMouseDown(e, `${count}`)} onMouseOver={e => this.props.handleMouseOver(e, `${count}`)}><Pixel color={this.props.frame[`${count}`]} /></div>);
    }

    render() {
        ChromaSDK.initialised && ChromaSDK.createKeyboardEffect('CHROMA_CUSTOM', frameToSdk(this.props.frame));

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
    handlePixelMouseUp: PropTypes.func.isRequired,
    handlePixelMouseDown: PropTypes.func.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    setIsPainting: PropTypes.func.isRequired,
};
