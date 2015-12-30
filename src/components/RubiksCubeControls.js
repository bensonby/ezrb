require('normalize.css');
require('styles/App.css');

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Row,
  Col,
  Button,
} from 'react-bootstrap/lib/';

class RubiksCubeControl extends Component {
  render() {
    const {
      reset,
    } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <Button bsStyle="danger" onClick={reset}>Reset</Button>
        </Col>
      </Row>
    );
  }
}

RubiksCubeControl.propTypes = {
  'reset': PropTypes.func.isRequired,
};

export default RubiksCubeControl;
