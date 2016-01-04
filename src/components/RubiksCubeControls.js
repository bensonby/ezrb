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

import {KEY_TO_CUBE_MOVE} from '../constants/Cube';


class RubiksCubeControl extends Component {
  componentWillMount() {
    document.addEventListener('keyup', this.rotateCubeHandler, false);
  }

  rotateCubeHandler(e) {
    if (e.keyCode in KEY_TO_CUBE_MOVE) {
      this.props.addMove(KEY_TO_CUBE_MOVE[e.keyCode]);
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
      solve,
      moves,
      setTopAsBaseColor,
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <Button bsStyle="danger" onClick={reset}>Reset</Button>
            <Button bsStyle="danger" onClick={this.scramble}>Scramble</Button>
            <Button bsStyle="danger" onClick={setTopAsBaseColor}>Set Top Center as Base Color</Button>
            <Button bsStyle="danger" onClick={solve}>Solve</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            Moves: {moves}
          </Col>
        </Row>
      </div>
    );
  }

  scramble() {
    const {setInitialMoves} = this.props;
    const possibleMoves = _.values(KEY_TO_CUBE_MOVE);
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
