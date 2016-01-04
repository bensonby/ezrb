import _ from 'lodash';
import {FACE} from '../../constants/Cube';
import {
  filterCubes,
  oppositeFace,
  getBaseColorFace,
  topLayerMovesFromTo,
  rotateCubeHorizontallyFromTo,
  findCenterFaceOfColor,
  horizontalFaceDifference,
} from '../cube';

function _findMiddleEdgePair(cubes) {
  const topColor = _.values(filterCubes(cubes, {
    'type': 'center',
    'faceFilter': [
      {
        [FACE.U]: {},
      },
    ],
  }).matchedCubes[0].faceColors)[0];

  const {'matchedCubes': topEdgesForMiddle} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.U]: {},
      },
    ],
    'colorFilter': {
      [topColor]: false,
    },
  });

  if (topEdgesForMiddle.length !== 0) {
    const toMove = topEdgesForMiddle[0];
    const colors = _.values(toMove.faceColors);
    const {'matchedCubes': targetCube} = filterCubes(cubes, {
      'type': 'edge',
      'colorFilter': {
        [colors[0]]: true,
        [colors[1]]: true,
      },
    });
    return {'hasSuitableCube': true, toMove, 'target': targetCube[0]};
  }
  const {'matchedCubes': topEdges} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.U]: {},
      },
    ],
  });
  const {'matchedCubes': wrongEdges} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.U]: {'notExisted': true},
        [FACE.D]: {'notExisted': true},
      },
    ],
    'correct': false,
  });
  return {'hasSuitableCube': false, 'toMove': topEdges[0], 'target': wrongEdges[0]};
}

export function solveMiddleEdges(cubes, baseColor) {
  /* check if solved */
  const baseColorFace = getBaseColorFace(cubes, baseColor);
  const {'matchedCubes': correctMiddleEdgeCubes} = filterCubes(cubes, {
    'type': 'edge',
    'faceFilter': [
      {
        [baseColorFace]: {'notExisted': true},
        [oppositeFace(baseColorFace)]: {'notExisted': true},
      },
    ],
    'correct': true,
  });
  if (correctMiddleEdgeCubes.length >= 3) {
    return false;
  }

  if (baseColorFace !== FACE.D) {
    const movesMap = {
      [FACE.U]: ['n', 'n'],
      [FACE.L]: ['x', '6'],
      [FACE.R]: [',', '6'],
      [FACE.F]: ['6'],
      [FACE.B]: ['n'],
    };
    return movesMap[baseColorFace];
  }

  const {hasSuitableCube, toMove, target} = _findMiddleEdgePair(cubes);

  const moves = [];
  let targetFace;

  if (hasSuitableCube) {
    const nonUpFace = _.without(_.keys(toMove.faceColors), FACE.U)[0];
    const nonUpColor = toMove.faceColors[nonUpFace];
    const upColor = toMove.faceColors[FACE.U];
    const targetCenterCube = filterCubes(cubes, {
      'type': 'center',
      'colorFilter': {
        [nonUpColor]: true,
      },
    }).matchedCubes[0];
    targetFace = _.keys(targetCenterCube.faceColors)[0];
    moves.push(...topLayerMovesFromTo(nonUpFace, targetFace));
    moves.push(...rotateCubeHorizontallyFromTo(targetFace, FACE.F));
    const upColorCenterFace = findCenterFaceOfColor(cubes, upColor);
    const nonUpColorCenterFace = findCenterFaceOfColor(cubes, nonUpColor);
    const side = horizontalFaceDifference(upColorCenterFace, nonUpColorCenterFace) === 1 ? 'left' : 'right';
    if (side === 'left') {
      moves.push('x', 'U', 'R', 'u', 'r');
    } else {
      moves.push(',', 'u', 'l', 'U', 'L');
    }
  } else {
    const nonUpFace = _.without(_.keys(toMove.faceColors), FACE.U)[0];
    targetFace = horizontalFaceDifference(_.keys(target.faceColors)[0], _.keys(target.faceColors)[1]) === 1 ? _.keys(target.faceColors)[1] : _.keys(target.faceColors)[0];

    moves.push(...topLayerMovesFromTo(nonUpFace, targetFace));
    moves.push(...rotateCubeHorizontallyFromTo(targetFace, FACE.F));
    moves.push('x', 'U', 'R', 'u', 'r');
  }

  return moves;
}
