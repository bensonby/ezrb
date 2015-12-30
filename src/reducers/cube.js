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
  default:
    return state;
  }
}
