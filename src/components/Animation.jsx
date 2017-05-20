import React from 'react';
import PropTypes from 'prop-types';
import { frameToPicture, CANVAS_WIDTH, CANVAS_HEIGHT } from '../utils/frame';

const PIXEL_SIZE = 5;

class Animate extends React.Component {

    componentDidUpdate() {
        for (let frameCount = 0; frameCount < this.props.frames.length; frameCount += 1) {
            const drawingCanvas = this[`animate-frame-${frameCount}`];
            const context = drawingCanvas.getContext('2d');
            const picture = frameToPicture(this.props.frames[frameCount]);
            for (let i = 0; i < picture.length; i += 1) {
                const col = picture[i];
                for (let j = 0; j < col.length; j += 1) {
                    context.fillStyle = col[j];
                    context.fillRect(j * PIXEL_SIZE, i * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
                }
            }
        }
    }

    createFrames() {
        return this.props.frames.map((frame, index) => (
            <div style={{ margin: '4px 0 4px 4px' }}>
                <canvas ref={(c) => { this[`animate-frame-${index}`] = c; }} id={`animate-frame-${index}`} width={CANVAS_WIDTH * PIXEL_SIZE} height={CANVAS_HEIGHT * PIXEL_SIZE} />
                <div style={{ textAlign: 'center', color: '#FFF' }}>
                    {index + 1}
                </div>
            </div>
            ));
    }

    render() {
        return (
            <div className="frames" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '15px', height: '140px', border: '2px solid #3a3a3d', overflowY: 'scroll' }}>
                {this.createFrames()}
            </div>
        );
    }
}

Animate.propTypes = {
    frames: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Animate;
