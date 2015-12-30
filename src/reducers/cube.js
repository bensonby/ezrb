import _ from 'lodash';
import {CUBE} from '../constants/ActionTypes';

const defaultState = {
  'initialMoves': [],
  'moves': [],
};

export default function(state = defaultState, action) {
  switch (action.type) {
  case CUBE.ADD_MOVE:
    return _.assign({}, state, {'moves': [...state.moves, action.move]});
  case CUBE.RESET:
    return _.assign({}, state, {
      'initialMoves': [],
      'moves': [],
    });
  case CUBE.SET_INITIAL_MOVES:
    return _.assign({}, state, {
      'initialMoves': action.initialMoves,
      'moves': [],
    });
  default:
    return state;
  }
}
