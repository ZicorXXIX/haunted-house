import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createPlane } from "./components/plane";
import { createScene } from "./components/scene";
import { createControls } from "./systems/controls";
import { Debugger } from "./systems/Debugger";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";

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

        const controls = createControls(this.camera, container as HTMLElement)
        this.loop.updatables.push(controls)

        const cube = createCube()
        const plane = createPlane()
        const debugUi = new Debugger({})
        debugUi.addMesh(cube, "cube")
        this.scene.add(cube, plane)
        const resizer = new Resizer(container, this.camera, this.renderer)
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
