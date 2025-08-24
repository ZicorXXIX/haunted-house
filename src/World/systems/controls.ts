import type { Camera } from 'three'
import { OrbitControls } from "three/examples/jsm/Addons.js";
import type { AnimatedObject3d } from '../components/types';

function createControls(camera: Camera, canvas: HTMLElement) {
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true;
    (controls as unknown as AnimatedObject3d).tick = () => {
        controls.update()
    }
    return controls
}

export { createControls }
