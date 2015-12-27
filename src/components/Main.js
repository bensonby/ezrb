require('normalize.css');
require('styles/App.css');

import React from 'react';

import RubiksCubeRenderer from './RubiksCubeRenderer/RubiksCubeRenderer';

class AppComponent extends React.Component {
  render() {
    return (
      <RubiksCubeRenderer {...this.props}>
      </RubiksCubeRenderer>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
