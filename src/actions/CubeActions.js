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

export function setInitialMoves(initialMoves) {
  return {
    'type': CUBE.SET_INITIAL_MOVES,
    'initialMoves': initialMoves,
  };
}

export function solve() {
  return {
    'type': CUBE.SOLVE,
  }
}
