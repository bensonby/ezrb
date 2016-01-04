import _ from 'lodash';
import {CUBE} from '../constants/ActionTypes';
import * as CUBE_CONSTANTS from '../constants/Cube';
import {solveFirstCross} from '../utils/solver/firstCross';
import {solveMiddleEdges} from '../utils/solver/middleEdges';
import {processMove} from '../utils/cube';

const defaultState = {
  'initialMoves': [],
  'moves': [],
  'cubes': CUBE_CONSTANTS.CUBES,
  'baseColor': null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
  case CUBE.ADD_MOVE:
    return _.assign({}, state, {
      'moves': [...state.moves, action.move],
      'cubes': processMove(state.cubes, action.move),
    });
  case CUBE.RESET:
    return _.assign({}, state, {
      'baseColor': null,
      'initialMoves': [],
      'moves': [],
      'cubes': CUBE_CONSTANTS.CUBES,
    });
  case CUBE.SET_INITIAL_MOVES:
    let cubes = CUBE_CONSTANTS.CUBES;
    for (let move of action.initialMoves) {
      cubes = processMove(cubes, move);
    }
    return _.assign({}, state, {
      'initialMoves': action.initialMoves,
      'moves': [],
      'cubes': cubes,
    });
  case CUBE.SET_BASE_COLOR:
    return _.assign({}, state, {
      'baseColor': action.color,
    });
  case CUBE.SOLVE:
    if (!state.baseColor) {
      // TODO: error handling
      return state;
    }
    const moves = (
      solveFirstCross(state.cubes, state.baseColor) ||
      solveMiddleEdges(state.cubes, state.baseColor) ||
      []
    );
    let newCube = state.cubes.slice();
    for (let move of moves) {
      newCube = processMove(newCube, move);
    }
    return _.assign({}, state, {
      'moves': [...state.moves, ...moves],
      'cubes': newCube,
    });

  default:
    return state;
  }
}
