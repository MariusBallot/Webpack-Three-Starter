import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import vertSource from "../shaders/cube.vert";
import fragSource from "../shaders/cube.frag";

class ThreeScene {
  constructor() {
    this.camera;
    this.scene;
    this.renderer;
    this.cube;
    this.controls;
    this.uniforms;
    this.bind();
    this.init();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.maxDistance = 1500;
    this.controls.minDistance = 0;

    this.uniforms = {
      colorB: {
        type: "vec3",
        value: new THREE.Color(0xacb6e5)
      },
      colorA: {
        type: "vec3",
        value: new THREE.Color(0x74ebd5)
      }
    };

    this.cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.ShaderMaterial({uniforms: this.uniforms, vertexShader: vertSource, fragmentShader: fragSource}));
    this.scene.add(this.cube);

    let light = new THREE.AmbientLight();
    let pointLight = new THREE.PointLight();
    pointLight.position.set(10, 10, 0);
    this.scene.add(light, pointLight);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.rotateCube();
  }

  rotateCube() {
    this.cube.rotateY(0.01);
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this);
    window.addEventListener("resize", this.resizeCanvas);
  }
}

export {
  ThreeScene as
  default
};
