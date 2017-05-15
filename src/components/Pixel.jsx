import React from 'react';
const pixelSize = '25px';
export default class Pixel extends React.Component {
  render() {
    return <div style={{ height: pixelSize, width: pixelSize, backgroundColor: this.props.color || '#10101D' }}/>
  }
};
