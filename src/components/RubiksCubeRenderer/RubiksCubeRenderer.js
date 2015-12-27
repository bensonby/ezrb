require('normalize.css');

import React, { Component } from 'react';

import RubiksCube from './RubiksCube';

export default class WebGLRenderer extends Component {
    _updateWebglState() {
        this.rubiksCube.updateState(this.props);
    }

    render() {
        this.rubiksCube = this.rubiksCube || new RubiksCube();
        this._updateWebglState();
        return (<div></div>);
    }
}
