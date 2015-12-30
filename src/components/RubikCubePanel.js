require('normalize.css');
require('styles/App.css');

import React from 'react';

import RubiksCubeRenderer from './RubiksCubeRenderer/RubiksCubeRenderer';

import {keyToCubeMove} from '../constants/ControlKeys';

class RubikCubePanel extends React.Component {
  componentWillMount() {
    document.addEventListener('keyup', this.rotateCubeHandler, false);
  }

  rotateCubeHandler(e) {
    if (e.keyCode in keyToCubeMove) {
      this.props.addMove(keyToCubeMove[e.keyCode]);
    }
  }

  constructor(props) {
    super(props);
    this.rotateCubeHandler = this.rotateCubeHandler.bind(this);
  }

  render() {
    const {
      cube,
    } = this.props;

    return (
      <RubiksCubeRenderer cube={cube}>
      </RubiksCubeRenderer>
    );
  }
}

export default RubikCubePanel;
