import * as THREE from 'three'

export default class Star {

    constructor(scene) {
        this.bind()
        this.scene = scene
        this.empty = new THREE.Group()
        this.star
        this.position = {
            x: 2,
            y: (Math.random() - 0.5) * 5 + 1,
            z: (Math.random() - 0.5) * 5 + 1
        }

        this.rSpeed = {
            x: Math.random() * 0.01 + 0.001,
            y: Math.random() * 0.01 + 0.001,
            z: Math.random() * 0.01 + 0.001
        }

        this.init()
    }

    init() {
        this.star = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), new THREE.MeshBasicMaterial())
        this.star.position.set(this.position.x, this.position.y, this.position.z)
        this.empty.add(this.star)
        this.scene.add(this.empty)
    }

    move() {
        //this.empty.rotateX(this.rSpeed.x)
        this.empty.rotateY(this.rSpeed.y)
        this.empty.rotateZ(this.rSpeed.z)
    }

    bind() {
        this.move = this.move.bind(this)
    }
}