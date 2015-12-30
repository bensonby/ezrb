import {CUBE} from '../constants/ActionTypes';

export function addMove(move) {
  return {
    'type': CUBE.ADD_MOVE,
    'move': move,
  };
}

export function reset() {
  return {
    'type': CUBE.RESET,
  };
}
