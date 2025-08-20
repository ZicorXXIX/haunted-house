import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createPlane } from "./components/plane";
import { createScene } from "./components/scene";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";

class World {
    private scene: ReturnType<typeof createScene>
    private camera: ReturnType<typeof createCamera>
    private renderer: ReturnType<typeof createRenderer>
    private loop: Loop
    constructor(container: Element) {
        this.scene = createScene()
        this.camera = createCamera()
        this.renderer = createRenderer()
        this.loop = new Loop(this.scene, this.camera, this.renderer)
        container.appendChild(this.renderer.domElement)
        //Put in resizer class
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.camera.aspect = container.clientWidth / container.clientHeight
        const cube = createCube()
        const plane = createPlane()
        this.scene.add(cube, plane)

    }

    //render on demand (produce a single frame)
    render() {
        this.renderer.render(this.scene, this.camera)
    }

    start() {
        this.loop.start()
    }

    stop() {
        this.loop.stop()
    }
}

export { World }
