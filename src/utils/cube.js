import _ from 'lodash';
import * as CUBE_CONSTANTS from '../constants/Cube';
/*
  Example Filters:
  1. any pieces that have both RIGHT and UP faces, where the UP face is either yellow or blue
  {
    'faceFilter': [
      {
        [FACE.R]: {},
        [FACE.U]: {'colors': [COLOR.YELLOW, COLOR.BLUE]},
      }
    ],
  },
  2. any edge at the top layer without white color
  {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.U]: {},
      }
    ],
    'colorFilter': {
      [COLOR.WHITE]: false, // true for having it in either face of the cube
    },
  },
  3. any corner at the top layer with white color on UP or FRONT face, which is at its correct position
  {
    'type': 'corner',
    'faceFilter': [
      {
        [FACE.U]: {'colors': [COLOR.WHITE]},
        [FACE.F]: {},
      },
      {
        [FACE.U]: {},
        [FACE.F]: {'colors': [COLOR.WHITE]},
      },
    ],
    'correct': false,
  }
  4. any edge in the middle layer (not UP nor DOWN)
  {
    'type': 'edge',
    'faceFilter': [
      {
        [FACE.U]: {'notExisted': true},
        [FACE.D]: {'notExisted': true},
      }
    ]
  }
*/

export function processMove(cubes, move) {
  const {cubeFilter, faceChange} = CUBE_CONSTANTS.MOVE_DEFINITIONS[move];
  const {matchedCubes, unmatchedCubes} = filterCubes(cubes, cubeFilter);
  const newCubes = unmatchedCubes;
  for (let cube of matchedCubes) {
    newCubes.push({
      'type': cube.type,
      'faceColors': _.mapKeys(cube.faceColors, function(color, face) {
        if (!faceChange[face]) return face;
        return faceChange[face];
      }),
    });
  }
  return newCubes;
}

export function filterCubes(cubes, filter) {
  const matchedCubes = [];
  const unmatchedCubes = [];
  for (let cube of cubes) {
    if (isMatched(cubes, filter, cube)) {
      matchedCubes.push(cube);
    } else {
      unmatchedCubes.push(cube);
    }
  }
  return {matchedCubes, unmatchedCubes};
}

function isMatched(cubes, filter, cube) {
  if ('faceFilter' in filter) {
    for (let faceFilter of filter.faceFilter) {
      for (let face in faceFilter) {
        const filters = faceFilter[face];
        if (!('notExisted' in filters) && !(face in cube.faceColors)) {
          return false;
        }
        if ('notExisted' in filters && face in cube.faceColors) {
          return false;
        }
        if (filters.colors) {
          if (filters.colors.indexOf(cube.faceColors[face]) === -1) {
            return false;
          }
        }
      }
    }
  }
  if ('type' in filter) {
    if (filter.type.indexOf(cube.type) === -1) {
      return false;
    }
  }
  if ('correct' in filter) {
    let correct = true;
    for (let face in cube.faceColors) {
      const color = cube.faceColors[face];
      const centerCube = findCenterCube(cubes, face);
      if (color !== centerCube.faceColors[face]) {
        correct = false;
      }
    }
    if (filter.correct && !correct) return false;
    if (!filter.correct && correct) return false;
  }
  if ('colorFilter' in filter) {
    for (let color in filter.colorFilter) {
      const colorExisted = (_.values(cube.faceColors).indexOf(color) !== -1);
      if (filter.colorFilter[color] && !colorExisted) return false;
      if (!filter.colorFilter[color] && colorExisted) return false;
    }
  }
  return true;
}

export function findCenterCube(cubes, face) {
  const filter = {
    'type': 'center',
    'faceFilter': [{[face]: {}}],
  };
  return filterCubes(cubes, filter)['matchedCubes'][0];
}

export function findCenterFaceOfColor(cubes, color) {
  const filter = {
    'type': 'center',
    'colorFilter': {[color]: true},
  };
  return _.keys(filterCubes(cubes, filter)['matchedCubes'][0].faceColors)[0];
}

export function oppositeMove(move) {
  const map = {
    'R': 'r',
    'r': 'R',
    'U': 'u',
    'd': 'D',
    'l': 'L',
    'L': 'l',
    'D': 'd',
    'u': 'U',
    ',': 'x',
    '6': 'n',
    'n': '6',
    'x': ',',
  };
  return map[move];
}

export function oppositeFace(face) {
  const map = {
    [CUBE_CONSTANTS.FACE.U]: CUBE_CONSTANTS.FACE.D,
    [CUBE_CONSTANTS.FACE.D]: CUBE_CONSTANTS.FACE.U,
    [CUBE_CONSTANTS.FACE.L]: CUBE_CONSTANTS.FACE.R,
    [CUBE_CONSTANTS.FACE.R]: CUBE_CONSTANTS.FACE.L,
    [CUBE_CONSTANTS.FACE.F]: CUBE_CONSTANTS.FACE.B,
    [CUBE_CONSTANTS.FACE.B]: CUBE_CONSTANTS.FACE.F,
  };
  return map[face];
}

export function getBaseColorFace(cubes, baseColor) {
  const {'matchedCubes': baseColorCenter} = filterCubes(cubes, {
    'type': 'center',
    'colorFilter': {
      [baseColor]: true,
    },
  });
  return _.keys(baseColorCenter[0].faceColors)[0];
}

export function horizontalFaceDifference(fromFace, toFace) {
  const faceIdMap = {
    [CUBE_CONSTANTS.FACE.F]: 1,
    [CUBE_CONSTANTS.FACE.L]: 2,
    [CUBE_CONSTANTS.FACE.B]: 3,
    [CUBE_CONSTANTS.FACE.R]: 4,
  };
  return (faceIdMap[fromFace] - faceIdMap[toFace] + 4) % 4;
}

export function topLayerMovesFromTo(fromFace, toFace) {
  const faceDifference = horizontalFaceDifference(fromFace, toFace);
  const moves = [[], ['u'], ['u', 'u'], ['U']];
  return moves[faceDifference];
}

export function rotateCubeHorizontallyFromTo(fromFace, toFace) {
  const faceDifference = horizontalFaceDifference(fromFace, toFace);
  const moves = [[], ['x'], ['x', 'x'], [',']];
  return moves[faceDifference];
}
