import React from 'react';
import PropTypes from 'prop-types';

import Pixel from './Pixel';
import Toolbar from './Toolbar';

import { BRUSH, PICKER, ERASER } from '../constants/tools';

const WIDTH = 25;
const HEIGHT = 6;

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
        for (let i = 0; i < HEIGHT; i += 1) {
            const row = [];
            for (let j = 0; j < WIDTH; j += 1) {
                row.push(this.makePixel(count));
                count += 1;
            }
            pixels.push(<div key={i} className={'row'} style={{ display: 'flex' }}>{row}</div>);
        }

        return (
            <div>
                <div className="canvas" style={{ display: 'inline-block', cursor: 'cell' }}>
                    {pixels}
                </div>
                <Toolbar
                  canUndo={this.props.canUndo}
                  canRedo={this.props.canRedo}
                  tool={this.props.tool}
                  undo={() => this.props.canUndo && this.props.undo()}
                  redo={() => this.props.canRedo && this.props.redo()}
                  selectTool={this.props.selectTool}
                />
            </div>
        );
    }
}

Canvas.propTypes = {
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    frame: PropTypes.objectOf(PropTypes.string).isRequired,
    tool: PropTypes.string.isRequired,
    handlePixelClick: PropTypes.func.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    selectTool: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
};
