import type { Camera } from 'three'
import { OrbitControls } from "three/examples/jsm/Addons.js";

function createControls(camera: Camera, canvas: HTMLElement) {
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.tick = () => {
        controls.update()
    }
    return controls
}

export { createControls }
