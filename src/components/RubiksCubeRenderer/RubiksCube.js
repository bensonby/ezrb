import THREE from 'three';

import textureBlack from '../../../assets/texture_black.png';
import textureYellow from '../../../assets/texture_yellow.png';
import textureWhite from '../../../assets/texture_white.png';
import textureOrange from '../../../assets/texture_orange.png';
import textureRed from '../../../assets/texture_red.png';
import textureBlue from '../../../assets/texture_blue.png';
import textureGreen from '../../../assets/texture_green.png';


var RubiksCube = class {
  constructor(currentState) {
    this.loaded = false;
    this.previousState = {};
    this.currentState = currentState;
    this.processedMovesWalker = -1;
    this.currentMoveWalker = -1;
    this.meshes = [];
    this.holder = new THREE.Object3D();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 30, 1, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();
    this.rotationSpeed = 0.1;

    this.textureImages = [
      textureBlack,
      textureRed,
      textureGreen,
      textureWhite,
      textureOrange,
      textureYellow,
      textureBlue,
    ];
    this.colorTexture = [null, null, null, null, null, null, null];

    this.cubeAttributes = [
      //facing right,left , top, down, facing me,away
      {colors: [0, 1, 0, 5, 0, 2], positions: [-1, -1, -1]},
      {colors: [0, 0, 0, 5, 0, 2], positions: [ 0, -1, -1]},
      {colors: [4, 0, 0, 5, 0, 2], positions: [ 1, -1, -1]},
      {colors: [0, 1, 0, 5, 0, 0], positions: [-1, -1,  0]},
      {colors: [0, 0, 0, 5, 0, 0], positions: [ 0, -1,  0]},
      {colors: [4, 0, 0, 5, 0, 0], positions: [ 1, -1,  0]},
      {colors: [0, 1, 0, 5, 6, 0], positions: [-1, -1,  1]},
      {colors: [0, 0, 0, 5, 6, 0], positions: [ 0, -1,  1]},
      {colors: [4, 0, 0, 5, 6, 0], positions: [ 1, -1,  1]},
      {colors: [0, 1, 0, 0, 0, 2], positions: [-1,  0, -1]},
      {colors: [0, 0, 0, 0, 0, 2], positions: [ 0,  0, -1]},
      {colors: [4, 0, 0, 0, 0, 2], positions: [ 1,  0, -1]},
      {colors: [0, 1, 0, 0, 0, 0], positions: [-1,  0,  0]},
      {colors: [0, 0, 0, 0, 0, 0], positions: [ 0,  0,  0]},
      {colors: [4, 0, 0, 0, 0, 0], positions: [ 1,  0,  0]},
      {colors: [0, 1, 0, 0, 6, 0], positions: [-1,  0,  1]},
      {colors: [0, 0, 0, 0, 6, 0], positions: [ 0,  0,  1]},
      {colors: [4, 0, 0, 0, 6, 0], positions: [ 1,  0,  1]},
      {colors: [0, 1, 3, 0, 0, 2], positions: [-1,  1, -1]},
      {colors: [0, 0, 3, 0, 0, 2], positions: [ 0,  1, -1]},
      {colors: [4, 0, 3, 0, 0, 2], positions: [ 1,  1, -1]},
      {colors: [0, 1, 3, 0, 0, 0], positions: [-1,  1,  0]},
      {colors: [0, 0, 3, 0, 0, 0], positions: [ 0,  1,  0]},
      {colors: [4, 0, 3, 0, 0, 0], positions: [ 1,  1,  0]},
      {colors: [0, 1, 3, 0, 6, 0], positions: [-1,  1,  1]},
      {colors: [0, 0, 3, 0, 6, 0], positions: [ 0,  1,  1]},
      {colors: [4, 0, 3, 0, 6, 0], positions: [ 1,  1,  1]},
    ];

    this.moveAttributes = {
      'R': {dimension: 'x', filterValue:    1, rotationSign: -1, rotationEnd: Math.PI / 2},
      'U': {dimension: 'y', filterValue:    1, rotationSign: -1, rotationEnd: Math.PI / 2},
      'F': {dimension: 'z', filterValue:    1, rotationSign: -1, rotationEnd: Math.PI / 2},
      'L': {dimension: 'x', filterValue:   -1, rotationSign:  1, rotationEnd: Math.PI / 2},
      'D': {dimension: 'y', filterValue:   -1, rotationSign:  1, rotationEnd: Math.PI / 2},
      'B': {dimension: 'z', filterValue:   -1, rotationSign:  1, rotationEnd: Math.PI / 2},
      'r': {dimension: 'x', filterValue:    1, rotationSign:  1, rotationEnd: Math.PI / 2},
      'u': {dimension: 'y', filterValue:    1, rotationSign:  1, rotationEnd: Math.PI / 2},
      'f': {dimension: 'z', filterValue:    1, rotationSign:  1, rotationEnd: Math.PI / 2},
      'l': {dimension: 'x', filterValue:   -1, rotationSign: -1, rotationEnd: Math.PI / 2},
      'd': {dimension: 'y', filterValue:   -1, rotationSign: -1, rotationEnd: Math.PI / 2},
      'b': {dimension: 'z', filterValue:   -1, rotationSign: -1, rotationEnd: Math.PI / 2},
      ',': {dimension: 'y', filterValue: null, rotationSign: -1, rotationEnd: Math.PI / 2},
      'x': {dimension: 'y', filterValue: null, rotationSign:  1, rotationEnd: Math.PI / 2},
      '6': {dimension: 'x', filterValue: null, rotationSign:  1, rotationEnd: Math.PI / 2},
      'n': {dimension: 'x', filterValue: null, rotationSign: -1, rotationEnd: Math.PI / 2},
    };

    const loader = new THREE.TextureLoader();

    this.textureImages.forEach(function(texture, colorIndex) {
      loader.load(texture, function(texture){
        this.setMaterial(new THREE.MeshBasicMaterial( {map: texture} ), colorIndex);
        if (this.colorTexture.filter((t) => t === null).length === 0) {
          this.initialize();
        }
      }.bind(this));
    }.bind(this));
  }

  setMaterial(texture, colorIndex) {
    this.colorTexture[colorIndex] = texture;
  }

  initialize() {
    this.renderer.setSize(400, 400); // TODO(vv) get this from initial state or something
    this.renderer.setClearColor( 0xffffff, 1 );
    this.camera.position.z = 15;
    this.camera.position.y = 6;
    this.camera.position.x = 7;
    this.camera.rotation.y = 0.4;
    this.camera.rotation.x = -0.4;
    document.querySelector('#canvas-holder').appendChild(this.renderer.domElement);

    this.initializeCubes();
    this.processInitialMoves();

    this.loop();
  }

  initializeCubes() {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    this.scene.add(this.holder);

    for (let i = 0; i < this.cubeAttributes.length; i++ ) {
      const colors = this.cubeAttributes[i].colors.map(
        function(colorIndex) {
          return this.colorTexture[colorIndex];
        }.bind(this)
      );
      const materials = new THREE.MeshFaceMaterial(colors);

      this.meshes[i] = new THREE.Mesh(geometry, materials);
      this.meshes[i].position.set(
        this.cubeAttributes[i].positions[0],
        this.cubeAttributes[i].positions[1],
        this.cubeAttributes[i].positions[2]
      );
      this.scene.add(this.meshes[i]);
    }
    this.loaded = true;
  }

  processInitialMoves() {
    for (let move of this.currentState.initialMoves) {
      const {
        dimension,
        filterValue,
        rotationSign,
        rotationEnd,
      } = this.moveAttributes[move];

      const cubeIds = this.getCubeIds(dimension, filterValue);

      if(cubeIds.length !== 9 && cubeIds.length !== 27) {  //TODO: dynamic size?
        console.log('invalid move: ' + move + '\n cubeIds:');
        console.log(cubeIds);
        return;
      }
      this.setCubesInHolder(cubeIds);
      this.holder.rotation[dimension] = rotationSign * rotationEnd;
      this.detachAllCubesFromHolder();
    }
  }

  getCubeIds(dimension, filterValue) {
    const selectedCubeIds = [];
    for (let i = 0; i < this.meshes.length; i++) {
      if(filterValue == null || (Math.round(this.meshes[i].position[dimension]) === filterValue)){
        selectedCubeIds.push(i);
      }
    }
    return selectedCubeIds;
  }

  setCubesInHolder(cubeIds) {
    this.scene.updateMatrixWorld();
    for (let cubeId of cubeIds) {
      THREE.SceneUtils.attach(this.meshes[cubeId], this.scene, this.holder);
    }
  }

  detachAllCubesFromHolder() {
    this.scene.updateMatrixWorld();
    for (let i = 0; i < this.meshes.length; i++) {
      if (!this.meshes[i].parent || this.meshes[i].parent.type === 'Scene') {
        continue;
      }
      THREE.SceneUtils.detach(this.meshes[i], this.holder, this.scene);
    }
    this.resetHolder();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.update();
    this.render();
  }

  update() {
    if (this.currentMoveWalker === this.processedMovesWalker) {
      if (this.processedMovesWalker >= this.currentState.moves.length - 1) return;
      this.currentMoveWalker++;
      const currentMove = this.currentState.moves[this.processedMovesWalker + 1];
      const {
        dimension,
        filterValue,
      } = this.moveAttributes[currentMove];
      const cubeIds = this.getCubeIds(dimension, filterValue);
      if(cubeIds.length !== 9 && cubeIds.length !== 27) {  //TODO: dynamic size?
        console.log('invalid move: ' + currentMove + '\n cubeIds:');
        console.log(cubeIds);
        return;  // TODO: how to handle error?
      }
      this.setCubesInHolder(cubeIds);
    }
    const currentMove = this.currentState.moves[this.currentMoveWalker];
    const {
      rotationSign,
      rotationEnd,
      dimension,
    } = this.moveAttributes[currentMove];

    const currentRotation = this.holder.rotation[dimension];

    if( (rotationSign ==  1 && currentRotation + rotationSign * this.rotationSpeed > rotationSign * rotationEnd) ||
        (rotationSign == -1 && currentRotation + rotationSign * this.rotationSpeed < rotationSign * rotationEnd) ) {
      this.holder.rotation[dimension] = rotationSign * rotationEnd;
      this.detachAllCubesFromHolder();
      this.processedMovesWalker++;
    }else{
      this.holder.rotation[dimension] += rotationSign * this.rotationSpeed;
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  updateState(state) {
    if (!this.loaded) return;
    this.previousState = this.currentState;
    this.currentState = state;

    if (this.previousState !== {} && this.currentState.initialMoves !== this.previousState.initialMoves) {
      this.reset();
      this.processInitialMoves();
    }
  }

  resetHolder() {
    if(this.holder) {
      this.holder.rotation.x = 0;
      this.holder.rotation.y = 0;
      this.holder.rotation.z = 0;
      this.holder.position.x = 0;
      this.holder.position.y = 0;
      this.holder.position.z = 0;
    }
  }

  reset() {
    if (!this.loaded) return;
    this.detachAllCubesFromHolder();
    for (let i = 0; i < this.cubeAttributes.length; i++) {
      this.meshes[i].position.set(
        this.cubeAttributes[i].positions[0],
        this.cubeAttributes[i].positions[1],
        this.cubeAttributes[i].positions[2]
      )
      this.meshes[i].rotation.set(0, 0, 0);
    }
    this.processedMovesWalker = -1;
    this.currentMoveWalker = -1;
  }

};

export default RubiksCube;
