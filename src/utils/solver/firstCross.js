import _ from 'lodash';
import {FACE} from '../../constants/Cube';
import {
  processMove,
  findCenterCube,
  filterCubes,
  oppositeMove,
  getBaseColorFace,
  topLayerMovesFromTo,
} from '../cube';

function _isSolvedFirstCross(cubes, baseColorFace) {
  const {'matchedCubes': correctFirstCrossCubes} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [baseColorFace]: {},
      },
    ],
    'correct': true,
  });
  return correctFirstCrossCubes.length === 4;
}

export function solveFirstCross(cubes, baseColor) {
  /* check if first cross solved */
  const baseColorFace = getBaseColorFace(cubes, baseColor);
  if (_isSolvedFirstCross(cubes, baseColorFace)) {
    return false;
  }

  const topCenter = findCenterCube(cubes, [FACE.U]);
  const topCenterColor = topCenter.faceColors[FACE.U];

  const {'matchedCubes': topEdges} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.U]: {'color': [topCenterColor]},
      },
    ],
  });

  if (topEdges.length > 0) {
    const moves = _movesForBestFirstCrossAlignment(cubes);
    if (!_.isEmpty(moves[0])) {
      return moves[0];
    }
  }

  const {'matchedCubes': middleEdges} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.U]: {'notExisted': true},
        [FACE.D]: {'notExisted': true},
      },
    ],
    'colorFilter': {
      [topCenterColor]: true,
    },
  });

  if (middleEdges.length > 0) {
    const moves = [];
    const face = _.findKey(middleEdges[0].faceColors, (color) => (color === topCenterColor));
    const otherColor = _.without(_.values(middleEdges[0].faceColors), topCenterColor)[0];
    const rotateCubeMap = {[FACE.F]: [], [FACE.R]: [','], [FACE.B]: [',', ','], [FACE.L]: ['x']};
    moves.push(...rotateCubeMap[face]);
    let tmpCubes = cubes.slice();
    for (let move of moves) {
      tmpCubes = processMove(tmpCubes, move);
    }
    const {'matchedCubes': targetCube} = filterCubes(tmpCubes, {
      'type': 'edge',
      'colorFilter': {
        [topCenterColor]: true,
        [otherColor]: true,
      },
    });
    const otherFaceOfEdge = _.findKey(targetCube[0].faceColors, (color) => (color !== topCenterColor));
    const {'matchedCubes': otherCenter} = filterCubes(tmpCubes, {
      'type': 'center',
      'colorFilter': {
        [otherColor]: true,
      },
    }) ;
    const targetFaceOfEdge = _.findKey(otherCenter[0].faceColors, () => true);
    const topLayerMoves = topLayerMovesFromTo(targetFaceOfEdge, otherFaceOfEdge);
    moves.push(...topLayerMoves);
    moves.push(otherFaceOfEdge === FACE.L ? 'l' : 'R');
    moves.push(...topLayerMoves.map(oppositeMove));
    return moves;
  }

  const {'matchedCubes': bottomEdges} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.D]: {},
      },
    ],
    'colorFilter': {
      [topCenterColor]: true,
    },
  });

  if (bottomEdges.length > 0) {
    const moves = [];
    let nonDownFace = _.without(_.keys(bottomEdges[0].faceColors), FACE.D);
    const rotateCubeMap = {[FACE.F]: ['d'], [FACE.R]: [], [FACE.B]: ['d'], [FACE.L]: []};
    const newNonDownFaceMap = {[FACE.F]: FACE.L, [FACE.R]: FACE.R, [FACE.B]: FACE.R, [FACE.L]: FACE.L};
    moves.push(...rotateCubeMap[nonDownFace]);
    nonDownFace = newNonDownFaceMap[nonDownFace];

    let tmpCubes = cubes.slice();
    for (let move of moves) {
      tmpCubes = processMove(tmpCubes, move);
    }
    const {'matchedCubes': availableTopCubes} = filterCubes(tmpCubes, {
      'type': 'edge',
      'faceFilter': [
        {
          [FACE.U]: {},
        },
      ],
      'correct': false,
    });
    const availableFace = _.without(_.keys(availableTopCubes[0].faceColors), FACE.U)[0];
    const topLayerMoves = topLayerMovesFromTo(availableFace, nonDownFace);
    moves.push(...topLayerMoves);
    moves.push(nonDownFace === FACE.L ? 'l' : 'R');
    moves.push(...topLayerMoves.map(oppositeMove));
    return moves;
  }

  const {'matchedCubes': topWrongEdges} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.U]: {},
      },
    ],
    'colorFilter': {
      [topCenterColor]: true,
    },
    'correct': false,
  });

  if (topWrongEdges.length > 0) {
    const moves = [];
    let nonUpFace = _.without(_.keys(topWrongEdges[0].faceColors), FACE.U)[0];
    const rotateCubeMap = {[FACE.F]: ['U'], [FACE.R]: [], [FACE.B]: ['U'], [FACE.L]: []};
    const newNonUpFaceMap = {[FACE.F]: FACE.L, [FACE.R]: FACE.R, [FACE.B]: FACE.R, [FACE.L]: FACE.L};
    const tmpTopLayerMoves = rotateCubeMap[nonUpFace];
    moves.push(...tmpTopLayerMoves);
    nonUpFace = newNonUpFaceMap[nonUpFace];
    moves.push(nonUpFace === FACE.L ? 'L' : 'r');
    moves.push(...tmpTopLayerMoves.map(oppositeMove));
    return moves;
  }

  return [];
}

function _movesForBestFirstCrossAlignment(cubes) {
  const moveOptions = [[], ['U'], ['u'], ['U', 'U']];
  const correctCountsOfOptions = moveOptions.map(function(moves) {
    let tmpCubes = cubes.slice();
    for (let move of moves) {
      tmpCubes = processMove(tmpCubes, move);
    }
    const {matchedCubes} = filterCubes(tmpCubes, {
      'type': 'edge',
      'faceFilter': [
        {
          [FACE.U]: {},
        },
      ],
      'correct': true,
    });
    return matchedCubes.length;
  });
  const maxCorrectCount = Math.max(...correctCountsOfOptions);
  const bestMoves = [];
  for (let i = 0; i < moveOptions.length; i++) {
    if (correctCountsOfOptions[i] === maxCorrectCount) {
      bestMoves.push(moveOptions[i]);
    }
  }
  return bestMoves;
}
