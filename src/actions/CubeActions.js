import {CUBE} from '../constants/ActionTypes';

export function addMove(move) {
  return {
    'type': CUBE.ADD_MOVE,
    'move': move,
  };
}
