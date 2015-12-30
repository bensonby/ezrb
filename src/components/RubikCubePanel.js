require('normalize.css');
require('styles/App.css');

import React from 'react';

import RubiksCubeRenderer from './RubiksCubeRenderer/RubiksCubeRenderer';

class RubikCubePanel extends React.Component {
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
