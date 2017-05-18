import React from 'react';
import PropTypes from 'prop-types';

import Pixel from './Pixel';
import Toolbar from './Toolbar';

import { BRUSH, PICKER, ERASER } from '../constants/tools';

const WIDTH = 25;
const HEIGHT = 6;

export default class Canvas extends React.Component {
    constructor() {
        super();
        this.isPainting = false;
    }

    componentDidMount() {
        window.addEventListener('mouseup', () => this.handleMouseUp());
    }

    setIsPainting(flag) {
        this.isPainting = flag;
    }

    handleMouseUp() {
        if (this.isPainting) {
            this.setIsPainting(false);
            this.props.keyframe();
        }
    }

    toolClickMap = {
        [BRUSH]: pixel => this.paintPixel(pixel),
        [ERASER]: pixel => this.paintPixel(pixel),
        [PICKER]: pixel => this.pickPixel(pixel),
    };

    paintPixel(pixel) {
        this.setIsPainting(true);
        const newFrame = Object.assign({}, this.props.frame);
        newFrame[`${pixel}`] = this.props.tool === ERASER ? '#000' : this.props.brushColor;
        this.props.paintFrame(newFrame);
    }

    pickPixel(pixel) {
        this.props.setColor(this.props.frame[pixel]);
        this.props.selectTool(BRUSH);
    }

    handleMouseOver(pixel) {
        if (this.isPainting) {
            const newFrame = Object.assign({}, this.props.frame);
            newFrame[`${pixel}`] = this.props.tool === ERASER ? '#000' : this.props.brushColor;
            this.props.paintFrame(newFrame);
        }
    }

    makePixel(count) {
        return (<div key={count} onMouseDown={() => this.toolClickMap[this.props.tool] && this.toolClickMap[this.props.tool](`${count}`)} onMouseOver={() => this.handleMouseOver(`${count}`)}><Pixel color={this.props.frame[`${count}`]} /></div>);
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
                  frames={this.props.frames}
                  redoFrames={this.props.redoFrames}
                  tool={this.props.tool}
                  undo={() => (this.props.frames.length > 1) && this.props.undo()}
                  redo={() => (this.props.redoFrames.length > 0) && this.props.redo()}
                  selectTool={this.props.selectTool}
                />
            </div>
        );
    }
}

Canvas.propTypes = {
    brushColor: PropTypes.string.isRequired,
    tool: PropTypes.string.isRequired,
    frame: PropTypes.objectOf(PropTypes.string).isRequired,
    frames: PropTypes.arrayOf(PropTypes.object).isRequired,
    redoFrames: PropTypes.arrayOf(PropTypes.object).isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    paintFrame: PropTypes.func.isRequired,
    keyframe: PropTypes.func.isRequired,
    setColor: PropTypes.func.isRequired,
    selectTool: PropTypes.func.isRequired,
};
