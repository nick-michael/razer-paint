import React from 'react';
import PropTypes from 'prop-types';

import Pixel from './Pixel';
import Toolbar from '../containers/Toolbar';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../utils/frame';

export default class Canvas extends React.Component {
    componentDidMount() {
        window.addEventListener('mouseup', () => this.props.handleMouseUp());
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
};
