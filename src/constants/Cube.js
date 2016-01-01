export const COLOR = {
  'YELLOW': 'color:yellow',
  'WHITE': 'color:white',
  'ORANGE': 'color:orange',
  'RED': 'color:red',
  'BLUE': 'color:blue',
  'GREEN': 'color:green',
};

export const FACE = {
  'L': 'face:L',
  'R': 'face:R',
  'U': 'face:U',
  'D': 'face:D',
  'F': 'face:F',
  'B': 'face:B',
};

export const CUBES = [
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW, [FACE.L]: COLOR.RED, [FACE.B]: COLOR.GREEN},
    'type': 'corner',
  },
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW, [FACE.L]: COLOR.RED, [FACE.F]: COLOR.BLUE},
    'type': 'corner',
  },
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW, [FACE.R]: COLOR.ORANGE, [FACE.B]: COLOR.GREEN},
    'type': 'corner',
  },
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW, [FACE.R]: COLOR.ORANGE, [FACE.F]: COLOR.BLUE},
    'type': 'corner',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE, [FACE.L]: COLOR.RED, [FACE.B]: COLOR.GREEN},
    'type': 'corner',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE, [FACE.L]: COLOR.RED, [FACE.F]: COLOR.BLUE},
    'type': 'corner',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE, [FACE.R]: COLOR.ORANGE, [FACE.B]: COLOR.GREEN},
    'type': 'corner',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE, [FACE.R]: COLOR.ORANGE, [FACE.F]: COLOR.BLUE},
    'type': 'corner',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE, [FACE.L]: COLOR.RED},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE, [FACE.R]: COLOR.ORANGE},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE, [FACE.F]: COLOR.BLUE},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE, [FACE.B]: COLOR.GREEN},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW, [FACE.L]: COLOR.RED},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW, [FACE.R]: COLOR.ORANGE},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW, [FACE.F]: COLOR.BLUE},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW, [FACE.B]: COLOR.GREEN},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.L]: COLOR.RED, [FACE.F]: COLOR.BLUE},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.L]: COLOR.RED, [FACE.B]: COLOR.GREEN},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.R]: COLOR.ORANGE, [FACE.F]: COLOR.BLUE},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.R]: COLOR.ORANGE, [FACE.B]: COLOR.GREEN},
    'type': 'edge',
  },
  {
    'faceColors': {[FACE.R]: COLOR.ORANGE},
    'type': 'center',
  },
  {
    'faceColors': {[FACE.L]: COLOR.RED},
    'type': 'center',
  },
  {
    'faceColors': {[FACE.U]: COLOR.WHITE},
    'type': 'center',
  },
  {
    'faceColors': {[FACE.D]: COLOR.YELLOW},
    'type': 'center',
  },
  {
    'faceColors': {[FACE.F]: COLOR.BLUE},
    'type': 'center',
  },
  {
    'faceColors': {[FACE.B]: COLOR.GREEN},
    'type': 'center',
  },
];

export const MOVE_DEFINITIONS = {
  'U': {
    'cubeFilter': {'face': [FACE.U]},
    'faceChange': {[FACE.B]: FACE.R, [FACE.R]: FACE.F, [FACE.F]: FACE.L, [FACE.L]: FACE.B},
  },
  'u': {
    'cubeFilter': {'face': [FACE.U]},
    'faceChange': {[FACE.R]: FACE.B, [FACE.F]: FACE.R, [FACE.L]: FACE.F, [FACE.B]: FACE.L},
  },
  'D': {
    'cubeFilter': {'face': [FACE.D]},
    'faceChange': {[FACE.R]: FACE.B, [FACE.F]: FACE.R, [FACE.L]: FACE.F, [FACE.B]: FACE.L},
  },
  'd': {
    'cubeFilter': {'face': [FACE.D]},
    'faceChange': {[FACE.B]: FACE.R, [FACE.R]: FACE.F, [FACE.F]: FACE.L, [FACE.L]: FACE.B},
  },
  'R': {
    'cubeFilter': {'face': [FACE.R]},
    'faceChange': {[FACE.U]: FACE.B, [FACE.B]: FACE.D, [FACE.D]: FACE.F, [FACE.F]: FACE.U},
  },
  'r': {
    'cubeFilter': {'face': [FACE.R]},
    'faceChange': {[FACE.B]: FACE.U, [FACE.D]: FACE.B, [FACE.F]: FACE.D, [FACE.U]: FACE.F},
  },
  'L': {
    'cubeFilter': {'face': [FACE.L]},
    'faceChange': {[FACE.B]: FACE.U, [FACE.D]: FACE.B, [FACE.F]: FACE.D, [FACE.U]: FACE.F},
  },
  'l': {
    'cubeFilter': {'face': [FACE.L]},
    'faceChange': {[FACE.U]: FACE.B, [FACE.B]: FACE.D, [FACE.D]: FACE.F, [FACE.F]: FACE.U},
  },
  ',': {
    'cubeFilter': {},
    'faceChange': {[FACE.B]: FACE.R, [FACE.R]: FACE.F, [FACE.F]: FACE.L, [FACE.L]: FACE.B},
  },
  'x': {
    'cubeFilter': {},
    'faceChange': {[FACE.R]: FACE.B, [FACE.F]: FACE.R, [FACE.L]: FACE.F, [FACE.B]: FACE.L},
  },
  '6': {
    'cubeFilter': {},
    'faceChange': {[FACE.U]: FACE.F, [FACE.F]: FACE.D, [FACE.D]: FACE.B, [FACE.B]: FACE.U},
  },
  'n': {
    'cubeFilter': {},
    'faceChange': {[FACE.F]: FACE.U, [FACE.D]: FACE.F, [FACE.B]: FACE.D, [FACE.U]: FACE.B},
  },
};

export const KEY_TO_CUBE_MOVE = {
  85: 'R',  // U
  74: 'r',  // J
  72: 'U',  // H
  75: 'd',  // K
  82: 'l',  // R
  70: 'L',  // F
  68: 'D',  // D
  71: 'u',  // G
  188: ',',  // ,
  54: '6',  // 6
  78: 'n',  // N
  88: 'x',  // X
};
