require('normalize.css');
require('styles/App.css');

import _ from 'lodash';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Row,
  Col,
  Button,
} from 'react-bootstrap/lib/';

import {keyToCubeMove} from '../constants/ControlKeys';


class RubiksCubeControl extends Component {
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
    this.scramble = this.scramble.bind(this);
  }

  render() {
    const {
      reset,
    } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <Button bsStyle="danger" onClick={reset}>Reset</Button>
          <Button bsStyle="danger" onClick={this.scramble}>Scramble</Button>
        </Col>
      </Row>
    );
  }

  scramble() {
    const {setInitialMoves} = this.props;
    const possibleMoves = _.values(keyToCubeMove);
    const randomMoves = [];
    for (let i = 0; i < 100; i++) {
      randomMoves.push(possibleMoves[getRandomInt(0, possibleMoves.length - 1)]);
    }
    setInitialMoves(randomMoves);
  }
}

RubiksCubeControl.propTypes = {
  'reset': PropTypes.func.isRequired,
  'setInitialMoves': PropTypes.func.isRequired,
};

export default RubiksCubeControl;

function getRandomInt(min, max) {  // inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
