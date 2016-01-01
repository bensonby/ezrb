import _ from 'lodash';
import {CUBE} from '../constants/ActionTypes';
import * as CUBE_CONSTANTS from '../constants/Cube';

const defaultState = {
  'initialMoves': [],
  'moves': [],
  'cubes': CUBE_CONSTANTS.CUBES,
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
  default:
    return state;
  }
}

function processMove(cubes, move) {
  const newCubes = [];
  const {cubeFilter, faceChange} = CUBE_CONSTANTS.MOVE_DEFINITIONS[move];
  for (let cube of cubes) {
    if (!filterMatched(cube, cubeFilter)) {
      newCubes.push(cube);
    } else {
      newCubes.push({
        'type': cube.type,
        'faceColors': _.mapKeys(cube.faceColors, function(color, face) {
          if (!faceChange[face]) return face;
          return faceChange[face];
        }),
      });
    }
  }
  return newCubes;
}

function filterMatched(cube, filter) {
  if (!_.isEmpty(filter.face)) {
    for (let face of filter.face) {
      if (face in cube.faceColors){
        return true;
      }
    }
    return false;
  }
  return true;
}
