import './stylus/index.styl';
import ThreeScene from './classes/ThreeScene'

const threeScene = new ThreeScene();

function raf() {
    requestAnimationFrame(raf)
    threeScene.update();
}

raf()