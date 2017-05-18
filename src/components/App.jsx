import React from 'react';

import { SketchPicker } from 'react-color';
import Canvas from './Canvas';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            brushCol: '#fff',
            erase: false,
        };
    }

    handleColorPicker(color) {
        this.setState({ brushCol: color.hex });
    }

    render() {
        return (
          <div className="surface" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Canvas brushCol={this.state.erase ? '#000' : this.state.brushCol} updateColor={color => this.setState({ brushCol: color })} erase={flag => this.setState({ erase: flag })} />
            <div style={{ marginLeft: '5px' }}> <SketchPicker color={this.state.brushCol} onChangeComplete={color => this.handleColorPicker(color)} disableAlpha /> </div>
          </div>
        );
    }
}
