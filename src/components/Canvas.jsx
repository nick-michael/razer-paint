import React from 'react';
import FontAwesome from 'react-fontawesome';
import Pixel from './Pixel';

const WIDTH = 25;
const HEIGHT = 6;

const BRUSH = 'BRUSH';
const PICKER = 'PICKER';
const ERASER = 'ERASER';
// const SELECT = 'SELECT';

export default class Canvas extends React.Component {
    constructor() {
        super();
        const frame = {};
        for (let i = 0; i < WIDTH * HEIGHT; i += 1) {
            frame[`${i}`] = '#000';
        }
        this.isPainting = false;
        this.state = {
            frame,
            frames: [frame],
            redoFrames: [],
            tool: BRUSH,
            isPainting: false,
        };
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
            this.setState({ frames: this.state.frames.concat([this.state.frame]) });
        }
    }

    undo() {
        const { frame, frames, redoFrames } = this.state;
        if (frames.length > 1) {
            this.setState({
                frame: frames.slice(-2)[0],
                frames: frames.slice(0, frames.length - 1),
                redoFrames: redoFrames.concat(frame),
            });
        }
    }

    redo() {
        const { frames, redoFrames } = this.state;
        if (redoFrames.length > 0) {
            const newFrame = redoFrames.slice(-1)[0];
            this.setState({
                frame: newFrame,
                frames: frames.concat(newFrame),
                redoFrames: redoFrames.slice(0, -1),
            });
        }
    }

    handleClick(pixel) {
        this.toolClickMap[this.state.tool](pixel);
    }

    toolClickMap = {
        [BRUSH]: pixel => this.paintPixel(pixel),
        [ERASER]: pixel => this.paintPixel(pixel),
        [PICKER]: pixel => this.pickPixel(pixel),
    };

    paintPixel(pixel) {
        this.setIsPainting(true);
        const frame = this.state.frame;
        const newFrame = Object.assign({}, frame);
        newFrame[`${pixel}`] = this.props.brushCol;
        this.setState({ frame: newFrame, redoFrames: [] });
    }

    pickPixel(pixel) {
        this.props.updateColor(this.state.frame[pixel]);
        this.selectTool(BRUSH);
    }

    selectTool(tool) {
        this.setState({ tool });
        this.props.erase(tool === ERASER);
    }

    handleMouseOver(pixel) {
        if (this.isPainting) {
            const frame = this.state.frame;
            const newFrame = Object.assign({}, frame);
            newFrame[`${pixel}`] = this.props.brushCol;
            this.setState({ frame: newFrame });
        }
    }

    makePixel(count) {
        return (<div key={count} onMouseDown={() => this.handleClick(`${count}`)} onMouseOver={() => this.handleMouseOver(`${count}`)}><Pixel color={this.state.frame[`${count}`]} /></div>);
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
            <div className="toolbar" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#3A3A3D', borderRadius: '4px', padding: '4px 0px 4px 4px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44px', width: '44px', backgroundColor: '#202022', borderRadius: '4px', marginRight: '4px' }} onMouseUp={() => this.undo()}>
                <FontAwesome style={{ color: this.state.frames.length > 1 ? '#EAEAED' : '#555559' }} size="2x" name="undo" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44px', width: '44px', backgroundColor: '#202022', borderRadius: '4px', marginRight: '4px' }} onMouseUp={() => this.redo()}>
                <FontAwesome style={{ color: this.state.redoFrames.length > 0 ? '#EAEAED' : '#555559' }} size="2x" name="repeat" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44px', width: '44px', backgroundColor: '#202022', borderRadius: '4px', marginRight: '4px' }} onMouseUp={() => this.selectTool(BRUSH)}>
                <FontAwesome style={{ color: this.state.tool === BRUSH ? '#EAEAED' : '#555559' }} size="2x" name="paint-brush" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44px', width: '44px', backgroundColor: '#202022', borderRadius: '4px', marginRight: '4px' }} onMouseUp={() => this.selectTool(PICKER)}>
                <FontAwesome style={{ color: this.state.tool === PICKER ? '#EAEAED' : '#555559' }} size="2x" name="eyedropper" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44px', width: '44px', backgroundColor: '#202022', borderRadius: '4px', marginRight: '4px' }} onMouseUp={() => this.selectTool(ERASER)}>
                <FontAwesome style={{ color: this.state.tool === ERASER ? '#EAEAED' : '#555559' }} size="2x" name="eraser" />
              </div>
            </div>
          </div>
        );
    }
}

Canvas.propTypes = {
    brushCol: React.PropTypes.string.isRequired,
    updateColor: React.PropTypes.func.isRequired,
    erase: React.PropTypes.func.isRequired,
};
