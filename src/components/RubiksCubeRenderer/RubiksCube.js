import THREE from 'three';

import textureBlack from '../../../assets/texture_black.png';
import textureYellow from '../../../assets/texture_yellow.png';
import textureWhite from '../../../assets/texture_white.png';
import textureOrange from '../../../assets/texture_orange.png';
import textureRed from '../../../assets/texture_red.png';
import textureBlue from '../../../assets/texture_blue.png';
import textureGreen from '../../../assets/texture_green.png';

var RubiksCube = class {
  constructor() {
    this.previousState = null;
    this.currentState = null;
    this.meshes = [];
    this.holder = new THREE.Object3D();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 30, 1, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();

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

    this.loop();
  }

  initializeCubes() {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

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
      this.holder.add(this.meshes[i]);
    }
    this.scene.add(this.holder);
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.update();
    this.render();
  }

  update() {
    this.holder.rotation.x += 0.01;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  updateState(state) {
    this.previousState = this.currentState;
    this.currentState = state;
  }

};

export default RubiksCube;
