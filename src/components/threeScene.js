import * as THREE from "three"

import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";


import OrbitControls from "orbit-controls-es6"
import vertSource from "../shaders/cube.vert"
import fragSource from "../shaders/cube.frag"

import CubeReactor from './CubeReactor'
import Canvas from './Canvas'
import Star from "./Star";

import texUrl from '../assets/water.jpg'


class ThreeScene {
  constructor() {
    this.camera
    this.scene
    this.renderer
    this.cube
    this.controls
    this.uniforms
    this.myCanvas = new Canvas();
    this.stars = []

    this.cubeReactor

    this.composer
    this.bloomPass
    this.bind()
    this.init()
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.debug.checkShaderErrors = true
    document.body.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xFFAAAA)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 5)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = true
    this.controls.maxDistance = 1500
    this.controls.minDistance = 0


    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 3, 1, 0.9);
    this.composer.addPass(this.bloomPass);

    var params = {
      exposure: 1,
      bloomStrength: 1.5,
      bloomThreshold: 0,
      bloomRadius: 0
    };

    var gui = new GUI();

    gui.add(params, "bloomThreshold", 0.0, 1.0).onChange(value => {
      this.bloomPass.threshold = Number(value);
    });

    gui.add(params, "bloomStrength", 0.0, 3.0).onChange(value => {
      this.bloomPass.strength = Number(value);
    });

    gui.add(params, "bloomRadius", 0.0, 1.0).step(0.01).onChange(value => {
      this.bloomPass.radius = Number(value);
    });

    var texLoader = new THREE.TextureLoader()
    var water = texLoader.load(texUrl)

    this.uniforms = {
      colorB: {
        type: "vec3",
        value: new THREE.Color(0xacb6e5)
      },
      colorA: {
        type: "vec3",
        value: new THREE.Color(0x74ebd5)
      },
      texture1: {
        type: "t",
        value: water
      }
    }

    this.cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.ShaderMaterial({ uniforms: this.uniforms, vertexShader: vertSource, fragmentShader: fragSource }))
    //this.scene.add(this.cube)

    let light = new THREE.AmbientLight()
    let pointLight = new THREE.PointLight()
    pointLight.position.set(10, 10, 0)
    this.scene.add(light, pointLight)

    for (let i = 0; i < 30; i++) {
      this.stars.push(new Star(this.scene));
    }

    this.cubeReactor = new CubeReactor(this.scene)
  }

  update() {
    this.composer.render();
    this.stars.forEach(star => {
      star.move()
    });

    this.cubeReactor.move();
  }


  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this)
    window.addEventListener("resize", this.resizeCanvas)
  }
}

export {
  ThreeScene as
    default
}
