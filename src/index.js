import './sass/index.scss';
import ThreeScene from './components/ThreeScene'

const threeScene = new ThreeScene();

function raf() {
    requestAnimationFrame(raf)
    threeScene.update();
}

raf()