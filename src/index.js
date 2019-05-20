import './sass/index.scss';
import ThreeScene from './components/threeScene'

const threeScene = new ThreeScene();

function raf() {
    requestAnimationFrame(raf)
    threeScene.update();
}

raf()