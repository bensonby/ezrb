require('normalize.css');

import React, { Component } from 'react';

import RubiksCube from './RubiksCube';

export default class WebGLRenderer extends Component {
  _updateWebglState() {
    this.rubiksCube.updateState(this.props.cube);
  }

  render() {
    const {'cube': cubeState} = this.props;
    this.rubiksCube = this.rubiksCube || new RubiksCube(cubeState);
    this._updateWebglState();
    return (<div></div>);
  }
}
