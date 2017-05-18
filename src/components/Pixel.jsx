import React from 'react';

const pixelSize = '25px';

const Pixel = props => (<div style={{ height: pixelSize, width: pixelSize, border: '1px solid #202022', backgroundColor: props.color }} />);

Pixel.defaultProps = {
    color: '#000',
};

Pixel.propTypes = {
    color: React.PropTypes.string,
};

export default Pixel;
