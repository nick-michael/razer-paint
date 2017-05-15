import React from 'react';

import { SketchPicker } from 'react-color';
import Pixel from './Pixel';
import Canvas from './Canvas'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { 
      brushCol: '#fff'
    }
  }

  handleColorPicker(color) {
    this.setState({ brushCol: color.hex });
  }

  render() {
    return (
      <div className="surface" style={{ display: 'flex' }}>
        <Canvas brushCol={this.state.brushCol} />
        <SketchPicker color={this.state.brushCol} onChangeComplete={(color) => this.handleColorPicker(color)} />
      </div>
    )
  }
}
