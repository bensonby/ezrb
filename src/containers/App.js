/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CubeActions from '../actions/CubeActions';

import {
  Grid,
} from 'react-bootstrap/lib/';

import RubikCubePanel from '../components/RubikCubePanel';
import RubiksCubeControls from '../components/RubiksCubeControls';

/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {
      cube,
      'actions': {
        'cube': {
          addMove,
          reset,
          setInitialMoves,
        },
      },
    } = this.props;

    return (
      <Grid>
        <RubiksCubeControls
          addMove={addMove}
          reset={reset}
          setInitialMoves={setInitialMoves} />
        <RubikCubePanel cube={cube} />
      </Grid>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    'cube': state.cube,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */

  const actionMap = {
    'actions': {
      'cube': bindActionCreators(CubeActions, dispatch),
    },
  };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
