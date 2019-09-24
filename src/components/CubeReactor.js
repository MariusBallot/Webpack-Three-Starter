import * as THREE from 'three'

import vertSource from "../shaders/cube.vert"
import fragSource from "../shaders/cube.frag"

import texUrl from '../assets/water.jpg'

export default class CubeReactor {

    constructor(scene, count, size) {
        this.bind()
        this.count = count || 5;
        this.size = size || 2;
        this.walls = new THREE.Group()
        this.wallFront = new THREE.Group()
        this.wallBack = new THREE.Group()
        this.wallLeft = new THREE.Group()
        this.wallRight = new THREE.Group()
        this.wallTop = new THREE.Group()
        this.wallBottom = new THREE.Group()
        this.scene = scene


        this.init()

    }

    init() {

        var texLoader = new THREE.TextureLoader()
        var water = texLoader.load(texUrl)

        for (let i = 0; i < 6; i++)
            for (let x = 0; x <= this.count; x++) {
                for (let y = 0; y <= this.count; y++) {

                    var uniforms = {
                        texture1: {
                            type: "t",
                            value: water
                        }
                    };

                    let geometry = new THREE.BoxGeometry(this.size / this.count, this.size / this.count, this.size / this.count)

                    // console.log(geometry.faceVertexUvs, "AVANT")
                    // this.setUvs(geometry)
                    // console.log(geometry.faceVertexUvs, "APRES")


                    let cube = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
                        vertexShader: vertSource,
                        fragmentShader: fragSource,
                        uniforms: uniforms,

                    }))
                    let xpos = this.size / this.count * x - this.size / 2
                    let ypos = this.size / this.count * y - this.size / 2
                    cube.position.set(xpos, ypos, 0)
                    if (i == 0)
                        this.wallFront.add(cube)
                    if (i == 1)
                        this.wallBack.add(cube)
                    if (i == 2)
                        this.wallLeft.add(cube)
                    if (i == 3)
                        this.wallRight.add(cube)
                    if (i == 4)
                        this.wallTop.add(cube)
                    if (i == 5)
                        this.wallBottom.add(cube)
                }
            }
        this.wallFront.position.z = this.size / 4
        this.wallBack.position.z = -this.size / 4
        this.wallBack.rotateY(Math.PI)

        this.wallLeft.position.x = -this.size / 4
        this.wallLeft.rotateY(-Math.PI / 2)
        this.wallRight.position.x = this.size / 4
        this.wallRight.rotateY(Math.PI / 2)

        this.wallTop.position.y = this.size / 4
        this.wallTop.rotateX(-Math.PI / 2)

        this.wallBottom.position.y = -this.size / 4
        this.wallBottom.rotateX(Math.PI / 2)


        this.walls.add(this.wallFront, this.wallBack, this.wallLeft, this.wallRight, this.wallTop, this.wallBottom)
        this.scene.add(this.walls)

    }

    setUvs(geometry) {
        var face1 = [
            new THREE.Vector2(0, .666),
            new THREE.Vector2(.5, .666),
            new THREE.Vector2(.5, 1),
            new THREE.Vector2(0, 1)];

        var face2 = [
            new THREE.Vector2(.5, .666),
            new THREE.Vector2(1, .666),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(.5, 1)];

        var face3 = [
            new THREE.Vector2(0, .333),
            new THREE.Vector2(.5, .333),
            new THREE.Vector2(.5, .666),
            new THREE.Vector2(0, .666)];

        var face4 = [
            new THREE.Vector2(.5, .333),
            new THREE.Vector2(1, .333),
            new THREE.Vector2(1, .666),
            new THREE.Vector2(.5, .666)];

        var face5 = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(.5, 0),
            new THREE.Vector2(.5, .333),
            new THREE.Vector2(0, .333)];

        var face6 = [
            new THREE.Vector2(.5, 0),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(1, .333),
            new THREE.Vector2(.5, .333)];

        geometry.faceVertexUvs[0][0] = [face1[0], face1[1], face1[3]];
        geometry.faceVertexUvs[0][1] = [face1[1], face1[2], face1[3]];

        geometry.faceVertexUvs[0][2] = [face2[0], face2[1], face2[3]];
        geometry.faceVertexUvs[0][3] = [face2[1], face2[2], face2[3]];

        geometry.faceVertexUvs[0][4] = [face3[0], face3[1], face3[3]];
        geometry.faceVertexUvs[0][5] = [face3[1], face3[2], face3[3]];

        geometry.faceVertexUvs[0][6] = [face4[0], face4[1], face4[3]];
        geometry.faceVertexUvs[0][7] = [face4[1], face4[2], face4[3]];

        geometry.faceVertexUvs[0][8] = [face5[0], face5[1], face5[3]];
        geometry.faceVertexUvs[0][9] = [face5[1], face5[2], face5[3]];

        geometry.faceVertexUvs[0][10] = [face6[0], face6[1], face6[3]];
        geometry.faceVertexUvs[0][11] = [face6[1], face6[2], face6[3]];
    }

    move() {
        this.walls.rotateX(0.01)
        this.walls.rotateY(0.01)
        this.walls.children.forEach((wall, j) => {
            wall.children.forEach((cube, i) => {
                let offSet = Math.sin(Date.now() * 0.001 + i / 10) * 2 + 2.1
                cube.position.z = offSet / 5
                cube.scale.z = offSet;
            })
        })



    }

    bind() {
        this.init = this.init.bind(this)
        this.setUvs = this.setUvs.bind(this)
        this.move = this.move.bind(this)
    }


}