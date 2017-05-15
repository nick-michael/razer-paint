import React from 'react';
import Pixel from './Pixel';

const WIDTH = 30;
const HEIGHT = 7;

export default class Canvas extends React.Component {
    constructor() {
        super();
        const frame = {};
        for (var i = 0; i < WIDTH * HEIGHT; i++) {
            frame[`${i}`] = '#000'
        }
        this.state = { 
            frame,
            frames: [frame],
            isPainting: false
        }
    }

    componentDidMount() {
        window.addEventListener('mouseup', () => this.setIsPainting(false));
    }
    
    setIsPainting(flag) {
        this.setState({ isPainting: flag });
    }

    handleClick(pixel) {
        const frame = this.state.frame;
        const newFrame = Object.assign({}, frame);
        newFrame[`${pixel}`] = this.props.brushCol;
        this.setState({ frame: newFrame });
    }

    handleMouseOver(pixel) {
        if (!this.state.isPainting) {
            return
        } else {
            const frame = this.state.frame;
            const newFrame = Object.assign({}, frame);
            newFrame[`${pixel}`] = this.props.brushCol;
        this.setState({ frame: newFrame });
        }
    }

    makePixel(count) {
        return(<div onMouseDown={() => this.handleClick(`${count}`)} onMouseOver={() => this.handleMouseOver(`${count}`)}><Pixel key={count} ref={count} color={this.state.frame[`${count}`]} /></div>);
    }

    render() {
        const pixels = [];
        let count = 0;
        for (var i = 0; i < HEIGHT; i++) {
            const row = [];
            for (var j = 0; j <WIDTH; j++) {
                row.push(this.makePixel(count));
                count++;
            }
            pixels.push(<div className={"row"} style={{ display: 'flex' }}>{row}</div>);
        }

        return (
            <div className="canvas" style={{ display: 'inline-block', WebkitUserSelect: 'none', cursor: 'cell' }} onMouseDown={() => this.setIsPainting(true)} onMouseUp={ () => this.setIsPainting(false)}>
                {pixels}
            </div>
        )
    }
};